import type { LucideIcon } from "lucide-react";

export type ProjectStatus = "On Track" | "At Risk" | "Blocked" | "Completed";
export type ProjectHealth = "Healthy" | "Attention" | "Critical";

export type DashboardHighlight = {
  change: string;
  icon: LucideIcon;
  label: string;
  tone: "primary" | "secondary" | "success";
  value: number;
};

export type ProjectRow = {
  id: string;
  name: string;
  owner: string;
  progress: number;
  budget: number;
  dueDate: string;
  teamSize: number;
  status: ProjectStatus;
  health: ProjectHealth;
};

export type ActivityItem = {
  id: string;
  actor: string;
  project: string;
  action: string;
  timestamp: string;
};
