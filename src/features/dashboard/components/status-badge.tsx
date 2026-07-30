import { cn } from "@/lib/utils";
import type { ProjectHealth, ProjectStatus } from "@/features/dashboard/types";

type StatusBadgeProps = {
  value: ProjectHealth | ProjectStatus;
};

const toneMap: Record<StatusBadgeProps["value"], string> = {
  Attention: "bg-amber-50 text-amber-700 ring-amber-200",
  Blocked: "bg-rose-50 text-rose-700 ring-rose-200",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Critical: "bg-rose-50 text-rose-700 ring-rose-200",
  Healthy: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "On Track": "bg-blue-50 text-blue-700 ring-blue-200",
  "At Risk": "bg-amber-50 text-amber-700 ring-amber-200",
};

export function StatusBadge({ value }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        toneMap[value],
      )}
    >
      {value}
    </span>
  );
}
