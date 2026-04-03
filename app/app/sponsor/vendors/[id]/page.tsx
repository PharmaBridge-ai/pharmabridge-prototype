"use client";

import Link from "next/link";
import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function SponsorVendorPage({ params }: { params: { id: string } }) {
  const { vendors, addVendorToShortlist, toggleVendorWatch, flagVendorRisk, programmes, toggleCompareVendor, compareVendorIds } = useSponsorDemo();
  const vendor = vendors.find((item) => item.id === params.id) ?? vendors[0];
  const primaryProgramme = programmes[0];
  const compared = compareVendorIds.includes(vendor.id);

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Vendor profile" title={vendor.name} body="Vendor profile is now an operational due-diligence workspace. Shortlisting, watching, compare selection, and risk flags all propagate into programme, dashboard, compare, and intelligence views." badges={[{ label: `${vendor.fit} fit`, tone: "teal" }, { label: `${vendor.score} CRDMO`, tone: "gold" }, { label: vendor.relationship, tone: vendor.relationship === "flagged" ? "red" : "slate" }]} actions={[{ label: "Compare board", href: "/app/sponsor/compare", tone: "ghost" }, { label: "Matching workspace", href: `/app/sponsor/programmes/${primaryProgramme.id}/matching`, tone: "primary" }]} />
      <SponsorTable title="Vendor overview" subtitle="Core sponsor due-diligence fields used across discovery and procurement." columns={["Field", "Value", "Meaning"]} rows={[["Availability", vendor.availability, "Used in AI shortlist and scheduling review"], ["Geography", vendor.geography, "Supports region filtering and site review"], ["Regulatory", vendor.regulatorySummary, "Inspection and release posture"], ["Quality", vendor.qualitySummary, "Operational confidence and execution maturity"]]} />
      <div className="flex flex-wrap gap-3"><button onClick={() => addVendorToShortlist(primaryProgramme.id, vendor.id)} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Add to shortlist</button><button onClick={() => toggleVendorWatch(vendor.id)} className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700">Watch vendor</button><button onClick={() => toggleCompareVendor(vendor.id)} className={`rounded-full border px-5 py-3 text-sm ${compared ? "border-indigo-200 bg-indigo-600 text-white" : "border-slate-200/80 text-slate-700"}`}>{compared ? "Added to compare" : "Add to compare"}</button><button onClick={() => flagVendorRisk(vendor.id)} className="rounded-full border border-rose-400/20 bg-rose-50 px-5 py-3 text-sm text-rose-700">Flag risk</button><Link href="/app/sponsor/intelligence" className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700">Intelligence</Link></div>
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SponsorCards title="Capabilities" subtitle="Production-grade diligence slices for the sponsor view." items={[{ title: "Service strengths", body: vendor.services.join(", "), meta: "Capabilities", tone: "teal" }, { title: "Capacity signals", body: vendor.capacitySignals.join(" • "), meta: vendor.availability, tone: vendor.availability === "Available" ? "green" : vendor.availability === "Tight" ? "gold" : "teal" }, { title: "Documents", body: vendor.documents.join(", "), meta: "Vault", tone: "slate" }]} />
        <SponsorCards title="Risk and due diligence" subtitle="What a sponsor team needs before moving to finalist or award state." items={[{ title: "Risk framing", body: vendor.risks, meta: vendor.riskLevel, tone: vendor.riskLevel === "High" ? "red" : "gold" }, { title: "Sites", body: vendor.sites.map((site) => `${site.name} (${site.region})`).join(" • "), meta: `${vendor.sites.length} sites`, tone: "teal" }, { title: "Sponsor notes", body: vendor.notes.length ? vendor.notes.join(" • ") : "No internal notes yet.", meta: vendor.relationship, tone: "slate" }]} />
      </div>
    </div>
  );
}



