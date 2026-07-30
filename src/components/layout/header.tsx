"use client";

import { Bell, Menu, Search, SlidersHorizontal } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useUiStore } from "@/store/ui-store";

export function Header() {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
          Project Control Center
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance text-foreground">
          Build and ship your admin dashboard from a real starter, not a demo.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          {siteConfig.name} is ready for immediate frontend work with feature modules,
          state management, typed mock data, and an extensible Next.js app shell.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-border-strong"
          type="button"
        >
          <Menu className="size-4" />
          Menu
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-border-strong"
          type="button"
        >
          <Search className="size-4" />
          Search
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-border-strong"
          type="button"
        >
          <SlidersHorizontal className="size-4" />
          Filter
        </button>
        <button
          className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-border-strong"
          type="button"
        >
          <Bell className="size-4" />
        </button>
      </div>
    </header>
  );
}
