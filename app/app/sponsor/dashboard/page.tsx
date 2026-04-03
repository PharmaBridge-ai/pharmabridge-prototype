"use client";

import Link from "next/link";
import { SponsorCards, SponsorHeader, SponsorMetricGrid, SponsorTimeline } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function SponsorDashboardPage() {
  const { programmes, rfps, milestones, alerts, watchlists, activity, onboarding, project } = useSponsorDemo();
  const activeProgrammes = programmes.filter((item) => item.status !== "completed").length;
  const liveRfps = rfps.filter((item) => item.state === "live" || item.state === "proposals_incoming" || item.state === "comparison_ready").length;
  const pendingProposalReviews = rfps.filter((item) => item.state === "comparison_ready" || item.state === "award_pending").length;
  const milestonesNeedingAction = milestones.filter((item) => item.state === "awaiting_review" || item.state === "overdue").length;
  const criticalAlerts = alerts.filter((item) => item.status === "critical" || item.status === "high_risk").length;
  const leadProgramme = programmes[0];
  const leadRfp = rfps[0];
  const leadMilestone = milestones.find((item) => item.state === "awaiting_review") ?? milestones[0];

  return (
    <div className="space-y-6">
      <SponsorHeader
        eyebrow="Sponsor dashboard"
        title="A calm command center for programmes, vendors, procurement, and execution."
        body="The dashboard reflects workflow state changes across onboarding, AI matching, shortlist save, RFP distribution, award, intelligence alerts, and milestone review."
        badges={[
          { label: `${activeProgrammes} active programmes`, tone: "teal" },
          { label: `${criticalAlerts} critical alerts`, tone: criticalAlerts ? "red" : "slate" },
          { label: `${milestonesNeedingAction} milestones requiring action`, tone: milestonesNeedingAction ? "gold" : "slate" },
        ]}
        actions={[{ label: onboarding.status === "approved" ? "Create programme" : "Resume onboarding", href: onboarding.status === "approved" ? "/app/sponsor/programmes/new" : "/onboarding/sponsor/resume" }]}
      />

      <SponsorMetricGrid metrics={[
        ["Active programmes", `${activeProgrammes}`, "Connected to programme creation and award updates"],
        ["Live RFPs", `${liveRfps}`, "Distribution and comparison states roll up here"],
        ["Proposals awaiting review", `${pendingProposalReviews}`, "Comparison-ready queues need sponsor attention"],
        ["Critical alerts", `${criticalAlerts}`, `${watchlists.length} watchlists are running`],
      ]} />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SponsorCards
          title="Action required"
          subtitle="Primary CTA cards always lead into the next step in the sponsor journey."
          items={[
            { title: "Continue first programme", body: leadProgramme ? `${leadProgramme.name} is currently ${leadProgramme.status.replace(/_/g, " ")}.` : "Create your first programme to start matching.", meta: "Programme", href: leadProgramme ? `/app/sponsor/programmes/${leadProgramme.id}` : "/app/sponsor/programmes/new" },
            { title: "Run AI shortlist", body: leadProgramme ? `Open ${leadProgramme.name} and run or rerun vendor matching.` : "Create a programme first.", meta: "AI match", href: leadProgramme ? `/app/sponsor/programmes/${leadProgramme.id}/matching` : "/app/sponsor/programmes/new" },
            { title: "Review active RFP", body: leadRfp ? `${leadRfp.title} is the current procurement motion.` : "No live RFP yet.", meta: "RFP", href: leadRfp ? `/app/sponsor/rfps/${leadRfp.id}` : "/app/sponsor/rfps" },
            { title: "Review milestone", body: leadMilestone ? `${leadMilestone.title} impacts escrow and payment state.` : "No milestone reviews pending.", meta: "Milestone", href: leadMilestone ? `/app/sponsor/projects/${project.id}/milestones/${leadMilestone.id}` : "/app/sponsor/projects" },
          ]}
        />
        <SponsorCards
          title="Intelligence and watchlists"
          subtitle="Alerts and watched vendors stay connected to programmes, shortlists, and awarded work."
          items={alerts.slice(0, 4).map((alert) => ({ title: alert.title, body: alert.body, meta: alert.status.replace(/_/g, " "), href: "/app/sponsor/intelligence" }))}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SponsorCards
          title="Operational widgets"
          subtitle="These widgets update when actions happen in matching, shortlist, RFP, and project routes."
          items={[
            { title: "Active programmes", body: `${programmes.length} programmes across draft, shortlist, RFP, and execution states.`, meta: "Portfolio", href: "/app/sponsor/programmes" },
            { title: "AI suggested vendors", body: "Open the compare view or a programme matching screen to act on ranked vendors.", meta: "Vendor discovery", href: "/app/sponsor/compare" },
            { title: "Pending approvals", body: `${milestonesNeedingAction} milestone reviews are awaiting sponsor action.`, meta: "Execution", href: "/app/sponsor/projects" },
          ]}
        />
        <SponsorTimeline title="Recent activity" subtitle="Every key object keeps visible operating history for demo realism." items={activity.slice(0, 5).map((item) => ({ title: item.title, meta: `${item.detail} • ${item.time}`, state: "Logged" }))} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/app/sponsor/programmes/new" className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Create programme</Link>
        {leadProgramme ? <Link href={`/app/sponsor/programmes/${leadProgramme.id}/matching`} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Run AI Match</Link> : null}
        {leadRfp ? <Link href={`/app/sponsor/rfps/${leadRfp.id}`} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Review live RFP</Link> : null}
        {leadMilestone ? <Link href={`/app/sponsor/projects/${project.id}/milestones/${leadMilestone.id}`} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Review milestone</Link> : null}
      </div>
    </div>
  );
}

