"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { PageTransition } from "@/components/motion/page-transition";
import { TopNavigation } from "@/components/navigation/top-navigation";
import { sponsorNav } from "@/lib/mock-data/sponsor";
import { cn } from "@/lib/utils";

const toneStyles = {
  teal: "border-emerald-200/80 bg-emerald-50/80 text-emerald-700",
  gold: "border-amber-200/80 bg-amber-50/85 text-amber-700",
  green: "border-emerald-200/80 bg-emerald-50/80 text-emerald-700",
  red: "border-rose-200/80 bg-rose-50/85 text-rose-700",
  slate: "border-slate-200/80 bg-white/80 text-slate-600",
  violet: "border-sky-200/80 bg-sky-50/85 text-sky-700",
} as const;

type BadgeTone = keyof typeof toneStyles;

type Action = { label: string; href: string; tone?: "primary" | "ghost" };
type Badge = { label: string; tone?: BadgeTone };

type SponsorHeaderProps = {
  eyebrow: string;
  title: string;
  body: string;
  badges?: Badge[];
  actions?: Action[];
};

type SponsorCardItem = {
  title: string;
  body: string;
  meta?: string;
  tone?: BadgeTone;
  href?: string;
};

function toneClass(tone: BadgeTone = "slate") {
  return toneStyles[tone];
}

function Surface({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-[30px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(248,250,252,0.76))] shadow-[0_22px_70px_rgba(148,163,184,0.10)] backdrop-blur-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SponsorAppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[linear-gradient(180deg,#f6f8fb_0%,#f1f5f9_48%,#edf2f7_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_12%_12%,rgba(59,130,246,0.10),transparent_20%),radial-gradient(circle_at_84%_14%,rgba(14,165,233,0.08),transparent_18%),radial-gradient(circle_at_26%_86%,rgba(16,185,129,0.08),transparent_18%)]" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:78px_78px] [mask-image:linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.08))]" />
      <TopNavigation items={sponsorNav} badge="Sponsor workspace" accent="teal" mode="app" showNotifications secondaryCta={{ label: "Public site", href: "/" }} primaryCta={{ label: "Create programme", href: "/app/sponsor/programmes/new" }} />
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-10 pt-6 md:px-6 lg:grid-cols-[292px_minmax(0,1fr)] lg:px-8">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <Surface className="overflow-hidden p-5">
            <div className="rounded-[24px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(242,247,252,0.66))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Sponsor workspace</div>
              <div className="mt-3 font-display text-[2rem] leading-[1.02] tracking-[-0.05em] text-slate-950">Programme command center</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Matching, procurement, award, execution, and intelligence in one connected operating layer.
              </p>
              <div className="mt-5 flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/80 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-sky-700">
                <Sparkles className="h-3.5 w-3.5" />
                Premium sponsor flow
              </div>
            </div>

            <nav className="mt-5 space-y-1.5">
              {sponsorNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href as Route}
                    className={cn(
                      "group flex items-center justify-between rounded-[20px] px-4 py-3.5 text-sm font-medium transition",
                      active
                        ? "bg-slate-950 text-white shadow-[0_14px_32px_rgba(15,23,42,0.16)]"
                        : "text-slate-600 hover:bg-white/85 hover:text-slate-950",
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={cn("h-4 w-4 transition", active ? "text-white/80" : "text-slate-300 group-hover:text-slate-500")} />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 rounded-[24px] border border-slate-200/80 bg-white/72 p-4 shadow-[0_12px_28px_rgba(148,163,184,0.08)]">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Workflow focus</div>
              <div className="mt-2 text-sm font-medium text-slate-900">Reduce noise, elevate next actions, keep regulated workflow confidence.</div>
            </div>
          </Surface>
        </aside>
        <main className="space-y-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}

export function SponsorHeader({ eyebrow, title, body, badges = [], actions = [] }: SponsorHeaderProps) {
  return (
    <Surface className="overflow-hidden p-6 md:p-8 lg:p-9">
      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-sky-700">{eyebrow}</div>
          <h1 className="mt-4 max-w-5xl font-display text-4xl leading-[1.02] tracking-[-0.05em] text-slate-950 md:text-[3.4rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 md:text-base md:leading-8">{body}</p>
          {badges.length ? (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {badges.map((badge) => (
                <span key={badge.label} className={cn("rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em]", toneClass(badge.tone))}>
                  {badge.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="rounded-[26px] border border-white/80 bg-white/72 p-4 shadow-[0_14px_34px_rgba(148,163,184,0.10)]">
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Primary actions</div>
          <div className="mt-4 flex flex-col gap-3">
            {actions.length ? (
              actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href as Route}
                  className={cn(
                    "inline-flex items-center justify-between rounded-[18px] px-4 py-3 text-sm font-medium transition",
                    action.tone === "ghost"
                      ? "border border-slate-200/80 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950"
                      : "bg-slate-950 text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-900",
                  )}
                >
                  <span>{action.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))
            ) : (
              <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50/70 px-4 py-4 text-sm text-slate-500">
                Actions appear here when the workflow exposes a next step.
              </div>
            )}
          </div>
        </div>
      </div>
    </Surface>
  );
}

export function SponsorMetricGrid({ metrics }: { metrics: ReadonlyArray<readonly string[]> }) {
  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Surface key={metric[0]} className="p-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{metric[0]}</div>
          <div className="mt-3 font-display text-[2.5rem] leading-none tracking-[-0.05em] text-slate-950">{metric[1]}</div>
          <div className="mt-3 text-sm leading-6 text-slate-600">{metric[2]}</div>
          <div className="mt-4 h-1.5 rounded-full bg-slate-100">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" />
          </div>
        </Surface>
      ))}
    </div>
  );
}

export function SponsorCards({ title, subtitle, items }: { title: string; subtitle: string; items: SponsorCardItem[] }) {
  return (
    <Surface className="p-6">
      <div className="flex flex-col gap-2 border-b border-slate-200/70 pb-5">
        <div className="font-display text-[2rem] leading-tight tracking-[-0.04em] text-slate-950">{title}</div>
        <p className="text-sm leading-7 text-slate-600">{subtitle}</p>
      </div>
      <div className="mt-5 space-y-3.5">
        {items.map((item, index) => {
          const key = `${item.href ?? "card"}-${item.title}-${index}`;
          const content = (
            <div className="rounded-[24px] border border-slate-200/80 bg-white/76 p-5 shadow-[0_10px_24px_rgba(148,163,184,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(148,163,184,0.10)]">
              <div className="flex items-start justify-between gap-3">
                <div className="font-display text-[1.7rem] leading-tight tracking-[-0.04em] text-slate-950">{item.title}</div>
                {item.meta ? (
                  <span className={cn("rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em]", toneClass(item.tone))}>
                    {item.meta}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </div>
          );
          return item.href ? (
            <Link key={key} href={item.href as Route}>
              {content}
            </Link>
          ) : (
            <div key={key}>{content}</div>
          );
        })}
      </div>
    </Surface>
  );
}

export function SponsorTable({ title, subtitle, columns, rows }: { title: string; subtitle: string; columns: string[]; rows: ReactNode[][] }) {
  return (
    <Surface className="p-6">
      <div className="flex flex-col gap-2 border-b border-slate-200/70 pb-5">
        <div className="font-display text-[2rem] leading-tight tracking-[-0.04em] text-slate-950">{title}</div>
        <p className="text-sm leading-7 text-slate-600">{subtitle}</p>
      </div>
      <div className="mt-5 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
        <div className="grid gap-4 border-b border-slate-200/80 bg-slate-50/80 px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-slate-500" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
          {columns.map((column) => (
            <div key={column}>{column}</div>
          ))}
        </div>
        {rows.map((row, index) => (
          <div key={index} className="grid gap-4 border-b border-slate-100/90 px-5 py-4 text-sm text-slate-700 last:border-b-0 hover:bg-slate-50/60" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={cellIndex === 0 ? "font-medium text-slate-900" : undefined}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Surface>
  );
}

export function SponsorTimeline({ title, subtitle, items }: { title: string; subtitle: string; items: { title: string; meta: string; state?: string }[] }) {
  return (
    <Surface className="p-6">
      <div className="flex flex-col gap-2 border-b border-slate-200/70 pb-5">
        <div className="font-display text-[2rem] leading-tight tracking-[-0.04em] text-slate-950">{title}</div>
        <p className="text-sm leading-7 text-slate-600">{subtitle}</p>
      </div>
      <div className="mt-5 space-y-3.5">
        {items.map((item, index) => (
          <div key={`${item.title}-${item.state ?? "item"}-${index}`} className="rounded-[24px] border border-slate-200/80 bg-white/76 p-5 shadow-[0_10px_24px_rgba(148,163,184,0.08)]">
            <div className="flex items-start justify-between gap-3">
              <div className="font-display text-[1.7rem] leading-tight tracking-[-0.04em] text-slate-950">{item.title}</div>
              {item.state ? <span className="rounded-full border border-sky-200/80 bg-sky-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-sky-700">{item.state}</span> : null}
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.meta}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

export function SponsorAiPanel({ active, title, progress, stage, summary, children }: { active: boolean; title: string; progress: number; stage: string; summary: string; children?: ReactNode }) {
  return (
    <Surface className="border-sky-100/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(238,247,255,0.82))] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-sky-700">AI workflow</div>
          <div className="mt-3 font-display text-[2rem] leading-tight tracking-[-0.04em] text-slate-950">{title}</div>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{summary}</p>
        </div>
        <span className="rounded-full border border-sky-200/80 bg-white/82 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-sky-700">
          {active ? `${progress}% complete` : "Ready"}
        </span>
      </div>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
        <span>{stage}</span>
        <span>{progress}%</span>
      </div>
      {children ? <div className="mt-5">{children}</div> : null}
    </Surface>
  );
}

export function SponsorCompareTray({ count, href = "/app/sponsor/compare" }: { count: number; href?: string }) {
  if (!count) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-30 w-[min(680px,calc(100%-2rem))] -translate-x-1/2 rounded-[24px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(246,249,252,0.82))] px-4 py-3 shadow-[0_28px_90px_rgba(148,163,184,0.18)] backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Compare tray</div>
          <div className="mt-1 text-sm font-medium text-slate-900">{count} vendors selected for evaluation</div>
        </div>
        <Link href={href as Route} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">
          Open compare
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export function SponsorEmptyState({ title, body, ctaLabel, ctaHref }: { title: string; body: string; ctaLabel?: string; ctaHref?: string }) {
  return (
    <Surface className="border-dashed p-10 text-center">
      <div className="font-display text-3xl tracking-[-0.04em] text-slate-950">{title}</div>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">{body}</p>
      {ctaLabel && ctaHref ? (
        <Link href={ctaHref as Route} className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">
          {ctaLabel}
        </Link>
      ) : null}
    </Surface>
  );
}

