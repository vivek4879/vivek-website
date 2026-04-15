export type LabStatus = "idea" | "exploring" | "building" | "shipped" | "shelved";

export type LabItem = {
  id: string;
  title: string;
  description: string;
  status: LabStatus;
};

export const labItems: LabItem[] = [
  {
    id: "callout-component",
    title: "Custom MDX <Callout> component",
    description:
      "A small React component (info / tip / warning variants) that I can drop into any blog post for inline asides. MDX makes this easy — write the component once, import it from any .mdx file. Reaching for it the first time a post needs to flag something the prose can't.",
    status: "idea",
  },
  {
    id: "self-hosted-analytics",
    title: "Self-hosted analytics with Plausible",
    description:
      "Vercel Analytics is fine, but I want ownership of the data and an excuse to learn Docker + Caddy on a small VPS. Plausible is open-source, GDPR-friendly, and runs on a $5 droplet. Bonus side effect: practical exposure to TLS, reverse proxies, and basic VPS hardening.",
    status: "idea",
  },
  {
    id: "og-images-per-post",
    title: "Auto-generated Open Graph images per blog post",
    description:
      "Right now every shared link uses the site's default OG image. I want each post to get its own image generated at build time — title + date over a gradient that picks colors from the post's tags. Next.js's @vercel/og handles the rendering; the interesting part is the design system for it.",
    status: "idea",
  },
  {
    id: "ai-chat-widget",
    title: "AI chat widget powered by Claude Haiku",
    description:
      "Floating chat button bottom-right. Visitors can ask questions about my background, projects, or experience and get answers from a system prompt that knows me. Claude Haiku for cost; Next.js API route for the backend; rate-limited so it doesn't bankrupt me. Already on the project's Next Steps.",
    status: "exploring",
  },
  {
    id: "projects-archive-page",
    title: "Full /projects archive with filtering",
    description:
      "The homepage Projects section shows 6 featured projects in a scroll-driven animation. The full list deserves its own page with a flat grid, search, and tag filtering. Lower priority than blog and Lab, but the data layer (lib/projects.ts) is already there.",
    status: "exploring",
  },
];
