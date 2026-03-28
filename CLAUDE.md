# CLAUDE.md

This is Vivek's personal portfolio website. See PORTFOLIO_SPEC.md for the full design spec.

## Quick Reference

- **Stack**: Next.js (App Router) + Tailwind CSS + Framer Motion
- **Palette**: Zinc base + cyan (#06B6D4) / violet (#8B5CF6) dual accent
- **Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (mono accents)
- **Key features**: Human/Machine mode toggle, light/dark mode, gradient mesh background, terminal-style cards, scroll-driven hero animation, scroll-driven project card animation, AI chat (Claude API)
- **Design principle**: Glass aesthetic leads, terminal DNA supports. Premium product built by an engineer.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — linting

## Important Constraints

- Human/Machine toggle must use CSS class swap only (no DOM replacement) for SEO
- All content must be in default HTML for crawlers
- Gradient mesh blobs are decorative divs — never render text on canvas
- Respect `prefers-reduced-motion` for all animations
- Respect `prefers-contrast: more` — drop glassmorphism, use solid backgrounds
- WCAG AA contrast in all 4 mode combinations
- Mobile: min 44x44px touch targets, 16px min body text, no horizontal overflow
- Hero scroll animation: simplified/disabled on mobile (use fade-in instead)
- Dark mode flash prevention: blocking script in <head> reads localStorage before paint
- Save theme + mode preferences in localStorage
- Font loading: font-display: swap, preload critical fonts
- Use Next.js <Image> component, not raw <img>
- Glassmorphism: -webkit-backdrop-filter prefix for Safari, @supports fallback for older browsers
- Contact form: honeypot spam protection, client + server validation
- Security headers: CSP, X-Frame-Options, X-Content-Type-Options via next.config.ts

## Build Progress

### Done
- [x] Project scaffold (Next.js 16 + React 19 + Tailwind 4 + Framer Motion + tailwind-merge)
- [x] Fonts — Space Grotesk, Inter, JetBrains Mono via `next/font/google`
- [x] Color tokens — `--t-*` CSS vars for 4 modes (light/dark × human/machine)
- [x] Theme provider — React Context + localStorage persistence + `useTheme()` hook
- [x] Dark mode flash prevention — blocking `<script>` in `<head>`
- [x] Navbar — glassmorphism, sun/moon toggle, HUMAN|MACHINE toggle, mobile hamburger + focus trapping
- [x] Gradient mesh — 7-blob config-driven system, cursor tracking (desktop), CSS drift (mobile), grain overlay
- [x] Hero section — name, terminal subtitle, tagline, CTAs, scroll-driven fade/scale animation
- [x] Machine mode — component-level rendering (plain text), not CSS overrides
- [x] About Me section — two-column (photo + text), responsive stack on mobile
- [x] Under construction page deployed to production (main branch)
- [x] Dev branch workflow — dev → preview deployments, main → production
- [x] Tech Stack — bento-grid with glassmorphism cards, 6 categories
- [x] Blog — 3 placeholder posts, glassmorphism cards (MDX pipeline later)
- [x] Coding Activity — terminal-style card, GitHub grid + LeetCode bars (placeholder data, API later)
- [x] Footer / Contact — contact form with honeypot, social links, terminal card (Resend API later)

### Next Steps
1. Projects section — scroll-driven card animation (built last, most complex)
6. AI Chat — floating chat widget (Claude API via Haiku), system prompt with personal info
7. SEO — JSON-LD, Open Graph, sitemap, llms.txt, robots.txt
8. Security headers — CSP, X-Frame-Options via next.config.ts
9. `/projects` page — full project list (homepage shows top 6 in animation)

### Key Architecture Notes
- Machine mode: each component renders its own plain-text version via `useTheme()` — no global CSS overrides
- Gradient mesh: CSS blobs, not WebGL (performance, bundle size, mobile)
- Projects animation: 6 featured projects on homepage, rest at `/projects`. ~400-500vh scroll height, fixed positions (no Math.random), no doomscroll loop.
- Color tokens use `--t-*` prefix to avoid collision with Tailwind's `@theme inline` which generates `--color-*`
- AI Chat: Claude API (Haiku model) via Next.js API route. Floating widget bottom-right. System prompt defines personality/knowledge. Rate limited to control costs. Frontend built with other sections, API integration done last.

## Session Log

### 2026-03-26 — Project Init + Design System
- Scaffolded project, reviewed spec, validated tech stack
- Deployed under-construction page to production via Vercel
- Connected GitHub repo, set up dev branch workflow

### 2026-03-27 — Hero + About + Architecture Decisions
- Built design system foundation (tokens, theme provider, flash prevention)
- Built Navbar, GradientMesh, Hero, AboutMe components
- Switched machine mode from CSS overrides to component-level rendering
- Evaluated and rejected WebGL shaders (Three.js dependency too heavy)
- Decided scroll-driven card animation for Projects (built last)
- Started DECISIONS.md log (10 entries so far)
