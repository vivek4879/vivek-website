"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/lib/theme-provider";
import { projects, CARD_GRADIENTS } from "@/lib/projects";

// ── Seeded PRNG (Mulberry32) ──────────────────────────────────
// Deterministic: same seed → same sequence on server & client
// Prevents React hydration mismatch

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Position generation ───────────────────────────────────────
// Each card gets positions for 4 scroll phases:
//   stack (0-15%) → scatter (15-45%) → grid (45-75%) → settled (75-100%)

type CardPositions = {
  stackX: number;
  stackY: number;
  stackRotate: number;
  scatterX: number;
  scatterY: number;
  scatterRotate: number;
  gridX: number;
  gridY: number;
};

const CARD_W = 300;
const CARD_H = 220;
const GRID_GAP = 20;
const COLS = 4;

function generatePositions(count: number): CardPositions[] {
  const rand = mulberry32(42);
  const positions: CardPositions[] = [];

  for (let i = 0; i < count; i++) {
    // Stack phase: perfectly centered, only rotation varies
    const stackX = 0;
    const stackY = 0;
    const stackRotate = (rand() - 0.5) * 12; // -6° to +6°

    // Scatter phase: fan out across the viewport area
    // Range: roughly -500 to +500 on X, -250 to +250 on Y
    const scatterX = (rand() - 0.5) * 900;
    const scatterY = (rand() - 0.5) * 500;
    const scatterRotate = (rand() - 0.5) * 30; // -15° to +15°

    // Grid phase: deterministic 4-column grid, centered
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const totalW = COLS * CARD_W + (COLS - 1) * GRID_GAP;
    const totalRows = Math.ceil(count / COLS);
    const totalH = totalRows * CARD_H + (totalRows - 1) * GRID_GAP;
    const gridX = col * (CARD_W + GRID_GAP) - totalW / 2 + CARD_W / 2;
    const gridY = row * (CARD_H + GRID_GAP) - totalH / 2 + CARD_H / 2;

    positions.push({
      stackX,
      stackY,
      stackRotate,
      scatterX,
      scatterY,
      scatterRotate,
      gridX,
      gridY,
    });
  }

  return positions;
}

const cardPositions = generatePositions(projects.length);

// ── Animated card wrapper ─────────────────────────────────────

function AnimatedCard({
  project,
  positions,
  index,
  scrollYProgress,
}: {
  project: (typeof projects)[number];
  positions: CardPositions;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const {
    stackX,
    stackY,
    stackRotate,
    scatterX,
    scatterY,
    scatterRotate,
    gridX,
    gridY,
  } = positions;

  // Interpolate x, y, rotate, scale, opacity across 4 phases
  // Keyframes: [start, endStack, endScatter, endGrid]
  const x = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.75],
    [stackX, stackX, scatterX, gridX],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.75],
    [stackY, stackY, scatterY, gridY],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.75],
    [stackRotate, stackRotate, scatterRotate, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.75],
    [0.85, 0.9, 1, 1],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.75],
    [index < 3 ? 1 : 0, 1, 1, 1],
  );

  // z-index: in stack phase, later cards on top; in grid, all equal
  const zIndex = useTransform(scrollYProgress, [0, 0.45], [index, 1]);

  // Pointer events: disabled during animation, enabled once settled
  const pointerEvents = useTransform(scrollYProgress, (v: number) =>
    v > 0.7 ? "auto" : "none",
  );

  return (
    <motion.div
      className="absolute"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex,
        pointerEvents,
        width: CARD_W,
        left: -CARD_W / 2,
        top: -CARD_H / 2,
      }}
    >
      <ProjectCard project={project} gradient={CARD_GRADIENTS[index]} />
    </motion.div>
  );
}

// ── Project card ──────────────────────────────────────────────

function ProjectCard({
  project,
  gradient,
}: {
  project: (typeof projects)[number];
  gradient: string;
}) {
  return (
    <div className={`group relative h-full overflow-hidden rounded-2xl ${gradient} p-5 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
      {/* Content on top of gradient */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between">
          <h3
            className="text-base font-semibold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {project.title}
          </h3>
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors hover:text-white"
              aria-label={`${project.title} GitHub repository`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-white"
                aria-label={`${project.title} live site`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-xs text-white/70">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-black/20 px-2 py-0.5 text-[10px] text-white/80"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Mobile fallback: static grid with no animation ────────────

function MobileProjects() {
  return (
    <section id="projects" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-4 text-xs uppercase tracking-wider text-cyan"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Projects
        </p>
        <h2
          className="mb-12 text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Things I&apos;ve built
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} gradient={CARD_GRADIENTS[i]} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cyan"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            View All Projects <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Main component ────────────────────────────────────────────

export default function Projects() {
  const { mode } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Heading visible from the start
  const headingOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.05], [20, 0]);

  // Scroll hint: visible at the start, disappears as animation begins
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05, 0.2], [0, 1, 0]);

  // "View All" only appears once the grid has fully settled
  const viewAllOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

  if (mode === "machine") {
    return (
      <section ref={sectionRef} id="projects" className="px-6 py-8">
        <div
          className="mx-auto max-w-[700px]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <p className="text-muted">---</p>
          <p className="mt-4 text-lg font-bold text-heading">## Projects</p>
          {projects.map((p) => (
            <div key={p.title} className="mt-6">
              <p className="font-bold text-heading">
                {p.title}{" "}
                <a
                  href={p.github}
                  className="text-cyan underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  [github]
                </a>
                {p.live && (
                  <>
                    {" "}
                    <a
                      href={p.live}
                      className="text-cyan underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      [live]
                    </a>
                  </>
                )}
              </p>
              <p className="text-body">{p.description}</p>
              <p className="text-muted">{p.tech.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop: scroll-driven animation
  // Mobile: static grid (detected via CSS, not JS — avoids hydration mismatch)
  return (
    <>
      {/* Mobile: static grid, hidden on lg+ */}
      <div className="lg:hidden">
        <MobileProjects />
      </div>

      {/* Desktop: scroll-driven animation, hidden below lg */}
      <section
        ref={sectionRef}
        id="projects"
        className="relative hidden lg:block"
        style={{ height: "400vh" }}
      >
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          {/* Heading — fades in as grid settles */}
          <motion.div
            className="absolute left-1/2 top-12 -translate-x-1/2"
            style={{ opacity: headingOpacity, y: headingY }}
          >
            <p
              className="mb-4 text-center text-xs uppercase tracking-wider text-cyan"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Projects
            </p>
            <h2
              className="text-center text-3xl font-bold tracking-tight text-heading sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Things I&apos;ve built
            </h2>
          </motion.div>

          {/* Animated cards */}
          <div className="relative">
            {projects.map((project, i) => (
              <AnimatedCard
                key={project.title}
                project={project}
                positions={cardPositions[i]}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Scroll hint — visible at start, fades out as animation begins */}
          <motion.div
            className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
            style={{ opacity: hintOpacity }}
          >
            <p className="text-xs text-muted" style={{ fontFamily: "var(--font-mono)" }}>
              scroll to explore
            </p>
            <motion.div
              className="h-8 w-0.5 rounded-full bg-muted"
              animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* View all link — outside sticky, appears at the very bottom of the scroll section */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cyan"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            View All Projects <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
