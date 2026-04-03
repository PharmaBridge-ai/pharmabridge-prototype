"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { PageTransition } from "@/components/motion/page-transition";
import { TopNavigation } from "@/components/navigation/top-navigation";
import { sponsorNav } from "@/lib/mock-data/sponsor";

export function SponsorAppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.10),transparent_26%),radial-gradient(circle_at_top_right,rgba(45,212,191,0.10),transparent_24%),linear-gradient(180deg,#f8f9fc_0%,#f1f5fb_50%,#edf2f8_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:68px_68px] opacity-70" />
      <TopNavigation items={sponsorNav} badge="Sponsor" accent="violet" mode="app" showNotifications secondaryCta={{ label: "Public site", href: "/" }} primaryCta={{ label: "Create programme", href: "/app/sponsor/programmes/new" }} />
      <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-6 md:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="h-fit rounded-[32px] border border-white/70 bg-white/80 p-5 shadow-[0_22px_70px_rgba(148,163,184,0.16)] backdrop-blur-2xl">
          <div className="border-b border-slate-200/80 pb-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Sponsor workspace</div>
            <div className="mt-3 font-display text-[30px] leading-tight text-slate-900">Programme command center</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">A connected sponsor prototype covering matching, procurement, award, and execution.</p>
          </div>
          <nav className="mt-5 space-y-2">
            {sponsorNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href);
              return (
                <a key={item.href} href={item.href} className={`flex items-center justify-between rounded-[20px] px-4 py-3 text-sm transition ${active ? "bg-indigo-600 text-white shadow-[0_16px_34px_rgba(99,102,241,0.18)]" : "text-slate-600 hover:bg-white hover:text-slate-900"}`}>
                  <span>{item.label}</span>
                  <span>{active ? "•" : "+"}</span>
                </a>
              );
            })}
          </nav>
        </aside>
        <main className="space-y-6"><PageTransition>{children}</PageTransition></main>
      </div>
    </div>
  );
}

export function SponsorHeader({ eyebrow, title, body, badges = [], actions = [] }: { eyebrow: string; title: string; body: string; badges?: { label: string; tone?: "teal" | "gold" | "green" | "red" | "slate" | "violet" }[]; actions?: { label: string; href: string; tone?: "primary" | "ghost" }[] }) {
  return (
    <section className="rounded-[34px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(243,247,255,0.74))] p-7 shadow-[0_28px_90px_rgba(148,163,184,0.18)] backdrop-blur-2xl md:p-9">
      <div className="text-[11px] uppercase tracking-[0.22em] text-indigo-500">{eyebrow}</div>
      <div className="mt-4 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-display text-4xl leading-tight text-slate-900 md:text-[52px]">{title}</h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 md:text-base md:leading-8">{body}</p>
          {badges.length ? <div className="mt-5 flex flex-wrap gap-2">{badges.map((badge) => <span key={badge.label} className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${badge.tone === "red" ? "border-rose-200 bg-rose-50 text-rose-700" : badge.tone === "gold" ? "border-amber-200 bg-amber-50 text-amber-700" : badge.tone === "violet" ? "border-indigo-200 bg-indigo-50 text-indigo-700" : badge.tone === "green" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-600"}`}>{badge.label}</span>)}</div> : null}
        </div>
        {actions.length ? <div className="flex flex-wrap gap-3">{actions.map((action) => <a key={action.href} href={action.href} className={`rounded-full px-5 py-3 text-sm ${action.tone === "ghost" ? "border border-slate-200 bg-white/80 text-slate-700" : "border border-indigo-200 bg-indigo-600 text-white shadow-[0_10px_30px_rgba(99,102,241,0.18)]"}`}>{action.label}</a>)}</div> : null}
      </div>
    </section>
  );
}

export function SponsorMetricGrid({ metrics }: { metrics: ReadonlyArray<readonly string[]> }) {
  return <div className="grid gap-5 xl:grid-cols-4">{metrics.map((metric) => <div key={metric[0]} className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_16px_38px_rgba(148,163,184,0.10)]"><div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">{metric[0]}</div><div className="mt-3 font-display text-4xl text-slate-900">{metric[1]}</div><div className="mt-2 text-sm leading-7 text-slate-600">{metric[2]}</div></div>)}</div>;
}

export function SponsorCards({ title, subtitle, items }: { title: string; subtitle: string; items: { title: string; body: string; meta?: string; tone?: "teal" | "gold" | "green" | "red" | "slate" | "violet"; href?: string }[] }) {
  return <div className="rounded-[30px] border border-white/70 bg-white/82 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]"><div className="font-display text-3xl text-slate-900">{title}</div><p className="mt-2 text-sm leading-7 text-slate-600">{subtitle}</p><div className="mt-5 space-y-4">{items.map((item) => { const card = <div className="rounded-[24px] border border-slate-200/80 bg-white/85 p-5"><div className="flex items-center justify-between gap-3"><div className="font-display text-[28px] leading-tight text-slate-900">{item.title}</div>{item.meta ? <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-600">{item.meta}</span> : null}</div><p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p></div>; return item.href ? <a key={item.title} href={item.href}>{card}</a> : <div key={item.title}>{card}</div>; })}</div></div>;
}

export function SponsorTable({ title, subtitle, columns, rows }: { title: string; subtitle: string; columns: string[]; rows: React.ReactNode[][] }) {
  return <div className="rounded-[30px] border border-white/70 bg-white/82 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]"><div className="font-display text-3xl text-slate-900">{title}</div><p className="mt-2 text-sm leading-7 text-slate-600">{subtitle}</p><div className="mt-5 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white"><div className="grid gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 text-[11px] uppercase tracking-[0.2em] text-slate-500" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>{columns.map((column) => <div key={column}>{column}</div>)}</div>{rows.map((row, index) => <div key={index} className="grid gap-4 border-b border-slate-100 px-5 py-4 text-sm text-slate-700 last:border-b-0" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>{row.map((cell, cellIndex) => <div key={cellIndex}>{cell}</div>)}</div>)}</div></div>;
}

export function SponsorTimeline({ title, subtitle, items }: { title: string; subtitle: string; items: { title: string; meta: string; state?: string }[] }) {
  return <div className="rounded-[30px] border border-white/70 bg-white/82 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]"><div className="font-display text-3xl text-slate-900">{title}</div><p className="mt-2 text-sm leading-7 text-slate-600">{subtitle}</p><div className="mt-5 space-y-4">{items.map((item) => <div key={item.title} className="rounded-[24px] border border-slate-200/80 bg-white/85 p-5"><div className="flex items-center justify-between gap-3"><div className="font-display text-[28px] text-slate-900">{item.title}</div>{item.state ? <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-indigo-700">{item.state}</span> : null}</div><p className="mt-3 text-sm leading-7 text-slate-600">{item.meta}</p></div>)}</div></div>;
}

export function SponsorAiPanel({ active, title, progress, stage, summary, children }: { active: boolean; title: string; progress: number; stage: string; summary: string; children?: ReactNode }) {
  return <div className="rounded-[30px] border border-indigo-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(238,244,255,0.76))] p-6 shadow-[0_22px_80px_rgba(99,102,241,0.14)]"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><div className="font-display text-[34px] leading-tight text-slate-900">{title}</div><p className="mt-2 text-sm leading-7 text-slate-600">{summary}</p></div><span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-indigo-700">{active ? `${progress}% complete` : "Ready"}</span></div><div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200/80"><div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-teal-400 transition-all duration-500" style={{ width: `${progress}%` }} /></div><div className="mt-3 flex items-center justify-between text-sm text-slate-500"><span>{stage}</span><span>{progress}%</span></div>{children ? <div className="mt-5">{children}</div> : null}</div>;
}

export function SponsorCompareTray({ count, href = "/app/sponsor/compare" }: { count: number; href?: string }) {
  if (!count) return null;
  return <div className="fixed bottom-6 left-1/2 z-30 w-[min(620px,calc(100%-2rem))] -translate-x-1/2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_28px_90px_rgba(148,163,184,0.22)] backdrop-blur-2xl"><div className="flex items-center justify-between gap-4"><div><div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Compare tray</div><div className="text-sm text-slate-900">{count} vendors selected</div></div><a href={href} className="rounded-full border border-indigo-200 bg-indigo-600 px-4 py-2 text-sm text-white">Open compare</a></div></div>;
}

export function SponsorEmptyState({ title, body, ctaLabel, ctaHref }: { title: string; body: string; ctaLabel?: string; ctaHref?: string }) {
  return <div className="rounded-[30px] border border-dashed border-slate-200 bg-white/75 p-10 text-center shadow-[0_18px_50px_rgba(148,163,184,0.10)]"><div className="font-display text-3xl text-slate-900">{title}</div><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">{body}</p>{ctaLabel && ctaHref ? <a href={ctaHref} className="mt-6 inline-flex rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">{ctaLabel}</a> : null}</div>;
}
