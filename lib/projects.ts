export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
};

export const projects: Project[] = [
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
      "Personal portfolio — 4-mode theming, scroll-driven animations, security headers",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/vivek4879/vivek-website",
    live: "https://vivek-website-five.vercel.app",
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

export const CARD_GRADIENTS = [
  "bg-gradient-to-br from-cyan-600 via-cyan-800 to-blue-900",
  "bg-gradient-to-br from-violet-600 via-violet-800 to-indigo-900",
  "bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-900",
  "bg-gradient-to-br from-amber-500 via-orange-700 to-red-900",
  "bg-gradient-to-br from-rose-600 via-pink-700 to-purple-900",
  "bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-900",
  "bg-gradient-to-br from-orange-500 via-amber-700 to-yellow-900",
  "bg-gradient-to-br from-pink-500 via-rose-700 to-red-900",
];
