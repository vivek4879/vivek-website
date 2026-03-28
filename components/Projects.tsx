"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/lib/theme-provider";

// ── Project data ──────────────────────────────────────────────

// Each project gets a rich gradient background — CSS gradient as placeholder for future images
const CARD_GRADIENTS = [
  "bg-gradient-to-br from-cyan-600 via-cyan-800 to-blue-900",       // Career Vault
  "bg-gradient-to-br from-violet-600 via-violet-800 to-indigo-900", // Patient Portal
  "bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-900",    // FluidZero
  "bg-gradient-to-br from-amber-500 via-orange-700 to-red-900",     // MoodWave
  "bg-gradient-to-br from-rose-600 via-pink-700 to-purple-900",     // EcommerceApp
  "bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-900",     // vivek-website
  "bg-gradient-to-br from-orange-500 via-amber-700 to-yellow-900",  // Leads Tracker
  "bg-gradient-to-br from-pink-500 via-rose-700 to-red-900",        // Bitcoin Volatility
];

const projects = [
  {
    title: "Career Vault",
    description:
      "AI career companion — work journal, bullet bank, RAG-powered resume tailoring",
    tech: ["Next.js", "Prisma", "pgvector", "Gemini", "Playwright"],
    github: "https://github.com/vivek4879/social-media-agent",
  },
  {
    title: "Patient Portal",
    description:
      "Full-stack mini-EMR with admin dashboard, JWT auth, recurring appointment engine",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Zod"],
    github: "https://github.com/vivek4879/patient-portal-1",
    live: "https://patient-portal-1.vercel.app",
  },
  {
    title: "FluidZero",
    description:
      "Marketing website for an AI document intelligence startup",
    tech: ["Next.js", "TypeScript"],
    github: "https://github.com/vivek4879/fennec-vercel",
    live: "https://www.fluidzero.ai",
  },
  {
    title: "MoodWave",
    description:
      "Audio-intelligence platform — mood detection from music via spectral analysis",
    tech: ["Python", "FastAPI", "librosa", "Spotify API"],
    github: "https://github.com/vivek4879/moodWave",
  },
  {
    title: "EcommerceApp",
    description:
      "Spring Boot REST API with layered architecture, DTOs, centralized error handling",
    tech: ["Java", "Spring Boot", "PostgreSQL", "JPA"],
    github: "https://github.com/vivek4879/EcommerceApp",
  },
  {
    title: "vivek-website",
    description:
      "Personal portfolio — 4-mode theming, glass aesthetic, scroll-driven animations",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/vivek4879/vivek-website",
    live: "https://vivek-website-3s865py0y-vivek-ahers-projects.vercel.app",
  },
  {
    title: "Leads Tracker",
    description:
      "Chrome extension to save and manage tabs with localStorage persistence",
    tech: ["JavaScript", "Chrome APIs"],
    github: "https://github.com/vivek4879/chrome-extension",
  },
  {
    title: "Bitcoin Volatility",
    description:
      "ETL pipeline for BTC price analysis with Spark MapReduce and K8s orchestration",
    tech: ["Scala", "Spark", "PostgreSQL", "Hive", "Kubernetes"],
    github: "https://github.com/vivek4879/Bitcoin-Daily-Price-Volatility",
  },
];

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
        </div>
      </section>
    </>
  );
}
