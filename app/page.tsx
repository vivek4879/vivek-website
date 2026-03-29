import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import AboutMe from "@/components/AboutMe";
import TechStack from "@/components/TechStack";
import Blog from "@/components/Blog";
import Projects from "@/components/Projects";
import CodingActivity from "@/components/CodingActivity";
import Footer from "@/components/Footer";

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <Projects />
        <TechStack />
        <Blog />
        <CodingActivity />
      </main>
      <Footer />
    </>
  );
}
