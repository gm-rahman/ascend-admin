"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { AscendLogo } from "@/components/ascend-logo";
import {
  Home,
  Sliders,
  TrendingUp,
  FileText,
  Layers,
  ChevronDown,
  Bell,
  Sun,
  Moon,
  Shield,
  Activity,
  ArrowLeft,
  LogOut,
  Info,
  CheckCircle,
  AlertTriangle,
  Download,
  Calendar,
  Plus,
  Send,
  Search,
  ClipboardList,
  User,
  Users,
} from "lucide-react";

type TabType = "dashboard" | "assignment" | "reconditioning";

export default function PlanDashboard() {
  const router = useRouter();
  const { isAuthenticated, logout, setSelectedRole } = useAuthStore();
  const [activeTabInternal, setActiveTabInternal] = useState<TabType>("dashboard");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hasMounted, setHasMounted] = useState(false);
  const [showConfirmToast, setShowConfirmToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowConfirmToast(true);
    setTimeout(() => setShowConfirmToast(false), 3000);
  };

  const setActiveTab = (tab: TabType) => {
    setActiveTabInternal(tab);
    if (typeof window !== "undefined") {
      localStorage.setItem("ascend_plan_active_tab", tab);
    }
  };

  const activeTab = activeTabInternal;

  // Load persistent active tab on client mount
  useEffect(() => {
    const savedTab = localStorage.getItem("ascend_plan_active_tab") as TabType | null;
    if (savedTab && ["dashboard", "assignment", "reconditioning"].includes(savedTab)) {
      setActiveTabInternal(savedTab);
    }
  }, []);

  // Protect route & check mount
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Protect the route: if not authenticated, redirect to /
  useEffect(() => {
    if (hasMounted && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, hasMounted, router]);

  // Sync theme with local storage & document element
  useEffect(() => {
    const savedTheme = localStorage.getItem("ascend_admin_theme") as "light" | "dark" | null;
    let initialTheme: "light" | "dark" = "light";
    if (savedTheme) {
      initialTheme = savedTheme;
    }
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    
    const timer = setTimeout(() => {
      setTheme(initialTheme);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("ascend_admin_theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
    router.push("/roles");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!hasMounted || !isAuthenticated) return null;

  return (
    <div className="flex h-screen w-screen bg-[#f0f4f9] dark:bg-[#070a13] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200 overflow-hidden">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-[#0e1628] flex flex-col justify-between border-r border-slate-200 dark:border-white/5 flex-shrink-0 z-30">
        <div>
          {/* Brand logo wrapper */}
          <div className="p-5 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#0da2b3]"></span>
              <span className="text-sm font-black tracking-tight text-slate-800 dark:text-white uppercase font-sans">
                Plan · Wing
              </span>
            </div>
          </div>

          {/* Navigation Title */}
          <div className="px-5 pt-6 pb-2 text-[10px] font-bold text-slate-400 tracking-widest uppercase font-sans">
            Plans
          </div>

          {/* Navigation Items */}
          <nav className="px-3 space-y-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer text-left ${
                activeTab === "dashboard"
                  ? "bg-[#0da2b3]/10 text-[#0da2b3] dark:text-[#0da2b3]"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-55/40 dark:hover:bg-slate-900/60"
              }`}
            >
              <ClipboardList className="size-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("assignment")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer text-left ${
                activeTab === "assignment"
                  ? "bg-[#0da2b3]/10 text-[#0da2b3] dark:text-[#0da2b3]"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-55/40 dark:hover:bg-slate-900/60"
              }`}
            >
              <Layers className="size-4" />
              Assignment
            </button>
            <button
              onClick={() => setActiveTab("reconditioning")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer text-left ${
                activeTab === "reconditioning"
                  ? "bg-[#0da2b3]/10 text-[#0da2b3] dark:text-[#0da2b3]"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-55/40 dark:hover:bg-slate-900/60"
              }`}
            >
              <Activity className="size-4" />
              Reconditioning
            </button>
          </nav>
        </div>

        {/* User Session Controls */}
        <div className="p-4 border-t border-slate-200 dark:border-white/5 space-y-2">
          <button
            onClick={handleBackToRoles}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-550 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            Back to roles
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:text-red-650 hover:bg-red-55/20 dark:hover:bg-red-950/20 transition cursor-pointer"
          >
            <LogOut className="size-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* RIGHT WORKSPACE WRAPPER */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* 1. TOP HEADER BAR */}
        <header className="flex h-14 w-full items-center justify-between border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#0e1628] px-6 md:px-8 flex-shrink-0 z-20">
          <div className="flex items-center gap-2">
            <AscendLogo width={20} height={20} showDetails={false} />
            <span className="text-sm font-semibold tracking-tight text-slate-800 dark:text-white">Ascend</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-light select-none">/</span>
            <span className="text-xs font-medium text-slate-550 dark:text-slate-400">Plan</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-slate-200 dark:border-white/5 pr-6">
              <button className="relative p-1.5 text-slate-400 hover:text-slate-655 dark:hover:text-white transition cursor-pointer">
                <Bell className="size-4.5" />
                <span className="absolute top-1 right-1 size-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0e1628]"></span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-1.5 text-slate-400 hover:text-slate-655 dark:hover:text-white transition cursor-pointer"
              >
                {theme === "light" ? <Moon className="size-4.5" /> : <Sun className="size-4.5" />}
              </button>
            </div>

            {/* Profile context */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800 dark:text-white block">Lt Col A. Park</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block leading-tight">Plan · Wing scheduler</span>
              </div>
              <div className="size-8 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 font-sans font-black text-xs flex items-center justify-center select-none">
                AP
              </div>
            </div>
          </div>
        </header>

        {/* 2. CUI ALERT STRIP */}
        <div className="h-6 w-full bg-slate-900 border-b border-slate-800 flex items-center justify-center px-6 text-[9px] font-mono tracking-wider text-slate-400 flex-shrink-0 select-none z-10">
          <span className="text-amber-500 mr-2 font-black">•</span>
          CUI // OPSEC · Plan dashboard · cross-persona coordination
        </div>

        {/* 3. WORKSPACE CONTAINER */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc] dark:bg-[#070a13] px-6 py-8 md:px-8 space-y-8">
          
          {/* Tab 1: MAIN DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in pb-16">
              
              {/* Heading Section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">PLAN · DASHBOARD</p>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-855 dark:text-white">Plan dashboard</h1>
                  <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">
                    KPIs, recent plans, assignment queue, and coordination activity across all linked workspaces.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => triggerToast("Opening full scheduling overview")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-655 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => triggerToast("Creating new custom readiness plan")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0da2b3] hover:bg-[#0c8a99] text-white rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    <Plus className="size-4" /> New plan
                  </button>
                </div>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { name: "Active plans", count: "24", desc: "across 3 flights" },
                  { name: "Awaiting assignment", count: "6", desc: "drafted, not routed" },
                  { name: "In reconditioning", count: "8", desc: "multi-specialist" },
                  { name: "Cross-persona", count: "12", desc: "touching \u2265 2 roles" }
                ].map((kpi, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm space-y-3 text-left">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-555 block uppercase tracking-wider">{kpi.name}</span>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white leading-none">{kpi.count}</h2>
                    <p className="text-[10px] text-slate-500 font-mono">{kpi.desc}</p>
                  </div>
                ))}
              </div>

              {/* Cross-Persona Routing columns */}
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/5 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">CROSS-PERSONA ROUTING</span>
                    <h3 className="text-lg font-bold text-slate-855 dark:text-white">Active plans by owner</h3>
                    <p className="text-xs text-slate-500">Each plan is owned by at least one role &middot; moves through the linked workspaces</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full text-[9px] font-bold text-slate-500 uppercase">
                      <span className="size-1.5 rounded-full bg-slate-900 dark:bg-white"></span>
                      5 workspaces
                    </span>
                    <button
                      onClick={() => triggerToast("Opening general assignments queue")}
                      className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
                    >
                      Open assignment
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 items-start">
                  
                  {/* SCS Column */}
                  <div className="space-y-3 bg-white/40 dark:bg-slate-950/10 border border-slate-200/50 dark:border-white/5 p-3 rounded-2xl">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-extrabold text-slate-800 dark:text-white font-sans">SCS</span>
                      <span className="text-[10px] text-slate-400 font-mono">12</span>
                    </div>

                    <div className="space-y-3">
                      {[
                        { title: "4-week recovery · Bravo", desc: "Recovery · wk 2 of 4", badge: "Strength", k: "k=24" },
                        { title: "OFT prep · Alpha", desc: "Strength · wk 3 of 6", badge: "Strength", k: "k=22" },
                        { title: "Mobility block · Charlie", desc: "Active · wk 1 of 4", badge: "Mobility", k: "k=20" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/5 rounded-xl p-3.5 shadow-sm space-y-2 text-left">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{item.title}</h4>
                          <p className="text-[10px] text-slate-455 block">{item.desc}</p>
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase">{item.badge}</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-bold text-slate-400 font-mono uppercase">{item.k}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PT/IM Column */}
                  <div className="space-y-3 bg-white/40 dark:bg-slate-950/10 border border-slate-200/50 dark:border-white/5 p-3 rounded-2xl">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-extrabold text-slate-800 dark:text-white font-sans">PT/IM</span>
                      <span className="text-[10px] text-slate-400 font-mono">6</span>
                    </div>

                    <div className="space-y-3">
                      {[
                        { title: "Lower-back return-to-duty", desc: "Caseload · wk 3 of 6", badge: "Rehab", k: "k=8" },
                        { title: "Pre-OFT clearance", desc: "Active · wk 1", badge: "Clearance", k: "k=14" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/5 rounded-xl p-3.5 shadow-sm space-y-2 text-left">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{item.title}</h4>
                          <p className="text-[10px] text-slate-455 block">{item.desc}</p>
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase">{item.badge}</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-bold text-slate-400 font-mono uppercase">{item.k}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mental Perf Column */}
                  <div className="space-y-3 bg-white/40 dark:bg-slate-950/10 border border-slate-200/50 dark:border-white/5 p-3 rounded-2xl">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-extrabold text-slate-800 dark:text-white font-sans">Mental Perf</span>
                      <span className="text-[10px] text-slate-400 font-mono">4</span>
                    </div>

                    <div className="space-y-3">
                      {[
                        { title: "Stress & sleep reset", desc: "Opt-in · wk 2 of 4", badge: "Mental", k: "k=12" },
                        { title: "Pre-deployment briefing", desc: "One-off · complete", badge: "Brief", k: null }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/5 rounded-xl p-3.5 shadow-sm space-y-2 text-left">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{item.title}</h4>
                          <p className="text-[10px] text-slate-455 block">{item.desc}</p>
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase">{item.badge}</span>
                            {item.k && <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-bold text-slate-400 font-mono uppercase">{item.k}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nutrition Column */}
                  <div className="space-y-3 bg-white/40 dark:bg-slate-950/10 border border-slate-200/50 dark:border-white/5 p-3 rounded-2xl">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-extrabold text-slate-800 dark:text-white font-sans">Nutrition</span>
                      <span className="text-[10px] text-slate-400 font-mono">3</span>
                    </div>

                    <div className="space-y-3">
                      {[
                        { title: "Hydration ramp", desc: "Caseload · wk 1 of 4", badge: "Hydration", k: "k=18" },
                        { title: "Nutrition prep · OFT", desc: "Active · wk 2", badge: "Nutrition", k: null }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/5 rounded-xl p-3.5 shadow-sm space-y-2 text-left">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{item.title}</h4>
                          <p className="text-[10px] text-slate-455 block">{item.desc}</p>
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase">{item.badge}</span>
                            {item.k && <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-bold text-slate-400 font-mono uppercase">{item.k}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Purpose Column */}
                  <div className="space-y-3 bg-white/40 dark:bg-slate-950/10 border border-slate-200/50 dark:border-white/5 p-3 rounded-2xl">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-extrabold text-slate-800 dark:text-white font-sans">Purpose</span>
                      <span className="text-[10px] text-slate-400 font-mono">2</span>
                    </div>

                    <div className="space-y-3">
                      {[
                        { title: "Mission purpose cohort", desc: "Opt-in · wk 3", badge: "Purpose", k: "k=10" },
                        { title: "Pre-deployment purpose", desc: "Active · wk 1", badge: "Purpose", k: null }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/5 rounded-xl p-3.5 shadow-sm space-y-2 text-left">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{item.title}</h4>
                          <p className="text-[10px] text-slate-455 block">{item.desc}</p>
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase">{item.badge}</span>
                            {item.k && <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-bold text-slate-400 font-mono uppercase">{item.k}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Columns: Recent plans & Assignment queue */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-200 dark:border-white/5 text-left">
                
                {/* Recent plans list */}
                <div className="lg:col-span-7 bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4 mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-855 dark:text-white font-sans">Recent plans</h3>
                      <p className="text-[10px] text-slate-455 mt-0.5">Last 6 &middot; any status</p>
                    </div>
                    <button 
                      onClick={() => triggerToast("Showing all historical readiness plans")}
                      className="px-3 py-1 border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-bold text-slate-655 dark:text-slate-350 hover:bg-slate-55 dark:hover:bg-slate-900 transition cursor-pointer"
                    >
                      View all
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="pb-3 w-1/3">Plan</th>
                          <th className="pb-3">Owners</th>
                          <th className="pb-3">Cohort</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Updated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                        {[
                          { title: "4-week recovery · Bravo", desc: "Recovery · strength", owners: "SCS · PT/IM", k: "k=24", status: "Active", col: "green", time: "28 Jul · 06:00" },
                          { title: "Stress & sleep reset", desc: "Mental · 4-week", owners: "Mental Perf · SCS", k: "k=12", status: "Opt-in", col: "teal", time: "27 Jul · 22:18" },
                          { title: "Hydration ramp · Foxtrot", desc: "Nutrition · 4-week", owners: "Nutrition · SCS", k: "k=18", status: "Active", col: "green", time: "27 Jul · 14:55" },
                          { title: "Pre-deployment purpose", desc: "Purpose · one-off", owners: "Purpose · SCS", k: "k=10", status: "Active", col: "green", time: "26 Jul · 11:03" },
                          { title: "Mission purpose cohort", desc: "Purpose · 6-week", owners: "Purpose · SCS", k: "k=10", status: "Opt-in", col: "teal", time: "25 Jul · 09:14" },
                          { title: "OFT prep · Alpha", desc: "Strength · 6-week", owners: "SCS · PT/IM", k: "k=22", status: "Active", col: "green", time: "24 Jul · 07:00" }
                        ].map((p, idx) => (
                          <tr key={idx} className="hover:bg-slate-55/20 transition">
                            <td className="py-3.5">
                              <span className="font-bold text-slate-800 dark:text-white block">{p.title}</span>
                              <span className="text-[10px] text-slate-455 mt-0.5 block font-sans">{p.desc}</span>
                            </td>
                            <td className="py-3.5 text-slate-700 dark:text-slate-300 font-bold font-sans">{p.owners}</td>
                            <td className="py-3.5 text-slate-500 font-mono">{p.k}</td>
                            <td className="py-3.5">
                              <span className={`inline-flex items-center gap-1.5 font-bold text-[9px] uppercase ${
                                p.col === "green" ? "text-emerald-500" : "text-[#0da2b3]"
                              }`}>
                                <span className={`size-1.5 rounded-full ${p.col === "green" ? "bg-emerald-500" : "bg-[#0da2b3]"}`}></span>
                                {p.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-slate-500 font-mono text-[10px]">{p.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Assignment queue */}
                <div className="lg:col-span-5 bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4 mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-855 dark:text-white font-sans">Assignment queue</h3>
                      <p className="text-[10px] text-slate-455 mt-0.5">Plans drafted, awaiting routing</p>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded-full uppercase">
                      6 open
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: "Recovery block · Charlie", desc: "Authored · needs SCS + PT/IM owner · 6d", badge: "6d", col: "orange" },
                      { title: "Sleep reset · Bravo", desc: "Authored · needs Mental Performance · 3d", badge: "3d", col: "orange" },
                      { title: "Nutrition prep · OFT", desc: "Authored · needs Nutrition + SCS · 2d", badge: "2d", col: "teal" },
                      { title: "Pre-deployment brief", desc: "Authored · needs Purpose + SCS · 1d", badge: "1d", col: "teal" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-4 p-3.5 bg-[#f8fafc] dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-xl hover:shadow-sm transition cursor-pointer">
                        <div className="space-y-0.5 text-left">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white font-sans">{item.title}</h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">{item.desc}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                          item.col === "orange" ? "bg-amber-500/15 text-amber-600" : "bg-[#0da2b3]/15 text-[#0c8a99]"
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sub footnote */}
              <div className="text-[10px] text-slate-400 select-none font-mono text-left">
                PR-W · Plan dashboard · governance 3/3 PASS
              </div>

            </div>
          )}

          {/* Tab 2: ASSIGNMENT */}
          {activeTab === "assignment" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">PLAN · ASSIGNMENT QUEUE</p>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-855 dark:text-white">Assignments</h1>
                <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">
                  Approve and route cross-persona plans awaiting assignment roles.
                </p>
              </div>

              <div className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-855 dark:text-white">Pending Assignments</h3>
                <p className="text-xs text-slate-550">Assignments automatically generated from cohort triggers where k &ge; 5 is satisfied.</p>
                <div className="border-t border-slate-100 dark:border-white/5 pt-4 text-xs text-slate-400 font-mono">
                  No active custom assignments currently pending authorization.
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: RECONDITIONING */}
          {activeTab === "reconditioning" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">PLAN · RECONDITIONING HUB</p>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-855 dark:text-white">Reconditioning registry</h1>
                <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">
                  Review flight-level reconditioning plans, progression loops, and caseload statistics.
                </p>
              </div>

              <div className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-855 dark:text-white">Multi-Specialist Activity</h3>
                <p className="text-xs text-slate-550">Track collaborative return-to-duty workflows across SCS, PT/IM, and Nutrition.</p>
                <div className="border-t border-slate-100 dark:border-white/5 pt-4 text-xs text-slate-400 font-mono">
                  All active cohorts are current. Next scheduled review on August 1st.
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* TOAST NOTIFICATION */}
      {showConfirmToast && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-slide-up border border-slate-800 dark:border-white/5 font-sans">
          <CheckCircle className="size-4 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
