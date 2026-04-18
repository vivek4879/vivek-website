const categories = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "SQL", "HTML", "CSS"],
  },
  {
    label: "Frontend",
    items: ["React", "React Native", "Angular", "Vue.js", "Next.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Spring Boot", "Flask", "REST APIs", "GraphQL", "JWT", "JPA/Hibernate", "Microservices"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "GCP", "Docker", "Jenkins", "GitHub Actions", "CI/CD", "Git"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MySQL", "Firebase Firestore", "SQLite", "Oracle SQL"],
  },
  {
    label: "Other",
    items: ["Agile", "Scrum", "TDD", "Mockito", "JUnit", "Spring AI", "System Design", "Stripe", "SwiftUI"],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <p
          className="mb-4 text-xs uppercase tracking-wider text-cyan"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Stack
        </p>
        <h2
          className="mb-12 text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tech I work with
        </h2>

        {/* Bento grid — 2 cols on mobile, 3 on desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-cyan/60 hover:shadow-[0_0_30px_-5px] hover:shadow-cyan/20"
            >
              {/* Category label */}
              <p
                className="mb-4 text-xs uppercase tracking-wider text-violet"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {cat.label}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-pill-bg px-2.5 py-1 text-xs text-pill-text transition-colors group-hover:bg-cyan/10 group-hover:text-cyan"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
