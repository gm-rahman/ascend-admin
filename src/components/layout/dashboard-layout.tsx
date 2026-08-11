"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { AscendLogo } from "@/components/ascend-logo";
import { ArrowLeft, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

type DashboardLayoutProps = {
  roleName: string;
  children: React.ReactNode;
};

export function DashboardLayout({ roleName, children }: DashboardLayoutProps) {
  const router = useRouter();
  const { isAuthenticated, logout, setSelectedRole } = useAuthStore();
  const [hasMounted, setHasMounted] = useState(false);
  const { theme, mounted, toggleTheme } = useTheme();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Protect the route: if not authenticated, redirect to /
  useEffect(() => {
    if (hasMounted && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, hasMounted, router]);

  const handleBackToRoles = () => {
    setSelectedRole(null);
    router.push("/roles");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!mounted || !hasMounted || !isAuthenticated) {
    return null; // Prevents flashing content while redirecting
  }

  return (
    <div className="flex h-screen flex-col bg-[#f0f4f9] dark:bg-[#070a13] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200 overflow-hidden">
      
      {/* 1. TOP HEADER BAR */}
      <header className="flex h-14 w-full items-center justify-between border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#0e1628] px-6 md:px-8 flex-shrink-0 z-20">
        {/* Left Brand Badge */}
        <div className="flex items-center gap-2">
          <AscendLogo width={20} height={20} showDetails={false} />
          <span className="text-sm font-semibold tracking-tight text-slate-800 dark:text-white">Ascend</span>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-light select-none">/</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{roleName} Dashboard</span>
        </div>

        {/* Right Action Menu */}
        <div className="flex items-center gap-6">
          {/* Back to Roles */}
          <button
            onClick={handleBackToRoles}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors duration-200 cursor-pointer"
            type="button"
          >
            <ArrowLeft className="size-4" />
            BACK TO ROLES
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex size-8 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#070a13] hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all duration-200 cursor-pointer"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            type="button"
          >
            {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 dark:border-red-950/20 dark:bg-red-950/10 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-100 dark:hover:bg-red-950/30 cursor-pointer"
            type="button"
          >
            <LogOut className="size-3.5" />
            SIGN OUT
          </button>
        </div>
      </header>

      {/* 2. CUI / OPSEC NAVY BANNER */}
      <section className="flex h-9 w-full items-center justify-center bg-[#101b22] px-6 text-center text-[10px] font-semibold tracking-wider text-slate-400 select-none flex-shrink-0 z-10">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--brand-color)]"></span>
          <span>CUI // OPSEC · Not a Government System of Record</span>
        </div>
      </section>

      {/* 3. BLANK CONTENT CONTAINER */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
