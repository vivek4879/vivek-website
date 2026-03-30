# Technical Decisions Log

Documenting the why behind every significant decision in this project.

---

## 001 — Tech Stack: Next.js + Tailwind + Framer Motion

**Problem:** Choosing the right stack for a portfolio site that needs SSR for SEO, complex animations, and a 4-mode theming system.

**Options considered:**
1. **Next.js + Tailwind + Framer Motion** — full-featured, battle-tested, large ecosystem
2. **Astro + Tailwind** — lighter, built for static content sites, but weaker animation story
3. **Plain React + Vite** — lighter, but no SSR out of the box, would need extra setup for SEO

**Choice:** Option 1

**Reasoning:** The site needs SSR for SEO (crawlers need real HTML), `generateMetadata()` for dynamic OG tags on blog posts, API routes for the contact form, and the `<Image>` component for optimization. Framer Motion's `useScroll` is specifically needed for the hero scroll animation, and `AnimatePresence` for mode transitions. The bundle size cost of Framer Motion (~30-40KB) is mitigated by lazy loading it with `next/dynamic`.

---

## 002 — Added tailwind-merge

**Problem:** With 4 mode combinations (light/dark × human/machine), components will have conditional class names that can conflict (e.g., `bg-white` and `bg-zinc-900` both present).

**Options considered:**
1. **tailwind-merge (~1KB)** — intelligently resolves Tailwind class conflicts at runtime
2. **clsx/classnames alone** — concatenates classes but doesn't resolve conflicts
3. **Manual management** — carefully structure conditionals to avoid conflicts

**Choice:** Option 1

**Reasoning:** With 4 modes, the class conflict problem is guaranteed to surface. tailwind-merge is tiny and prevents subtle bugs where the wrong class wins due to CSS source order. It's a small insurance policy against a class of bugs that are hard to debug.

---

## 003 — CSS Blobs over WebGL Shader Gradient

**Problem:** Choosing the gradient mesh background implementation — CSS blurred divs vs. a WebGL shader gradient (like the `shadergradient` package).

**Options considered:**
1. **CSS blobs** — absolutely positioned divs with `filter: blur()`, animated with CSS keyframes
2. **WebGL shader gradient** — Three.js + React Three Fiber, renders on a canvas element

**Choice:** Option 1

**Reasoning:**
- **Bundle size:** CSS blobs cost 0KB. Shader gradient pulls in Three.js (~150-200KB).
- **Mobile performance:** WebGL is heavy on mobile — battery drain, possible jank on older devices. CSS blur is GPU-accelerated and lightweight.
- **Accessibility:** CSS blobs are trivial to disable with `prefers-reduced-motion`. WebGL requires more code to manage.
- **Spec alignment:** The spec explicitly calls for "absolutely positioned divs with CSS filter: blur."
- **Design language:** Glass aesthetic + CSS blobs = frosted glass. Shader gradient is a different vibe (more "creative agency").
- **Upgrade path:** We can swap in a shader gradient later for just the hero section as a drop-in upgrade once everything else is solid.

---

## 004 — CSS Custom Properties over Tailwind Variants for Theming

**Problem:** How to implement 4-mode theming (light/dark × human/machine) so components don't need to know which mode is active.

**Options considered:**
1. **CSS custom properties with class selectors** — define semantic tokens (e.g., `--color-surface`), swap values based on `.dark` / `.machine` classes on `<html>`
2. **Tailwind variants (`dark:`, custom `machine:`)** — each component specifies all 4 values explicitly (e.g., `bg-white dark:bg-zinc-900 machine:bg-white machine:dark:bg-zinc-950`)

**Choice:** Option 1

**Reasoning:**
- **Component cleanliness:** Components write `bg-surface` once vs. 4 classes per property. With dozens of elements per component, Option 2 becomes unreadable.
- **Maintainability:** Adding or changing a mode means editing one CSS block, not every component in the codebase.
- **Performance:** CSS variable swaps trigger a browser repaint — no React re-render. The browser handles the transition natively.
- **Pattern:** This is the Observer pattern — components subscribe to a value (via CSS variables), the source (class on `<html>`) changes, all subscribers update automatically. No coupling between the toggle logic and the components.
- **Spec alignment:** The spec calls for "CSS custom properties."

---

## 005 — Develop on `dev` Branch, Deploy `main` to Production

**Problem:** Vercel auto-deploys every git push. Need to prevent unfinished work from going to the production URL.

**Options considered:**
1. **Single `main` branch** — every push goes live
2. **`dev` branch for development, `main` for production** — pushes to `dev` create Vercel preview deployments, merges to `main` deploy to production

**Choice:** Option 2

**Reasoning:** The production URL is being submitted for a job application. It needs to stay stable. Working on `dev` gives preview URLs for checking work in progress, while production only updates on explicit merges. Vercel's free tier supports unlimited preview deployments so there's no cost.

---

## 006 — `next/font/google` over Local Font Files

**Problem:** Loading 3 custom fonts (Space Grotesk, Inter, JetBrains Mono) without layout shift or external runtime requests.

**Options considered:**
1. **`next/font/google`** — fetches from Google Fonts at build time, self-hosts automatically
2. **`next/font/local`** — download `.woff2` files manually, place in `/public/fonts/`

**Choice:** Option 1

**Reasoning:** All 3 fonts are on Google Fonts. `next/font/google` downloads them at build time and self-hosts — so you get the convenience of Google Fonts with the performance of local files. No runtime requests to Google, no FOIT (flash of invisible text) thanks to `font-display: swap`. The only reason to go local is for fonts not on Google Fonts or licensing concerns — neither applies here.

---

## 007 — Machine Mode as Full Text-File Transformation

**Problem:** Deciding how dramatic the human/machine mode toggle should be. The original spec described machine mode as a lighter change (swap fonts, hide glass effects). But that felt too subtle — the toggle didn't feel meaningful.

**Options considered:**
1. **Subtle swap** — change fonts to monospace, remove glassmorphism, keep layout intact
2. **Full text-file transformation** — collapse to single column, strip ALL visual elements, render like a `.txt` file (light) or terminal output (dark)

**Choice:** Option 2

**Reasoning:**
- The toggle should feel like a completely different experience — subtle font swaps don't justify a prominent toggle in the navbar.
- Full transformation creates a dramatic before/after that showcases CSS-only visual switching (impressive to technical reviewers).
- Light machine = plain text document. Dark machine = terminal with cyan text and blinking cursor. Both are visually distinct from human mode.
- Implementation is pure CSS (`.machine` class rules) — no DOM duplication, same HTML, fully SEO-safe.
- Also serves a real purpose: machine mode content mirrors what goes into `llms.txt`, so there's conceptual consistency between the visual toggle and the actual machine-readable file.

---

## 008 — Machine Mode via Component-Level Rendering, Not CSS Overrides

**Problem:** Pure CSS overrides for machine mode (`.machine [class*="flex"] { display: block !important }`) were too fragile — fighting Tailwind utility classes and Framer Motion inline styles caused overlapping content and broken layouts.

**Options considered:**
1. **CSS overrides** — global `.machine` rules in `globals.css` to strip visual elements
2. **Component-level rendering** — each component checks `mode === "machine"` via `useTheme()` and renders a plain-text version

**Choice:** Option 2

**Reasoning:**
- CSS overrides couldn't reliably flatten complex layouts (flex inside flex, Framer Motion inline transforms)
- Every new component would need more CSS overrides — unmaintainable whack-a-mole
- Component-level rendering is explicit: each component owns its machine-mode presentation
- Same text content stays in the DOM (SEO-safe), just different JSX structure
- Machine mode looks genuinely like a `.txt` file now, not a broken version of human mode

---

## 009 — CSS Gradient Blobs over WebGL Shader Package

**Problem:** User found a v0 project using the `shaders` npm package (WebGL/Three.js) for fluid gradient backgrounds. Considered swapping our CSS blobs.

**Options considered:**
1. **CSS blobs** — absolutely positioned divs with `filter: blur()`, cursor-following via rAF
2. **`shaders` npm package** — WebGL renderer built on Three.js

**Choice:** Option 1 (improved)

**Reasoning:**
- `shaders` package depends on Three.js (~150-200KB gzipped). For a portfolio site targeting good Core Web Vitals, too heavy.
- WebGL drains battery on mobile, can jank on mid-range phones. Our spec explicitly says lightweight mobile.
- If WebGL fails (old device, privacy browser, corporate lockdown), you get nothing — needs a CSS fallback anyway, meaning two systems to maintain.
- Improved CSS version instead: 7 blobs in 3 layers, config-driven, constellation-based cursor tracking, 8% grain overlay with mix-blend-mode overlay (matching the v0 project's grain technique).
- Upgrade path remains: can swap in shader for desktop-only hero later as a progressive enhancement.

---

## 010 — Scroll-Driven Card Animation for Projects Section

**Problem:** Choosing how to present the Projects section. Standard grid vs. scroll-driven animation inspired by a v0 doomscrolling prototype.

**Options considered:**
1. **Static grid** — standard card grid, hover effects, straightforward
2. **Scroll-driven animation** — cards animate through phases (appear → descend → explode → settle into row) driven by scroll progress

**Choice:** Option 2 (adapted)

**Reasoning:**
- The animation creates a memorable, portfolio-differentiating experience
- Adapted from 800vh to ~400-500vh to not dominate page scroll length
- Limited to 6 featured projects in the animation; additional projects live at `/projects` page
- Fixed positions (no `Math.random()`) to avoid React hydration mismatch
- No doomscroll loop at the end — cards settle into row and user scrolls past
- Mobile: simplified version with fewer cards and shorter scroll height
- Built last after all other sections are in place

---

## 011 — AI Chat Widget via Claude API

**Problem:** Want visitors to be able to ask questions about Vivek conversationally, rather than just reading static text.

**Options considered:**
1. **Claude API (Anthropic SDK)** — system prompt with personal info, Next.js API route, Claude Haiku for cost efficiency
2. **Pre-built widget (Chatbase, Mendable)** — upload docs, get embeddable chatbot
3. **Local/lightweight RAG** — pre-indexed Q&A, only hit API for unusual questions

**Choice:** Option 1

**Reasoning:**
- Full control over personality, knowledge, and response style via system prompt
- Next.js API routes handle the backend as a serverless function on Vercel — no separate server needed
- Claude Haiku is fractions of a cent per message — portfolio traffic = cents/month
- Rate limiting + daily message cap controls costs
- Demonstrates real AI integration (not just embedding a third-party widget)
- Directly relevant to the HummingAgent internship application ("we build with AI")
- No third-party branding, watermarks, or vendor dependency
- Frontend: floating chat button bottom-right, opens a chat panel. API integration done last.
