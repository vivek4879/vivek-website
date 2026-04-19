import fs from "node:fs";
import path from "node:path";

export type LabStatus = "idea" | "exploring" | "building" | "shipped" | "shelved";

export type LabItem = {
  id: string;
  title: string;
  description: string;
  status: LabStatus;
};

export const labItems: LabItem[] = [
  {
    id: "session-token-economics",
    title: "Measuring Claude Code session economics",
    description:
      "Wrap + /start fresh, cold resume, or idle the terminal and keep typing tomorrow — these should have different cost and quality profiles, but I've never measured it. Plan: Stop hook that logs per-session token/cache metrics to a local CSV, analyse patterns across a few weeks, escalate to a controlled SDK-based A/B harness if the observational signal warrants it. Click through for the full write-up.",
    status: "exploring",
  },
  {
    id: "output-style-vs-skills",
    title: "Output styles vs skills — where Claude Code instructions live",
    description:
      "I authored a pair-programming output style and a matching /pair-on / /pair-off skill pair with nearly identical instructions — one lives in the system prompt from session start, the other injects mid-session as a user message. They look identical from the outside but differ in how they cache, where they cost tokens, and whether mid-session toggling is even viable. Plan: document the mechanics from the docs and first principles, then run a small experiment comparing 'pair-by-default + /pair-off for quick fixes' against 'default + /pair-on when learning' on identical tasks. Click through for the full write-up.",
    status: "exploring",
  },
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
    id: "human-machine-toggle",
    title: "Human/Machine mode — a portfolio with no design",
    description:
      "Built this once and cut it. Idea: a toggle that strips the site to plain mono text — no glass, no gradients, no color, just semantic HTML rendered as if it were an llms.txt file. Kept as a standalone demo here rather than as a sitewide feature: gimmick in a notebook, legitimate question as a case study. The interesting bit is the argument underneath — what does the design layer actually contribute vs. the content it's wrapping? Rebuilding as a self-contained /lab page with the toggle, the code, and a short write-up of why it left the main site.",
    status: "idea",
  },
  {
    id: "pretext-typography",
    title: "Typography experiment with chenglou/pretext",
    description:
      "Pretext is Cheng Lou's text measurement + layout library — precise metrics without forcing a DOM measure in the hot path, manual line routing, width-tight multiline UI. Want to use it for something the browser can't do cheaply: a name/headline that auto-fits the viewport at any width (1px resolution, not clamp()), or a masonry-style card grid where heights come from the text, not the other way around. A good excuse to poke at the machinery underneath CSS text layout.",
    status: "idea",
  },

];

// ──────────────────────────────────────────────────────────────
// Filesystem helpers for long-form lab entries.
//
// Each lab item can have an optional MDX detail page at
// content/lab/<id>.mdx. If present, /lab/[id] renders it using
// the same MDX pipeline as blog posts, and the accordion gets
// a "Read full entry →" link. The item's metadata (title,
// description, status) always comes from labItems above — the
// MDX file contains only the body.
//
// lib/lab.ts is imported only by server components today. Type
// imports (`import type { LabItem }`) are safe in client code
// because TS strips them; never add a runtime import of this
// module from a "use client" component or node:fs will leak
// into the client bundle (see lib/blog-config.ts for the fix).
// ──────────────────────────────────────────────────────────────

const LAB_CONTENT_DIR = path.join(process.cwd(), "content", "lab");

export function getLabDetailSlugs(): Set<string> {
  if (!fs.existsSync(LAB_CONTENT_DIR)) return new Set();
  return new Set(
    fs
      .readdirSync(LAB_CONTENT_DIR)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, "")),
  );
}

export function getLabDetailContent(id: string): string | null {
  const filePath = path.join(LAB_CONTENT_DIR, `${id}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}
