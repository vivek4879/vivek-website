"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-provider";
import type { Post } from "@/lib/posts";
import { HOMEPAGE_BLOG_PREVIEW_COUNT } from "@/lib/blog-config";

type BlogProps = {
  posts: Post[];
};

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Blog({ posts }: BlogProps) {
  const { mode } = useTheme();

  if (posts.length === 0) {
    return null;
  }

  const showArchiveLink = posts.length >= HOMEPAGE_BLOG_PREVIEW_COUNT;

  if (mode === "machine") {
    return (
      <section id="blog" className="px-6 py-8">
        <div className="mx-auto max-w-[700px]" style={{ fontFamily: "var(--font-mono)" }}>
          <p className="text-muted">---</p>
          <p className="mt-4 text-lg font-bold text-heading">## Writing</p>
          {posts.map((post) => (
            <div key={post.slug} className="mt-6">
              <Link href={`/blog/${post.slug}`} className="text-heading font-bold hover:text-cyan">
                {post.title}
              </Link>
              <p className="text-muted">{formatDate(post.date)}</p>
              <p className="mt-1 text-body">{post.excerpt}</p>
            </div>
          ))}
          {showArchiveLink && (
            <p className="mt-6">
              <Link href="/blog" className="text-cyan hover:underline">
                [view all posts]
              </Link>
            </p>
          )}
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
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-cyan/60 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
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
                  dateTime={post.date}
                  className="text-xs text-muted"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {formatDate(post.date)}
                </time>
                <span
                  className="text-xs text-cyan transition-colors"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {showArchiveLink && (
          <div className="mt-8 flex justify-end">
            <Link
              href="/blog"
              className="text-sm text-cyan hover:underline"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              View all posts →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
