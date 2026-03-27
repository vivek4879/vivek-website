import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Sections will be added here: About, TechStack, Projects, Blog, CodingActivity, Footer */}
      </main>
    </>
  );
}
