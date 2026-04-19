import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import type { Pluggable } from "unified";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import {
  labItems,
  getLabDetailContent,
  getLabDetailSlugs,
} from "@/lib/lab";

type RouteParams = { id: string };

export function generateStaticParams(): RouteParams[] {
  return Array.from(getLabDetailSlugs()).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = labItems.find((candidate) => candidate.id === id);
  if (!item) return {};
  return {
    title: `${item.title} — Lab — Vivek Aher`,
    description: item.description,
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

export default async function LabDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;
  const item = labItems.find((candidate) => candidate.id === id);
  const content = getLabDetailContent(id);
  if (!item || !content) notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
        <article>
          <Link
            href="/lab"
            className="text-xs text-cyan hover:underline"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ← Back to lab
          </Link>

          <header className="mt-6 mb-12">
            <div className="mb-4">
              <StatusBadge status={item.status} />
            </div>
            <h1
              className="text-3xl font-bold tracking-tight text-heading sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.title}
            </h1>
            <p className="mt-3 text-body">{item.description}</p>
          </header>

          <div className="prose-post text-body">
            <MDXRemote source={content} options={{ mdxOptions }} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
