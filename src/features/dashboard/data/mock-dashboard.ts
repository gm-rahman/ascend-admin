import { BriefcaseBusiness, CircleCheckBig, Users } from "lucide-react";
import type {
  ActivityItem,
  DashboardHighlight,
  ProjectRow,
} from "@/features/dashboard/types";

export const dashboardHighlights: DashboardHighlight[] = [
  {
    change: "+12.4% vs last month",
    icon: BriefcaseBusiness,
    label: "Active Projects",
    tone: "primary",
    value: 48,
  },
  {
    change: "+8 new this week",
    icon: Users,
    label: "Team Members",
    tone: "secondary",
    value: 126,
  },
  {
    change: "94% delivery confidence",
    icon: CircleCheckBig,
    label: "Milestones Hit",
    tone: "success",
    value: 312,
  },
];

export const projectRows: ProjectRow[] = [
  {
    id: "PRJ-1021",
    name: "Northwind Portal Revamp",
    owner: "Ava Patel",
    progress: 78,
    budget: 184000,
    dueDate: "Aug 18, 2026",
    teamSize: 9,
    status: "On Track",
    health: "Healthy",
  },
  {
    id: "PRJ-1034",
    name: "Global Vendor Onboarding",
    owner: "Marcus Lee",
    progress: 61,
    budget: 246000,
    dueDate: "Sep 02, 2026",
    teamSize: 14,
    status: "At Risk",
    health: "Attention",
  },
  {
    id: "PRJ-1040",
    name: "Internal Billing Automation",
    owner: "Rina Gomez",
    progress: 44,
    budget: 126500,
    dueDate: "Aug 27, 2026",
    teamSize: 6,
    status: "Blocked",
    health: "Critical",
  },
  {
    id: "PRJ-1048",
    name: "Partner Analytics Workspace",
    owner: "David Chen",
    progress: 93,
    budget: 98000,
    dueDate: "Aug 09, 2026",
    teamSize: 7,
    status: "Completed",
    health: "Healthy",
  },
];

export const dashboardActivity: ActivityItem[] = [
  {
    id: "activity-1",
    actor: "Ava Patel",
    project: "Northwind Portal Revamp",
    action: "approved the updated sprint plan",
    timestamp: "10 minutes ago",
  },
  {
    id: "activity-2",
    actor: "Marcus Lee",
    project: "Global Vendor Onboarding",
    action: "flagged a dependency on legal review",
    timestamp: "35 minutes ago",
  },
  {
    id: "activity-3",
    actor: "Rina Gomez",
    project: "Internal Billing Automation",
    action: "moved the QA milestone by 2 days",
    timestamp: "1 hour ago",
  },
  {
    id: "activity-4",
    actor: "David Chen",
    project: "Partner Analytics Workspace",
    action: "closed the launch readiness checklist",
    timestamp: "2 hours ago",
  },
];
