"use client";

import { SponsorAiPanel, SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function RfpComparisonPage({ params }: { params: { id: string } }) {
  const { proposals, generateComparison, comparisonRun } = useSponsorDemo();
  const scoped = proposals.filter((proposal) => proposal.rfpId === params.id);

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="AI comparison report" title={`Proposal comparison for ${params.id}`} body="This report now uses a staged AI generation sequence. The sponsor sees sections populate progressively as technical, commercial, timeline, and risk signals are normalized into a weighted recommendation." badges={[{ label: "AI normalized", tone: "teal" }, { label: "Comparison ready", tone: "gold" }]} actions={[{ label: "Award board", href: `/app/sponsor/rfps/${params.id}/award`, tone: "primary" }]} />
      <SponsorAiPanel active={comparisonRun.active && comparisonRun.rfpId === params.id} title="Comparison generation" progress={comparisonRun.active && comparisonRun.rfpId === params.id ? comparisonRun.progress : 100} stage={comparisonRun.active && comparisonRun.rfpId === params.id ? comparisonRun.stage : "Recommendation ready"} summary="Generate a weighted sponsor-facing comparison across technical fit, commercials, timeline, and quality confidence.">{comparisonRun.sectionsReady.length ? <div className="text-sm text-slate-600">Sections: {comparisonRun.sectionsReady.join(" • ")}</div> : null}</SponsorAiPanel>
      <SponsorTable title="Weighted comparison" subtitle="Normalized proposal scoring with believable commercial and technical detail." columns={["Vendor", "Technical", "Price", "Timeline", "Regulatory", "Total"]} rows={scoped.map((proposal) => [proposal.vendor, `${proposal.tech}`, `${proposal.price}`, `${proposal.timeline}`, `${proposal.regulatory}`, `${proposal.total}`])} />
      <button onClick={() => void generateComparison(params.id)} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Refresh comparison</button>
      <SponsorCards title="Recommendation summary" subtitle="Buyer-facing synthesis from the generated comparison." items={scoped.map((proposal) => ({ title: proposal.vendor, body: `${proposal.note} Commercial: ${proposal.priceBand}. Completeness: ${proposal.completeness}%.`, meta: proposal.status, tone: proposal.status === "selected" ? "green" : proposal.status === "rejected" ? "red" : "gold" }))} />
    </div>
  );
}


