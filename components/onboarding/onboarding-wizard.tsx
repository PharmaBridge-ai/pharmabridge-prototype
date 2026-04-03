"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OnboardingConfig } from "@/lib/types";

const statusClass = {
  required: "border-rose-200 bg-rose-50 text-rose-700",
  "high-priority": "border-amber-200 bg-amber-50 text-amber-700",
  supporting: "border-emerald-200 bg-emerald-50 text-emerald-700",
} as const;

export function OnboardingWizard({ config }: { config: OnboardingConfig }) {
  return (
    <div className="space-y-6">
      <div className="rounded-[34px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(239,244,255,0.78))] p-8 shadow-[0_30px_90px_rgba(148,163,184,0.16)] backdrop-blur-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div><h1 className="font-display text-4xl text-slate-900">{config.title}</h1><p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">{config.subtitle}</p></div>
          <div className="min-w-[240px] rounded-[24px] border border-slate-200 bg-white/86 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.10)]"><div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Completion</div><div className="mt-2 font-display text-4xl text-slate-900">{config.progress}%</div><div className="mt-4 h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-teal-400" style={{ width: `${config.progress}%` }} /></div></div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">{config.sections.map((section, index) => <section key={section.title} className="rounded-[30px] border border-white/80 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]"><div className="flex flex-wrap items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-slate-200 bg-slate-50 text-sm text-slate-900 shadow-[0_8px_20px_rgba(148,163,184,0.08)]">{index + 1}</span><div><h2 className="font-display text-2xl text-slate-900">{section.title}</h2><p className="mt-1 text-sm text-slate-500">{section.description}</p></div><span className={cn("ml-auto rounded-full border px-3 py-1 text-[11px]", statusClass[section.status])}>{section.status.replace("-", " ")}</span></div><div className="mt-5 grid gap-3 md:grid-cols-2">{section.fields.map((field) => <div key={field} className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4"><div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Field group</div><div className="mt-2 text-sm text-slate-800">{field}</div></div>)}</div></section>)}</div>
        <div className="space-y-4"><section className="rounded-[30px] border border-white/80 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]"><h2 className="font-display text-2xl text-slate-900">Submission checks</h2><div className="mt-4 space-y-3">{config.checks.map((check) => <div key={check} className="flex items-center gap-3 rounded-[20px] border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-700"><CheckCircle2 className="h-4 w-4" />{check}</div>)}</div></section><section className="rounded-[30px] border border-white/80 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]"><h2 className="font-display text-2xl text-slate-900">Prototype states</h2><p className="mt-3 text-sm leading-7 text-slate-500">This flow is seeded with realistic enterprise states: submitted, pending verification, needs action, and approved.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/onboarding/submitted" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">Submitted</Link><Link href="/onboarding/pending" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">Pending review</Link><Link href="/app/admin/kyb" className="rounded-full border border-indigo-200 bg-indigo-600 px-4 py-2 text-sm text-white transition hover:-translate-y-0.5 hover:bg-indigo-500">View admin queue</Link></div></section></div>
      </div>
    </div>
  );
}
