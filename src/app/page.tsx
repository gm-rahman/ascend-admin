"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  User,
  Moon,
  Sun,
  Clock,
  Lock,
  Loader2,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { AscendLogo } from "@/components/ascend-logo";
import { AscendBanner } from "@/components/ascend-banner";
import { useAuthStore } from "@/store/auth-store";
import {
  dashboardActivity,
  dashboardHighlights,
  projectRows,
} from "@/features/dashboard/data/mock-dashboard";

export default function Home() {
  const { isAuthenticated, login } = useAuthStore();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState(0);
  const [authMethod, setAuthMethod] = useState<"CAC" | "SSO">("CAC");

  // Sync theme with document class list
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    let initialTheme: "light" | "dark" = "light";

    if (savedTheme) {
      initialTheme = savedTheme;
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      initialTheme = prefersDark ? "dark" : "light";
    }

    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    
    // Set state asynchronously to avoid synchronous setState inside render/effect hook
    const timer = setTimeout(() => {
      setTheme(initialTheme);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleSignIn = (method: "CAC" | "SSO") => {
    setAuthMethod(method);
    setIsAuthenticating(true);
    setAuthStep(0);

    // Simulate multi-step secure login handshake
    const timer1 = setTimeout(() => setAuthStep(1), 500);
    const timer2 = setTimeout(() => setAuthStep(2), 1000);
    const timer3 = setTimeout(() => setAuthStep(3), 1500);
    const timer4 = setTimeout(() => {
      login();
      setIsAuthenticating(false);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  // If already authenticated, show the dashboard AppShell directly
  if (isAuthenticated) {
    return (
      <AppShell
        activity={dashboardActivity}
        highlights={dashboardHighlights}
        projects={projectRows}
      />
    );
  }

  // Secure Auth logs for simulated scanning
  const getAuthLogs = () => {
    const methodStr = authMethod === "CAC" ? "CAC / PIV Card" : "Unit SSO Token";
    switch (authStep) {
      case 0:
        return [
          `[INIT] Requesting tunnel authentication via ${methodStr}...`,
          `[CONN] Handshaking with secure government gateway...`,
        ];
      case 1:
        return [
          `[INIT] Requesting tunnel authentication via ${methodStr}...`,
          `[CONN] Handshaking with secure government gateway...`,
          `[AUTH] Accessing local security certificates...`,
          `[AUTH] Reading cryptographic signatures...`,
        ];
      case 2:
        return [
          `[INIT] Requesting tunnel authentication via ${methodStr}...`,
          `[CONN] Handshaking with secure government gateway...`,
          `[AUTH] Accessing local security certificates...`,
          `[AUTH] Reading cryptographic signatures...`,
          `[VERI] Signature verified. Running compliance checks...`,
          `[SECURE] Establishing secure session context (AES-256)...`,
        ];
      case 3:
      default:
        return [
          `[INIT] Requesting tunnel authentication via ${methodStr}...`,
          `[CONN] Handshaking with secure government gateway...`,
          `[AUTH] Accessing local security certificates...`,
          `[AUTH] Reading cryptographic signatures...`,
          `[VERI] Signature verified. Running compliance checks...`,
          `[SECURE] Establishing secure session context (AES-256)...`,
          `[OK] Authentication successful! Loading workspace...`,
        ];
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans transition-colors duration-200">
      
      {/* 1. TOP HEADER BAR */}
      <header className="flex h-14 w-full items-center justify-between border-b border-border bg-surface px-6 md:px-8">
        {/* Left Brand Badge */}
        <div className="flex items-center gap-2">
          <AscendLogo width={20} height={20} showDetails={false} />
          <span className="text-sm font-semibold tracking-tight text-foreground">Ascend</span>
          <span className="text-xs text-muted/60 font-light select-none">/</span>
          <span className="text-xs font-medium text-muted">Role directory</span>
        </div>

        {/* Right Action Menu */}
        <div className="flex items-center gap-6">
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex size-8 items-center justify-center rounded-lg border border-border bg-background hover:bg-surface-muted text-foreground transition-all duration-200 cursor-pointer"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            type="button"
          >
            {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>

          {/* Workspace Directory Link with Status Dot */}
          <button 
            className="group relative flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted hover:text-foreground transition-colors duration-200 cursor-pointer"
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
      <section className="flex h-9 w-full items-center justify-center bg-[#101b22] px-6 text-center text-[10px] font-semibold tracking-wider text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[#0da2b3]"></span>
          <span>CUI // OPSEC · Not a Government System of Record</span>
        </div>
      </section>

      {/* 3. SPLIT MAIN CONTAINER */}
      <main className="flex flex-1 flex-col lg:flex-row">
        
        {/* LEFT COLUMN: AUTH FORM */}
        <section className="flex flex-1 flex-col justify-between bg-slate-50/50 dark:bg-[#0b0f19]/30 p-8 sm:p-12 md:p-16 lg:max-w-[58%]">
          
          {/* Header/Greeting */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <AscendLogo width={36} height={36} showDetails={true} />
              <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">Ascend</h1>
                <p className="text-xs font-medium text-muted">Role directory</p>
              </div>
            </div>
          </div>

          {/* Simulated scanning / Login form panel */}
          <div className="my-auto max-w-lg py-8">
            {isAuthenticating ? (
              /* Simulated Handshake Scanner view */
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl dark:shadow-2xl/10 animate-fade-in">
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#0da2b3]/10 text-[#0da2b3]">
                    <Loader2 className="size-6 animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Secure Authentication</h3>
                    <p className="text-xs text-muted">Performing security checks...</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full bg-gradient-to-r from-[#0da2b3] to-[#e2b13c] transition-all duration-500 ease-out"
                    style={{ width: `${(authStep + 1) * 25}%` }}
                  />
                </div>

                {/* Tactical Terminal logs */}
                <div className="rounded-xl border border-border/80 bg-slate-950 p-4 font-mono text-[10px] leading-relaxed text-[#0da2b3]">
                  <div className="flex flex-col gap-1">
                    {getAuthLogs().map((log, idx) => (
                      <div key={idx} className="animate-fade-in">
                        <span className="text-slate-500 mr-1.5">[{new Date().toLocaleTimeString()}]</span>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Static Credentials Buttons View */
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#4f46e5] dark:text-[#818cf8]">
                    AUTHENTICATION
                  </p>
                  <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
                    Sign in
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Use your assigned identity provider. First-use continues into 20 onboarding questions, then drops you into your workspace.
                  </p>
                </div>

                {/* CAC/PIV Login Button */}
                <div className="flex flex-col gap-3 pt-4">
                  <button
                    onClick={() => handleSignIn("CAC")}
                    className="group flex w-full items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-muted hover:shadow-md cursor-pointer"
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-foreground group-hover:scale-105 transition-transform duration-200">
                        <Shield className="size-5 text-foreground" />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-foreground">Continue with CAC / PIV</span>
                        <span className="block text-[11px] text-muted">Common Access Card credential</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-muted group-hover:text-foreground transition-colors duration-200">▸</span>
                  </button>

                  {/* SSO Login Button */}
                  <button
                    onClick={() => handleSignIn("SSO")}
                    className="group flex w-full items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-muted hover:shadow-md cursor-pointer"
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-foreground group-hover:scale-105 transition-transform duration-200">
                        <User className="size-5 text-foreground" />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-foreground">Continue with Unit SSO</span>
                        <span className="block text-[11px] text-muted">Unified command portal sign-on</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-muted group-hover:text-foreground transition-colors duration-200">▸</span>
                  </button>
                </div>

                {/* Last Used Badge Widget */}
                <div className="mt-8 rounded-xl border border-[#0da2b3]/20 bg-[#0da2b3]/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex mt-0.5 size-5 items-center justify-center rounded-full bg-[#0da2b3]/10 text-[#0da2b3]">
                      <Clock className="size-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">Last used · CAC / PIV</span>
                        {/* Live blinking green active light */}
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted">
                        2 days ago from this device
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer links */}
          <footer className="mt-12 flex flex-wrap gap-6 border-t border-border/40 pt-6 text-xs text-muted">
            <a href="#" className="hover:text-foreground transition-colors duration-150">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors duration-150">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors duration-150">Accessibility</a>
          </footer>
        </section>

        {/* RIGHT COLUMN: GRAPHICS & MISSION GRADIENT */}
        <section className="relative flex flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1e6f77] via-[#114b53] to-[#0a3339] p-8 sm:p-12 md:p-16 text-white lg:min-h-screen">
          {/* Subtle grid mesh overlay overlay for tactical aesthetic */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

          {/* Soft ambient lighting effect in center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0da2b3]/15 blur-[80px] pointer-events-none" />

          {/* Top Branding Banner */}
          <div className="relative z-10">
            <AscendBanner logoSize={64} />
          </div>

          {/* Central Quote Section */}
          <div className="relative z-10 my-auto max-w-xl py-12">
            <h3 className="text-3xl font-medium leading-normal md:text-4xl text-white/95">
              “Readiness is the work we do every day, not the moment we need it.”
            </h3>
            <div className="mt-6 flex items-center gap-2.5 text-xs tracking-wider text-slate-300">
              <span className="font-semibold text-[#e2b13c]">Ascend</span>
              <span className="text-slate-500">•</span>
              <span>Mission statement</span>
            </div>
          </div>

          {/* Bottom Security Info */}
          <div className="relative z-10 flex items-center gap-2 text-[10px] font-semibold tracking-wider text-white/60">
            <Lock className="size-3.5 text-[#e2b13c]" />
            <span>CUI // OPSEC · Not a Government System of Record</span>
          </div>
        </section>

      </main>
    </div>
  );
}
