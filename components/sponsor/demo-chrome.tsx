"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useSponsorDemo, type DemoScenario } from "@/lib/state/sponsor-demo";

const scenarios: { id: DemoScenario; label: string }[] = [
  { id: "new_sponsor", label: "New sponsor" },
  { id: "active_shortlisting", label: "Shortlist ready" },
  { id: "live_rfp", label: "Live RFP" },
  { id: "awarded_project", label: "Awarded project" },
  { id: "at_risk_project", label: "Active milestone review" },
  { id: "intelligence_heavy", label: "Critical intelligence" },
];

export function SponsorDemoChrome() {
  const {
    aiRun,
    comparisonRun,
    toasts,
    activity,
    rfps,
    resetDemo,
    project,
    setScenario,
    simulateAlert,
    markMilestoneOverdue,
    autoSubmitProposals,
    rerunAiMatch,
    injectVendorRiskFlag,
    scenario,
    programmes,
    compareVendorIds,
    saveShortlist,
    fundEscrow,
  } = useSponsorDemo();
  const [open, setOpen] = useState(false);
  const primaryRfp = rfps[0];
  const firstProgramme = programmes[0];

  return (
    <>
      <div className="space-y-4">
        <Breadcrumbs />
        <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
          <div className="rounded-[26px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,250,252,0.74))] px-5 py-4 text-sm text-slate-600 shadow-[0_16px_40px_rgba(148,163,184,0.10)] backdrop-blur-xl">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Live activity</div>
            <div className="mt-3 flex flex-wrap gap-3">
              {activity.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-full border border-slate-200/80 bg-white/86 px-3 py-1.5 shadow-[0_8px_20px_rgba(148,163,184,0.08)]">
                  <span className="text-slate-900">{item.title}</span>
                  <span className="ml-2 text-slate-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[26px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,250,252,0.74))] px-5 py-4 text-sm text-slate-600 shadow-[0_16px_40px_rgba(148,163,184,0.10)] backdrop-blur-xl">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Project state</div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="font-medium text-slate-950">{project.name}</span>
              <span className="rounded-full border border-sky-200/80 bg-sky-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-sky-700">{project.status.replace(/_/g, " ")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
        <button onClick={() => setOpen((current) => !current)} className="flex items-center gap-2 rounded-full border border-white/80 bg-white/92 px-4 py-3 text-sm font-medium text-slate-800 shadow-[0_18px_50px_rgba(148,163,184,0.16)] backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-sky-600" /> Demo controls <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open ? (
          <div className="w-88 rounded-[30px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(246,249,252,0.88))] p-4 shadow-[0_24px_70px_rgba(148,163,184,0.18)] backdrop-blur-2xl">
            <div className="font-display text-2xl text-slate-950">Demo panel</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">Current: {scenario.replace(/_/g, " ")}</div>
            <div className="mt-4 grid gap-2">
              {scenarios.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setScenario(item.id)}
                  className={`rounded-[18px] border px-4 py-3 text-left text-sm transition ${scenario === item.id ? "border-slate-900 bg-slate-950 text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]" : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-slate-200/80 pt-4">
              {[
                { label: "Trigger AI match again", onClick: () => firstProgramme && rerunAiMatch(firstProgramme.id) },
                { label: "Auto-create shortlist", onClick: () => firstProgramme && saveShortlist(firstProgramme.id, compareVendorIds) },
                { label: "Auto-submit proposals", onClick: () => primaryRfp && autoSubmitProposals(primaryRfp.id) },
                { label: "Inject critical alert", onClick: () => simulateAlert() },
                { label: "Mark milestone overdue", onClick: () => markMilestoneOverdue() },
                { label: "Mark escrow funded", onClick: () => fundEscrow() },
                { label: "Create project risk state", onClick: () => injectVendorRiskFlag() },
                { label: "Reset sponsor data", onClick: resetDemo },
              ].map((action) => (
                <button key={action.label} onClick={action.onClick} className="w-full rounded-[18px] border border-slate-200/80 bg-white px-4 py-3 text-left text-sm text-slate-700 transition hover:border-slate-300 hover:text-slate-950">
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {toasts.map((toast) => (
          <div key={toast.id} className="w-80 rounded-[24px] border border-white/80 bg-white/94 p-4 shadow-[0_18px_50px_rgba(148,163,184,0.18)] backdrop-blur-xl animate-rise">
            <div className="font-display text-2xl text-slate-950">{toast.title}</div>
            <p className="mt-1 text-sm leading-6 text-slate-600">{toast.body}</p>
          </div>
        ))}
      </div>

      {aiRun.active ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-200/35 p-6 backdrop-blur-xl">
          <div className="w-full max-w-2xl rounded-[34px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(236,247,255,0.88))] p-8 shadow-[0_34px_120px_rgba(59,130,246,0.12)]">
            <div className="flex items-center gap-3 text-sky-700"><Sparkles className="h-5 w-5" /><span className="text-[11px] uppercase tracking-[0.2em]">AI matching in progress</span></div>
            <div className="mt-5 font-display text-4xl tracking-[-0.05em] text-slate-950">{aiRun.stage}</div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-all duration-500" style={{ width: `${aiRun.progress}%` }} /></div>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-500"><span>{aiRun.progress}% complete</span><span>{aiRun.partialVendorIds.length} vendors surfaced</span></div>
          </div>
        </div>
      ) : null}
      {comparisonRun.active ? (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-slate-200/30 p-6 pt-24 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-[30px] border border-white/80 bg-white/94 p-6 shadow-[0_28px_90px_rgba(59,130,246,0.10)]">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">AI comparison</div>
            <div className="mt-3 font-display text-3xl text-slate-950">{comparisonRun.stage}</div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400" style={{ width: `${comparisonRun.progress}%` }} /></div>
          </div>
        </div>
      ) : null}
    </>
  );
}

