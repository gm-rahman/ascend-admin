"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  FolderKanban,
  LayoutGrid,
  Settings,
  Users2,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";

const navItems = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: FolderKanban, label: "Projects" },
  { icon: BriefcaseBusiness, label: "Portfolio" },
  { icon: Users2, label: "Teams" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const { setSidebarOpen, sidebarOpen } = useUiStore((state) => ({
    setSidebarOpen: state.setSidebarOpen,
    sidebarOpen: state.sidebarOpen,
  }));

  return (
    <>
      <button
        aria-label="Close sidebar overlay"
        className={cn(
          "fixed inset-0 z-20 bg-slate-950/30 backdrop-blur-[2px] transition lg:hidden",
          sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setSidebarOpen(false)}
        type="button"
      />
      <aside
        className={cn(
          "dashboard-card fixed inset-y-4 left-4 z-30 w-[calc(100vw-2rem)] max-w-[280px] shrink-0 overflow-hidden border transition duration-300 lg:w-[280px] lg:max-w-none",
          sidebarOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-[120%] opacity-0 lg:translate-x-0 lg:opacity-100",
          !sidebarOpen && "lg:w-[96px]",
        )}
      >
        <div className="flex h-full flex-col bg-[linear-gradient(180deg,rgba(29,78,216,0.96),rgba(15,23,42,0.96))] px-5 py-6 text-white">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-white/12 font-mono text-sm font-bold tracking-[0.25em]">
            AA
          </div>
          {sidebarOpen ? (
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-white/60">
                Workspace
              </p>
              <h1 className="mt-1 text-lg font-semibold tracking-tight">
                {siteConfig.name}
              </h1>
            </div>
          ) : null}
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition",
                  item.active
                    ? "bg-white text-slate-950"
                    : "text-white/74 hover:bg-white/10 hover:text-white",
                  !sidebarOpen && "justify-center px-2",
                )}
              >
                <Icon className="size-5 shrink-0" />
                {sidebarOpen ? <span>{item.label}</span> : null}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-3xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
          {sidebarOpen ? (
            <>
              <p className="text-sm font-semibold">Q3 delivery target</p>
              <p className="mt-2 text-xs leading-5 text-white/70">
                Keep launch readiness above 90% across active programs.
              </p>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-2 w-[72%] rounded-full bg-amber-400" />
              </div>
            </>
          ) : (
            <div className="mx-auto size-3 rounded-full bg-amber-400" />
          )}
        </div>
        </div>
      </aside>
    </>
  );
}
