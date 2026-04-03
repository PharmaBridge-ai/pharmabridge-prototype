"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function NewRfpPage() {
  const router = useRouter();
  const { programmes, createRfp, distributeRfp } = useSponsorDemo();
  const programme = useMemo(() => programmes.find((item) => item.shortlistIds.length > 0) ?? programmes[0], [programmes]);
  const shortlistCount = programme?.shortlistIds.length ?? 0;

  const createDraft = () => { if (!programme) return; const id = createRfp(programme.id); if (id) router.push(`/app/sponsor/rfps/${id}`); };
  const createAndDistribute = () => { if (!programme) return; const id = createRfp(programme.id); if (id) { distributeRfp(id); router.push(`/app/sponsor/rfps/${id}`); } };

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="RFP builder" title="Structured, NDA-gated sponsor RFP configuration" body="This RFP builder now behaves like procurement software instead of a static form. It seeds from the most relevant programme with a live shortlist, validates bidder readiness, and can create either a draft or a live RFP object in the local simulation." badges={[{ label: programme?.name ?? "No programme", tone: "teal" }, { label: `${shortlistCount} invited vendors`, tone: shortlistCount ? "gold" : "red" }]} />
      <SponsorTable title="RFP setup summary" subtitle="Core bidder, scope, and rubric inputs seeded from the selected programme." columns={["Field", "Value", "Status"]} rows={[["Programme", programme?.name ?? "None", programme ? "Selected" : "Missing"], ["Shortlisted vendors", `${shortlistCount}`, shortlistCount ? "Ready" : "Blocked"], ["NDA mode", "Enabled", "Default"], ["Scoring rubric", "40 / 20 / 20 / 20", "Ready"], ["Timeline", programme?.timeline ?? "TBD", "Validated"]]} />
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]"><SponsorCards title="Builder steps" subtitle="The operational sequence in the upgraded sponsor flow." items={[{ title: "Scope and work packages", body: "Technical package, work packages, requirements, and documents are seeded from the programme record.", meta: "Step 1", tone: "teal" }, { title: "Timeline and NDA", body: "Bidder deadlines, clarification windows, and NDA behavior are configured before release.", meta: "Step 2", tone: "gold" }, { title: "Evaluation rubric", body: "Weighted scoring drives the later AI comparison and award board.", meta: "Step 3", tone: "green" }]} /><SponsorCards title="Validation and guardrails" subtitle="The builder blocks unrealistic procurement flows for demos." items={[{ title: shortlistCount ? "Shortlist ready" : "No shortlisted vendors", body: shortlistCount ? "The bidder pool is connected and can move into draft RFP creation." : "Run matching or save a shortlist before creating an RFP.", meta: shortlistCount ? "Ready" : "Blocked", tone: shortlistCount ? "teal" : "red" }, { title: "Commercial discipline", body: "Timeline, invite count, and NDA expectations are preset for enterprise-style consistency.", meta: "Configured", tone: "gold" }]} /></div>
      <div className="flex flex-wrap gap-3"><button onClick={createDraft} disabled={!programme || !shortlistCount} className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700 disabled:opacity-50">Save draft</button><button onClick={createAndDistribute} disabled={!programme || !shortlistCount} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white disabled:opacity-50">Distribute RFP</button></div>
    </div>
  );
}

