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
      <SponsorHeader eyebrow="Compare vendors" title="Side-by-side sponsor evaluation before RFP release" body="Comparison is now driven by live shortlist and compare-tray state. Saving from here updates the underlying programme shortlist, and moving forward can seed the next RFP draft immediately." badges={[{ label: `${compared.length} vendors compared`, tone: "teal" }, { label: primaryProgramme.name, tone: "gold" }]} actions={[{ label: "Shortlists", href: "/app/sponsor/shortlists", tone: "ghost" }]} />
      <SponsorTable title="Comparison matrix" subtitle="High-signal criteria across the active compared set." columns={["Vendor", "Fit", "CRDMO", "Availability", "Relationship", "Risk"]} rows={compared.map((vendor) => [vendor.name, `${vendor.fit}`, `${vendor.score}`, vendor.availability, vendor.relationship, vendor.riskLevel])} />
      <div className="grid gap-4 xl:grid-cols-3">{compared.map((vendor) => <div key={vendor.id} className="rounded-[28px] border border-slate-200/80 bg-white/78 p-5"><div className="font-display text-3xl text-slate-900">{vendor.name}</div><div className="mt-2 text-sm leading-7 text-slate-600">{vendor.rationale}</div><div className="mt-3 text-sm text-slate-500">{vendor.capacitySignals.join(" • ")}</div><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => flagVendorRisk(vendor.id)} className="rounded-full border border-rose-400/20 bg-rose-50 px-4 py-2 text-xs text-rose-700">Flag risk</button><button onClick={() => toggleCompareVendor(vendor.id)} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700">Toggle compare</button><Link href={`/app/sponsor/vendors/${vendor.id}`} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700">Profile</Link></div></div>)}</div>
      <div className="flex flex-wrap gap-3"><button onClick={() => saveShortlist(primaryProgramme.id, compared.map((vendor) => vendor.id))} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Save as shortlist</button><button onClick={() => createRfp(primaryProgramme.id)} className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700">Proceed to RFP</button></div>
      <SponsorCards title="Decision notes" subtitle="Buyer-facing synthesis and next steps." items={compared.map((vendor) => ({ title: vendor.name, body: `${vendor.risks} Services: ${vendor.services.join(", ")}.`, meta: vendor.relationship, tone: vendor.relationship === "flagged" ? "red" : vendor.relationship === "finalist" ? "teal" : "gold" }))} />
    </div>
  );
}



