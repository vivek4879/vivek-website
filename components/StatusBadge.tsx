import type { LabStatus } from "@/lib/lab";

const STATUS_CLASS: Record<LabStatus, string> = {
  idea: "status-badge--idea",
  exploring: "status-badge--exploring",
  building: "status-badge--building",
  shipped: "status-badge--shipped",
  shelved: "status-badge--shelved",
};

type StatusBadgeProps = {
  status: LabStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`status-badge ${STATUS_CLASS[status]}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {status}
    </span>
  );
}
