import Link from "next/link";
import type { Post } from "@/lib/posts";

type BlogProps = {
  posts: Post[];
  showArchive?: boolean;
  showLabel?: boolean;
};

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Blog({
  posts,
  showArchive = true,
  showLabel = true,
}: BlogProps) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby={showLabel ? "writing" : undefined}>
      {showLabel && (
        <h2
          id="writing"
          className="mb-6 text-xs uppercase tracking-wider text-muted"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Writing
        </h2>
      )}
      <ul className="flex flex-col gap-5">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span
                className="font-semibold text-heading transition-colors group-hover:text-cyan"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {post.title}
              </span>
              <time
                dateTime={post.date}
                className="shrink-0 text-xs text-muted"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {formatDate(post.date)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
      {showArchive && (
        <p className="mt-6">
          <Link
            href="/blog"
            className="text-sm text-muted transition-colors hover:text-cyan"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            More writing →
          </Link>
        </p>
      )}
    </section>
  );
}
