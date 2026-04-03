"use client";

import Link from "next/link";
import { useMemo } from "react";

export default function SponsorOnboardingSuccessPage() {
  const programmeId = useMemo(() => {
    if (typeof window === "undefined") return "programme-her2-adc";
    return window.localStorage.getItem("pb-last-programme-id") ?? "programme-her2-adc";
  }, []);

  return (
    <div className="mx-auto max-w-4xl rounded-[34px] border border-white/70 bg-white/86 p-8 shadow-[0_28px_90px_rgba(148,163,184,0.16)] md:p-10">
      <div className="text-[11px] uppercase tracking-[0.22em] text-emerald-600">Onboarding complete</div>
      <h1 className="mt-4 font-display text-5xl text-slate-900">Your sponsor workspace is ready.</h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">We created the sponsor organisation, your primary user, and your first programme draft so you can continue into the dashboard or refine the programme before matching.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5"><div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Organisation</div><div className="mt-3 font-display text-2xl text-slate-900">Asterion Therapeutics</div></div>
        <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5"><div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Primary contact</div><div className="mt-3 font-display text-2xl text-slate-900">Maya Chen</div></div>
        <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5"><div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Programme draft</div><div className="mt-3 font-display text-2xl text-slate-900">Created</div></div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/app/sponsor/dashboard" className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Go to dashboard</Link>
        <Link href={`/app/sponsor/programmes/${programmeId}`} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Continue programme setup</Link>
      </div>
    </div>
  );
}

