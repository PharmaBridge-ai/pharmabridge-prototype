import type { CSSProperties, ReactNode } from "react";

export const refColors = {
  bg: "#f4f6fb",
  bg2: "#eef3fb",
  bg3: "#ffffff",
  bg4: "#f8fafc",
  teal: "#0f766e",
  tealL: "#14b8a6",
  tealXL: "#d5fbf3",
  gold: "#f59e0b",
  goldD: "#b45309",
  white: "#ffffff",
  text: "#142033",
  muted: "#5d6b82",
  dim: "#8ea0bb",
  red: "#dc5b73",
  redBg: "rgba(220,91,115,.10)",
  green: "#16a34a",
  greenBg: "rgba(34,197,94,.10)",
  amber: "#f59e0b",
  amberBg: "rgba(245,158,11,.10)",
  border: "rgba(148,163,184,.18)",
  borderStrong: "rgba(100,116,139,.24)",
  glass: "rgba(255,255,255,.72)",
};

export function AmbientBackdrop() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.10),transparent_22%),linear-gradient(180deg,#f7f8fc_0%,#eef3fb_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-50 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
    </>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="text-[10px] uppercase tracking-[0.18em] text-indigo-500/80">{children}</div>;
}

export function GlassCard({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <div className={`animate-rise rounded-[26px] border border-slate-200/80 bg-white/82 shadow-[0_22px_70px_rgba(148,163,184,0.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_90px_rgba(148,163,184,0.18)] ${className}`} style={style}>{children}</div>;
}

export function MonoBadge({ children, tone = "teal" }: { children: ReactNode; tone?: "teal" | "gold" | "green" | "red" | "slate" | "violet" }) {
  const tones: Record<string, string> = {
    teal: "border-teal-200 bg-teal-50 text-teal-700",
    gold: "border-amber-200 bg-amber-50 text-amber-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    red: "border-rose-200 bg-rose-50 text-rose-700",
    slate: "border-slate-200 bg-slate-50 text-slate-600",
    violet: "border-violet-200 bg-violet-50 text-violet-700",
  };
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${tones[tone]}`}>{children}</span>;
}

export function MetricCard({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: string }) {
  return (
    <GlassCard className="p-6">
      <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-3 font-display text-4xl text-slate-900" style={accent ? { color: accent } : undefined}>{value}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{sub}</div>
    </GlassCard>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-[28px] leading-tight text-slate-900 md:text-[36px]">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">{subtitle}</p> : null}
    </div>
  );
}

export function ActionButton({ children, tone = "primary", href = "#" }: { children: ReactNode; tone?: "primary" | "secondary" | "ghost"; href?: string }) {
  const styles = {
    primary: "border-indigo-200 bg-indigo-600 text-white hover:bg-indigo-500",
    secondary: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
    ghost: "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  };
  return <a href={href} className={`inline-flex items-center rounded-full border px-5 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5 ${styles[tone]}`}>{children}</a>;
}
