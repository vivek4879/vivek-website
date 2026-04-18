"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-provider";

const navLinks = [
  { label: "writing", href: "/blog" },
  { label: "lab", href: "/lab" },
  { label: "projects", href: "/projects" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

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
        <ThemeToggle theme={theme} toggle={toggleTheme} />
      </div>
    </nav>
  );
}

type ThemeToggleProps = {
  theme: "light" | "dark";
  toggle: () => void;
};

function ThemeToggle({ theme, toggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-heading"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
