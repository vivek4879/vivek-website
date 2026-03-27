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
