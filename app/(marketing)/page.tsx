import type { Route } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircuitBoard,
  FlaskConical,
  LockKeyhole,
  Microscope,
  Radar,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

type RoleCard = {
  label: string;
  href: string;
  body: string;
  meta: string;
  icon: LucideIcon;
  points: string[];
};

type ModalityCard = {
  label: string;
  signal: string;
  detail: string;
  icon: LucideIcon;
};

type WorkflowStep = {
  step: string;
  title: string;
  body: string;
  outcome: string;
};

const roles: RoleCard[] = [
  {
    label: "Sponsor",
    href: "/solutions/sponsors",
    body: "Create programmes, run AI matching, shortlist vendors, distribute RFPs, compare proposals, award work, and manage escrow-backed execution.",
    meta: "End-to-end sponsor flow",
    icon: Radar,
    points: ["Programme brief", "Vendor ranking", "RFP and award controls"],
  },
  {
    label: "CRDMO / CDMO",
    href: "/solutions/crdmo",
    body: "Present capability depth, regulatory posture, site availability, and quality maturity inside a sponsor-ready sourcing environment.",
    meta: "Capability + diligence surfaces",
    icon: Building2,
    points: ["Capability profile", "Compliance visibility", "Capacity signals"],
  },
  {
    label: "CRO",
    href: "/solutions/cro",
    body: "Surface study design, development, and specialist service expertise through the same connected outsourcing operating layer.",
    meta: "Research services network",
    icon: Stethoscope,
    points: ["Service taxonomy", "Study fit", "Shared sourcing layer"],
  },
];

const modalities: ModalityCard[] = [
  { label: "ADC", signal: "Payload + linker depth", detail: "High-potency lines and conjugation capability.", icon: Sparkles },
  { label: "LNP / mRNA", signal: "LNP systems", detail: "Formulation, fill-finish, and cold-chain readiness.", icon: CircuitBoard },
  { label: "Gene therapy", signal: "Vector operations", detail: "AAV, LV, and GMP viral-vector infrastructure.", icon: Microscope },
  { label: "mAbs", signal: "Biologics scale-up", detail: "Cell line, upstream, downstream, and analytical maturity.", icon: FlaskConical },
  { label: "Oligonucleotides", signal: "ASO / siRNA", detail: "Synthesis, purification, and delivery chemistry coverage.", icon: ShieldCheck },
  { label: "Peptides", signal: "SPPS + conjugation", detail: "Commercial peptide process intelligence and scale cues.", icon: BadgeCheck },
  { label: "Radiopharma", signal: "Hot-cell readiness", detail: "Isotope handling, shelf-life, and specialist QA signals.", icon: LockKeyhole },
  { label: "PROTAC", signal: "Targeted degradation", detail: "Medicinal chemistry and complex linker execution fit.", icon: ChevronRight },
  { label: "Small molecules", signal: "HPAPI capability", detail: "Process chemistry, containment, and CMC depth.", icon: Building2 },
  { label: "Molecular glues", signal: "Emerging modality fit", detail: "Novel platform screens and partner differentiation.", icon: Sparkles },
];

const sponsorFlow: WorkflowStep[] = [
  {
    step: "01",
    title: "Create programme",
    body: "Capture modality, stage, geography, quality requirements, regulatory constraints, and commercial guardrails in a structured sponsor brief.",
    outcome: "Structured intake and sourcing baseline",
  },
  {
    step: "02",
    title: "Run AI match",
    body: "Rank vendors against fit, CRDMO score, geography, current capacity, compliance posture, and known execution risk.",
    outcome: "Ranked longlist with confidence signals",
  },
  {
    step: "03",
    title: "Shortlist and launch RFP",
    body: "Move selected vendors into an NDA-aware RFP flow with controlled distribution, proposal intake, and audit history.",
    outcome: "Controlled distribution and proposal capture",
  },
  {
    step: "04",
    title: "Award and execute",
    body: "Carry the winning proposal into project workspace, escrow, milestone reviews, documents, issues, and communications.",
    outcome: "Execution workspace with governed delivery",
  },
];

const heroSignals = [
  { label: "Verified CRO and CDMO profiles", value: "2,400+", detail: "Across 42 countries" },
  { label: "Modality intelligence screens", value: "10", detail: "ADC to molecular glues" },
  { label: "Sponsor organisations", value: "480+", detail: "Enterprise buyer footprint" },
  { label: "Live intelligence streams", value: "24", detail: "Capacity, quality, regulatory" },
];

const matchCards = [
  { tag: "AI Match", value: "98.2%", sub: "Programme fit confidence", tone: "emerald" },
  { tag: "Capacity", value: "Live", sub: "12 suppliers with aligned windows", tone: "blue" },
  { tag: "Compliance", value: "3 alerts", sub: "Inspection and quality watchlist", tone: "amber" },
] as const;

const vendorRows = [
  { name: "Lonza Visp", score: "947", modality: "ADC CDMO", status: "Preferred fit", width: "94%" },
  { name: "Catalent GT", score: "928", modality: "Gene therapy", status: "Capacity watch", width: "88%" },
  { name: "Bachem AG", score: "914", modality: "Peptides", status: "Commercial-ready", width: "84%" },
  { name: "Almac Sciences", score: "903", modality: "PROTAC", status: "Specialist fit", width: "80%" },
];

const trustPoints = [
  "CRDMO scoring and due-diligence overlays built into sourcing flows",
  "Real-time capacity, quality, and regulatory monitoring inside the platform",
  "SOC 2 Type II, ISO 27001, and GMP-grade data standards",
  "Governed RFP, proposal, milestone, and escrow-backed execution workflows",
];

const intelligenceRail = [
  "ADC readiness",
  "LNP / mRNA systems",
  "Gene and cell therapy",
  "Monoclonal antibodies",
  "Small molecules and HPAPI",
  "Peptides and GLP-1 conjugation",
  "Radiopharmaceutical operations",
  "PROTAC development",
  "Oligonucleotide manufacturing",
  "Molecular glue screens",
  "CRDMO Score overlays",
  "Real-time GMP capacity intelligence",
];

export default function HomePage() {
  return (
    <div className="space-y-8 pb-6 md:space-y-10 md:pb-10">
      <section className="relative overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(246,249,252,0.86))] shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_12%_18%,rgba(16,185,129,0.12),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.35),transparent_58%)]" />
        <div className="relative grid gap-10 px-6 pb-8 pt-8 md:px-8 md:pb-10 md:pt-10 xl:grid-cols-[minmax(0,1.08fr)_480px] xl:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-600 shadow-[0_10px_30px_rgba(148,163,184,0.12)] backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Premium intelligence platform for pharma outsourcing
            </div>

            <h1 className="mt-6 max-w-4xl font-display text-[3rem] leading-[0.96] tracking-[-0.05em] text-slate-950 md:text-[4.6rem] xl:text-[5.3rem]">
              <span className="block">The Intelligence</span>
              <span className="block text-slate-400">Platform for</span>
              <span className="block text-emerald-700">Pharma Outsourcing</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg md:leading-9">
              Match with verified CROs and CDMOs across ADC, mRNA, gene therapy, mAbs, oligonucleotides, molecular glues, and more. CRDMO Score, real-time GMP capacity, and regulatory intelligence live inside one premium platform.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-medium text-white shadow-[0_14px_34px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:bg-slate-900"
              >
                Start matching
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/intelligence"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/82 px-6 py-3.5 text-sm font-medium text-slate-700 shadow-[0_12px_28px_rgba(148,163,184,0.10)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
              >
                Watch platform demo
              </Link>
              <Link
                href="/solutions/crdmo"
                className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/80 px-6 py-3.5 text-sm font-medium text-sky-800 hover:-translate-y-0.5 hover:border-sky-300"
              >
                Browse 2,400+ vendors
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                SOC 2 Type II certified
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ISO 27001
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                GMP-grade data standards
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                480+ sponsor organisations
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {heroSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-[24px] border border-white/75 bg-white/68 p-4 shadow-[0_14px_40px_rgba(148,163,184,0.10)] backdrop-blur-xl"
                >
                  <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{signal.label}</div>
                  <div className="mt-3 font-display text-3xl tracking-[-0.04em] text-slate-950">{signal.value}</div>
                  <div className="mt-1 text-sm text-slate-500">{signal.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(245,248,252,0.78))] p-4 shadow-[0_28px_90px_rgba(15,23,42,0.10)] backdrop-blur-2xl md:p-5">
              <div className="flex items-center justify-between rounded-[24px] border border-slate-200/70 bg-white/76 px-4 py-3 backdrop-blur-xl">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Programme workspace</div>
                  <div className="mt-1 text-sm font-medium text-slate-950">ADC oncology shortlist</div>
                </div>
                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">Matching live</div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {matchCards.map((card) => (
                  <div
                    key={card.tag}
                    className="rounded-[24px] border border-white/70 bg-white/74 p-4 shadow-[0_12px_32px_rgba(148,163,184,0.10)] backdrop-blur-xl"
                  >
                    <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{card.tag}</div>
                    <div className="mt-2 font-display text-3xl tracking-[-0.04em] text-slate-950">{card.value}</div>
                    <div className="mt-1 text-sm text-slate-500">{card.sub}</div>
                    <div className="mt-3 h-2 rounded-full bg-slate-100">
                      <div
                        className={card.tone === "emerald" ? "h-full rounded-full bg-emerald-500" : card.tone === "amber" ? "h-full rounded-full bg-amber-400" : "h-full rounded-full bg-sky-500"}
                        style={{ width: card.tone === "emerald" ? "98%" : card.tone === "amber" ? "56%" : "82%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[28px] border border-slate-200/70 bg-slate-950 p-5 text-white shadow-[0_18px_45px_rgba(15,23,42,0.24)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Recommended vendors</div>
                    <div className="mt-1 text-sm text-slate-300">CRDMO score, modality fit, and live operational signals</div>
                  </div>
                  <div className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] text-slate-200">4 shortlisted</div>
                </div>

                <div className="mt-5 space-y-4">
                  {vendorRows.map((vendor) => (
                    <div key={vendor.name} className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-medium text-white">{vendor.name}</div>
                          <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{vendor.modality}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-display text-2xl tracking-[-0.04em] text-white">{vendor.score}</div>
                          <div className="text-[11px] uppercase tracking-[0.14em] text-emerald-300">CRDMO score</div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                        <span>{vendor.status}</span>
                        <span>{vendor.width}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-300" style={{ width: vendor.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-y border-slate-200/70 bg-white/52 py-4">
          <div className="overflow-hidden whitespace-nowrap">
            <div className="inline-flex min-w-full animate-[marquee_32s_linear_infinite] gap-10 px-6 text-sm text-slate-500 [@keyframes_marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}] md:px-10">
              {intelligenceRail.concat(intelligenceRail).map((item, index) => (
                <div key={`${item}-${index}`} className="flex items-center gap-3 whitespace-nowrap">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Link
              key={role.label}
              href={role.href as Route}
              className="group rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(248,250,252,0.72))] p-6 shadow-[0_18px_54px_rgba(148,163,184,0.10)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(148,163,184,0.14)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{role.meta}</div>
                  <div className="mt-3 font-display text-3xl tracking-[-0.04em] text-slate-950">{role.label}</div>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3 text-slate-700 shadow-[0_10px_24px_rgba(148,163,184,0.10)]">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{role.body}</p>
              <div className="mt-5 space-y-2">
                {role.points.map((point) => (
                  <div key={point} className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                    {point}
                  </div>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-800">
                Explore solution
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </section>

      <section className="rounded-[34px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(245,248,252,0.74))] p-6 shadow-[0_20px_60px_rgba(148,163,184,0.10)] backdrop-blur-xl md:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Modality coverage</div>
            <h2 className="mt-3 max-w-2xl font-display text-4xl tracking-[-0.05em] text-slate-950 md:text-5xl">
              Structured sourcing across the modalities that matter.
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600 md:text-base md:leading-8">
            The platform should surface modality-specific capability, diligence, and capacity directly inside sponsor matching, vendor evaluation, and intelligence instead of flattening everything into generic cards.
          </p>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {modalities.map((modality) => {
            const Icon = modality.icon;
            return (
              <div
                key={modality.label}
                className="group rounded-[24px] border border-slate-200/70 bg-white/76 p-5 shadow-[0_14px_34px_rgba(148,163,184,0.08)] transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_18px_44px_rgba(59,130,246,0.10)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-3 text-slate-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{modality.signal}</div>
                </div>
                <div className="mt-5 font-display text-2xl tracking-[-0.04em] text-slate-950">{modality.label}</div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{modality.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[34px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(246,249,252,0.76))] p-6 shadow-[0_20px_60px_rgba(148,163,184,0.10)] backdrop-blur-xl md:p-8 lg:p-10">
          <div className="flex flex-col gap-3 border-b border-slate-200/70 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Sponsor journey</div>
              <h2 className="mt-3 font-display text-4xl tracking-[-0.05em] text-slate-950 md:text-5xl">From programme intake to awarded execution.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">A workflow-led product story with clear progression, controls, and operating outputs at every stage.</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {sponsorFlow.map((item) => (
              <div key={item.step} className="rounded-[26px] border border-slate-200/70 bg-white/78 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.08)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl border border-sky-200 bg-sky-50 px-3 py-2 text-[11px] font-medium tracking-[0.18em] text-sky-700">
                    {item.step}
                  </div>
                  <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] text-emerald-700">{item.outcome}</div>
                </div>
                <div className="mt-5 font-display text-3xl tracking-[-0.04em] text-slate-950">{item.title}</div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-slate-200/70 bg-[linear-gradient(180deg,#eef4ff_0%,#f7fbff_46%,#ffffff_100%)] p-6 shadow-[0_20px_60px_rgba(59,130,246,0.08)] md:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Trust and compliance</div>
              <div className="mt-3 font-display text-4xl tracking-[-0.05em] text-slate-950 md:text-[2.8rem]">Enterprise-grade assurance built into every workflow.</div>
            </div>
            <div className="hidden rounded-[22px] border border-white/80 bg-white/74 p-3 shadow-[0_12px_28px_rgba(148,163,184,0.10)] md:block">
              <ShieldCheck className="h-7 w-7 text-sky-700" />
            </div>
          </div>

          <div className="mt-6 rounded-[28px] border border-slate-200/80 bg-slate-950 p-5 text-white shadow-[0_18px_48px_rgba(15,23,42,0.18)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Security posture</div>
                <div className="mt-2 text-sm text-slate-200">SOC 2 Type II, ISO 27001, access governance, and document-level controls.</div>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Live oversight</div>
                <div className="mt-2 text-sm text-slate-200">Capacity, inspection, certification, and quality signals monitored in-platform.</div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-400" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[34px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.90),rgba(242,247,252,0.82))] p-6 shadow-[0_22px_70px_rgba(148,163,184,0.10)] backdrop-blur-xl md:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Start the sponsor flow</div>
            <h2 className="mt-3 max-w-4xl font-display text-4xl tracking-[-0.05em] text-slate-950 md:text-5xl">
              Sign up for guided onboarding, or sign in and continue directly in the workspace.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base md:leading-8">
              Designed for premium sponsor onboarding, intelligent vendor discovery, and governed execution across complex outsourcing programmes.
            </p>
          </div>
          <div className="rounded-[28px] border border-slate-200/80 bg-white/78 p-3 shadow-[0_14px_34px_rgba(148,163,184,0.10)] backdrop-blur-xl">
            <div className="flex flex-wrap gap-3">
              <Link href="/signup" className="rounded-full bg-slate-950 px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:bg-slate-900">
                Get started
              </Link>
              <Link href="/login" className="rounded-full border border-slate-200/80 bg-white px-6 py-3.5 text-sm font-medium text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



