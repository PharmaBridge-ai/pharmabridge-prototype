import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";

export default async function RfpQaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Clarifications" title={`Q&A thread for ${id}`} body="Clarification management is transparent to all bidders. Sponsor responses are broadcast to every invited vendor and logged in the audit trail for process defensibility." badges={[{ label: "5 business day window", tone: "gold" }, { label: "Visible to all bidders", tone: "teal" }]} actions={[{ label: "Back to RFP", href: `/app/sponsor/rfps/${id}`, tone: "ghost" }]} />
      <SponsorTable title="Question log" subtitle="Threaded buyer-side clarifications with topic tagging." columns={["Topic", "Vendor", "Question", "Answer owner", "Window"]} rows={[["Sterile fill", "WuXi XDC", "Can visual inspection be performed at the same site?", "CMC Lead", "Open"],["Release testing", "Lonza Ibex", "Clarify external lab acceptance for comparator release.", "QA Reviewer", "Answered"],["Timeline", "Abzena", "Is deadline extension possible if batch records are added?", "Procurement", "Under review"]]} />
      <SponsorCards title="Rules" subtitle="Q&A behavior that the prototype should make obvious." items={[{ title: "One answer, all bidders", body: "Any sponsor response is visible to every bidder to keep the RFP process fair and auditable.", meta: "Fairness rule", tone: "teal" },{ title: "Attachment-aware", body: "Answers can include updated scope documents or addenda, with the audit trail recording exactly what changed and when.", meta: "Audit trail", tone: "gold" }]} />
    </div>
  );
}
