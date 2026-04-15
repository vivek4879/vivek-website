import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import GradientMesh from "@/components/GradientMesh";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Vivek Aher",
  description: "Notes on building, learning, and the engineering tradeoffs along the way.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <GradientMesh />
      <div className="relative z-[1]">
        <Navbar />
        <main>
          <Blog posts={posts} />
        </main>
        <Footer />
      </div>
    </>
  );
}
