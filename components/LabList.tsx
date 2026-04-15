import StatusBadge from "@/components/StatusBadge";
import type { LabItem } from "@/lib/lab";

type LabListProps = {
  items: LabItem[];
};

export default function LabList({ items }: LabListProps) {
  return (
    <div className="lab-list">
      {items.map((item) => (
        <details key={item.id} id={item.id} className="lab-item">
          <summary className="lab-item__summary">
            <span className="lab-item__chevron" aria-hidden>
              ›
            </span>
            <span className="lab-item__title">{item.title}</span>
            <StatusBadge status={item.status} />
          </summary>
          <div className="lab-item__body">{item.description}</div>
        </details>
      ))}
    </div>
  );
}
