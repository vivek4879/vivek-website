import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing — Vivek Aher",
  description:
    "Notes on building, learning, and the engineering tradeoffs along the way.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
        <h1
          className="text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Writing
        </h1>
        <p className="mt-3 text-body">
          Notes on building, learning, and the tradeoffs along the way.
        </p>
        <div className="mt-12">
          <Blog posts={posts} showArchive={false} showLabel={false} />
        </div>
      </main>
      <Footer />
    </>
  );
}
