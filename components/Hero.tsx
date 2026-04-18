"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ scale, opacity, y }}
        className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
      >
        {/* Eyebrow — terminal prompt */}
        <p
          className="text-sm text-muted"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="text-cyan">~/vivek</span>{" "}
          <span className="text-muted">$</span>
        </p>

        {/* Name */}
        <h1
          className="text-5xl font-bold tracking-tight text-heading sm:text-7xl lg:text-8xl"
          style={{
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.02em",
          }}
        >
          Vivek Aher
        </h1>

        {/* Terminal-style subtitle */}
        <p
          className="flex items-center gap-2 text-lg text-muted sm:text-xl"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="text-cyan">&gt;</span>
          <span>full-stack engineer</span>
          <span
            className="inline-block h-5 w-0.5 bg-cyan"
            style={{ animation: "blink 1s step-end infinite" }}
            aria-hidden="true"
          />
        </p>

        {/* Tagline */}
        <p className="max-w-md text-base text-body sm:text-lg">
          Building thoughtful software at the intersection of design and engineering.
        </p>

        {/* CTAs */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex h-11 min-w-[140px] items-center justify-center rounded-lg bg-cyan px-6 text-sm font-medium text-zinc-950 transition-all hover:brightness-110 active:scale-95"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex h-11 min-w-[140px] items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-body transition-all hover:bg-surface hover:text-heading active:scale-95"
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex flex-col items-center gap-2">
          <p
            className="text-sm font-medium text-heading"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            scroll
          </p>
          <motion.div
            className="h-8 w-0.5 rounded-full bg-muted"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
