"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Activity } from "lucide-react";

export default function MtDashboard() {
  return (
    <DashboardLayout roleName="MT">
      <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
        <div className="inline-flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Activity className="size-10 text-[#0da2b3]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            MT Dashboard
          </h1>
          <p className="text-sm text-muted">
            Workspace initialized. Design and application logic will be loaded here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
