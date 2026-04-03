import type { Route } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CheckCircle2, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { HighlightGrid, StatGrid } from "@/components/ui/primitives";
import type { MarketingPage as MarketingPageType } from "@/lib/types";

type MarketingPageProps = {
  page: MarketingPageType;
  pageKey: string;
};

const pageThemes: Record<string, { heroLabel: string; heroMetric: string; heroMetricLabel: string; heroNote: string; featureTitle: string; featureBody: string; featurePoints: string[]; featurePanel: { title: string; body: string; badge: string }[]; ctaTitle: string; ctaBody: string; }> = {
  platform: {
    heroLabel: "Platform architecture",
    heroMetric: "12.4k",
    heroMetricLabel: "Signals flowing through the decision layer",
    heroNote: "Purpose-built for multi-step sponsor outsourcing workflows, not generic CRM or procurement templates.",
    featureTitle: "One operating model from programme brief to project execution.",
    featureBody: "The platform page should explain how PharmaBridge behaves as a connected software system: intake, matching, shortlist, RFP, comparison, award, and execution all share state, signals, and governed next steps.",
    featurePoints: ["Structured sponsor intake and programme normalization", "AI ranking with modality, capacity, and risk logic", "RFP, proposals, award, and escrow-backed execution in one flow"],
    featurePanel: [
      { title: "Intake to match", body: "Programmes become machine-readable sourcing briefs instead of static documents.", badge: "Workflow layer" },
      { title: "Decision support", body: "Scores, rationale, and signals stay connected through shortlist and comparison.", badge: "Intelligence" },
      { title: "Execution continuity", body: "Awarded work moves directly into milestones, docs, issues, and billing context.", badge: "Operational trust" },
    ],
    ctaTitle: "See the platform in motion.",
    ctaBody: "Explore the Sponsor workspace and follow the connected path from sourcing to execution.",
  },
  "solutions/sponsors": {
    heroLabel: "Sponsor solution",
    heroMetric: "14",
    heroMetricLabel: "Live sourcing motions in the demo portfolio",
    heroNote: "Built for sponsor teams that need intelligent sourcing, procurement control, and execution visibility in one premium workspace.",
    featureTitle: "A sponsor workflow that stays clear even when the process gets complex.",
    featureBody: "This page should feel like a product solution page, not a brochure. It explains how sponsor teams create programmes, evaluate vendors, move into RFP, compare responses, award work, and manage downstream execution with more clarity.",
    featurePoints: ["Guided onboarding and programme setup", "AI matching, vendor review, compare, and shortlist", "RFP, proposals, award board, project workspace, and alerts"],
    featurePanel: [
      { title: "Buyer command center", body: "Dashboard, active programmes, and action-needed states stay visible and calm.", badge: "Executive clarity" },
      { title: "Evaluation workflow", body: "Discovery and compare flows prioritize rationale, fit, and risk without crowding the page.", badge: "Procurement UX" },
      { title: "Governed execution", body: "Projects, milestones, issues, and escrow maintain continuity after award.", badge: "End-to-end" },
    ],
    ctaTitle: "Open the Sponsor experience.",
    ctaBody: "Move from public narrative into the actual sponsor workflow system.",
  },
  pricing: {
    heroLabel: "Commercial model",
    heroMetric: "3",
    heroMetricLabel: "Packaging motions for buyers, pilots, and enterprise rollouts",
    heroNote: "Pricing should feel enterprise-grade, with implementation posture and workflow depth visible up front.",
    featureTitle: "Package the product like a serious platform, not a lightweight SaaS utility.",
    featureBody: "The pricing page should present confidence: plan framing, implementation expectations, service model, and why the product commands premium positioning in regulated outsourcing workflows.",
    featurePoints: ["Clear plan hierarchy from pilot to enterprise", "Implementation and enablement framed as part of delivery", "Workflow depth and support model treated as value, not filler"],
    featurePanel: [
      { title: "Growth", body: "For initial sponsor teams validating sourcing and shortlist workflows.", badge: "Pilot motion" },
      { title: "Scale", body: "For cross-functional teams managing live procurement and proposal evaluation.", badge: "Operational rollout" },
      { title: "Enterprise", body: "For governed procurement, execution control, and premium support expectations.", badge: "Strategic account" },
    ],
    ctaTitle: "Frame the commercial conversation with more confidence.",
    ctaBody: "Use premium packaging, stronger hierarchy, and less generic plan presentation.",
  },
  about: {
    heroLabel: "Company context",
    heroMetric: "1",
    heroMetricLabel: "Focused platform vision for outsourced pharma operations",
    heroNote: "The about page should build trust through product seriousness, market understanding, and operational credibility.",
    featureTitle: "A company story told through product clarity and trust, not marketing noise.",
    featureBody: "The goal here is to explain why PharmaBridge exists, who it serves, and what principles shape the product: connected workflow state, sponsor trust, regulated process discipline, and calmer decision support.",
    featurePoints: ["Sponsor-first product strategy for outsourcing decisions", "Trust by design across data, workflow, and commercial governance", "Clear market position as an intelligence and workflow layer"],
    featurePanel: [
      { title: "Why now", body: "Outsourcing decisions are still fragmented across spreadsheets, inboxes, and word-of-mouth networks.", badge: "Market gap" },
      { title: "What PharmaBridge is", body: "A product layer that connects sourcing, procurement, intelligence, and execution into one operating model.", badge: "Positioning" },
      { title: "How it should feel", body: "Calm, premium, high-trust, and capable of supporting enterprise buyer confidence.", badge: "Product standard" },
    ],
    ctaTitle: "Continue into the product, not just the story.",
    ctaBody: "The brand promise should connect cleanly into the Sponsor experience and platform workflow.",
  },
};

const defaultTheme = {
  heroLabel: "Platform page",
  heroMetric: "2,400+",
  heroMetricLabel: "Verified vendors and partner profiles",
  heroNote: "Product-grade public pages should feel consistent with the app experience.",
  featureTitle: "Structured public storytelling with product-first clarity.",
  featureBody: "These pages should present stronger hierarchy, richer modules, and a clearer connection between message and workflow.",
  featurePoints: ["Premium layout rhythm", "Stronger information grouping", "Cleaner product narrative"],
  featurePanel: [
    { title: "Richer hero", body: "Stronger top-of-page hierarchy and support modules.", badge: "Upgrade" },
    { title: "Better middle sections", body: "Less generic stacking, more deliberate module framing.", badge: "Layout" },
    { title: "Cleaner CTA finish", body: "Calmer conversion block with product continuity.", badge: "Polish" },
  ],
  ctaTitle: "Continue into the product ecosystem.",
  ctaBody: "Public pages should now feel much closer to the landing page and app shell.",
};

function toneClass(index: number) {
  if (index === 0) return "border-sky-200/80 bg-sky-50/85 text-sky-700";
  if (index === 1) return "border-emerald-200/80 bg-emerald-50/85 text-emerald-700";
  return "border-amber-200/80 bg-amber-50/85 text-amber-700";
}

export function MarketingPage({ page, pageKey }: MarketingPageProps) {
  const theme = pageThemes[pageKey] ?? defaultTheme;

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="relative overflow-hidden rounded-[36px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(246,249,252,0.86))] p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-10 lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_12%_18%,rgba(16,185,129,0.10),transparent_22%)]" />
        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/85 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-sky-700">
              <Sparkles className="h-3.5 w-3.5" />
              {theme.heroLabel}
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] tracking-[-0.05em] text-slate-950 md:text-[4.25rem]">
              {page.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg md:leading-9">{page.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {page.ctaLabel && page.ctaHref ? (
                <Link href={page.ctaHref as Route} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">
                  {page.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
              {page.secondaryLabel && page.secondaryHref ? (
                <Link href={page.secondaryHref as Route} className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/85 px-6 py-3.5 text-sm font-medium text-slate-700 shadow-[0_10px_24px_rgba(148,163,184,0.08)]">
                  {page.secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,250,252,0.76))] p-5 shadow-[0_16px_40px_rgba(148,163,184,0.10)] backdrop-blur-xl">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Signal panel</div>
            <div className="mt-3 font-display text-5xl tracking-[-0.05em] text-slate-950">{theme.heroMetric}</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">{theme.heroMetricLabel}</div>
            <div className="mt-5 rounded-[22px] border border-slate-200/80 bg-white/82 p-4">
              <div className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
                <span>{theme.heroNote}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatGrid stats={page.stats} />

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[32px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,250,252,0.78))] p-6 shadow-[0_20px_60px_rgba(148,163,184,0.10)] backdrop-blur-xl md:p-8">
          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Product framing</div>
          <h2 className="mt-3 font-display text-4xl leading-tight tracking-[-0.05em] text-slate-950 md:text-5xl">{theme.featureTitle}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base md:leading-8">{theme.featureBody}</p>
          <div className="mt-6 space-y-3">
            {theme.featurePoints.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-[20px] border border-slate-200/80 bg-white/80 px-4 py-4 text-sm leading-6 text-slate-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {theme.featurePanel.map((panel, index) => (
            <div key={panel.title} className="rounded-[28px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(247,250,252,0.76))] p-5 shadow-[0_18px_50px_rgba(148,163,184,0.10)] backdrop-blur-xl">
              <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${toneClass(index)}`}>{panel.badge}</span>
              <div className="mt-4 font-display text-3xl tracking-[-0.04em] text-slate-950">{panel.title}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{panel.body}</p>
            </div>
          ))}
        </div>
      </section>

      <HighlightGrid items={page.highlights} />

      <section className="rounded-[34px] border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(242,247,252,0.84))] p-6 shadow-[0_22px_70px_rgba(148,163,184,0.10)] backdrop-blur-xl md:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
              <Layers3 className="h-3.5 w-3.5" />
              Next step
            </div>
            <h2 className="mt-3 max-w-4xl font-display text-4xl tracking-[-0.05em] text-slate-950 md:text-5xl">{theme.ctaTitle}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base md:leading-8">{theme.ctaBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {page.ctaLabel && page.ctaHref ? <Link href={page.ctaHref as Route} className="rounded-full bg-slate-950 px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">{page.ctaLabel}</Link> : null}
            {page.secondaryLabel && page.secondaryHref ? <Link href={page.secondaryHref as Route} className="rounded-full border border-slate-200/80 bg-white px-6 py-3.5 text-sm font-medium text-slate-700">{page.secondaryLabel}</Link> : null}
          </div>
        </div>
      </section>
    </div>
  );
}
