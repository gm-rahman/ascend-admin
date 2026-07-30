import { MoreHorizontal } from "lucide-react";
import { formatCompactNumber } from "@/lib/utils";
import { StatusBadge } from "@/features/dashboard/components/status-badge";
import type { ProjectRow } from "@/features/dashboard/types";

type ProjectsTableProps = {
  projects: ProjectRow[];
};

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <section className="dashboard-card overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Project Overview</h2>
          <p className="mt-1 text-sm text-muted">
            Ready for API replacement when backend work begins.
          </p>
        </div>
        <button className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:border-border-strong">
          Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-surface-muted/70 text-xs uppercase tracking-[0.24em] text-muted">
            <tr>
              <th className="px-6 py-4 font-semibold">Project</th>
              <th className="px-6 py-4 font-semibold">Owner</th>
              <th className="px-6 py-4 font-semibold">Progress</th>
              <th className="px-6 py-4 font-semibold">Budget</th>
              <th className="px-6 py-4 font-semibold">Due</th>
              <th className="px-6 py-4 font-semibold">Health</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-t border-border text-sm text-foreground transition hover:bg-surface-muted/40"
              >
                <td className="px-6 py-5">
                  <div>
                    <p className="font-semibold">{project.name}</p>
                    <p className="mt-1 text-xs font-medium tracking-[0.2em] text-muted">
                      {project.id}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-5">{project.owner}</td>
                <td className="px-6 py-5">
                  <div className="w-32">
                    <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted">
                      <span>{project.progress}%</span>
                      <span>{project.teamSize} people</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">${formatCompactNumber(project.budget)}</td>
                <td className="px-6 py-5">{project.dueDate}</td>
                <td className="px-6 py-5">
                  <StatusBadge value={project.health} />
                </td>
                <td className="px-6 py-5">
                  <StatusBadge value={project.status} />
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="rounded-full p-2 text-muted transition hover:bg-surface-muted hover:text-foreground">
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
