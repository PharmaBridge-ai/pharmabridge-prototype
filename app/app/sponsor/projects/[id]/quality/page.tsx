import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";

export default async function ProjectQualityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Quality review" title={`Quality dashboard for ${id.replace(/-/g, " ")}`} body="Track RFT, OTD, OOS, deviation rate, CAPA closure, and site-level concentration of issues as part of the ongoing Sponsor quality view." badges={[{ label: "RFT / OTD / OOS", tone: "teal" }, { label: "Site-level breakdown", tone: "gold" }]} />
      <SponsorTable title="Quality KPIs" subtitle="Core execution metrics surfaced into the project workspace." columns={["Metric", "Current", "Trend", "Comment"]} rows={[["RFT", "97%", "Stable", "One repeat analytical run logged"],["OTD", "91%", "Down", "Driven by engineering run review delay"],["OOS rate", "0.8%", "Stable", "No new material excursions"],["CAPA closure", "83%", "Up", "Two overdue actions closed this week"]]} />
      <SponsorCards title="Reviewer actions" subtitle="What the buyer can do from the quality module." items={[{ title: "Download quality report", body: "Generate a formal report for governance or executive review.", meta: "Reporting", tone: "teal" },{ title: "Flag vendor concern", body: "Push quality concerns into intelligence watchlists or future sourcing scorecards.", meta: "Feedback loop", tone: "gold" }]} />
    </div>
  );
}
