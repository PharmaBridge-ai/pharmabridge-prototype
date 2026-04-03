import { ArrowRight, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HighlightCard, Stat, TableData } from "@/lib/types";

const tones = {
  teal: "border-teal-200 bg-teal-50 text-teal-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  rose: "border-rose-200 bg-rose-50 text-rose-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
  slate: "border-slate-200 bg-slate-50 text-slate-600",
};

export function SectionIntro({ eyebrow, title, body, action, href, secondaryLabel, secondaryHref }: { eyebrow: string; title: string; body: string; action?: string; href?: string; secondaryLabel?: string; secondaryHref?: string }) {
  return (
    <div className="max-w-4xl space-y-5">
      <p className="text-[11px] uppercase tracking-[0.28em] text-indigo-500/80">{eyebrow}</p>
      <h1 className="max-w-3xl font-display text-4xl leading-tight text-slate-900 md:text-6xl">{title}</h1>
      <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg">{body}</p>
      {(action || secondaryLabel) && (
        <div className="flex flex-wrap gap-3">
          {action && href ? (
            <a className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_32px_rgba(99,102,241,0.16)] transition hover:-translate-y-0.5 hover:bg-indigo-500" href={href}>
              {action}
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : null}
          {secondaryLabel && secondaryHref ? (
            <a className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-[0_10px_24px_rgba(148,163,184,0.10)] transition hover:-translate-y-0.5 hover:bg-slate-50" href={secondaryHref}>
              {secondaryLabel}
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-3xl border border-slate-200/80 bg-white/82 p-5 shadow-[0_20px_60px_rgba(148,163,184,0.12)] backdrop-blur-xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{stat.label}</p>
          <p className="mt-4 font-display text-3xl text-slate-900">{stat.value}</p>
          {stat.delta ? <p className={cn("mt-2 inline-flex rounded-full border px-3 py-1 text-xs", tones[stat.tone ?? "slate"])}>{stat.delta}</p> : null}
        </div>
      ))}
    </div>
  );
}

export function HighlightGrid({ items }: { items: HighlightCard[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-[28px] border border-slate-200/80 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.10)]">
          <div className={cn("mb-4 inline-flex rounded-full border px-3 py-1 text-[11px]", tones[item.tone ?? "teal"])}>{item.meta ?? "Platform module"}</div>
          <h3 className="font-display text-2xl text-slate-900">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function PagePanel({ title, body, children }: { title: string; body?: string; children: React.ReactNode }) {
  return <section className="rounded-[30px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_24px_70px_rgba(148,163,184,0.12)]"><div className="mb-5 border-b border-slate-200 pb-4"><h2 className="font-display text-2xl text-slate-900">{title}</h2>{body ? <p className="mt-2 text-sm text-slate-500">{body}</p> : null}</div>{children}</section>;
}

export function DataTable({ data }: { data: TableData }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/72">
      <div className="grid grid-cols-5 gap-4 border-b border-slate-200 bg-slate-50/80 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-slate-500">
        {data.columns.map((column) => <span key={column}>{column}</span>)}
      </div>
      <div className="divide-y divide-slate-200/70">
        {data.rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-5 gap-4 px-4 py-4 text-sm text-slate-700">
            {row.map((cell, index) => <span key={`cell-${rowIndex}-${index}`} className={index === row.length - 1 ? "text-indigo-600" : ""}>{cell}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Timeline({ items }: { items: { title: string; detail: string; state: string }[] }) {
  return <div className="space-y-4">{items.map((item) => <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white/76 p-4"><div className="mt-1 h-3 w-3 rounded-full bg-indigo-500 shadow-[0_0_18px_rgba(99,102,241,0.28)]" /><div><div className="flex flex-wrap items-center gap-3"><h3 className="text-sm font-medium text-slate-900">{item.title}</h3><span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">{item.state}</span></div><p className="mt-2 text-sm text-slate-500">{item.detail}</p></div></div>)}</div>;
}

export function LoadingState() {
  return <div className="flex items-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-700"><LoaderCircle className="h-4 w-4 animate-spin" />AI matching in progress for updated seeded data.</div>;
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/60 p-8 text-center"><h3 className="font-display text-2xl text-slate-900">{title}</h3><p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">{body}</p></div>;
}

