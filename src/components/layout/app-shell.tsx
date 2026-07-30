"use client";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { ActivityFeed } from "@/features/dashboard/components/activity-feed";
import { ProjectsTable } from "@/features/dashboard/components/projects-table";
import { StatCard } from "@/features/dashboard/components/stat-card";
import type {
  ActivityItem,
  DashboardHighlight,
  ProjectRow,
} from "@/features/dashboard/types";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";

type AppShellProps = {
  activity: ActivityItem[];
  highlights: DashboardHighlight[];
  projects: ProjectRow[];
};

export function AppShell({ activity, highlights, projects }: AppShellProps) {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main
        className={cn(
          "px-4 py-4 transition-all duration-300 lg:pl-[320px]",
          !sidebarOpen && "lg:pl-[136px]",
        )}
      >
        <div className="mx-auto max-w-7xl py-6">
          <Header />

          <section className="dashboard-grid mb-8 md:grid-cols-3">
            {highlights.map((item) => (
              <StatCard key={item.label} item={item} />
            ))}
          </section>

          <section className="dashboard-grid lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
            <ProjectsTable projects={projects} />
            <ActivityFeed items={activity} />
          </section>
        </div>
      </main>
    </div>
  );
}
