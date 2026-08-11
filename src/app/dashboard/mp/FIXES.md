# MP Dashboard — Fixes Required

Generated: 2026-08-11
Source: ASCEND-SPEC.md (canonical/1. Final Ascend App Requirements (AC).docx)
Target: src/app/dashboard/mp/page.tsx (1,544 lines)

---

## CRITICAL: Spec Violations

### Fix 1: Replace localStorage Tab Routing with URL Query Parameters

**Spec Reference**: Section 11 (Acceptance Checklist) — navigable, auditable state expected across all modules.

**Current Behavior**: Tabs are persisted to `localStorage` (`ascend_mp_active_tab` key, line 93). Direct navigation and bookmarking are impossible.

**Changes Required**:
1. Import `useSearchParams` and `useRouter` from `next/navigation`.
2. On mount, read the `tab` query parameter first; fall back to `localStorage` for backward compatibility.
3. Replace `setActiveTab()` calls with `router.push(\`/dashboard/mp?tab=${tab}\`)`.
4. Remove the `localStorage.setItem` call in `setActiveTab`.
5. Add a `useEffect` that watches `searchParams.get('tab')` and updates `activeTabInternal` synchronously.

**Code Impact**:
- Remove line 93: `localStorage.setItem("ascend_mp_active_tab", tab)`
- Remove lines 100–105: the localStorage-read `useEffect`
- Add `const params = useSearchParams()` near the top of the component
- Add `const push = router.push`
- Update `setActiveTab` to call `push(\`/dashboard/mp?tab=${tab}\`)`
- On mount, read `params.get('tab')` first

**⚠️ CORRECTION (verified against `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md`, Next 16.2.12 installed in this repo)**:
This repo has no `middleware.ts` and no route sets `export const dynamic = "force-dynamic"`, so `/dashboard/mp` is statically prerendered by default. Calling `useSearchParams()` anywhere in `mp/page.tsx` as originally written above — a component with no ancestor `<Suspense>` boundary — will pass in dev but **fail `next build`** with the "Missing Suspense boundary with `useSearchParams`" error.
Fix: this task must ship together with Fix 5 (layout extraction). In the new `mp/layout.tsx`, wrap `{children}` in `<Suspense>`:
```tsx
import { Suspense } from "react";
// ...
<Suspense fallback={null}>{children}</Suspense>
```
The `useSearchParams()` call must live in `page.tsx` (a descendant of that boundary), not in `layout.tsx` itself. Do not implement Fix 1 before Fix 5's layout wrapper exists, or the build will break.

---

### Fix 2: Add Missing Columns to Notes Table (Specialist Type, Action, Follow-Up)

**Spec Reference**: Section 8 (Specialist Notes & Boundaries) — notes must contain: `date`, `specialist type`, `user concern`, `action assigned`, `follow-up needed`, `status`.

**Current Behavior**: Notes list (lines 923–932) has columns: Airman, Session, Type, Focus, Risk, Status, Action. Missing: Specialist Type, Action Assigned, Follow-Up Needed.

**Changes Required**:
1. Update the table header (line 924) to add three new `<th>` elements:
   - `<th className="pb-3">Specialist</th>`
   - `<th className="pb-3">Action</th>`
   - `<th className="pb-3">Follow-Up</th>`
   - Adjust Action column to be narrower or merge with existing Action

2. Update every row object in the notes array (lines 936–945) to include:
   - `specialist: "MP"` or `"PT/IM"` or `"SCS"`
   - `action: "Sleep protocol"` or `"Stress management"` or `"—"`
   - `followUp: "28 Jul"` or `"This week"` or `"—"`

3. Update each `<td>` mapping to render the new fields.

**Data Changes (lines 936–945)** — Add to each row:
```typescript
{ code: "A-1042", ..., specialist: "MP", action: "Behavioral sleep protocol", followUp: "28 Jul" },
{ code: "A-1087", ..., specialist: "MP", action: "Stress management", followUp: "This week" },
{ code: "A-1101", ..., specialist: "MP", action: "Focus training", followUp: "30 Jul" },
{ code: "A-1218", ..., specialist: "MP", action: "Reset protocol", followUp: "26 Jul" },
{ code: "A-1356", ..., specialist: "MP", action: "—", followUp: "—" },
{ code: "A-1409", ..., specialist: "SCS", action: "Referral to MP", followUp: "—" },
{ code: "A-1042", ..., specialist: "MP", action: "Sleep protocol", followUp: "25 Jul" },
{ code: "A-1533", ..., specialist: "MP", action: "Team cohesion drill", followUp: "20 Jul" },
{ code: "A-1087", ..., specialist: "MP", action: "Stress management", followUp: "18 Jul" },
{ code: "A-1101", ..., specialist: "MP", action: "Focus training", followUp: "17 Jul" }
```

---

### Fix 3: Wire Mental Driver Scores to Check-In Data

**Spec Reference**: Section 1e (MP Practitioner) — "View Mental Readiness trends"; Section 4 (Check-In-to-Plan Mapping) — mental readiness is derived from Daily/Weekly/Monthly check-in responses; Section 11 — readiness trend direction (improving/stable/declining).

**Current Behavior**: "Mental driver scores" (lines 763–775) are static hardcoded numbers with no trend direction, no source attribution, and no connection to check-in data.

**Changes Required**:
1. Add a `trend` field to each driver object: `"improving" | "stable" | "declining"`.
2. Add a visual trend indicator (arrow or label) next to each score.
3. Add a source label indicating which check-in the data came from (Daily / Weekly / Monthly).
4. Add a timestamp showing when the score was last updated.

**Data Changes (lines 763–775)** — Add `trend`, `source`, `updated` to each:
```typescript
[
  { name: "Stress mgmt", score: 62, trend: "improving", source: "Weekly", updated: "27 Jul" },
  { name: "Focus", score: 71, trend: "stable", source: "Daily", updated: "28 Jul" },
  { name: "Sleep quality", score: 54, trend: "declining", source: "Daily", updated: "28 Jul" },
  { name: "Resilience", score: 68, trend: "stable", source: "Weekly", updated: "27 Jul" },
  { name: "Mood", score: 64, trend: "improving", source: "Monthly", updated: "20 Jul" },
  { name: "Connection", score: 73, trend: "stable", source: "Daily", updated: "28 Jul" }
]
```

**UI Changes (lines 771–774)**:
- Add a trend arrow icon next to the score (↑ for improving, → for stable, ↓ for declining)
- Color-code the arrow: green for improving, slate for stable, red for declining

---

### Fix 4: Add Mental-Performance Action Assignment UI

**Spec Reference**: Section 1e — "Assign reset/focus/stress-management actions"; Section 11 — "Scoring Configuration" (actions are pattern-based, threshold-driven, routed to specific ranks).

**Current Behavior**: Actions are mentioned only in a policy footer (lines 844–849). No UI exists to create, view, or track Mental-Performance Actions.

**Changes Required**:

#### 4a. Create an "Actions" tab in the sidebar

Add a new tab type `type TabType = "dashboard" | "notes" | "records" | "messages" | "actions"` and a new navigation button after Messages:

```tsx
<button
  onClick={() => setActiveTab("actions")}
  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer text-left ${
    activeTab === "actions"
      ? "bg-[var(--brand-color)/10] text-[var(--brand-color)]"
      : "text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-55/40 dark:hover:bg-slate-900/60"
  }`}
>
  <Sparkles className="size-4" />
  Actions
</button>
```

#### 4b. Create action data structure

Define an interface and mock data:

```typescript
interface MpAction {
  id: string;
  airmanCode: string;
  type: "reset" | "focus" | "stress-management";
  title: string;
  status: "assigned" | "accepted" | "completed" | "expired";
  assignedDate: string;
  dueDate: string;
  source: "check-in" | "weekly-review" | "monthly-review" | "manual";
  description: string;
}

const mockActions: MpAction[] = [
  { id: "ACT-001", airmanCode: "A-1042", type: "stress-management", title: "Behavioral Sleep Protocol", status: "assigned", assignedDate: "25 Jul", dueDate: "28 Jul", source: "check-in", description: "4-7-8 breathing, caffeine cutoff at 14:00, wind-down anchor" },
  { id: "ACT-002", airmanCode: "A-1087", type: "focus", title: "Pre-Deployment Focus Drill", status: "accepted", assignedDate: "27 Jul", dueDate: "03 Aug", source: "weekly-review", description: "Daily 10-min focus block, morning light exposure" },
  { id: "ACT-003", airmanCode: "A-1101", type: "reset", title: "Performance Anxiety Reset", status: "assigned", assignedDate: "26 Jul", dueDate: "30 Jul", source: "check-in", description: "Grounding exercise pre-simulation, visualization protocol" },
  { id: "ACT-004", airmanCode: "A-1218", type: "stress-management", title: "Initial Stress Baseline", status: "completed", assignedDate: "20 Jul", dueDate: "27 Jul", source: "manual", description: "Breathing script, sleep hygiene checklist" },
];
```

#### 4c. Render the Actions tab view

Add a conditional block after the Messages tab (`{activeTab === "messages" && (...)}`):

```tsx
{activeTab === "actions" && (
  <div className="space-y-8 animate-fade-in pb-16">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="text-left">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider font-sans">MENTAL PERFORMANCE · ACTIONS</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-855 dark:text-white font-sans">Mental-Performance Actions</h1>
        <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">
          Pattern-based actions routed to O7–O9, D3, W5–W6, M5–M6 only. Actions expire if not accepted within 72 hours.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => triggerToast("New action wizard initiated")}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0da2b3] hover:bg-[#0c8a99] text-white rounded-xl text-xs font-bold transition cursor-pointer"
        >
          <Plus className="size-4" /> New action
        </button>
      </div>
    </div>

    {/* Filter pills */}
    <div className="flex gap-2">
      {["All", "Assigned", "Accepted", "Completed", "Expired"].map((filter, idx) => (
        <button key={idx} className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition cursor-pointer ${
          filter === "All" ? "bg-[#0da2b3]/10 border-[#0da2b3]/30 text-[#0da2b3]" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-500 hover:text-slate-855"
        }`}>
          {filter}
        </button>
      ))}
    </div>

    {/* Action cards */}
    <div className="space-y-4">
      {mockActions.map((action) => (
        <div key={action.id} className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm text-left space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-slate-800 dark:text-white">{action.airmanCode}</span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                action.status === "assigned" ? "bg-amber-500/10 text-amber-500" :
                action.status === "accepted" ? "bg-sky-500/10 text-sky-500" :
                action.status === "completed" ? "bg-emerald-500/10 text-emerald-500" :
                "bg-slate-100 dark:bg-slate-900 text-slate-400"
              }`}>
                {action.status}
              </span>
            </div>
            <span className="text-[9px] text-slate-400 font-mono">{action.id}</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">{action.title}</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">{action.description}</p>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono">
            <span>Type: {action.type}</span>
            <span>Source: {action.source}</span>
            <span>Due: {action.dueDate}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
```

---

## HIGH: Structural & Quality Refactors

### Fix 5: Extract Shared Layout to `src/app/dashboard/mp/layout.tsx`

**Current Behavior**: `mp/page.tsx` manually implements auth guard (lines 107–117), theme sync (lines 119–139), sidebar (lines 156–240), header (lines 245–279), and CUI banner (lines 282–289).

**Changes Required**:
1. Create `src/app/dashboard/mp/layout.tsx` that manually replicates the MP-specific sidebar nav, header/title, and CUI strip, delegating auth/theme state to the hooks below.
2. In `mp/page.tsx`:
   - Delete lines 37–41 (theme state, hasMounted, setActiveTab state that belongs in layout)
   - Delete lines 107–117 (auth guard useEffect)
   - Delete lines 119–139 (theme sync useEffect, toggleTheme function)
   - Delete lines 153–289 (sidebar, header, CUI strip, right workspace wrapper)
   - Keep the `<main>` content (lines 292–1531) as the page body
   - Keep the toast notification (lines 1535–1540) at the top level

**⚠️ CORRECTION — "Wrap with `DashboardLayout`" is not viable, use the existing hooks instead**:
The original draft of this fix offered `DashboardLayout` (`@/components/layout/dashboard-layout.tsx`) as an alternative to manually rebuilding the header. That component only renders a generic top header bar (logo, role name, theme toggle, logout) — it has no sidebar, no per-tab nav items, and no CUI banner, so it cannot host MP's Dashboard/Notes/Records/Messages(/Actions) sidebar or the CUI strip. Do not swap it in as a drop-in replacement; manually replicating the sidebar/header/CUI strip (the second bullet above) is the only correct path.

However, this repo already has the shared hooks from the terminology/brand-color migration (`IMPLEMENTATION-PLAN.txt` Phase 1, confirmed present at `src/hooks/use-theme.ts` and `src/hooks/use-toast.ts`, and already wired into `DashboardLayout` itself). `mp/page.tsx` currently does **not** use either hook — despite `IMPLEMENTATION-TRACKER.txt` marking that integration as done for this file, the live code still has its own local `theme`/`toggleTheme`/`showConfirmToast` state (lines 40, 42–43, 69–73, 119–139). Layout extraction should resolve both problems at once by having the new `mp/layout.tsx` consume `useTheme()` and `mp/page.tsx` consume `useToast()`, rather than hand-rolling either again.

**Recommended approach**: Create a thin `mp/layout.tsx`:

```tsx
// src/app/dashboard/mp/layout.tsx
"use client";

import { ReactNode, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { AscendLogo } from "@/components/ascend-logo";
import { Bell, Sun, Moon, ArrowLeft, LogOut, Users, ClipboardList, Lock, MessageSquare, Sparkles } from "lucide-react";

export default function MpLayout({ children }: { children: ReactNode }) {
  const { theme, mounted, toggleTheme } = useTheme();
  // ... MP-specific sidebar, header, CUI strip (extracted from page.tsx)
  // Auth guard stays here too (mirror DashboardLayout's pattern)
  return (
    <div>
      {/* sidebar / header / CUI strip */}
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
```

`mp/page.tsx` should call `const { show, message, triggerToast } = useToast();` instead of keeping its own `showConfirmToast`/`toastMessage` state and inline `triggerToast` function (lines 42–43, 69–73). See Fix 1 for why the `<Suspense>` wrapper above is required.

---

### Fix 6: Isolate Inline Mock Data to `src/data/mp-mock-data.ts`

**Current Behavior**: 10+ inline arrays scattered across the component.

**Changes Required**:
1. Create `src/data/mp-mock-data.ts`.
2. Define named TypeScript interfaces for all data types.
3. Export constants for each dataset.

**Interfaces to define**:
```typescript
export interface CaseloadRow {
  code: string;
  reason: string;
  last: string;
  next: string;
  status: string;
  col: string;
}

export interface SoapNote {
  code: string;
  sessions: string;
  date: string;
  type: string;
  focus: string;
  risk: string;
  riskCol: string;
  status: string;
  statusCol: string;
  dot: string;
  specialist?: string;
  action?: string;
  followUp?: string;
}

export interface RecordRow {
  code: string;
  details: string;
  type: string;
  date: string;
  risk: string;
  col: string;
  status: string;
  statCol: string;
  red: string;
  isTarget?: boolean;
}

export interface ChatMessage {
  sender: "coach" | "airman";
  text: string;
  time: string;
  date: string;
}

export interface InboxItem {
  initials: string;
  name: string;
  time: string;
  txt: string;
  unread: number;
  active: boolean;
}

export interface DriverScore {
  name: string;
  score: number;
  trend: "improving" | "stable" | "declining";
  source: string;
  updated: string;
}

export interface TodaySession {
  time: string;
  label: string;
  badge: string;
  bCol: string;
}

export interface ReferralReason {
  label: string;
  val: number;
  pct: number;
}

export interface AuditLogEntry {
  time: string;
  actor: string;
  log: string;
}

export interface MpAction {
  id: string;
  airmanCode: string;
  type: "reset" | "focus" | "stress-management";
  title: string;
  status: "assigned" | "accepted" | "completed" | "expired";
  assignedDate: string;
  dueDate: string;
  source: "check-in" | "weekly-review" | "monthly-review" | "manual";
  description: string;
}
```

**Data constants to export**:
```typescript
export const mockCaseload: CaseloadRow[] = [ /* lines 707–714 */ ];
export const mockSoapNotes: SoapNote[] = [ /* lines 935–945 */ ];
export const mockRecords: RecordRow[] = [ /* lines 1134–1142 */ ];
export const mockChatMessages: ChatMessage[] = [ /* lines 62–67 */ ];
export const mockInboxItems: InboxItem[] = [ /* lines 1397–1402 */ ];
export const mockDriverScores: DriverScore[] = [ /* lines 763–770 */ ];
export const mockTodaySessions: TodaySession[] = [ /* lines 791–796 */ ];
export const mockReferralReasons: ReferralReason[] = [ /* lines 823–828 */ ];
export const mockAuditLogs: AuditLogEntry[] = [ /* lines 1207–1212 and others */ ];
export const mockActions: MpAction[] = [ /* from Fix 4b */ ];
```

**Code impact in `page.tsx`**: Replace every inline array with `import { mockXxx } from "@/data/mp-mock-data"`.

---

### Fix 7: Implement Responsive Breakpoints

**Current Behavior**: Grids use `lg:grid-cols-12` with no intermediate breakpoints. Tables overflow on mobile. Sidebar is fixed at `w-64`.

**Changes Required**:

1. **Sidebar collapse for mobile**:
   - Replace `w-64` with `w-64 hidden md:flex` on the sidebar
   - Add a mobile hamburger menu that opens a drawer or overlay on `<md` viewports
   - OR: Convert sidebar to a bottom tab bar on mobile (`hidden md:flex` sidebar + `flex md:hidden fixed bottom-0 w-full` nav)

2. **Table horizontal scroll**:
   - Ensure all tables have `overflow-x-auto` (already present in some places)
   - Add `min-w-[600px]` to tables to force scroll rather than squish on mobile

3. **Grid adjustments**:
   - Dashboard KPI grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (already done, good)
   - Caseload + widgets: `grid-cols-1 lg:grid-cols-12` → add `xl:grid-cols-12`
   - Note editor: `grid-cols-1 lg:grid-cols-12` → ensure left panel doesn't overflow on `md`
   - Messages inbox + chat: `grid-cols-1 lg:grid-cols-12` → stack vertically on mobile

4. **CUI strip**:
   - Reduce font size on mobile: `text-[9px] sm:text-[10px]`
   - Truncate long text: `truncate` or `max-w-xs`

---

### Fix 8: Replace Toast-Only Feedback with API-Ready State Handlers

**Current Behavior**: All state mutations (save note, send message, change risk level, toggle visibility) call `triggerToast()` for feedback. No actual state mutation or API call occurs.

**Changes Required**:
1. Define a `useEffect` or helper that maps `triggerToast` calls to real mutations when API routes exist.
2. For now, keep `triggerToast` but add `TODO: API integration` comments on every handler.
3. Create stub API route handlers (see Fix 10) and wire the toast handlers to mock fetch calls.

**Example change for message send (lines 75–87)**:
```typescript
const handleSendChatMessage = async () => {
  if (!chatMessage.trim()) return;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  setChatMessagesList([
    ...chatMessagesList,
    { sender: "coach", text: chatMessage, time: `${timeStr}`, date: "TODAY" }
  ]);
  setChatMessage("");
  // TODO: POST /api/mp/messages when API route is ready
  // await fetch("/api/mp/messages", { method: "POST", body: JSON.stringify({ text: chatMessage }) });
  setTimeout(() => {
    triggerToast("Encrypted message dispatched securely");
  }, 100);
};
```

---

## LOW: Future-Proofing

### Fix 9: Add Unit/Integration Tests

**Scope**: React Testing Library tests for:
1. Tab switching — clicking sidebar buttons changes `activeTabInternal` and pushes URL
2. Risk level selection — clicking L0–L5 buttons updates state
3. Chat message append — typing and sending adds a message to the list
4. SOAP editor — typing in Subjective textarea updates `soapSubjective` state
5. Unredact flow — clicking "Request unredact" with reason sets `isUnredacted` to true

**File**: `src/app/dashboard/mp/page.test.tsx`

---

### Fix 10: Create API Route Stubs

**Directory**: `src/app/api/mp/`

**Files to create**:
```
src/app/api/mp/notes/route.ts      — GET (list notes), POST (create/update note)
src/app/api/mp/records/route.ts    — GET (list records), POST (unredact request)
src/app/api/mp/messages/route.ts   — GET (list threads), POST (send message)
src/app/api/mp/actions/route.ts    — GET (list actions), POST (create action)
src/app/api/mp/drivers/route.ts    — GET (mental driver scores + trends)
```

Each route should return mock JSON matching the data structures defined in `mp-mock-data.ts`.

---

### Fix 11: Add Error Boundaries and Loading States

**Current Behavior**: No loading states, no error boundaries. `!hasMounted || !isAuthenticated` renders `null`.

**Changes Required**:
1. Add a Suspense boundary around the main content.
2. Add a loading spinner while `hasMounted` is false.
3. Add an error boundary wrapper for graceful degradation.
4. Replace `return null` auth guard with a loading indicator.

---

### Fix 12: Remove Unused Imports

**Current Behavior**: Line 31 imports `ChevronRight` but it is never used in the component.

**Changes Required**: Remove `ChevronRight` from the lucide-react import list.

---

## Summary of Priorities

| Priority | Fix | Impact | Effort |
|----------|-----|--------|--------|
| P0 | Fix 1 — URL tab routing | Navigation, bookmarking, auditability | Low |
| P0 | Fix 2 — Notes table columns | Spec compliance (Section 8) | Low |
| P0 | Fix 3 — Driver score trends | Spec compliance (Section 1e, 4) | Low |
| P0 | Fix 4 — Actions tab | Spec compliance (Section 1e) | Medium |
| P1 | Fix 5 — Layout extraction | DRY, maintainability | Medium |
| P1 | Fix 6 — Mock data extraction | Maintainability, testability | Medium |
| P1 | Fix 7 — Responsive design | Mobile usability | Medium |
| P2 | Fix 8 — API-ready handlers | Backend integration prep | Low |
| P2 | Fix 10 — API route stubs | Backend integration prep | Low |
| P3 | Fix 9 — Tests | Quality assurance | High |
| P3 | Fix 11 — Loading/error states | UX, resilience | Low |
| P3 | Fix 12 — Remove unused import | Code cleanliness | Trivial |
