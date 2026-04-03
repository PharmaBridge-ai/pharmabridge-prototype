"use client";

import type { Route } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
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
  const priorityActions = [
    {
      title: onboarding.status === "approved" ? "Continue lead programme" : "Complete onboarding",
      body: leadProgramme ? `${leadProgramme.name} is currently ${leadProgramme.status.replace(/_/g, " ")}.` : "Create your first programme to start matching.",
      meta: "Portfolio",
      href: onboarding.status === "approved" && leadProgramme ? `/app/sponsor/programmes/${leadProgramme.id}` : "/onboarding/sponsor/resume",
    },
    {
      title: "Run AI shortlist",
      body: leadProgramme ? `Refresh ranked vendors and matching rationale for ${leadProgramme.name}.` : "Create a programme first.",
      meta: "AI matching",
      href: leadProgramme ? `/app/sponsor/programmes/${leadProgramme.id}/matching` : "/app/sponsor/programmes/new",
    },
    {
      title: "Review live RFP",
      body: leadRfp ? `${leadRfp.title} is the active procurement motion.` : "No live RFP yet.",
      meta: "Procurement",
      href: leadRfp ? `/app/sponsor/rfps/${leadRfp.id}` : "/app/sponsor/rfps",
    },
    {
      title: "Approve milestone evidence",
      body: leadMilestone ? `${leadMilestone.title} affects escrow and release timing.` : "No milestone reviews pending.",
      meta: "Execution",
      href: leadMilestone ? `/app/sponsor/projects/${project.id}/milestones/${leadMilestone.id}` : "/app/sponsor/projects",
    },
  ];

  return (
    <div className="space-y-6">
      <SponsorHeader
        eyebrow="Sponsor dashboard"
        title="A calmer command center for programmes, procurement, and execution."
        body="This dashboard now prioritizes next actions, portfolio health, and live operating signals before deeper detail. The underlying sponsor workflow logic remains intact across onboarding, AI matching, shortlist save, RFP distribution, award, intelligence alerts, and milestone review."
        badges={[
          { label: `${activeProgrammes} active programmes`, tone: "teal" },
          { label: `${criticalAlerts} critical alerts`, tone: criticalAlerts ? "red" : "slate" },
          { label: `${milestonesNeedingAction} milestones requiring action`, tone: milestonesNeedingAction ? "gold" : "slate" },
        ]}
        actions={[{ label: onboarding.status === "approved" ? "Create programme" : "Resume onboarding", href: onboarding.status === "approved" ? "/app/sponsor/programmes/new" : "/onboarding/sponsor/resume" }]}
      />

      <SponsorMetricGrid metrics={[
        ["Active programmes", `${activeProgrammes}`, "Live sourcing and execution motions across the sponsor portfolio"],
        ["Live RFPs", `${liveRfps}`, "Distribution and proposal timelines currently in motion"],
        ["Proposal reviews", `${pendingProposalReviews}`, "Comparison-ready queues awaiting sponsor attention"],
        ["Critical alerts", `${criticalAlerts}`, `${watchlists.length} watchlists are actively monitoring vendor signals`],
      ]} />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[30px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,250,252,0.78))] p-6 shadow-[0_22px_70px_rgba(148,163,184,0.10)] backdrop-blur-2xl">
          <div className="flex flex-col gap-2 border-b border-slate-200/70 pb-5">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Action needed</div>
            <div className="font-display text-[2rem] leading-tight tracking-[-0.04em] text-slate-950">Highest-priority sponsor actions</div>
            <p className="text-sm leading-7 text-slate-600">Primary next steps stay visible here so the dashboard never feels like a widget wall.</p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {priorityActions.map((item) => (
              <Link key={item.title} href={item.href as Route} className="rounded-[24px] border border-slate-200/80 bg-white/80 p-5 shadow-[0_10px_24px_rgba(148,163,184,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(148,163,184,0.10)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-display text-[1.7rem] leading-tight tracking-[-0.04em] text-slate-950">{item.title}</div>
                  <span className="rounded-full border border-sky-200/80 bg-sky-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-sky-700">{item.meta}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-800">Open <ArrowRight className="h-4 w-4" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(239,247,255,0.80))] p-6 shadow-[0_22px_70px_rgba(59,130,246,0.08)] backdrop-blur-2xl">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sky-700"><Sparkles className="h-3.5 w-3.5" />AI and intelligence</div>
          <div className="mt-3 font-display text-[2rem] leading-tight tracking-[-0.04em] text-slate-950">Signals that should influence this week’s decisions.</div>
          <div className="mt-5 space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <Link key={alert.id} href="/app/sponsor/intelligence" className="block rounded-[22px] border border-white/80 bg-white/82 p-4 shadow-[0_10px_24px_rgba(148,163,184,0.08)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-950">{alert.title}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{alert.body}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${alert.status === "critical" || alert.status === "high_risk" ? "border-rose-200/80 bg-rose-50/85 text-rose-700" : "border-amber-200/80 bg-amber-50/85 text-amber-700"}`}>{alert.status.replace(/_/g, " ")}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-5 rounded-[22px] border border-slate-200/80 bg-white/78 p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Watchlist footprint</div>
            <div className="mt-2 text-sm text-slate-600">{watchlists.length} active watchlists feeding sponsor decisions across sourcing and project execution.</div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SponsorCards
          title="Portfolio modules"
          subtitle="Structured entry points into the next stage of sponsor work."
          items={[
            { title: "Active programmes", body: `${programmes.length} programmes across draft, shortlist, RFP, and execution states.`, meta: "Portfolio", href: "/app/sponsor/programmes" },
            { title: "AI suggested vendors", body: "Open search, matching, or compare to act on ranked vendor recommendations.", meta: "Vendor discovery", href: "/app/sponsor/compare", tone: "gold" },
            { title: "Pending approvals", body: `${milestonesNeedingAction} milestone reviews are awaiting sponsor action.`, meta: "Execution", href: "/app/sponsor/projects", tone: milestonesNeedingAction ? "gold" : "slate" },
          ]}
        />
        <SponsorTimeline title="Recent activity" subtitle="A cleaner operational feed that keeps status history visible without overwhelming the page." items={activity.slice(0, 5).map((item) => ({ title: item.title, meta: `${item.detail} • ${item.time}`, state: "Logged" }))} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/app/sponsor/programmes/new" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">Create programme</Link>
        {leadProgramme ? <Link href={`/app/sponsor/programmes/${leadProgramme.id}/matching`} className="rounded-full border border-slate-200/80 bg-white px-5 py-3 text-sm font-medium text-slate-700">Run AI match</Link> : null}
        {leadRfp ? <Link href={`/app/sponsor/rfps/${leadRfp.id}`} className="rounded-full border border-slate-200/80 bg-white px-5 py-3 text-sm font-medium text-slate-700">Review live RFP</Link> : null}
        {leadMilestone ? <Link href={`/app/sponsor/projects/${project.id}/milestones/${leadMilestone.id}`} className="rounded-full border border-slate-200/80 bg-white px-5 py-3 text-sm font-medium text-slate-700">Review milestone</Link> : null}
      </div>
    </div>
  );
}
