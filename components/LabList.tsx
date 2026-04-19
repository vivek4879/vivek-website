import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import type { LabItem } from "@/lib/lab";

type LabListProps = {
  items: LabItem[];
  detailSlugs?: Set<string>;
};

export default function LabList({ items, detailSlugs }: LabListProps) {
  return (
    <div className="lab-list">
      {items.map((item) => {
        const hasDetail = detailSlugs?.has(item.id) ?? false;
        return (
          <details key={item.id} id={item.id} className="lab-item">
            <summary className="lab-item__summary">
              <span className="lab-item__chevron" aria-hidden>
                ›
              </span>
              <span className="lab-item__title">{item.title}</span>
              <StatusBadge status={item.status} />
            </summary>
            <div className="lab-item__body">
              {item.description}
              {hasDetail && (
                <span className="lab-item__read-more">
                  <Link
                    href={`/lab/${item.id}`}
                    className="text-cyan hover:underline"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Read full entry →
                  </Link>
                </span>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}
