import Header from "@/components/Header";
import Today from "@/components/Today";
import ProjectsPreview from "@/components/ProjectsPreview";
import Blog from "@/components/Blog";
import LabPreview from "@/components/LabPreview";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { getAllPosts } from "@/lib/posts";
import { HOMEPAGE_BLOG_PREVIEW_COUNT } from "@/lib/blog-config";
import { projects } from "@/lib/projects";
import { labItems } from "@/lib/lab";

const HOMEPAGE_PREVIEW_COUNT = 3;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vivek Aher",
  jobTitle: "Software Engineer",
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
  const previewProjects = projects.slice(0, HOMEPAGE_PREVIEW_COUNT);
  const previewLab = labItems.slice(0, HOMEPAGE_PREVIEW_COUNT);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto flex w-full max-w-2xl justify-end px-6 pt-8">
        <ThemeToggle />
      </div>
      <main className="mx-auto flex max-w-2xl flex-col gap-16 px-6 pt-8 pb-24 sm:pb-32">
        <Header />
        <Today />
        <ProjectsPreview projects={previewProjects} />
        <Blog posts={posts} />
        <LabPreview items={previewLab} />
      </main>
      <Footer />
    </>
  );
}
