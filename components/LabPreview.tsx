import Link from "next/link";
import type { LabItem } from "@/lib/lab";
import StatusBadge from "@/components/StatusBadge";

type Props = {
  items: LabItem[];
};

export default function LabPreview({ items }: Props) {
  return (
    <section aria-labelledby="playground">
      <h2
        id="playground"
        className="mb-6 text-xs uppercase tracking-wider text-muted"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Playground
      </h2>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-baseline justify-between gap-4"
          >
            <Link
              href={`/lab#${item.id}`}
              className="font-semibold text-heading transition-colors hover:text-cyan"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.title}
            </Link>
            <StatusBadge status={item.status} />
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link
          href="/lab"
          className="text-sm text-muted transition-colors hover:text-cyan"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          More experiments →
        </Link>
      </p>
    </section>
  );
}
