"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Moon, Sun, ScrollText } from "lucide-react";
import { AscendLogo } from "@/components/ascend-logo";

const sections = [
  {
    title: "1. Eligibility & Account Access",
    body: "Ascend is a closed, role-based system. Accounts are issued by an authorized administrator and tied to a single role. You agree to use only the credentials issued to you and to notify your administrator immediately if you suspect unauthorized access.",
  },
  {
    title: "2. Acceptable Use",
    body: "You agree to use Ascend solely for its intended operational purpose — supporting readiness workflows for the population you are authorized to serve. You will not attempt to access data outside your population scope, bypass consent or authorization gates, reverse-engineer the Platform, or use Ascend to store or transmit classified information.",
  },
  {
    title: "3. Controlled Unclassified Information (CUI)",
    body: "Ascend is marked CUI // OPSEC and is not a Government System of Record. You are responsible for handling all data within Ascend in accordance with applicable CUI marking, distribution statements, and OPSEC guidelines. Do not enter information that requires a higher classification or handling caveat than the field's design supports.",
  },
  {
    title: "4. Privacy, Consent & Population Scope",
    body: "Every record in Ascend is bound to a population scope (Individual, Assigned Caseload, Cohort, Unit, Organization) and a privacy state (Opted In, Consent Withdrawn, Authorization Required, Access Denied). You agree to honor these controls. Where a record requires consent, you will not view or act on it without an active, documented consent grant.",
  },
  {
    title: "5. Audit & Monitoring",
    body: "Activity in Ascend is logged for security, compliance, and operational review. By using the Platform, you acknowledge that your actions — including sign-ins, record views, edits, and exports — may be reviewed by authorized personnel.",
  },
  {
    title: "6. Account Deactivation",
    body: "Your administrator may deactivate your account if your role changes, your assignment ends, or a policy violation is identified. Deactivated accounts cannot sign in and lose access to in-flight workspaces.",
  },
  {
    title: "7. Disclaimer",
    body: "The Platform is provided “as is” for operational readiness support. It is not a substitute for medical, legal, or personnel systems of record, and it does not constitute official policy of any government or organization.",
  },
  {
    title: "8. Changes to These Terms",
    body: "We may update these Terms to reflect changes in the Platform, applicable policy, or operational need. Material changes will be communicated through the Platform or your administrator. Continued use after an update constitutes acceptance.",
  },
];

export default function TermsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

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

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 md:px-10">
          <Link href="/" className="flex items-center gap-2.5">
            <AscendLogo width={24} height={24} showDetails={false} />
            <span className="text-base font-semibold tracking-tight text-foreground">
              Ascend
            </span>
          </Link>

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
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition-all duration-200 hover:border-border-strong hover:bg-surface-muted"
            >
              <ArrowLeft className="size-3.5" />
              Back
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-[var(--brand-color)]">
              <ScrollText className="size-5" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-color)]">
              Legal
            </p>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.02em] text-balance text-foreground md:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted">
            Last updated · September 6, 2026
          </p>

          <p className="mt-10 text-base leading-relaxed text-muted">
            These Terms & Conditions govern your access to and use of Ascend
            (the &ldquo;Platform&rdquo;), an operations console provided by the Ascend
            program office. By creating an account, signing in, or otherwise
            interacting with the Platform, you agree to be bound by these Terms.
          </p>

          <div className="mt-12 space-y-10 border-t border-border pt-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 px-6 py-8 text-xs text-muted md:flex-row md:items-center md:px-10">
          <p>© {new Date().getFullYear()} Ascend Program Office · All rights reserved.</p>
          <div className="flex items-center gap-5 font-medium">
            <Link href="/terms" className="text-foreground">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
