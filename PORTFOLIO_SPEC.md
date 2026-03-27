# Vivek's Portfolio Website — Full Project Spec

## Overview

Build a modern, personal portfolio website for Vivek, a full-stack software engineer. The site should feel premium, technical, and distinctive — blending a glass aesthetic with subtle terminal/engineering DNA. It features a human/machine mode toggle, full dark mode support, interactive gradient mesh backgrounds, and a design system that bridges "designer who codes" with "engineer who designs."

---

## Tech Stack (for build)

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (monospace accents)
- **Animations**: Framer Motion (scroll animations, transitions, mode toggles)
- **Deployment**: Vercel

---

## Color Palette — Zinc + Cyan/Violet Dual Accent

### Light Mode
- Background: #FAFAFA
- Card surfaces: #FFFFFF with border #E4E4E7
- Text (headings): #09090B
- Text (body): #52525B
- Text (muted): #71717A
- Cyan accent: #06B6D4 (CTAs, links, interactive elements)
- Cyan light: #CFFAFE (pill backgrounds)
- Cyan deep: #155E75 (pill text)
- Violet accent: #8B5CF6 (identity, branding, section headers)
- Violet light: #EDE9FE (pill backgrounds)
- Violet deep: #5B21B6 (pill text)
- Neutral pills: #F4F4F5 bg, #52525B text
- Borders: #E4E4E7

### Dark Mode
- Background: #09090B
- Card surfaces: #18181B with border #27272A
- Text (headings): #FAFAFA
- Text (body): #A1A1AA
- Text (muted): #71717A
- Cyan accent (brighter): #22D3EE
- Cyan deep (pill bg): #164E63
- Violet accent (brighter): #A78BFA
- Violet deep (pill bg): #2E1065
- Neutral pills: #27272A bg, #A1A1AA text
- Borders: #27272A

### Usage Rules
- **Cyan** = functional/interactive: CTAs, buttons, links, hover states, active indicators
- **Violet** = identity/branding: your name, section labels, featured highlights
- Never use both as equal-weight accents in the same component — one leads, one supports
- Terminal-style cards use cyan for command text, muted zinc for output

---

## Typography System

### Font Pairing
- **Headings**: Space Grotesk, weight 600-700, letter-spacing: -0.02em (tight)
- **Body**: Inter, weight 400, line-height: 1.7
- **Monospace accents**: JetBrains Mono, weight 400-500

### Where Monospace Lives (Devflow-inspired)
- Hero subtitle: `> full-stack engineer` styled as terminal prompt
- Blog post dates: `Mar 2026` in mono
- Section labels / nav items: mono at small size
- Tech stack tags/pills: tech names in mono
- Project card tech badges: inline `code` style
- "Built by Vivek" footer line: mono
- Coding Activity section: fully mono
- Terminal-style cards: all content in mono

### Where Sans-Serif Leads
- Main headings (your name, section titles): Space Grotesk
- Body paragraphs (about me, project descriptions, blog excerpts): Inter
- CTA buttons: Inter medium

---

## Sections (in order)

### 1. Navigation
- Sticky top navbar with smooth-scroll links
- Logo or name on the left (Space Grotesk), nav links on the right (mono, small)
- Hamburger menu on mobile
- Glassmorphism effect on navbar: rgba background + backdrop-blur
- Contains both toggles: sun/moon for light/dark, HUMAN|MACHINE toggle
- On scroll: subtle background opacity increase

### 2. Hero Section
- Full-width intro
- Your name in large Space Grotesk (tight letter-spacing)
- Subtitle in JetBrains Mono styled as terminal: `> full-stack engineer`
- Short punchy tagline in Inter
- CTA button in cyan: "View My Work" or "Get In Touch"
- **Interactive background**: Cursor-following gradient mesh — 2-3 large, soft, blurred blobs (cyan + violet) that follow cursor with different delay speeds. Use CSS filter:blur() on absolutely positioned divs. On mobile: slow CSS keyframe drift animation instead
- **Scroll-driven "open up" animation**: As user scrolls, the hero content expands/scales outward revealing the About section. Use position:sticky + scroll progress tracking via Framer Motion useScroll. Content must exist in DOM from page load for SEO

### 3. About Me
- Two-column layout: photo placeholder left, text right (stacked on mobile)
- Conversational paragraph about Vivek
- Clean, no background effects (content-first)

### 4. Tech Stack & Tools
- Bento-grid layout of technology icons/logos organized by category:
  - Frontend: React, Next.js, TypeScript, Tailwind CSS, HTML/CSS
  - Backend: Node.js, Python, Express, REST APIs, GraphQL
  - Database & Infra: PostgreSQL, MongoDB, Redis, Docker, AWS
  - Tools: Git, VS Code, Figma, Postman
- Clean icon cards with glassmorphism effect (frosted glass)
- Hover effect: scale + soft cyan glow
- Category labels in monospace
- Tech names in monospace pills

### 5. Projects Showcase
- Grid of project cards on white/dark surfaces
- Each card:
  - Project thumbnail/image
  - Project title (Space Grotesk)
  - Short 1-2 line description (Inter)
  - Tech stack tags as mono pills (cyan/violet)
  - Links to live demo and GitHub repo
  - Hover: slight lift + shadow
- 2-3 featured projects expand into case study deep-dives:
  - Problem, approach, architecture decisions, outcomes
  - Expandable via click — mini-article within the site
  - Case studies are SEPARATE from blog (these are about execution, blog is about ideas)

### 6. Blog / Writing
- Clean cards or list of recent blog posts
- Each entry:
  - Post title (Space Grotesk)
  - Date in monospace (`Mar 2026`)
  - Short excerpt, 2 lines max (Inter)
  - "Read More" link in cyan
- Scannable layout — this is thought leadership, not technical case studies

### 7. Coding Activity
- **Terminal-style card container** (three dots header: red, yellow, green)
- Dark surface (#18181B) with mono content inside
- Two widgets side by side (stacked on mobile):
  - GitHub Contribution Graph (styled in cyan tones)
  - LeetCode Solving Grid (styled in violet tones)
- Stats bar above grids: total contributions, problems solved, current streak
- Numbers in large mono, labels in small mono muted
- This section tells: "I ship real code AND I sharpen fundamentals"

### 8. Social Links + Contact (Footer)
- Clean, elegant footer
- Icon links: LinkedIn, GitHub, Twitter/X, email
- "Let's Connect" CTA or simple contact form (name, email, message)
- "Built by Vivek" in monospace with copyright
- **Gradient mesh returns** — intensity ramps back up, cursor-following re-enabled
- Bookends the hero experience

---

## Interactive Background — Gradient Mesh

### Behavior Across Site
- **Hero**: Full intensity, cursor-following, cyan + violet blurred blobs
- **Middle sections**: Very subtle, 10-15% opacity, slow drift animation (NO cursor tracking), barely-there wisps
- **Footer**: Intensity ramps back up, cursor-following returns
- **Machine mode**: All background effects disabled — clean flat surface
- **Mobile**: No cursor tracking anywhere, gentle CSS keyframe drift throughout

### Implementation
- Absolutely positioned divs with border-radius: 50%, CSS filter: blur(80-100px)
- Use requestAnimationFrame + will-change: transform for GPU acceleration
- Multiple blobs with different transition durations for parallax-like layering
- Blobs are purely decorative — all text is real HTML elements with z-index above
- Respect prefers-reduced-motion: disable all movement

---

## Human / Machine Mode Toggle

### Implementation (SEO-safe)
- Toggle in navbar, labeled "HUMAN | MACHINE"
- Works via CSS class on <body> — NOT DOM replacement
- All content stays in the HTML, only visual presentation changes
- Toggle is independent of light/dark mode (4 combinations total)

### Human Mode (default)
- Full glass-themed portfolio with cards, gradients, images, animations

### Machine Mode — Light
- White/light gray background (#FAFAFA)
- All text switches to JetBrains Mono
- Images hidden via CSS (display:none or opacity:0)
- Cards lose backgrounds, borders, shadows — just flat text
- Content rendered as structured plain text (markdown/llms.txt style)
- Sections: text headings with `---` dividers
- Projects: structured entries (name, description, stack, links)
- Tech stack: comma-separated list by category
- Social links: plain URLs
- Gradient mesh: disabled

### Machine Mode — Dark
- Dark background (#09090B)
- Text in green (#4ADE80) or soft cyan (#22D3EE) for terminal aesthetic
- Blinking cursor or subtle scanline effect
- Same structured content as machine-light
- This is the "hacker mode" — maximum contrast from glass UI

### Transition
- Smooth fade/wipe between all modes
- ~300ms transition duration

---

## Dark Mode Support

- Respects system preference (prefers-color-scheme)
- Manual toggle in navbar (sun/moon icon)
- Independent from human/machine toggle
- All glassmorphism adapts: darker glass, adjusted blur, brighter accent colors
- Hero gradient mesh: deeper, richer blobs
- All color values defined in Tailwind config as CSS custom properties

---

## SEO & Web Standards

### Semantic HTML
- Proper elements: <header>, <nav>, <main>, <section>, <article>, <footer>
- Each section has unique id for anchor linking (#about, #projects, #blog)
- Single <h1> for name/title in hero; sections use <h2>, sub-items <h3>
- Blog cards use <article>, project cards use <article> or <section>
- Lists use <ul>/<li>, not styled divs

### Meta Tags & Open Graph
- Descriptive <title>: "Vivek | Full-Stack Engineer — Portfolio"
- Meta description
- Open Graph: og:title, og:description, og:image, og:url
- Twitter Card: twitter:card, twitter:title, twitter:description, twitter:image
- Canonical URL
- Viewport meta, charset UTF-8
- Favicon + Apple touch icon

### Performance
- Lazy-load images below fold: loading="lazy"
- Modern image formats (WebP) with <picture> fallbacks
- Defer non-critical JS, inline critical CSS
- Gradient mesh uses requestAnimationFrame + will-change
- LCP: hero text renders immediately, doesn't wait for gradient animation
- Font loading: use font-display: swap on all @font-face to prevent FOIT (flash of invisible text)
- Preload critical fonts: <link rel="preload" as="font" href="..." crossorigin> for Space Grotesk and Inter
- Use Next.js <Image> component (not raw <img>) for automatic optimization, sizing, and format selection
- Set explicit width/height on all images to prevent CLS (Cumulative Layout Shift)
- Dynamic imports: lazy-load GradientMesh component and Framer Motion with next/dynamic to reduce initial bundle
- Error boundary: wrap gradient mesh and animation components in React error boundaries with graceful fallbacks (static gradient if JS fails)

### Accessibility (a11y)
- All images: descriptive alt text (or alt="" + aria-hidden if decorative)
- WCAG AA contrast ratios (4.5:1 body, 3:1 large) in BOTH light and dark modes, across all 4 mode combinations
- Gradient mesh is decorative — text readable without it
- All buttons/toggles: keyboard-navigable + visible focus states
- Toggles are proper <button> elements with aria-label
- prefers-reduced-motion: disable scroll animations + gradient movement
- Skip-to-content link for screen readers
- ARIA live regions: announce mode changes ("Switched to machine mode") for screen readers via aria-live="polite"
- Focus trapping on mobile hamburger menu — Tab should cycle within the open menu, Escape closes it
- Color-blind safety: cyan/violet accent colors are never the ONLY differentiator — always pair with shape, text, or position cues
- prefers-contrast: more — increase border weights, remove glassmorphism blur, use solid backgrounds for high-contrast mode
- Touch targets: all interactive elements (buttons, links, toggle switches) must be minimum 44x44px on mobile

### Structured Data (JSON-LD)
- Person schema: name, jobTitle, url, sameAs (social profiles)
- WebSite schema
- BlogPosting schema for blog posts
- CreativeWork schema for projects

### Technical SEO
- Clean URLs (e.g., /blog/post-title)
- All content in default HTML, not JS-injected
- robots.txt allowing crawling
- sitemap.xml if multiple pages
- llms.txt file at root (machine mode content as actual file for AI agents)
- Custom 404 page — styled to match the portfolio design, with navigation back to home
- Use Next.js generateMetadata() for dynamic OG tags per blog post (when blog becomes separate pages)

---

## Mobile & Responsive Design

### Breakpoints (Tailwind defaults)
- sm: 640px (large phones landscape)
- md: 768px (tablets)
- lg: 1024px (small laptops)
- xl: 1280px (desktops)
- 2xl: 1536px (large screens)

### Mobile-Specific Rules
- Prevent horizontal scroll: overflow-x: hidden on html/body
- Safe area insets: use env(safe-area-inset-*) for padding on notched phones (iPhone, etc.)
- Hero heading: scale down from ~4rem (desktop) to ~2rem (mobile) using clamp() or responsive Tailwind classes
- Project cards grid: 1 column on mobile, 2 on tablet (md), 3 on desktop (lg)
- Tech stack bento grid: 2 columns on mobile, 4 on desktop
- Coding Activity: GitHub + LeetCode grids stack vertically on mobile
- About Me: two-column → single column stack on mobile
- Hero scroll animation: simplified or disabled on mobile — use a static layout with gentle fade-in instead of sticky scroll reveal (sticky scroll can feel janky on mobile browsers)
- Contact form: full-width inputs on mobile with adequate spacing
- Navbar: glassmorphism navbar collapses to hamburger below md breakpoint
- All tap targets: minimum 44x44px touch area (padding counts)
- Font sizes: body text minimum 16px on mobile (prevents iOS zoom on focus)

---

## Cross-Browser & Progressive Enhancement

### Glassmorphism Fallbacks
- backdrop-filter needs -webkit-backdrop-filter prefix for Safari
- Fallback for older browsers: if backdrop-filter is unsupported, use solid semi-transparent background (no blur) via @supports query
  ```css
  @supports not (backdrop-filter: blur(12px)) {
    .glass-card { background: rgba(255,255,255,0.95); }
  }
  ```

### Browser Considerations
- Test in Chrome, Firefox, Safari, Edge
- Safari: backdrop-filter prefix, check gradient mesh animation performance
- Firefox: verify CSS filter: blur rendering on gradient mesh blobs
- Print stylesheet: @media print — hide gradient mesh, nav, footer gradient, mode toggles; show clean content-only version; force light mode colors

---

## State & UX

### Theme Persistence
- Save light/dark mode preference in localStorage
- Save human/machine mode preference in localStorage
- On page load: check localStorage first, then system preference (prefers-color-scheme), then default to light + human
- Dark mode flash prevention: inject a blocking <script> in <head> (before body renders) that reads localStorage and sets the theme class on <html> immediately — prevents white flash for dark mode users

### Navigation UX
- Active section highlighting: as user scrolls, the corresponding nav link gets an active state (cyan underline or highlight) using Intersection Observer
- Click logo/name in navbar → smooth scroll back to top
- Smooth scroll behavior on all anchor links (scroll-behavior: smooth or Framer Motion scrollIntoView)

### Loading & Skeleton States
- While images lazy-load, show a subtle pulse/shimmer skeleton placeholder matching the card dimensions
- Gradient mesh should fade in on mount (opacity 0 → 1 over 500ms) to prevent pop-in

---

## Security

### Headers (via next.config.ts or Vercel config)
- Content-Security-Policy: restrict script-src, style-src to self and trusted CDNs
- X-Frame-Options: DENY (prevent embedding in iframes)
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: restrict camera, microphone, geolocation access
- HTTPS: enforced by Vercel by default

### Contact Form
- Spam protection: honeypot hidden field (invisible to users, bots fill it → reject)
- Rate limiting: prevent form submission abuse (can use Vercel Edge Functions or a service like Resend)
- Form validation: client-side (required fields, email format) + server-side
- Consider using a service like Formspree, Resend, or a simple API route for email delivery

---

## Analytics & Monitoring

- Vercel Analytics (built-in) or Plausible (privacy-friendly) for page views and visitor data
- Vercel Speed Insights for Core Web Vitals (LCP, FID, CLS) monitoring
- Console error tracking: consider Sentry for production error monitoring (optional but recommended)

---

## PWA (Optional Enhancement)

- Web app manifest (manifest.json) with site name, icons, theme color
- Allows "Add to Home Screen" on mobile
- Theme color meta tag: <meta name="theme-color" content="#09090B" media="(prefers-color-scheme: dark)"> and light variant
- Not a full PWA (no service worker needed for a portfolio), but the manifest and theme-color give a polished native feel

---

## File Structure Suggestion

```
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata, theme provider
│   ├── page.tsx            # Main portfolio page
│   ├── globals.css         # Tailwind + custom properties + mode transitions
│   └── blog/
│       └── [slug]/page.tsx # Individual blog posts (if needed later)
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── GradientMesh.tsx    # Reusable gradient mesh background
│   ├── AboutMe.tsx
│   ├── TechStack.tsx
│   ├── Projects.tsx
│   ├── CaseStudy.tsx
│   ├── Blog.tsx
│   ├── CodingActivity.tsx  # Terminal-style card with GitHub + LeetCode
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx     # Light/dark toggle
│   ├── ModeToggle.tsx      # Human/machine toggle
│   └── TerminalCard.tsx    # Reusable terminal-style card component
├── lib/
│   ├── theme-provider.tsx
│   └── constants.ts        # Color tokens, social links, project data
├── public/
│   ├── llms.txt
│   ├── robots.txt
│   └── images/
├── tailwind.config.ts
└── next.config.ts
```

---

## Design Principles Summary

1. **Glass leads, terminal supports** — the site is a premium product that happens to be built by an engineer, not a terminal dressed up
2. **Cyan = functional, violet = identity** — never use both at equal weight in the same component
3. **Monospace is seasoning, not the dish** — dates, labels, tags, code references; never body text
4. **Background breathes, content leads** — subtle atmosphere in middle sections, intense at hero/footer
5. **Four modes, one site** — light human, dark human, light machine, dark machine all feel intentional
6. **Every detail should feel authored** — the kind of site where another developer inspects the source
