export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
};

export const projects: Project[] = [
  {
    title: "AIGatekeeper",
    description:
      "Three-agent AI-tool approval platform — live vendor evidence, deterministic policy scoring, human approval dashboard",
    tech: ["Python", "watsonx Orchestrate", "Redis", "Next.js"],
    github: "https://github.com/vivek4879/AIGatekeeper",
  },
  {
    title: "Handoff",
    description:
      "Video commission marketplace — up-front payment, resumable large-file uploads, funds released on client approval",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe Connect", "Cloudflare R2"],
    github: "https://github.com/vivek4879/handoff-enabler",
  },
  {
    title: "Patient Portal",
    description:
      "Full-stack mini-EMR with admin dashboard, JWT auth, recurring appointment engine",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Zod"],
    github: "https://github.com/vivek4879/patient-portal-1",
  },
  {
    title: "FluidZero",
    description:
      "Marketing website for an AI document intelligence startup",
    tech: ["Next.js", "TypeScript"],
    github: "https://github.com/vivek4879/fennec-vercel",
  },
  {
    title: "vivek-website",
    description:
      "Personal notebook — blog, lab, projects. Next.js + MDX + hand-rolled design tokens",
    tech: ["Next.js", "Tailwind CSS", "MDX"],
    github: "https://github.com/vivek4879/vivek-website",
  },
  {
    title: "MoodWave",
    description:
      "Audio-intelligence platform — mood detection from music via spectral analysis",
    tech: ["Python", "FastAPI", "librosa", "Spotify API"],
    github: "https://github.com/vivek4879/moodWave",
  },
];
