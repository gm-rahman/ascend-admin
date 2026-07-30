"use client";

import { AppShell } from "@/components/layout/app-shell";
import {
  dashboardActivity,
  dashboardHighlights,
  projectRows,
} from "@/features/dashboard/data/mock-dashboard";

export default function Home() {
  return (
    <AppShell
      activity={dashboardActivity}
      highlights={dashboardHighlights}
      projects={projectRows}
    />
  );
}
