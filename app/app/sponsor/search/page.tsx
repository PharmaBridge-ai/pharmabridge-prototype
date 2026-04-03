"use client";

import Link from "next/link";
import { Filter, Sparkles } from "lucide-react";
import { SponsorCompareTray, SponsorHeader } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function SponsorSearchPage() {
  const { vendors, toggleCompareVendor, compareVendorIds, toggleVendorWatch } = useSponsorDemo();

  return (
    <div className="space-y-6">
      <SponsorHeader
        eyebrow="Search and discovery"
        title="Vendor discovery with stronger hierarchy and calmer decision support."
        body="This flagship matching surface keeps the same sponsor workflow logic, but the presentation is lighter and more structured: filters are quieter, rationale is easier to scan, and compare or profile actions stay obvious without crowding every result."
        badges={[{ label: `${vendors.length} tracked vendors`, tone: "teal" }, { label: `${compareVendorIds.length} in compare`, tone: compareVendorIds.length ? "gold" : "slate" }]}
        actions={[{ label: "Open compare", href: "/app/sponsor/compare", tone: "primary" }]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
        <aside className="space-y-4 xl:sticky xl:top-28 xl:h-fit">
          <div className="rounded-[28px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,250,252,0.78))] p-5 shadow-[0_18px_50px_rgba(148,163,184,0.10)] backdrop-blur-2xl">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400"><Filter className="h-3.5 w-3.5" />Filters</div>
            <div className="mt-4 space-y-3">
              {["Modality: ADC / mRNA / CGT", "Region: EU / US / APAC", "Score: 75+", "Capacity: Available to Tight", "Risk: Low to High", "Service line: DS / DP / Analytics"].map((item) => (
                <div key={item} className="rounded-[18px] border border-slate-200/80 bg-white/82 px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="space-y-4">
          {vendors.map((vendor) => {
            const compared = compareVendorIds.includes(vendor.id);
            return (
              <div key={vendor.id} className="rounded-[30px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,250,252,0.80))] p-6 shadow-[0_18px_50px_rgba(148,163,184,0.10)] backdrop-blur-2xl">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_190px] xl:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {vendor.badges.map((badge) => <span key={badge} className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-600">{badge}</span>)}
                      <span className="rounded-full border border-sky-200/80 bg-sky-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-sky-700">{vendor.availability} capacity</span>
                    </div>
                    <div className="mt-4 font-display text-4xl tracking-[-0.05em] text-slate-950">{vendor.name}</div>
                    <div className="mt-2 text-sm text-slate-500">{vendor.geography}</div>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{vendor.rationale}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                      {vendor.capacitySignals.map((signal) => <span key={signal} className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5">{signal}</span>)}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link href={`/app/sponsor/vendors/${vendor.id}`} className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.14)]">View profile</Link>
                      <button onClick={() => toggleCompareVendor(vendor.id)} className={`rounded-full border px-4 py-2.5 text-sm font-medium ${compared ? "border-slate-900 bg-slate-950 text-white" : "border-slate-200/80 bg-white text-slate-700"}`}>{compared ? "Added to compare" : "Add to compare"}</button>
                      <button onClick={() => toggleVendorWatch(vendor.id)} className="rounded-full border border-slate-200/80 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">Watch</button>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-slate-200/80 bg-white/82 p-5 text-right shadow-[0_10px_24px_rgba(148,163,184,0.08)]">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">CRDMO score</div>
                    <div className="mt-2 font-display text-5xl tracking-[-0.05em] text-amber-600">{vendor.score}</div>
                    <div className="mt-4 h-2.5 rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400" style={{ width: `${vendor.score}%` }} /></div>
                    <div className="mt-3 text-sm text-slate-500">Fit {vendor.fit} • Risk {vendor.riskLevel}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <aside className="space-y-4 xl:sticky xl:top-28 xl:h-fit">
          <div className="rounded-[28px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(239,247,255,0.80))] p-5 shadow-[0_18px_50px_rgba(59,130,246,0.08)] backdrop-blur-2xl">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sky-700"><Sparkles className="h-3.5 w-3.5" />Intelligence context</div>
            <div className="mt-3 font-display text-[1.8rem] leading-tight tracking-[-0.04em] text-slate-950">Signals that should shape shortlist decisions.</div>
            <div className="mt-5 space-y-3">
              {[
                { title: "Capacity heatmap", body: "Western Europe is above 90% utilization for high-containment fill-finish suites.", meta: "Action required" },
                { title: "Regulatory update", body: "New guidance is tightening payload containment expectations for smaller suites.", meta: "Regulatory" },
                { title: "Demand signal", body: "Integrated ADC DS/DP and validated analytics remain the most-requested sponsor package this month.", meta: "Market" },
              ].map((item) => (
                <div key={item.title} className="rounded-[22px] border border-white/80 bg-white/82 p-4 shadow-[0_10px_24px_rgba(148,163,184,0.08)]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-medium text-slate-950">{item.title}</div>
                    <span className="rounded-full border border-sky-200/80 bg-sky-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-sky-700">{item.meta}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <SponsorCompareTray count={compareVendorIds.length} />
    </div>
  );
}

