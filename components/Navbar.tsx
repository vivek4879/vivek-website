import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "writing", href: "/blog" },
  { label: "lab", href: "/lab" },
  { label: "projects", href: "/projects" },
];

export default function Navbar() {
  return (
    <nav
      className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-6 pt-8 pb-4"
      aria-label="Main"
    >
      <Link
        href="/"
        className="text-sm font-semibold text-heading transition-colors hover:text-cyan"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Vivek Aher
      </Link>
      <div
        className="flex items-center gap-5 text-sm"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-body transition-colors hover:text-cyan"
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
