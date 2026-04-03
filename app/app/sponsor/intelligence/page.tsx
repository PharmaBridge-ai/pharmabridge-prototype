"use client";

import { SponsorHeader } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

const capacitySignals = [
  { label: "ADC OEB5 conjugation", utilization: 91, region: "EU", risk: "critical" },
  { label: "mRNA drug substance", utilization: 74, region: "US", risk: "watch" },
  { label: "Radiopharma isotopes", utilization: 88, region: "Global", risk: "critical" },
  { label: "Commercial mAbs", utilization: 68, region: "APAC", risk: "stable" },
];

const modalityMomentum = [
  { label: "ADC", score: 94 },
  { label: "LNP / mRNA", score: 81 },
  { label: "CGT", score: 72 },
  { label: "Peptides", score: 68 },
  { label: "Radiopharma", score: 86 },
];

const dealFeed = [
  { type: "Acquisition", title: "Samsung Biologics expands ADC payload synthesis capability", amount: "$780M", tag: "ADC" },
  { type: "Licensing", title: "BioNTech licenses mRNA platform manufacturing package to Lonza", amount: "$340M + milestones", tag: "mRNA" },
  { type: "Partnership", title: "Charles River and Recursion deepen AI-enabled discovery alliance", amount: "$200M", tag: "AI discovery" },
];

const patentWatch = [
  { id: "US11,234,567", title: "Humira formulation claims narrowing ahead of 2026 expiry", tag: "mAb" },
  { id: "EP3,456,789", title: "Semaglutide peptide process claims remain strategically relevant", tag: "Peptide" },
  { id: "US10,987,654", title: "ADC linker-payload composition filing remains central to platform competition", tag: "ADC" },
];

const competitorRows = [
  { name: "Lonza Group", score: 92, flags: "Warning letter watch" },
  { name: "Samsung Biologics", score: 88, flags: "ADC expansion" },
  { name: "WuXi Biologics", score: 81, flags: "BIOSECURE exposure" },
  { name: "Thermo Fisher / PPD", score: 91, flags: "Strong CRO breadth" },
];

function toneClasses(tone: string) {
  if (tone === "critical" || tone === "high_risk") return "border-rose-200 bg-rose-50 text-rose-700";
  if (tone === "action_required" || tone === "gold" || tone === "watch") return "border-amber-200 bg-amber-50 text-amber-700";
  if (tone === "watched") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-emerald-200 bg-emerald-50 text-emerald-700";
}

function fillClasses(value: number) {
  if (value >= 85) return "bg-gradient-to-r from-rose-500 to-amber-400";
  if (value >= 70) return "bg-gradient-to-r from-amber-400 to-orange-400";
  return "bg-gradient-to-r from-emerald-400 to-teal-400";
}

function heatTone(value: number) {
  if (value >= 4) return "bg-rose-100 text-rose-700";
  if (value >= 3) return "bg-amber-100 text-amber-700";
  if (value >= 2) return "bg-teal-100 text-teal-700";
  return "bg-slate-100 text-slate-500";
}

export default function SponsorIntelligencePage() {
  const { alerts, watchlists, vendors, programmes, activity } = useSponsorDemo();
  const critical = alerts.filter((item) => item.status === "critical" || item.status === "high_risk").length;
  const watchedVendors = vendors.filter((vendor) => vendor.relationship === "watched" || vendor.relationship === "flagged");
  const activeAlerts = alerts.filter((item) => item.status !== "dismissed");
  const heatmap = [
    { label: "ADC", cells: [4, 4, 3, 3, 2] },
    { label: "mRNA", cells: [3, 3, 4, 3, 2] },
    { label: "CGT", cells: [2, 3, 4, 4, 2] },
    { label: "mAbs", cells: [1, 2, 2, 3, 2] },
  ];

  return (
    <div className="space-y-6">
      <SponsorHeader
        eyebrow="Intelligence"
        title="Continuous monitoring across vendors, capacity, and market risk"
        body="This route now feels closer to a command center: market activity, heatmapped modality demand, capacity pressure, alert severity, watchlist surveillance, and competitive score context all feed sponsor decisions."
        badges={[
          { label: `${critical} critical / high-risk`, tone: "red" },
          { label: `${watchlists.length} watchlists`, tone: "teal" },
          { label: `${activeAlerts.length} active signals`, tone: "gold" },
        ]}
        actions={[
          { label: "Regulatory alerts", href: "/app/sponsor/intelligence/alerts", tone: "primary" },
          { label: "Capacity view", href: "/app/sponsor/intelligence/capacity", tone: "ghost" },
        ]}
      />

      <section className="grid gap-4 xl:grid-cols-4">
        {[
          { label: "Critical alerts", value: `${critical}`, note: "Escalated into sponsor action" },
          { label: "Watched vendors", value: `${watchedVendors.length}`, note: "Live surveillance running" },
          { label: "Linked programmes", value: `${programmes.length}`, note: "Signals connected to sourcing" },
          { label: "Recent intelligence actions", value: `${activity.length}`, note: "Logged in the operating feed" },
        ].map((metric, index) => (
          <div key={`${metric.label}-${index}`} className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{metric.label}</div>
            <div className="mt-3 font-display text-5xl text-slate-900">{metric.value}</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">{metric.note}</div>
            <div className="mt-4 h-1.5 rounded-full bg-slate-100">
              <div className={`h-full rounded-full ${index === 0 ? "w-[82%] bg-gradient-to-r from-rose-500 to-amber-400" : index === 1 ? "w-[58%] bg-gradient-to-r from-sky-500 to-teal-400" : index === 2 ? "w-[70%] bg-gradient-to-r from-indigo-500 to-sky-400" : "w-[64%] bg-gradient-to-r from-emerald-500 to-teal-400"}`} />
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-display text-3xl text-slate-900">Pipeline and modality heatmap</div>
              <p className="mt-2 text-sm leading-7 text-slate-600">A compact view of where sponsor demand and external pressure are clustering.</p>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-600">Demand intensity</span>
          </div>
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 text-[10px] uppercase tracking-[0.16em] text-slate-400">
              <div />
              {['Preclinical','Phase I','Phase II','Phase III','Reg.'].map((label) => <div key={label} className="text-center">{label}</div>)}
            </div>
            {heatmap.map((row) => (
              <div key={row.label} className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 items-center">
                <div className="text-sm text-slate-600">{row.label}</div>
                {row.cells.map((value, index) => (
                  <div key={`${row.label}-${index}`} className={`flex h-10 items-center justify-center rounded-xl text-sm font-medium ${heatTone(value)}`}>
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
          <div className="font-display text-3xl text-slate-900">Capacity pressure</div>
          <p className="mt-2 text-sm leading-7 text-slate-600">High-importance market segments with utilization-based sponsor risk treatment.</p>
          <div className="mt-6 space-y-4">
            {capacitySignals.map((signal) => (
              <div key={signal.label} className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-900">{signal.label}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{signal.region}</div>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${toneClasses(signal.risk)}`}>{signal.risk}</span>
                </div>
                <div className="mt-4 h-3 rounded-full bg-slate-100"><div className={`h-full rounded-full ${fillClasses(signal.utilization)}`} style={{ width: `${signal.utilization}%` }} /></div>
                <div className="mt-2 flex items-center justify-between text-sm text-slate-600"><span>{signal.utilization}% utilization</span><span>{signal.utilization >= 85 ? "Accelerate decision" : signal.utilization >= 70 ? "Monitor weekly" : "Healthy"}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
          <div className="font-display text-3xl text-slate-900">Market activity</div>
          <p className="mt-2 text-sm leading-7 text-slate-600">Deals and strategic movements that affect sponsor sourcing posture.</p>
          <div className="mt-5 space-y-3">
            {dealFeed.map((deal) => (
              <div key={deal.title} className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-900">{deal.title}</div>
                    <div className="mt-2 text-sm text-slate-600">{deal.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-slate-900">{deal.amount}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{deal.tag}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 font-display text-3xl text-slate-900">Patent watch</div>
          <div className="mt-4 space-y-3">
            {patentWatch.map((patent) => (
              <div key={patent.id} className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-400">{patent.id}</div>
                <div className="mt-2 font-medium text-slate-900">{patent.title}</div>
                <div className="mt-2 text-sm text-slate-600">{patent.tag}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-display text-3xl text-slate-900">Alert stream</div>
              <p className="mt-2 text-sm leading-7 text-slate-600">Signals are visually tiered so the sponsor can scan severity before drilling in.</p>
            </div>
            <a href="/app/sponsor/intelligence/alerts" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">All alerts</a>
          </div>
          <div className="mt-5 space-y-3">
            {activeAlerts.map((alert) => (
              <a key={alert.id} href={`/app/sponsor/intelligence/alerts/${alert.id}`} className="block rounded-[22px] border border-slate-200/80 bg-white/90 p-4 transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(148,163,184,0.12)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-900">{alert.title}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{alert.body}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${toneClasses(alert.status)}`}>{alert.status.replace(/_/g, " ")}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
          <div className="font-display text-3xl text-slate-900">Competitive landscape</div>
          <p className="mt-2 text-sm leading-7 text-slate-600">A sponsor-friendly snapshot of high-importance organizations and their current signal posture.</p>
          <div className="mt-5 space-y-3">
            {competitorRows.map((row) => (
              <div key={row.name} className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-slate-900">{row.name}</div>
                    <div className="mt-1 text-sm text-slate-600">{row.flags}</div>
                  </div>
                  <div className="w-28">
                    <div className="text-right text-sm text-slate-600">{row.score}</div>
                    <div className="mt-2 h-2.5 rounded-full bg-slate-100"><div className={`h-full rounded-full ${fillClasses(row.score)}`} style={{ width: `${row.score}%` }} /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
          <div className="font-display text-3xl text-slate-900">Watchlists and recommendations</div>
          <p className="mt-2 text-sm leading-7 text-slate-600">Monitoring logic and next sponsor actions derived from current signals.</p>
          <div className="mt-5 space-y-4">
            {watchlists.map((watch) => (
              <div key={watch.id} className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-900">{watch.name}</div>
                    <div className="mt-1 text-sm text-slate-600">{watch.scope}</div>
                  </div>
                  <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-sky-700">{watch.threshold}</span>
                </div>
              </div>
            ))}
            <div className="grid gap-3 md:grid-cols-2">
              <a href="/app/sponsor/programmes/adc-her2-phase1/matching" className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4"><div className="text-xs uppercase tracking-[0.16em] text-slate-400">Sourcing</div><div className="mt-2 font-medium text-slate-900">Rerun ADC shortlist</div><p className="mt-2 text-sm leading-6 text-slate-600">EU containment pressure justifies refreshing finalists and fallback options.</p></a>
              <a href="/app/sponsor/compare" className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4"><div className="text-xs uppercase tracking-[0.16em] text-slate-400">Evaluation</div><div className="mt-2 font-medium text-slate-900">Review flagged vendors</div><p className="mt-2 text-sm leading-6 text-slate-600">Compare vendors under active risk watch before moving forward.</p></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
