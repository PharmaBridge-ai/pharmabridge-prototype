"use client";

import Link from "next/link";
import { useMemo } from "react";
import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function SponsorComparePage() {
  const { vendors, programmes, saveShortlist, createRfp, flagVendorRisk, compareVendorIds, toggleCompareVendor } = useSponsorDemo();
  const primaryProgramme = programmes[0];
  const compared = useMemo(() => vendors.filter((vendor) => compareVendorIds.includes(vendor.id) || primaryProgramme.shortlistIds.includes(vendor.id) || vendor.relationship === "finalist"), [vendors, primaryProgramme.shortlistIds, compareVendorIds]);

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Compare vendors" title="A more deliberate evaluation workspace before RFP release." body="This side-by-side sponsor view keeps the same shortlist and compare behavior, but upgrades the page into a cleaner decision-support workspace with stronger hierarchy, clearer recommendation signals, and less visual crowding." badges={[{ label: `${compared.length} vendors compared`, tone: "teal" }, { label: primaryProgramme.name, tone: "gold" }]} actions={[{ label: "Open shortlists", href: "/app/sponsor/shortlists", tone: "ghost" }, { label: "Proceed to RFP", href: "/app/sponsor/rfps/new", tone: "primary" }]} />

      <SponsorTable title="Comparison matrix" subtitle="High-signal criteria presented in a cleaner sponsor review table." columns={["Vendor", "Fit", "CRDMO", "Availability", "Relationship", "Risk"]} rows={compared.map((vendor) => [vendor.name, `${vendor.fit}`, `${vendor.score}`, vendor.availability, vendor.relationship, vendor.riskLevel])} />

      <div className="grid gap-4 xl:grid-cols-3">
        {compared.map((vendor) => (
          <div key={vendor.id} className="rounded-[30px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(248,250,252,0.78))] p-5 shadow-[0_18px_50px_rgba(148,163,184,0.10)] backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-3xl tracking-[-0.04em] text-slate-950">{vendor.name}</div>
                <div className="mt-2 text-sm text-slate-500">{vendor.relationship}</div>
              </div>
              <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${vendor.relationship === "flagged" ? "border-rose-200/80 bg-rose-50/85 text-rose-700" : vendor.relationship === "finalist" ? "border-emerald-200/80 bg-emerald-50/85 text-emerald-700" : "border-slate-200/80 bg-white/80 text-slate-600"}`}>{vendor.riskLevel} risk</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-[20px] border border-slate-200/80 bg-white/82 p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Fit</div>
                <div className="mt-2 font-display text-3xl text-slate-950">{vendor.fit}</div>
              </div>
              <div className="rounded-[20px] border border-slate-200/80 bg-white/82 p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">CRDMO</div>
                <div className="mt-2 font-display text-3xl text-amber-600">{vendor.score}</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{vendor.rationale}</p>
            <div className="mt-4 text-sm text-slate-500">{vendor.capacitySignals.join(" • ")}</div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button onClick={() => flagVendorRisk(vendor.id)} className="rounded-full border border-rose-200/80 bg-rose-50/85 px-4 py-2 text-xs font-medium text-rose-700">Flag risk</button>
              <button onClick={() => toggleCompareVendor(vendor.id)} className="rounded-full border border-slate-200/80 bg-white px-4 py-2 text-xs font-medium text-slate-700">Toggle compare</button>
              <Link href={`/app/sponsor/vendors/${vendor.id}`} className="rounded-full border border-slate-200/80 bg-white px-4 py-2 text-xs font-medium text-slate-700">Profile</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => saveShortlist(primaryProgramme.id, compared.map((vendor) => vendor.id))} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">Save as shortlist</button>
        <button onClick={() => createRfp(primaryProgramme.id)} className="rounded-full border border-slate-200/80 bg-white px-5 py-3 text-sm font-medium text-slate-700">Proceed to RFP</button>
      </div>

      <SponsorCards title="Decision notes" subtitle="Buyer-side synthesis and shortlist guidance, separated from the matrix for calmer review." items={compared.map((vendor) => ({ title: vendor.name, body: `${vendor.risks} Services: ${vendor.services.join(", ")}.`, meta: vendor.relationship, tone: vendor.relationship === "flagged" ? "red" : vendor.relationship === "finalist" ? "teal" : "gold" }))} />
    </div>
  );
}

