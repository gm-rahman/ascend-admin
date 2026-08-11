"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useTheme } from "@/hooks/use-theme";
import { AscendLogo } from "@/components/ascend-logo";
import {
  Shield,
  Users,
  ClipboardList,
  Compass,
  Apple,
  Stethoscope,
  Landmark,
  Moon,
  Sun,
  LogOut,
  Brain,
} from "lucide-react";

// role.id doubles as the /dashboard/<id> route slug — keep it in sync with
// the folder under src/app/dashboard/. role.name is display-only and must
// never be used to derive a route (see handleSelectRole).
const roles = [
  { id: "admin", name: "Admin", icon: Shield, description: "System administration and configuration" },
  { id: "leadership", name: "Leadership", icon: Users, description: "Executive oversight and command metrics" },
  { id: "plan", name: "Plan", icon: ClipboardList, description: "Strategic planning and scheduling" },
  { id: "pc", name: "Purpose Coach", icon: Compass, description: "Spiritual/purpose readiness — opt-in support pathway" },
  { id: "nutritionist", name: "Nutritionist", icon: Apple, description: "Nutritional tracking and planning" },
  { id: "mp", name: "MP", icon: Brain, description: "Mental performance coaching and readiness" },
  { id: "pt-im", name: "PT/IM", icon: Stethoscope, description: "Physical therapy and readiness" },
  { id: "scs", name: "SCS", icon: Landmark, description: "Support command services" },
];

export default function RolesPage() {
  const router = useRouter();
  const { isAuthenticated, setSelectedRole, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Protect the route: if not authenticated, redirect to /
  useEffect(() => {
    if (hasMounted && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, hasMounted, router]);

  // Route by role.id (already the exact /dashboard/<id> slug), not
  // role.name — display names like "Purpose Coach" are not URL-safe and
  // must never be transformed into a route.
  const handleSelectRole = (roleId: string) => {
    setSelectedRole(roleId);
    router.push(`/dashboard/${roleId}`);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!hasMounted || !isAuthenticated) {
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
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Role directory</span>
        </div>

        {/* Right Action Menu */}
        <div className="flex items-center gap-6">
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex size-8 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#070a13] hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all duration-200 cursor-pointer"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            type="button"
          >
            {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>

          {/* Workspace Directory Link with Status Dot */}
          <button 
            className="group relative flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors duration-200 cursor-pointer"
            type="button"
          >
            WORKSPACE DIRECTORY
            {/* Blinking Red Dot on Workspace Directory */}
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-1.5 rounded-full bg-red-500"></span>
            </span>
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

      {/* 3. MAIN CONTAINER */}
      <main className="flex-1 flex flex-col justify-between p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full py-6 flex-1 flex flex-col justify-center">
          
          {/* Title Area */}
          <div className="text-center space-y-2 mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-color)] select-none">
              SECURE ACCESS DIRECTORY
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white sm:text-4xl">
              Select Your Role
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              Please choose your authorized workspace directory to enter the dedicated operations dashboard.
            </p>
          </div>

          {/* Role Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => handleSelectRole(role.id)}
                  className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0e1628] text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--brand-color)/50] dark:hover:border-[var(--brand-color)/50] transition-all duration-200 cursor-pointer"
                  type="button"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-[#070a13] border border-slate-100 dark:border-white/5 text-[var(--brand-color)] mb-3 group-hover:scale-105 transition-transform duration-200">
                    <Icon className="size-6 text-[var(--brand-color)]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-1 group-hover:text-[var(--brand-color)] dark:group-hover:text-[var(--brand-color)] transition-colors duration-200">
                    {role.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {role.description}
                  </p>
                </button>
              );
            })}
          </div>

        </div>

        {/* Footer links */}
        <footer className="mt-8 flex flex-wrap justify-between items-center border-t border-slate-200 dark:border-white/5 pt-4 text-xs text-slate-500 dark:text-slate-400 max-w-6xl mx-auto w-full flex-shrink-0">
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors duration-150">Privacy</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors duration-150">Terms</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors duration-150">Accessibility</a>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-150 cursor-pointer"
            type="button"
          >
            <LogOut className="size-3.5" />
            DISCONNECT SESSION
          </button>
        </footer>
      </main>

    </div>
  );
}
