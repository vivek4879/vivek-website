import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import AboutMe from "@/components/AboutMe";
import TechStack from "@/components/TechStack";
import Blog from "@/components/Blog";
import Projects from "@/components/Projects";
import CodingActivity from "@/components/CodingActivity";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
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
