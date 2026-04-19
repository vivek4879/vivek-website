import Link from "next/link";
import type { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
};

export default function ProjectsPreview({ projects }: Props) {
  return (
    <section aria-labelledby="projects">
      <h2
        id="projects"
        className="mb-6 text-xs uppercase tracking-wider text-muted"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Projects
      </h2>
      <ul className="flex flex-col gap-5">
        {projects.map((project) => {
          const primary = project.live ?? project.github;
          return (
            <li
              key={project.title}
              className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <a
                href={primary}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-heading transition-colors hover:text-cyan shrink-0"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {project.title}
              </a>
              <span className="text-sm text-body">{project.description}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-6">
        <Link
          href="/projects"
          className="text-sm text-muted transition-colors hover:text-cyan"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          More projects →
        </Link>
      </p>
    </section>
  );
}
