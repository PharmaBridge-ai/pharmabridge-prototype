"use client";

import { use } from "react";
import Link from "next/link";
import { SponsorHeader } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

const diligencePhases = [
  {
    title: "Pre-award diligence",
    points: ["Site qualification and capacity proof", "Inspection history and GMP certificate currency", "Technical fit against modality-specific requirements"],
  },
  {
    title: "In-execution governance",
    points: ["Change control discipline", "Deviation and CAPA closure cadence", "Milestone-linked evidence and release readiness"],
  },
  {
    title: "Post-project review",
    points: ["Performance against service levels", "Lessons learned for repeat award", "Long-term supply and quality confidence"],
  },
];

function riskTone(level: string) {
  if (level === "High") return "border-rose-200 bg-rose-50 text-rose-700";
  if (level === "Moderate") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-emerald-200 bg-emerald-50 text-emerald-700";
}

function barTone(value: number) {
  if (value >= 90) return "bg-gradient-to-r from-emerald-500 to-teal-400";
  if (value >= 80) return "bg-gradient-to-r from-sky-500 to-teal-400";
  if (value >= 70) return "bg-gradient-to-r from-amber-400 to-orange-400";
  return "bg-gradient-to-r from-rose-500 to-amber-400";
}

export default function SponsorVendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { vendors, addVendorToShortlist, toggleVendorWatch, flagVendorRisk, programmes, toggleCompareVendor, compareVendorIds } = useSponsorDemo();
  const vendor = vendors.find((item) => item.id === id) ?? vendors[0];
  const primaryProgramme = programmes[0];
  const compared = compareVendorIds.includes(vendor.id);

  const scorecards = [
    { label: "Technical fit", value: vendor.fit, note: "Programme-specific fit against capability and modality requirements" },
    { label: "CRDMO score", value: vendor.score, note: "Composite score across quality, capacity, and sponsor readiness" },
    { label: "Quality confidence", value: vendor.riskLevel === "Low" ? 92 : vendor.riskLevel === "Moderate" ? 82 : 68, note: vendor.qualitySummary },
    { label: "Regulatory posture", value: vendor.badges.length >= 3 ? 90 : 78, note: vendor.regulatorySummary },
  ];

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Vendor profile" title={vendor.name} body="This page now behaves more like a sponsor due-diligence workspace: capability depth, site readiness, regulatory posture, execution controls, and risk framing all sit alongside shortlist and compare actions." badges={[{ label: `${vendor.fit} fit`, tone: "teal" }, { label: `${vendor.score} CRDMO`, tone: "gold" }, { label: vendor.relationship, tone: vendor.relationship === "flagged" ? "red" : "slate" }]} actions={[{ label: "Compare board", href: "/app/sponsor/compare", tone: "ghost" }, { label: "Matching workspace", href: `/app/sponsor/programmes/${primaryProgramme.id}/matching`, tone: "primary" }]} />

      <div className="flex flex-wrap gap-3"><button onClick={() => addVendorToShortlist(primaryProgramme.id, vendor.id)} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Add to shortlist</button><button onClick={() => toggleVendorWatch(vendor.id)} className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700">Watch vendor</button><button onClick={() => toggleCompareVendor(vendor.id)} className={`rounded-full border px-5 py-3 text-sm ${compared ? "border-indigo-200 bg-indigo-600 text-white" : "border-slate-200/80 text-slate-700"}`}>{compared ? "Added to compare" : "Add to compare"}</button><button onClick={() => flagVendorRisk(vendor.id)} className="rounded-full border border-rose-400/20 bg-rose-50 px-5 py-3 text-sm text-rose-700">Flag risk</button><Link href="/app/sponsor/intelligence" className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700">Intelligence</Link></div>

      <section className="grid gap-4 xl:grid-cols-4">
        {scorecards.map((card) => (
          <div key={card.label} className="rounded-[28px] border border-white/70 bg-white/84 p-5 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{card.label}</div>
            <div className="mt-3 font-display text-4xl text-slate-900">{card.value}</div>
            <div className="mt-3 h-2.5 rounded-full bg-slate-100">
              <div className={`h-full rounded-full ${barTone(card.value)}`} style={{ width: `${Math.min(card.value, 100)}%` }} />
            </div>
            <div className="mt-3 text-sm leading-6 text-slate-600">{card.note}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Capability and readiness</div>
          <div className="mt-3 font-display text-3xl text-slate-900">Sponsor review summary</div>
          <div className="mt-6 space-y-4">
            <div className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
              <div className="font-medium text-slate-900">Service strengths</div>
              <div className="mt-3 flex flex-wrap gap-2">{vendor.services.map((service) => <span key={service} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">{service}</span>)}</div>
            </div>
            <div className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
              <div className="font-medium text-slate-900">Capacity signals</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">{vendor.capacitySignals.map((signal) => <div key={signal}>{signal}</div>)}</div>
            </div>
            <div className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-medium text-slate-900">Risk framing</div>
                <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${riskTone(vendor.riskLevel)}`}>{vendor.riskLevel}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{vendor.risks}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Diligence phases</div>
          <div className="mt-3 font-display text-3xl text-slate-900">What the sponsor should verify</div>
          <div className="mt-6 space-y-4">
            {diligencePhases.map((phase) => (
              <div key={phase.title} className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
                <div className="font-medium text-slate-900">{phase.title}</div>
                <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {phase.points.map((point) => <div key={point}>{point}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Site network</div>
          <div className="mt-3 font-display text-3xl text-slate-900">Manufacturing and quality footprint</div>
          <div className="mt-6 space-y-4">
            {vendor.sites.map((site) => (
              <div key={site.name} className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium text-slate-900">{site.name}</div>
                    <div className="mt-1 text-sm text-slate-500">{site.region} • {site.focus}</div>
                  </div>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-700">Site reviewed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Quality and regulatory evidence</div>
          <div className="mt-3 font-display text-3xl text-slate-900">Documents and review inputs</div>
          <div className="mt-6 space-y-4">
            <div className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
              <div className="font-medium text-slate-900">Regulatory posture</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{vendor.regulatorySummary}</p>
            </div>
            <div className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
              <div className="font-medium text-slate-900">Quality systems</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{vendor.qualitySummary}</p>
            </div>
            <div className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
              <div className="font-medium text-slate-900">Referenced documents</div>
              <div className="mt-3 flex flex-wrap gap-2">{vendor.documents.map((document) => <span key={document} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">{document}</span>)}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
