import ObfuscatedEmail from "@/components/ObfuscatedEmail";

const socials = [
  { label: "GitHub", href: "https://github.com/vivek4879" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ahervivek/" },
  { label: "LeetCode", href: "https://leetcode.com/u/atlantic_ocean/" },
];

const linkClass =
  "text-body transition-colors hover:text-cyan";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-2xl px-6 pb-16 pt-8">
      <div
        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <ObfuscatedEmail className={linkClass} />
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {social.label.toLowerCase()}
          </a>
        ))}
      </div>
      <p
        className="mt-6 text-xs text-muted"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        © {new Date().getFullYear()} Vivek Aher
      </p>
    </footer>
  );
}
