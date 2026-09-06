"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Mail,
  Loader2,
  Sparkles,
  Eye,
  Database,
  KeyRound,
  Shield,
  Moon,
  Sun,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { AscendLogo } from "@/components/ascend-logo";
import { AscendBanner } from "@/components/ascend-banner";
import { roles } from "@/lib/roles";

type SectionId = "mission" | "capabilities" | "roles" | "contact";

const navLinks: { id: SectionId; label: string }[] = [
  { id: "mission", label: "Mission" },
  { id: "capabilities", label: "Capabilities" },
  { id: "roles", label: "Workspaces" },
  { id: "contact", label: "Contact" },
];

export default function LandingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "sent">("idle");

  useEffect(() => {
    const savedTheme = localStorage.getItem("ascend_admin_theme") as "light" | "dark" | null;
    const initialTheme: "light" | "dark" = savedTheme ?? "light";
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    const timer = setTimeout(() => setTheme(initialTheme), 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("ascend_admin_theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const scrollToSection = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactName.trim() || !isValidEmail(contactEmail) || !contactMessage.trim()) {
      return;
    }
    setContactStatus("submitting");
    setTimeout(() => {
      setContactStatus("sent");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setTimeout(() => setContactStatus("idle"), 4000);
    }, 900);
  };

  const capabilities: { icon: LucideIcon; title: string; body: string }[] = [
    {
      icon: Compass,
      title: "Assessed readiness, every day",
      body: "Continuous signals across physical, mental, nutritional, and purpose domains — surfaced for the right role at the right time.",
    },
    {
      icon: Eye,
      title: "Privacy-first by default",
      body: "Population scope and consent state are stamped on every record. Restricted data stays restricted until authorization is granted.",
    },
    {
      icon: Shield,
      title: "OPSEC-aware workflows",
      body: "CUI/OPSEC markings, explicit handling banners, and a system-of-record disclaimer that never blurs the line.",
    },
    {
      icon: Database,
      title: "Typed, auditable data",
      body: "Zod-validated contracts, immutable audit trails, and a single glossary of approved terminology — no improvised labels.",
    },
    {
      icon: KeyRound,
      title: "Role-based workspaces",
      body: "Eight purpose-built workspaces — each scoped to its mission, with access gated by role, scope, and privacy state.",
    },
    {
      icon: Sparkles,
      title: "Designed to be extended",
      body: "Feature-based folders, Zustand stores, and a Tailwind theme ready to ship — without rewriting the shell.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans antialiased transition-colors duration-200 selection:bg-[var(--brand-color)]/20">
      {/* HEADER */}
      <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
          <Link href="/" className="flex items-center gap-2.5">
            <AscendLogo width={24} height={24} showDetails={false} />
            <span className="text-base font-semibold tracking-tight text-foreground">
              Ascend
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:bg-surface-muted hover:text-foreground cursor-pointer"
                type="button"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all duration-200 hover:border-border-strong hover:bg-surface-muted cursor-pointer"
              title={theme === "light" ? "Switch to dark" : "Switch to light"}
              type="button"
            >
              {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </button>
            <Link
              href="/signin"
              className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-all duration-200 hover:opacity-90"
            >
              Sign in
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="mission"
        className="relative overflow-hidden"
      >
        {/* Layered ambient backdrop */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--brand-color)]/8 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <div className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[var(--brand-color)]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur">
              <span className="size-1.5 rounded-full bg-[var(--brand-color)] shadow-[0_0_0_4px_var(--brand-color)]/15" />
              Ascend · Assess · Adapt · Ascent
            </div>

            <h1 className="mt-8 text-5xl font-semibold tracking-[-0.03em] text-balance text-foreground md:text-7xl">
              The operating system for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-br from-[var(--brand-color)] via-[#0da2b3] to-[#0c8a99] bg-clip-text text-transparent">
                  human readiness.
                </span>
                <span className="absolute bottom-1.5 left-0 right-0 -z-0 h-3 rounded-full bg-[var(--brand-color)]/15 blur-md" />
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              A console built for the work between moments — where the right role
              sees the right signal, with privacy and OPSEC honored by default.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signin"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                Open the workspace
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <button
                onClick={() => scrollToSection("capabilities")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-border-strong hover:bg-surface-muted cursor-pointer"
                type="button"
              >
                See what&apos;s inside
              </button>
            </div>

            <div className="mt-14 flex flex-col items-center justify-center gap-6 text-xs font-medium text-muted sm:flex-row sm:gap-10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[var(--brand-color)]" />
                CUI-marked & OPSEC-aware
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[var(--brand-color)]" />
                Role-scoped workspaces
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[var(--brand-color)]" />
                Auditable, typed records
              </div>
            </div>
          </div>

          {/* Floating showcase card */}
          <div className="relative mx-auto mt-20 max-w-5xl">
            <div className="absolute -inset-x-6 -inset-y-6 -z-10 rounded-[2rem] bg-gradient-to-br from-[var(--brand-color)]/10 via-transparent to-transparent blur-2xl" />
            <div className="rounded-3xl border border-border bg-surface/80 p-2 shadow-2xl shadow-slate-900/5 backdrop-blur">
              <div className="rounded-[1.4rem] bg-gradient-to-br from-[#0a3339] via-[#114b53] to-[#1e6f77] p-8 md:p-12">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e2b13c]">
                      Mission statement
                    </p>
                    <p className="mt-3 max-w-xl text-2xl font-medium leading-snug text-white md:text-3xl">
                      &ldquo;Readiness is the work we do every day, not the moment we need it.&rdquo;
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                    <AscendBanner logoSize={56} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="relative border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-color)]">
                Capabilities
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-balance text-foreground md:text-5xl">
                Built around the mission — and the data.
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted">
              Every surface in Ascend reflects one idea: readiness is a continuous
              practice, not a moment. Assessed signals, auditable workflows, and a
              vocabulary that stays consistent across teams.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-color)]/40 hover:shadow-lg hover:shadow-[var(--brand-color)]/5"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-12 rounded-full bg-[var(--brand-color)]/0 blur-2xl transition-colors duration-500 group-hover:bg-[var(--brand-color)]/15" />

                  <div className="relative flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-[var(--brand-color)] transition-all duration-300 group-hover:border-[var(--brand-color)]/40 group-hover:bg-[var(--brand-color)]/10">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="relative mt-6 text-base font-semibold tracking-tight text-foreground">
                    {cap.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">
                    {cap.body}
                  </p>

                  <div className="relative mt-6 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-color)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Learn more
                    <ArrowUpRight className="size-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROLES / WORKSPACES */}
      <section id="roles" className="relative border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-color)]">
              Workspaces
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-balance text-foreground md:text-5xl">
              Eight workspaces. One mission.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
              Each role lands in a workspace purpose-built for its daily work —
              from admins wiring the system to specialists closing the loop with
              the people they serve.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
            {roles.map((role, i) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-color)]/40 hover:shadow-md"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--brand-color)]/10 text-[var(--brand-color)] transition-colors duration-300 group-hover:bg-[var(--brand-color)] group-hover:text-white">
                    <Icon className="size-4" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-foreground">
                    {role.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative border-t border-border/60 bg-surface/40"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-color)]">
                Get in touch
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-balance text-foreground md:text-5xl">
                Request access or talk to the team.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                New accounts are provisioned by your local administrator. Reach
                out for general inquiries, partnerships, or to flag an issue with
                the platform.
              </p>

              <div className="mt-10 space-y-4">
                <a
                  href="mailto:support@ascend.mil"
                  className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-all duration-200 hover:border-[var(--brand-color)]/40 hover:shadow-sm"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--brand-color)]/10 text-[var(--brand-color)]">
                    <Mail className="size-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                      Email
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      support@ascend.mil
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 text-muted transition-all duration-200 group-hover:text-[var(--brand-color)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--brand-color)]/10 text-[var(--brand-color)]">
                    <Shield className="size-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                      Handling
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      CUI // OPSEC — no classified info.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleContactSubmit}
                className="rounded-3xl border border-border bg-background p-7 shadow-sm md:p-10"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Full name
                    </label>
                    <input
                      id="contact-name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted/50 transition-all duration-150 focus:outline-none focus:border-[var(--brand-color)] focus:ring-4 focus:ring-[var(--brand-color)]/10"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="name@ascend.mil"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted/50 transition-all duration-150 focus:outline-none focus:border-[var(--brand-color)] focus:ring-4 focus:ring-[var(--brand-color)]/10"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={5}
                    placeholder="How can we help?"
                    className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted/50 transition-all duration-150 focus:outline-none focus:border-[var(--brand-color)] focus:ring-4 focus:ring-[var(--brand-color)]/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactStatus === "submitting"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {contactStatus === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending...
                    </>
                  ) : contactStatus === "sent" ? (
                    <>
                      <CheckCircle2 className="size-4" />
                      Message sent
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <AscendLogo width={28} height={28} showDetails={true} />
              <div>
                <p className="text-sm font-semibold tracking-tight text-foreground">
                  Ascend
                </p>
                <p className="text-xs text-muted">Assess · Adapt · Ascent</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium text-muted">
              <button
                onClick={() => scrollToSection("mission")}
                className="transition-colors duration-150 hover:text-foreground cursor-pointer"
                type="button"
              >
                Mission
              </button>
              <button
                onClick={() => scrollToSection("capabilities")}
                className="transition-colors duration-150 hover:text-foreground cursor-pointer"
                type="button"
              >
                Capabilities
              </button>
              <button
                onClick={() => scrollToSection("roles")}
                className="transition-colors duration-150 hover:text-foreground cursor-pointer"
                type="button"
              >
                Workspaces
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="transition-colors duration-150 hover:text-foreground cursor-pointer"
                type="button"
              >
                Contact
              </button>
              <span className="h-4 w-px bg-border" />
              <Link
                href="/terms"
                className="transition-colors duration-150 hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="transition-colors duration-150 hover:text-foreground"
              >
                Privacy
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted md:flex-row md:items-center">
            <p>
              © {new Date().getFullYear()} Ascend Program Office · All rights reserved.
            </p>
            <p className="font-medium">
              CUI // OPSEC · Not a Government System of Record
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
