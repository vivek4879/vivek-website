import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import AboutMe from "@/components/AboutMe";
import TechStack from "@/components/TechStack";
import Blog from "@/components/Blog";
import Projects from "@/components/Projects";
import CodingActivity from "@/components/CodingActivity";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";
import { HOMEPAGE_BLOG_PREVIEW_COUNT } from "@/lib/blog-config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vivek Aher",
  jobTitle: "Full-Stack Engineer",
  url: "https://vivek-website-five.vercel.app",
  sameAs: [
    "https://github.com/vivek4879",
    "https://www.linkedin.com/in/ahervivek/",
  ],
  knowsAbout: [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "Python", "Java", "AWS", "System Design",
  ],
};

export default function Home() {
  const posts = getAllPosts().slice(0, HOMEPAGE_BLOG_PREVIEW_COUNT);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative z-[1]">
        <Navbar />
        <main>
          <Hero />
          <AboutMe />
          <Projects />
          <TechStack />
          <Blog posts={posts} />
          <CodingActivity />
        </main>
        <Footer />
      </div>
    </>
  );
}
