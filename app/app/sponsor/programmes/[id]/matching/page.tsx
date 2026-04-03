"use client";

import { use } from "react";
import Link from "next/link";
import { SponsorAiPanel, SponsorCompareTray, SponsorHeader } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

const modalityContent: Record<string, {
  title: string;
  summary: string;
  checkpoints: string[];
  capacities: { label: string; value: number; note: string }[];
  chain: { title: string; status: string; note: string }[];
}> = {
  ADC: {
    title: "ADC capability lens",
    summary: "OEB5 containment, linker-payload integration, DAR analytics, and sterile fill-finish are the highest-weight factors in this shortlist.",
    checkpoints: ["OEB5 suite validation", "Payload handling history", "DAR analytics maturity", "EU / FDA release path"],
    capacities: [
      { label: "OEB5 conjugation", value: 91, note: "Critical shortage" },
      { label: "ADC analytical release", value: 78, note: "Tight but manageable" },
      { label: "Sterile DP capacity", value: 68, note: "Monitor weekly" },
    ],
    chain: [
      { title: "Payload synthesis", status: "Watch", note: "Containment and hazardous material controls" },
      { title: "Linker chemistry", status: "Watch", note: "IP and route robustness" },
      { title: "Conjugation", status: "Ready", note: "Highest strategic weight" },
      { title: "Release analytics", status: "Ready", note: "DAR and free payload methods" },
      { title: "Fill-finish", status: "Monitor", note: "Slot timing sensitive" },
    ],
  },
  "LNP / mRNA": {
    title: "mRNA / LNP capability lens",
    summary: "The shortlist favors vendors with DS transfer experience, encapsulation maturity, cold-chain handling, and Annex 1 ready release controls.",
    checkpoints: ["Template and IVT platform", "LNP encapsulation scale-up", "Cold chain release ops", "Annex 1 and sterility controls"],
    capacities: [
      { label: "mRNA drug substance", value: 74, note: "Manageable" },
      { label: "LNP encapsulation", value: 82, note: "Tight" },
      { label: "Cold chain fill-finish", value: 69, note: "Watch lead times" },
    ],
    chain: [
      { title: "Plasmid / template prep", status: "Monitor", note: "Material dependency and release timing" },
      { title: "IVT / purification", status: "Ready", note: "Core process transfer block" },
      { title: "LNP encapsulation", status: "Watch", note: "Scale-up and particle consistency" },
      { title: "Sterile DP", status: "Monitor", note: "Annex 1 sensitivity" },
      { title: "Cold chain logistics", status: "Ready", note: "Distribution-critical" },
    ],
  },
  CGT: {
    title: "CGT capability lens",
    summary: "The shortlist is weighted toward chain-of-identity rigor, vector support, closed-system processing, and cell handling quality systems.",
    checkpoints: ["Chain of identity", "Vector readiness", "Closed process design", "ATMP quality systems"],
    capacities: [
      { label: "Autologous processing", value: 79, note: "Tight" },
      { label: "Vector support", value: 86, note: "Capacity constrained" },
      { label: "Cryogenic logistics", value: 61, note: "Operationally healthy" },
    ],
    chain: [
      { title: "Patient material intake", status: "Ready", note: "Identity controls are critical" },
      { title: "Vector / transduction", status: "Watch", note: "Upstream dependency risk" },
      { title: "Cell processing", status: "Ready", note: "Closed-system maturity preferred" },
      { title: "QC release", status: "Monitor", note: "Turnaround time is sponsor-critical" },
      { title: "Cryogenic distribution", status: "Monitor", note: "Chain of custody required" },
    ],
  },
};

function utilizationTone(value: number) {
  if (value >= 85) return "bg-gradient-to-r from-rose-500 to-amber-400";
  if (value >= 70) return "bg-gradient-to-r from-amber-400 to-orange-400";
  return "bg-gradient-to-r from-emerald-400 to-teal-400";
}

function statusTone(status: string) {
  if (status === "Watch") return "border-amber-200 bg-amber-50 text-amber-700";
  if (status === "Monitor") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-emerald-200 bg-emerald-50 text-emerald-700";
}

export default function ProgrammeMatchingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { programmes, vendors, aiRun, runAiMatching, addVendorToShortlist, toggleVendorWatch, flagVendorRisk, toggleCompareVendor, compareVendorIds } = useSponsorDemo();
  const programme = programmes.find((item) => item.id === id) ?? programmes[0];
  const visibleVendors = aiRun.active && aiRun.programmeId === programme.id ? vendors.filter((vendor) => aiRun.partialVendorIds.includes(vendor.id)) : vendors;
  const playbook = modalityContent[programme.modality] ?? modalityContent.ADC;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="AI match results" title={`${programme.name} matching workspace`} body="This view should feel like a modality-aware sourcing console, not a generic result list. The sponsor gets fit scoring, capability context, capacity pressure, and supply-chain style decision support before shortlisting." badges={[{ label: programme.modality, tone: "teal" }, { label: programme.status.replace(/_/g, " "), tone: "gold" }, { label: aiRun.active && aiRun.programmeId === programme.id ? `${aiRun.progress}% complete` : "Ready", tone: aiRun.active ? "gold" : "slate" }]} actions={[{ label: "Open shortlist", href: "/app/sponsor/shortlists", tone: "ghost" }]} />

      <SponsorAiPanel active={aiRun.active && aiRun.programmeId === programme.id} title="AI matching orchestration" progress={aiRun.active && aiRun.programmeId === programme.id ? aiRun.progress : 100} stage={aiRun.active && aiRun.programmeId === programme.id ? aiRun.stage : "Shortlist interaction enabled"} summary="Run AI match to parse programme requirements, normalize modality constraints, rank vendors, and reveal rationale with risk and capacity context.">
        <div className="flex flex-wrap gap-3"><button onClick={() => runAiMatching(programme.id)} disabled={aiRun.active} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">{aiRun.active ? `Processing ${aiRun.progress}%` : "Run AI Match"}</button><Link href="/app/sponsor/search" className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700">Open discovery view</Link></div>
      </SponsorAiPanel>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Modality playbook</div>
          <div className="mt-3 font-display text-3xl text-slate-900">{playbook.title}</div>
          <p className="mt-3 text-sm leading-7 text-slate-600">{playbook.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {playbook.checkpoints.map((checkpoint) => (
              <span key={checkpoint} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-600">{checkpoint}</span>
            ))}
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {playbook.chain.map((item) => (
              <div key={item.title} className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
                <div className="font-medium text-slate-900">{item.title}</div>
                <div className={`mt-3 inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${statusTone(item.status)}`}>{item.status}</div>
                <div className="mt-3 text-sm leading-6 text-slate-600">{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Capacity pressure</div>
          <div className="mt-3 font-display text-3xl text-slate-900">Shortlist timing signals</div>
          <div className="mt-5 space-y-4">
            {playbook.capacities.map((item) => (
              <div key={item.label} className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-900">{item.label}</span>
                  <span className="text-slate-600">{item.value}%</span>
                </div>
                <div className="mt-3 h-3 rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${utilizationTone(item.value)}`} style={{ width: `${item.value}%` }} />
                </div>
                <div className="mt-2 text-sm text-slate-600">{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {visibleVendors.map((vendor) => {
          const compared = compareVendorIds.includes(vendor.id);
          return (
            <div key={vendor.id} className="rounded-[30px] border border-slate-200/80 bg-white/84 p-5 shadow-[0_16px_40px_rgba(148,163,184,0.10)] transition duration-300 hover:-translate-y-1 hover:border-slate-200">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-3xl text-slate-900">{vendor.name}</div>
                  <div className="mt-1 text-sm text-slate-500">{vendor.geography}</div>
                </div>
                <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-indigo-700">{vendor.relationship}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-3"><div className="text-slate-500">Fit</div><div className="mt-1 text-2xl text-slate-900">{vendor.fit}</div></div>
                <div className="rounded-2xl border border-slate-200/80 bg-white p-3"><div className="text-slate-500">CRDMO</div><div className="mt-1 text-2xl text-slate-900">{vendor.score}</div></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">{vendor.badges.map((badge) => <span key={badge} className="rounded-full border border-slate-200/80 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-600">{badge}</span>)}</div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{vendor.rationale}</p>
              <div className="mt-4 rounded-[20px] border border-slate-200/80 bg-slate-50/80 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Why this vendor appears</div>
                <div className="mt-3 text-sm leading-6 text-slate-600">{vendor.services.slice(0, 2).join(" • ")} • {vendor.capacitySignals[0]}</div>
              </div>
              <div className="mt-3 text-sm text-amber-600">Capacity: {vendor.availability} • Risk: {vendor.riskLevel}</div>
              <div className="mt-2 text-sm text-rose-600">{vendor.risks}</div>
              <div className="mt-5 flex flex-wrap gap-2"><button onClick={() => addVendorToShortlist(programme.id, vendor.id)} className="rounded-full border border-indigo-200 bg-indigo-600 px-4 py-2 text-xs text-white transition hover:bg-indigo-500">Add to shortlist</button><button onClick={() => toggleVendorWatch(vendor.id)} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-50">Watch vendor</button><button onClick={() => toggleCompareVendor(vendor.id)} className={`rounded-full border px-4 py-2 text-xs transition ${compared ? "border-indigo-200 bg-indigo-600 text-white" : "border-slate-200/80 text-slate-700 hover:bg-slate-50"}`}>{compared ? "Added to compare" : "Compare"}</button><button onClick={() => flagVendorRisk(vendor.id)} className="rounded-full border border-rose-400/20 bg-rose-50 px-4 py-2 text-xs text-rose-700 transition hover:bg-rose-100">Flag risk</button><Link href={`/app/sponsor/vendors/${vendor.id}`} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-50">Full profile</Link></div>
            </div>
          );
        })}
      </div>
      <SponsorCompareTray count={compareVendorIds.length} />
    </div>
  );
}
