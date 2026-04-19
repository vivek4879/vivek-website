# CLAUDE.md

Vivek's personal site — **minimalist notebook** pattern (emilkowal.ski-style). Homepage is a calm text-forward hub; `/blog`, `/lab`, `/lab/[id]`, `/blog/[slug]`, `/projects` are the rooms. See `DECISIONS.md` (014) for the pivot rationale.

Architectural spec note: `PORTFOLIO_SPEC.md` predates the notebook pivot and is out of date — trust `DECISIONS.md` entries 012–014 and this file for current direction.

## Quick Reference

- **Stack**: Next.js 16.2.3 (App Router) + React 19 + Tailwind 4 + MDX (no framer-motion, no resend)
- **Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (mono accents)
- **Palette**: `--t-*` tokens, light + dark only. Cyan used sparingly for link hover.
- **Design principle**: boring chrome, rich rooms. Per-route escalation — `/lab` entries can go wild; the core stays calm.

## Commands
- `npm run dev` — local dev (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint

## Important Constraints (still load-bearing)

- Semantic HTML for crawlers (no DOM replacement for mode swaps, etc.)
- Respect `prefers-reduced-motion` and `prefers-contrast: more`
- WCAG AA contrast in both themes
- Mobile: 44×44 min touch targets, 16px min body text, no horizontal overflow
- Dark-mode flash prevention: blocking script in `<head>` reads `localStorage.theme` before paint
- `font-display: swap`, preload critical fonts
- Next.js `<Image>` only, never raw `<img>`
- Security headers in `next.config.ts`: CSP, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy. CSP is gated on `NODE_ENV` so dev allows `'unsafe-eval'` + `ws:` for React Fast Refresh; prod stays strict.
- `lib/lab.ts` + `lib/posts.ts` use `node:fs` — only server components may runtime-import them. Client code uses `import type` only (see `lib/blog-config.ts` for the split pattern when a runtime value is needed in client code).

## Architecture

- **Homepage (`app/page.tsx`)**: `max-w-2xl` column. ThemeToggle (top-right) → Header → Today → ProjectsPreview (3) → Blog (3) → LabPreview (3) → Footer. No Navbar.
- **Sub-pages (`/blog`, `/lab`, `/projects`, `/blog/[slug]`, `/lab/[id]`)**: minimal `Navbar` (name + 3 links + theme toggle) + page content (`max-w-2xl`) + `Footer`.
- **Content pipelines**:
  - Blog: `content/posts/*.mdx` → `lib/posts.ts` → `/blog` + `/blog/[slug]` (SSG).
  - Lab: index in `lib/lab.ts` (TS array, source of truth for metadata). Optional long-form at `content/lab/<id>.mdx` — filesystem-detected via `getLabDetailSlugs()`. `/lab/[id]` SSG for any item with a matching MDX file. Accordion on `/lab` shows a "Read full entry →" link for those items.
- **MDX rendering**: `next-mdx-remote/rsc` + `remark-gfm` + `rehype-pretty-code` (Shiki dual-theme). Shared by blog posts and lab detail pages. Typography via `.prose-post` in `globals.css`.
- **Components**: `Header`, `Today` (editable copy inside), `ProjectsPreview`, `Blog`, `LabPreview`, `Navbar`, `ThemeToggle`, `Footer`, `ObfuscatedEmail`, `LabList`, `StatusBadge`.
- **Theme provider**: 2 modes only (light/dark). `useTheme()` returns `{ theme, toggleTheme }`. State lives in React Context + localStorage; blocking head script handles first paint.
- **Sitemap** (`app/sitemap.ts`): static routes + dynamic blog posts + dynamic lab detail pages.

## Branches

- **`main`**: production. Serves the notebook site as of `fe83b66` (PR #8 merged 2026-04-19). Vercel auto-deploys from here.
- **Workflow**: trunk-based. Cut a short-lived feature branch off `main` (`feat/<thing>` or `fix/<thing>`), push, open a PR, merge, delete the branch. Do not let feature branches drift for weeks.
- **Tags preserving old states** (don't delete):
  - `v1-maximalist` → `9808ff6` — the gradient-mesh / Human-Machine version that was production until 2026-04-19. Checkout to revisit.
  - `v0-under-construction` → `768136a` — the original placeholder.

## Session Log

### 2026-03-26 — Project Init + Design System
- Scaffolded Next.js + Tailwind + Framer Motion. Deployed under-construction to main. Set up dev branch workflow.

### 2026-03-27 — Hero + About + Architecture Decisions
- Design system foundation (tokens, theme provider, flash prevention). Built Navbar/GradientMesh/Hero/AboutMe. Started `DECISIONS.md`.

### 2026-04-14 — Blog MDX Pipeline
- Built the pipeline: `content/posts/*.mdx`, `lib/posts.ts`, `/blog/[slug]`, dual-theme Shiki, hand-rolled `.prose-post`. Logged DECISIONS 012.

### 2026-04-14 — Lab Page + Navbar Fix + Polish
- Public `/lab` accordion (TS const array, native `<details>`, status tokens). Navbar hash/route fix. Logged DECISIONS 013.

### 2026-04-17 — Notebook Pivot (full rewrite)
**Decision:** drop the maximalist portfolio (gradient mesh + terminal cards + Human/Machine toggle + scroll animations). Adopt emilkowal.ski-style minimal hub with rich per-route experimental zones. Framing: "a notebook — projects, writing, experiments," not a portfolio. Logged DECISIONS 014 before any code churn.

**Shipped on `refactor/notebook-pivot`:**
- Removed Human/Machine mode system-wide (theme-provider, CSS tokens, blocking script, all component machine branches). Theme system is now light/dark only.
- Removed GradientMesh from all pages. Deleted the component. Pages render on a plain token background.
- Rewrote homepage: Header + Today + ProjectsPreview + Blog + LabPreview + Footer, single `max-w-2xl` column. ThemeToggle stays (extracted from Navbar) top-right.
- Rewrote Navbar as a minimal server component: name-home-link + `writing / lab / projects` + ThemeToggle. No hamburger, no sticky glass, no focus trap. Removed entirely from homepage.
- Rewrote `/projects` as a flat text-first list. Dropped card gradients.
- Rewrote `/blog` and `/lab` for consistent `max-w-2xl` layout, plain h1 + subtitle, no cyan eyebrows.
- Redesigned Blog component to minimal title/date rows. Added `showArchive` + `showLabel` props so `/blog` archive doesn't self-link or double-heading.
- Killed contact form + Resend plumbing. Footer is now obfuscated email (client-assembled after hydration) + GitHub/LinkedIn/LeetCode links.
- Deleted orphaned components (Hero, AboutMe, TechStack, CodingActivity, Projects-scroll), API routes (`/api/contact`, `/api/github`, `/api/leetcode`), `hello-mdx.mdx` pipeline-test post, `CARD_GRADIENTS` export.
- `npm uninstall framer-motion resend` (10 packages). `npm audit` clean.
- Added sitemap dynamic entries for blog posts and lab detail pages (closes old SEO gap).
- Dev-mode CSP loosening: `'unsafe-eval'` + `ws:` gated on `NODE_ENV === "development"`. Production CSP unchanged.
- Queued `/lab` ideas: Human/Machine toggle as standalone case study, pretext typography experiment.
- **Built lab deep-dive pipeline**: `/lab/[id]` dynamic route mirroring the blog MDX pipeline. Long-form entries live at `content/lab/<id>.mdx`; filesystem auto-detects them and lights up the accordion's "Read full entry →" link. First detail page shipped: `session-token-economics` — the full write-up on measuring Claude Code session cost/quality tradeoffs.
- Net diff across the pivot: **≈ −2,000 lines**. 12 commits, all on `refactor/notebook-pivot`, pushed to origin. Build + tsc + lint clean at `5162b1c`.

**Cleanup during the pivot (non-code):**
- Deleted stray `~/package.json`, `~/package-lock.json`, and `~/node_modules` (~821 MB) that were confusing Turbopack's workspace detection. Turbopack dev now resolves tailwindcss correctly.
- Rotate-candidates (visible in tool output this session): `RESEND_API_KEY` and `GITHUB_TOKEN` from `.env.local`. Still gitignored, but consider rotating if treating this conversation as sensitive.

**Visual QA completed on dev:** homepage composition, `/blog` layout, `/lab` heading, theme toggle on every page, `/lab/session-token-economics` detail page.

### 2026-04-19 — Pretext direction locked + second lab entry shipped

**Pretext typography experiment — direction settled.** Vivek surfaced two poems he lives by: Kipling's *If—* and Emerson's *What is Success?*, and wanted them woven into the site without it feeling like a loud manifesto. Long ideation session covered marginalia, Talmudic layout, daily-verse epigraphs, tap-essay (Robin Sloan *Fish*-style), console easter eggs, `/why` as a first-class room, and more. Realised mid-session that "pretext" in the queued lab idea *is* **chenglou/pretext** — Cheng Lou's 15KB DOM-free text-layout library released March 2026 that reflows text around moving physics shapes at 60fps. That unlocks the real experiment.

**Locked direction for `/lab/credo`:**
- **MVP — "Keep your head" (Kipling stanza 1).** Calmly rendered poem at centre; chaotic scraps of text (notifications, noise, headlines) fly around as physics objects; host poem gently reflows around them without losing composure. Stoicism made typographic. One-shot, unforgettable, small scope.
- **V2 — "The two poems meeting."** Both poems on the page; fragments of each drift across the other's column; resonant lines ("Triumph and Disaster" ↔ "betrayal of false friends") briefly magnetise and glow when they pass. Richer, re-readable. Higher build cost — deferred until library's rough edges are known.
- **Optional polish (after destination exists):** quiet italic epigraph above `Today` on the homepage, deterministically seeded by date. Click-through to `/lab/credo`.
- **Known unknowns:** `chenglou/pretext` is ~3 weeks old, so expect API churn / rough edges. Must respect `prefers-reduced-motion` — physics animations need a calm static fallback.

**Also shipped this session:**
- New `/lab/output-style-vs-skills` entry + MDX write-up. Compares Claude Code output styles (system-prompt-layered, session-start-only) vs skills (injected mid-session as user messages) using Vivek's own custom `pair-programming` output style and `/pair-on` / `/pair-off` skills as the case study. Clarifies the caching picture (mid-session skill injection is *not* a cache break — one-time miss on ~200 new tokens, then cached). Real cost lives in output tokens, not input. Status: exploring; experiment plan included in the MDX for measuring token deltas across two ergonomic patterns. Committed as `2e1f3cf`, **not pushed**.

**Uncommitted work on disk:**
- `components/ObfuscatedEmail.tsx` — contact email changed from `vivek4879@gmail.com` → `vmaher2325@gmail.com`. Verified no other contact-email occurrences; all remaining `vivek4879` strings are the GitHub handle.

### 2026-04-19 (later) — Pretext architecture investigated; commits cleaned up

**Housekeeping shipped:**
- Committed `components/ObfuscatedEmail.tsx` email change (`8c5352b`).
- Committed prior session's CLAUDE.md log (`9bf3d57`).
- Branch is now 3 commits ahead of origin, working tree clean. **Not pushed yet.**

**Long teaching detour on MDX** — what an AST is, mdast vs hast vs mdxast, remark/rehype as tree→tree transforms, MDX as compiler-vs-format-vs-ecosystem, why we pay for MDX (optionality) over plain Markdown despite not using JSX-in-MDX yet. Useful general grounding; no code touched.

**CRITICAL FINDING — pretext is NOT what the prior session log implied.** Read the actual `chenglou/pretext` README via `gh repo view`. It is **a text measurement and layout primitive**, not a physics framework. It does not animate, does not move shapes, does not "reflow text around moving physics shapes" by itself. What it does:
- `prepare()` + `layout()` — measures total height of a paragraph at a given width, *without* triggering DOM reflow (uses canvas font metrics for measurement).
- `prepareWithSegments()` + `layoutNextLineRange()` — iterator API: "give me the next line that fits in width W starting at cursor C." Width can change between calls. The README's headline example is exactly the floated-image-text-wrap pattern we want, applied to a static image.

**What this means for `/lab/credo` architecture (load this with /start next session):**

The MVP requires assembling **three layers**, not "install a library and configure it":

| Layer | Job | Choice |
|---|---|---|
| **Layout** | Where lines break each frame | `chenglou/pretext` (decided) |
| **Physics** | Move the chaotic scraps | Hand-rolled ~50 lines (decided — see below) |
| **Render** | Draw text + scraps every frame | `<canvas>` + `requestAnimationFrame` |

Per-frame loop: physics tick → scraps have new `{x, y, w, h}` → for each y-band of the poem column, compute available width(s) given which scraps occupy that y → call `layoutNextLineRange` for each line → `ctx.fillText` line + draw scraps.

**Physics layer decision:** hand-roll, don't pull Matter.js. Each scrap is `{x, y, vx, vy, angle, omega}`, update each frame, wrap at edges. No collisions needed (scraps can overlap each other freely; they only "exist" as obstacles to the poem's layout pass). Roughly 50 lines. Saves ~80kb dependency. Add Matter.js later only if V2 ("two poems meeting") demands true rigid-body interaction.

**Architectural framing — also decided:** `/lab/credo` will **not** use the MDX detail-page pipeline. It's an experiment that's 100% interactivity with no surrounding prose — MDX's prose-default is overhead. New custom route at `app/lab/credo/page.tsx` with a client component for the canvas. Bypasses `/lab/[id]`. Update `lib/lab.ts` to point its accordion link to `/lab/credo` instead of the detail-page pattern.

**Why pretext is the right primitive (not a framework):** "DOM-free" is the *load-bearing* property. Touching DOM for measurement 60×/second destroys frame budget. Pretext sidesteps that by computing layout in pure JS using canvas font metrics. Whole experiment is feasible *because* the library is this narrow.

**Next session (planned in pair-programming output style):**
1. **Step 1 — route shell + static Kipling render.** Create `app/lab/credo/page.tsx` (server) + `components/Credo.tsx` (client). Get Kipling stanza 1 rendering cleanly on canvas via `prepare` + `layoutWithLines` at a fixed width. No physics, no animation. Validate font metrics match the rest of the site (probably Space Grotesk or Inter — pick during the spike).
2. **Step 2 — one drifting scrap + reflow.** Add a single rectangular obstacle that moves across the canvas. Per frame, recompute the poem layout using `layoutNextLineRange` with width narrowed for y-bands the scrap occupies. Validate the *feeling*: does the poem reflow gracefully or does it jitter?
3. **Step 3 — multiple scraps + the "noise" content.** Once one scrap reflows cleanly, add 5–10 with varied content (notification text, headlines, alerts). Tune motion to feel chaotic-but-not-frantic.
4. **Step 4 — `prefers-reduced-motion` fallback.** Static layout: poem rendered cleanly, scraps frozen in arranged positions. Required by site-wide accessibility constraint.
5. **Step 5 — wire `lib/lab.ts`** so the `credo` accordion item links to `/lab/credo`.

After MVP lands: evaluate V2 ("two poems meeting") feasibility given what was learned about pretext's rough edges.

### Next Steps (deferred / longer-horizon)
1. **Open PR + merge decision** — once `refactor/notebook-pivot` feels finished, decide: merge to `main` directly (replace under-construction), or set up a new `dev` branch for preview deploys.
2. **Populate content.** Writing has 1 real post (`hackathon-win-with-claude-code`); Lab now has 8 items, 2 with detail pages. Writing remains the thinnest section — next post bumps it from sparse-reads-as-empty to sparse-reads-as-disciplined.
3. **Deep-dive pages for other queued lab items** — Human/Machine case study, plus any others that emerge. Pipeline is built.
4. **Token-economics Stop hook** — implement the observational measurement plan in `content/lab/session-token-economics.mdx`. Verify which observables `Stop` hook actually receives in current Claude Code first.
5. **Output-style-vs-skills experiment** — run the measurement plan from `content/lab/output-style-vs-skills.mdx` once the ergonomic answer needs numbers.
6. **Revisit accent palette** — cyan is a carryover from the maximalist era. Consider quieter accent or monochrome-with-one-pop.
7. **AI chat widget** (Claude Haiku, bottom-right). Still on the long-term list.

### Known stale
- `PORTFOLIO_SPEC.md`: written for the maximalist vision. Keep around for history; don't trust it for current state.
- `LAB.md`, `WRITING.md`: authoring guides; may need light updates now that lab has detail pages too.
- Old `fix/gradient-mesh-mode-toggle` branch exists on origin. Can be deleted after the pivot PR merges.
