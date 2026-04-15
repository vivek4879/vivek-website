# How to Add a Blog Post

Three steps. The whole pipeline is file-based — no CMS, no admin UI.

---

## 1. Create the file

Path: `content/posts/<slug>.mdx`

The filename **becomes the URL**. So `content/posts/why-i-left-leetcode.mdx` lives at `/blog/why-i-left-leetcode`.

**Filename rules:**
- Lowercase
- Hyphens, not underscores or spaces (URLs prefer hyphens for SEO)
- Ends in `.mdx`

---

## 2. Write the frontmatter + body

The first lines must be a YAML block delimited by `---`. Then your Markdown.

````mdx
---
title: "Why I Left LeetCode"
date: "2026-04-15"
excerpt: "One sentence that shows on the blog card and as the meta description."
tags: ["learning", "career"]
draft: false
---

Your post starts here. Plain Markdown works:

## A heading

A paragraph with **bold**, *italic*, an [inline link](https://example.com),
and `inline code`.

- Bullet list
- Another bullet

```ts
// Fenced code blocks get syntax highlighting (Shiki, dual-theme)
const answer: number = 42;
```
````

### Frontmatter fields

| Field     | Required | Type                       | Notes                                                                                       |
| --------- | -------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| `title`   | yes      | string                     | Shows in the card, the `<h1>`, and the browser tab.                                         |
| `date`    | yes      | string `YYYY-MM-DD`        | **Must** be quoted. Not `2026/4/15`, not a bare YAML date. Sort + `<time>` tag depend on this format. |
| `excerpt` | yes      | string                     | Used on the blog card and as `<meta name="description">` for SEO.                            |
| `tags`    | no       | string array               | Shows below the post title. Omit for no tags.                                                |
| `draft`   | no       | boolean                    | If `true`: hidden in production, visible in `npm run dev`. Default `false`.                  |

The build will **fail loudly** if any required field is missing or malformed. That's intentional — you catch it before deploy, not after.

The `slug` is **not** in frontmatter. It comes from the filename. One source of truth.

---

## 3. Preview locally, then push

```bash
npm run dev
```

Visit `http://localhost:3000/blog/<your-slug>`. Confirm the post renders, code blocks highlight correctly, and the typography reads well in all 4 modes (light/dark × human/machine — toggle via the navbar).

When you're happy:

```bash
git add content/posts/<your-slug>.mdx
git commit -m "Add post: <Post Title>"
git push
```

Vercel rebuilds. The new post appears at `/blog/<your-slug>`, and the 3 most recent posts surface on the homepage.

---

## What MDX gets you over plain Markdown

Most posts will be 99% Markdown. But MDX lets you escape into React when you need to:

- **GitHub-Flavored Markdown** (already wired via `remark-gfm`): tables, task lists `- [ ]`, autolinks, strikethrough.
- **Syntax-highlighted code blocks** (Shiki, dual-theme github-light/github-dark): use a fenced block with a language tag — `` ```ts ``, `` ```py ``, `` ```bash ``, etc.
- **Embed React components.** Import any component from your codebase and use it in the post:
  ```mdx
  import { Callout } from '@/components/Callout'

  <Callout type="warning">Heads up — this API is deprecated.</Callout>
  ```
  (No custom components exist yet. Build them when you have a recurring need.)

---

## Common gotchas

- **Date as bare YAML (no quotes) breaks parsing.** Always quote it: `date: "2026-04-15"`.
- **Wrong date format** silently sorts wrong (lexicographic ≠ chronological for `MM/DD/YYYY`). Stick to `YYYY-MM-DD`.
- **Underscores in filename** still work but produce ugly URLs. Use hyphens.
- **Forgot the closing `---`** = entire post body is treated as frontmatter. Build fails with a YAML parse error.
- **`draft: true` post not appearing on the live site after push** — that's working as designed. Set to `false` to publish.

---

## What's where

| Concern                    | File                              |
| -------------------------- | --------------------------------- |
| Post content               | `content/posts/*.mdx`             |
| Read posts from disk       | `lib/posts.ts`                    |
| Blog cards (homepage + index) | `components/Blog.tsx`             |
| Full archive page          | `app/blog/page.tsx`               |
| Individual post page       | `app/blog/[slug]/page.tsx`        |
| Post body typography       | `.prose-post` rules in `app/globals.css` |
| Why these choices were made | `DECISIONS.md` entry 012          |
