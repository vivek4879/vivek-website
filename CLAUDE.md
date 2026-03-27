# CLAUDE.md

This is Vivek's personal portfolio website. See PORTFOLIO_SPEC.md for the full design spec.

## Quick Reference

- **Stack**: Next.js (App Router) + Tailwind CSS + Framer Motion
- **Palette**: Zinc base + cyan (#06B6D4) / violet (#8B5CF6) dual accent
- **Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (mono accents)
- **Key features**: Human/Machine mode toggle, light/dark mode, gradient mesh background, terminal-style cards, scroll-driven hero animation
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

## Session Log

### 2026-03-26 — Project Init
**Done:**
- Scaffolded Next.js 16.2 (App Router) + React 19 + Tailwind 4 + TypeScript
- Installed framer-motion, tailwind-merge
- Reviewed full PORTFOLIO_SPEC.md, validated tech stack (kept as-is, it's the right call)

**Decisions:**
- Added `tailwind-merge` for clean class resolution across 4 mode combos
- No React Compiler, no AGENTS.md from Next.js scaffolder
- Deployment target: Vercel

**Next session — Design System Foundation:**
1. Fonts — load Space Grotesk, Inter, JetBrains Mono via `next/font`
2. Color tokens — full palette as CSS custom properties in Tailwind config
3. Theme system — 4-mode theming (light/dark × human/machine) via CSS classes
4. Dark mode flash prevention — blocking `<script>` in `<head>`

No code written yet beyond the default Next.js scaffold.
