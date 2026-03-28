"use client";

import { useTheme } from "@/lib/theme-provider";

// Placeholder posts — replace with real data from MDX files later
const posts = [
  {
    title: "Building an AI-Native Dance Choreography Platform",
    date: "Coming Soon",
    excerpt:
      "How we're using AI to generate dance sequences — the architecture decisions, the model pipeline, and what surprised us.",
    slug: "ai-dance-choreography",
  },
  {
    title: "What I Learned Building My First React Native App",
    date: "Coming Soon",
    excerpt:
      "Lessons from shipping FavorIt — navigation patterns, state management, and the gap between tutorial code and production.",
    slug: "first-react-native-app",
  },
  {
    title: "Pair Programming with Claude: An Honest Review",
    date: "Coming Soon",
    excerpt:
      "Six months of using AI as a daily coding partner. What works, what doesn't, and how it changed how I learn.",
    slug: "pair-programming-with-claude",
  },
];

export default function Blog() {
  const { mode } = useTheme();

  if (mode === "machine") {
    return (
      <section id="blog" className="px-6 py-8">
        <div className="mx-auto max-w-[700px]" style={{ fontFamily: "var(--font-mono)" }}>
          <p className="text-muted">---</p>
          <p className="mt-4 text-lg font-bold text-heading">## Writing</p>
          {posts.map((post) => (
            <div key={post.slug} className="mt-6">
              <p className="text-heading font-bold">{post.title}</p>
              <p className="text-muted">{post.date}</p>
              <p className="mt-1 text-body">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <p
          className="mb-4 text-xs uppercase tracking-wider text-cyan"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Writing
        </p>
        <h2
          className="mb-12 text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Blog
        </h2>

        {/* Post list */}
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-cyan/30 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
            >
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold text-heading transition-colors group-hover:text-cyan"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-body">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                <time
                  className="text-xs text-muted"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {post.date}
                </time>
                <span
                  className="text-xs text-cyan transition-colors"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Read More →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
