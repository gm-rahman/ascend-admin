"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Laptop } from "lucide-react";

export default function PcDashboard() {
  return (
    <DashboardLayout roleName="PC">
      <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
        <div className="inline-flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Laptop className="size-10 text-[#0da2b3]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            PC Dashboard
          </h1>
          <p className="text-sm text-muted">
            Workspace initialized. Design and application logic will be loaded here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
