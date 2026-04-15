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
- [x] Blog cards — glassmorphism, prop-driven, full-card `<Link>` to `/blog/[slug]`
- [x] Blog MDX pipeline — `content/posts/*.mdx`, `lib/posts.ts` data layer, dynamic `/blog/[slug]` route, `/blog` index, `next-mdx-remote/rsc` + `remark-gfm` + `rehype-pretty-code` (Shiki dual-theme), hand-rolled `.prose-post` typography
- [x] `turbopack.root` set in `next.config.ts` (silences workspace lockfile warning from stray `~/package-lock.json`)
- [x] "View all posts →" link on homepage Blog section → `/blog` archive (conditional on posts ≥ 3)
- [x] Lab page (`/lab`) — curated "things I want to build" list. Native `<details>` accordion (zero JS state), status pills (idea/exploring/building/shipped/shelved), data in `lib/lab.ts` as TS const array
- [x] Navbar nav fix — route hrefs (`/lab`) use `<Link>`; hash hrefs (`#about`) scroll when on home, navigate to `/#about` from other pages. Previously all hrefs were hijacked by `querySelector().scrollIntoView()` which failed silently on non-home pages and for any route-style href.
- [x] WRITING.md + LAB.md authoring guides at project root
- [x] Coding Activity — terminal-style card, GitHub grid + LeetCode bars (placeholder data, API later). H2 heading removed (used to read "I ship code and sharpen fundamentals")
- [x] Footer / Contact — contact form with honeypot, social links, terminal card (Resend API later)

### Next Steps
1. **Visual QA the dev-branch Vercel preview** before merging the open PR. Click through `/blog` → post → back-link AND `/lab` (expand items, check all 5 status colors, accordion animation, chevron rotation) in all 4 modes (light/dark × human/machine). Also click every Navbar link from a blog post to confirm the nav fix works (each should either scroll on home or route to home + hash / to `/lab`).
2. **Write real first blog post** — replace `content/posts/hello-mdx.mdx` (pipeline-test post). See `WRITING.md` for the authoring workflow.
3. **Populate the Lab** — `lib/lab.ts` has 5 seed items; edit/replace with real ones. See `LAB.md`.
4. Projects section — scroll-driven card animation (built last, most complex)
5. AI Chat — floating chat widget (Claude API via Haiku), system prompt with personal info
6. SEO — llms.txt (JSON-LD + OG + sitemap already wired; sitemap includes `/`, `/projects`, `/lab` but NOT individual `/blog/*` routes yet — worth adding dynamic blog entries)
7. `/projects` page — full project list (homepage shows top 6 in animation). Currently exists but uses a different wrapper pattern than `/blog` and `/lab` (no GradientMesh, no Footer) — worth normalizing when we touch it.

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

### 2026-04-14 — Blog Pipeline Planning
- No code changes — planning only
- Reviewed blog state: `components/Blog.tsx` has 3 hardcoded placeholder posts, no `/blog/[slug]` route, "Read More →" is dead
- Compared options: MDX-in-repo vs headless CMS vs plain Markdown vs Notion-sync
- **Decided: MDX-in-repo** — matches engineer-blogger standard (Robinson, Comeau), version-controlled, portable forever, and spec already pointed here
- Next session will be tutor-style learn-as-we-build walkthrough (switch output style, run `/start`)

### 2026-04-14 — Blog MDX Pipeline Built (tutor-style walkthrough)
- Installed `next-mdx-remote@6` + `gray-matter` + `remark-gfm` + `rehype-pretty-code` + `shiki`. Bumped Next 16.2.1 → 16.2.3 to clear high-severity DoS advisory (no `--force` — explicit `npm install next@16.2.3`)
- Created `content/posts/hello-mdx.mdx` — pipeline-test post exercising frontmatter, GFM list, autolink, code block
- Built `lib/posts.ts` — owns all filesystem access. Two return types: `Post` (no body, for lists) vs `PostWithContent` (for detail). Throws at build time on missing required frontmatter (`title`/`date`/`excerpt`). Drafts filtered only when `NODE_ENV === "production"`. Sort by `date.localeCompare` works because schema enforces YYYY-MM-DD strings
- Refactored `components/Blog.tsx` to be prop-driven; whole card is now `<Link>` to `/blog/[slug]`. Server component `app/page.tsx` calls `getAllPosts().slice(0, 3)` and passes plain JSON over the server/client boundary
- Built `app/blog/[slug]/page.tsx` with `generateStaticParams` (SSG, every post pre-rendered) + `generateMetadata` (per-post `<title>`, description, OG `article:tag`). MDX compiled via `next-mdx-remote/rsc` with `remark-gfm` + `rehype-pretty-code` (Shiki dual-theme: `github-light` + `github-dark`, swapped via CSS vars on `.dark`)
- TS plugin tuple inference required `as Pluggable[]` cast
- Built `app/blog/page.tsx` — full archive, reuses `<Blog>` with all posts (not just slice of 3)
- Hand-rolled `.prose-post` typography in `globals.css` (~150 lines using existing `--t-*` tokens) instead of `@tailwindcss/typography` — plugin defaults would fight the existing token system
- Set `turbopack.root` in `next.config.ts` to silence workspace-lockfile warning (stray `~/package-lock.json` was making Next infer wrong root)
- Production build passes: 13 static pages, `/blog/hello-mdx` pre-rendered. Dev curl to `/blog/hello-mdx` returned HTTP 200 with full MDX render confirmed
- Logged DECISIONS.md entry 012 with schema choices (slug-from-filename, YYYY-MM-DD strings, fail-loud validation) and the typography tradeoff

### 2026-04-14 — Lab Page + Navbar Fix + Polish
- Planned, then built `/lab` — a public "things I want to build" accordion list, data in `lib/lab.ts` (TS const array), status pills (idea → exploring → building → shipped → shelved), native `<details>`/`<summary>` for the accordion (semantic, keyboard-accessible, zero JS state, page stays server component), chevron rotates 90° on `[open]` via CSS. Status colors as CSS tokens in `globals.css` — 5 bg/text pairs for light + 5 for dark.
- Added "View all posts →" link on homepage Blog section → `/blog`. Conditional on `posts.length >= HOMEPAGE_BLOG_PREVIEW_COUNT` (extracted to `lib/blog-config.ts` — not `lib/posts.ts` because importing from a module that uses `node:fs` into a `"use client"` component drags `node:fs` into the client bundle and breaks the build. Type-only imports are safe; runtime imports are not.)
- Fixed Navbar for good. It was hijacking every click with `preventDefault()` + `document.querySelector(href).scrollIntoView()` — worked for hash anchors on the homepage but (a) failed silently when the hash target didn't exist on the current page (e.g., `About` from a blog post), and (b) made route-style hrefs like `/lab` a dead click since `querySelector("/lab")` is an invalid selector. Rewrote to use Next `<Link>` + a `resolveHref` helper that converts `#foo` → `/#foo` when not on home, and a `handleHashScroll` that only intercepts scroll behavior on the homepage. Logo also wrapped in `<Link href="/">`.
- Removed "I ship code and sharpen fundamentals" h2 from `CodingActivity`. Eyebrow label "Activity" kept; spacing adjusted. Flagged: section lost a semantic h2; screen readers will skip it. Fix later if needed.
- Cleaned up lint: split a deliberately-unused destructure in `lib/posts.ts` into an explicit field projection (dropped `_content` unused warning). Added a block-level `eslint-disable react-hooks/set-state-in-effect` around the theme-provider init effect with a comment explaining why — setState-in-effect is intentional because localStorage only exists on the client; blocking `<script>` in `<head>` handles visual flash prevention before hydration.
- Created `LAB.md` + `WRITING.md` authoring guides at project root.
- Logged DECISIONS.md entry 013 (public Lab page, single source of truth, native `<details>`, status tokens, client/server bundle bug).
- Final pass: `tsc --noEmit` clean, `npm run lint` clean, `npm run build` clean (14 routes, `/lab` static, `/blog/hello-mdx` SSG-prerendered).
