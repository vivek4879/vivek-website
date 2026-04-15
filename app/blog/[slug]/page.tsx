import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import type { Pluggable } from "unified";
import Navbar from "@/components/Navbar";
import GradientMesh from "@/components/GradientMesh";
import Footer from "@/components/Footer";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Vivek Aher`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: true,
};

const mdxOptions = {
  remarkPlugins: [remarkGfm] as Pluggable[],
  rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]] as Pluggable[],
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <GradientMesh />
      <div className="relative z-[1]">
        <Navbar />
        <main className="px-6 py-24 sm:py-32">
          <article className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="text-xs text-cyan hover:underline"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ← Back to blog
            </Link>

            <header className="mt-6 mb-12">
              <h1
                className="text-4xl font-bold tracking-tight text-heading sm:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.tags.length > 0 && (
                  <>
                    <span>·</span>
                    <span>{post.tags.join(" / ")}</span>
                  </>
                )}
              </div>
            </header>

            <div className="prose-post text-body">
              <MDXRemote source={post.content} options={{ mdxOptions }} />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
