# How to Add a Lab Item

The `/lab` page is a curated list of things I want to build, am building, or considered and shelved. Adding or updating an item is a single-file edit.

---

## 1. Open `lib/lab.ts`

All items live in one exported array: `labItems`.

## 2. Add an object to the array

```ts
{
  id: "voice-input-editor",
  title: "Voice-input blog editor with Whisper",
  description:
    "Sometimes ideas show up on walks. A mobile-friendly page that records audio, ships it to OpenAI Whisper, and drops the transcript straight into a new .mdx file. Friction from idea to draft should be seconds.",
  status: "idea",
}
```

### Field rules

| Field         | Required | Type          | Notes                                                                                                      |
| ------------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------------- |
| `id`          | yes      | string        | Lowercase, hyphenated, unique. Becomes the permalink (`/lab#your-id`) — don't rename casually once shared.  |
| `title`       | yes      | string        | The clickable heading. Keep it short enough to fit on one line on mobile.                                   |
| `description` | yes      | string        | The body that shows when the item is expanded. Use `\n\n` for paragraph breaks (CSS preserves whitespace). |
| `status`      | yes      | `LabStatus`   | One of the five below.                                                                                     |

### Status values

| Status        | Meaning                                                                     |
| ------------- | --------------------------------------------------------------------------- |
| `idea`        | Thought of it, haven't poked at it yet.                                      |
| `exploring`   | Reading, prototyping, sketching — not committed to building yet.             |
| `building`    | Actively coding it.                                                          |
| `shipped`     | Done. Consider promoting to `/projects` and either removing from Lab or leaving as-is to show the pipeline works. |
| `shelved`     | Decided not to pursue. Leave visible — "things I tried and dropped" is an honest and interesting signal. |

Colors update automatically based on status — they're defined once in `app/globals.css` (`--t-status-*-bg` / `--t-status-*-text` tokens, light + dark variants).

## 3. Ordering

Items render in the order they appear in the array. No auto-sort. Put newer or more-active items near the top — visitors see the first few titles immediately.

## 4. Preview locally, then push

```bash
npm run dev
```

Visit `http://localhost:3000/lab`. Your new item should show up collapsed. Click it — it should expand, chevron should rotate, status pill should show the right color in both light and dark mode.

Then:

```bash
git add lib/lab.ts
git commit -m "Add lab idea: <short description>"
git push
```

Vercel rebuilds. New item is live.

---

## Common edits

### Updating a status

Most common edit — an idea becomes something you're actually building, or you ship it, or you shelve it.

```diff
- status: "idea",
+ status: "building",
```

Commit with a message like `lab: voice-input-editor → building`.

### Expanding a description

Write more about why you want it / what the approach looks like. Use `\n\n` for paragraph breaks inside the string, since JSX strings don't preserve markdown formatting. The CSS (`white-space: pre-wrap` on `.lab-item__body`) will render blank-line separators as paragraphs.

### Moving a shipped item to `/projects`

If the thing graduates from "wanted to build" to "real working project," edit `lib/projects.ts` to add it to the projects array, then decide: remove from `lib/lab.ts`, or leave with `status: "shipped"` to show visitors that items on this list do sometimes actually ship.

---

## Gotchas

- **`id` must be unique.** React warns at runtime if two items share a key. Pick something specific to the idea, not generic like "project-1".
- **Don't rename `id` after sharing a link.** Someone on Twitter might have the old `/lab#foo-bar` URL — renaming breaks it.
- **Status is a union type.** TypeScript will red-underline any string that isn't one of the five values — fail-fast at edit time is the feature, not the bug.
- **If the page doesn't rebuild on Vercel**, check that `lib/lab.ts` compiles locally first (`npx tsc --noEmit`). A TypeScript error anywhere in the file blocks the whole site build.

---

## What's where

| Concern              | File                                      |
| -------------------- | ----------------------------------------- |
| Items data           | `lib/lab.ts`                              |
| Item types           | `lib/lab.ts` (`LabStatus`, `LabItem`)     |
| Accordion rendering  | `components/LabList.tsx`                  |
| Status pill          | `components/StatusBadge.tsx`              |
| Page wrapper         | `app/lab/page.tsx`                        |
| Accordion + status CSS | `app/globals.css` (`.lab-item`, `.status-badge`) |
| Why this exists      | `DECISIONS.md` (next entry — not yet logged) |
