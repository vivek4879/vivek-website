# vivek-website

My personal portfolio site. Currently a work in progress.

> **Status:** Under active development — the design system and component architecture are being built out.

## What I'm building

A portfolio that reflects how I actually think — part designer, part engineer. The site has two modes you can toggle between:

- **Human mode** — glass aesthetic, gradient mesh backgrounds, smooth animations. The polished version.
- **Machine mode** — stripped down to monospace text, structured like a terminal. The raw version.

Both modes support light and dark themes (4 combinations total), all driven by CSS class swaps so the content stays in the DOM for SEO.

## Tech stack

| Tool | Role |
|------|------|
| Next.js 16 (App Router) | Framework — SSR, routing, image optimization |
| Tailwind CSS 4 | Styling — utility-first, CSS custom properties for theming |
| Framer Motion | Animations — scroll-driven hero, mode transitions |
| tailwind-merge | Clean class resolution across 4 theme/mode combos |
| TypeScript | Type safety |
| Vercel | Deployment |

## Planned features

- [x] Project scaffold and tooling setup
- [ ] Design system — fonts, color tokens, 4-mode theming
- [ ] Dark mode flash prevention (blocking script in `<head>`)
- [ ] Gradient mesh background (cursor-following blobs, respects `prefers-reduced-motion`)
- [ ] Glassmorphism navbar with human/machine + light/dark toggles
- [ ] Hero section with scroll-driven animation
- [ ] About, Tech Stack (bento grid), Projects, Blog, Coding Activity sections
- [ ] Terminal-style card component (GitHub + LeetCode activity)
- [ ] Contact form with honeypot spam protection
- [ ] SEO — semantic HTML, JSON-LD, Open Graph, `llms.txt`
- [ ] Security headers (CSP, X-Frame-Options, etc.)
- [ ] WCAG AA accessibility across all 4 mode combinations

## Built with AI

I'm building this with [Claude Code](https://claude.ai/claude-code) as a pair programming partner — using it for architecture decisions, debugging, and working through implementation step by step. I'm also using the full design spec I wrote ([PORTFOLIO_SPEC.md](./PORTFOLIO_SPEC.md)) as the source of truth for the build.

## Run locally

```bash
git clone https://github.com/vivek4879/vivek-website.git
cd vivek-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design spec

The full spec (color palette, typography, section breakdowns, accessibility requirements, etc.) lives in [PORTFOLIO_SPEC.md](./PORTFOLIO_SPEC.md).
