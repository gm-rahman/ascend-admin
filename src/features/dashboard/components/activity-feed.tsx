import { Clock3 } from "lucide-react";
import type { ActivityItem } from "@/features/dashboard/types";

type ActivityFeedProps = {
  items: ActivityItem[];
};

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <section className="dashboard-card p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Recent Activity</h2>
          <p className="mt-1 text-sm text-muted">
            A quick pulse on the latest project updates.
          </p>
        </div>
        <div className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-muted">
          Live mock data
        </div>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-border bg-surface px-4 py-4"
          >
            <p className="text-sm leading-6 text-foreground">
              <span className="font-semibold">{item.actor}</span> {item.action} on{" "}
              <span className="font-semibold">{item.project}</span>.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-muted">
              <Clock3 className="size-3.5" />
              <span>{item.timestamp}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
