import Link from "next/link";
import type { ReactNode } from "react";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_24%),radial-gradient(circle_at_top_right,rgba(45,212,191,0.10),transparent_22%),linear-gradient(180deg,#f8f9fc_0%,#eef3f9_100%)] px-4 py-6 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4 rounded-full border border-white/80 bg-white/80 px-6 py-4 shadow-[0_18px_50px_rgba(148,163,184,0.12)] backdrop-blur-xl">
          <Link href="/" className="font-display text-2xl text-slate-900">Pharma<span className="text-indigo-500">Bridge</span></Link>
          <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-500">Onboarding</div>
        </div>
        {children}
      </div>
    </div>
  );
}
