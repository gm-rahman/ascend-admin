import { ArrowUpRight } from "lucide-react";
import { formatCompactNumber } from "@/lib/utils";
import type { DashboardHighlight } from "@/features/dashboard/types";

type StatCardProps = {
  item: DashboardHighlight;
};

const toneClasses: Record<DashboardHighlight["tone"], string> = {
  primary: "bg-blue-50 text-blue-700",
  secondary: "bg-amber-50 text-amber-700",
  success: "bg-emerald-50 text-emerald-700",
};

export function StatCard({ item }: StatCardProps) {
  const Icon = item.icon;

  return (
    <article className="dashboard-card relative overflow-hidden p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            {formatCompactNumber(item.value)}
          </p>
        </div>
        <div className={`rounded-2xl p-3 ${toneClasses[item.tone]}`}>
          <Icon className="size-5" />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-muted">
        <ArrowUpRight className="size-4 text-success" />
        <span>{item.change}</span>
      </div>
    </article>
  );
}
