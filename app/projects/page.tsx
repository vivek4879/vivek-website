import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Vivek Aher",
  description: "Everything I've built — apps, APIs, pipelines, and tools.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
        <h1
          className="text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Projects
        </h1>
        <p className="mt-3 text-body">
          Everything I&apos;ve built — apps, APIs, pipelines, and tools.
        </p>

        <ul className="mt-12 flex flex-col gap-8">
          {projects.map((project) => (
            <li key={project.title} className="flex flex-col gap-1.5">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex self-start"
              >
                <span
                  className="font-semibold text-heading transition-colors group-hover:text-cyan"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {project.title}
                </span>
              </a>
              <p className="text-sm text-body">{project.description}</p>
              <p
                className="text-xs text-muted"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {project.tech.join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
