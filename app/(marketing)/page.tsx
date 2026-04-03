import Link from "next/link";

const roleCards = [
  {
    label: "Sponsor",
    href: "/solutions/sponsors",
    body: "Create programmes, run matching, shortlist vendors, distribute RFPs, compare proposals, and manage awarded delivery.",
  },
  {
    label: "CRDMO / CDMO",
    href: "/solutions/crdmo",
    body: "Present capabilities, quality posture, and capacity in a format that supports sponsor evaluation and procurement.",
  },
  {
    label: "CRO",
    href: "/solutions/cro",
    body: "Surface therapeutic expertise and service breadth within the same sourcing and intelligence environment.",
  },
];

const workflow = [
  ["Brief", "Create a structured programme."],
  ["Match", "Run AI ranking and review fit rationale."],
  ["RFP", "Invite shortlisted vendors under NDA."],
  ["Award", "Compare proposals and confirm selection."],
  ["Execute", "Fund escrow and manage milestones."],
];

export default function HomePage() {
  return (
    <div className="space-y-14">
      <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div className="rounded-[36px] border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(243,247,255,0.82))] p-8 shadow-[0_28px_90px_rgba(148,163,184,0.14)] md:p-12">
          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Pharmaceutical outsourcing platform</div>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] text-slate-900 md:text-[76px]">
            Find and manage the right outsourcing partner without losing workflow control.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            PharmaBridge connects sponsor onboarding, AI matching, shortlist decisions, RFP orchestration, proposal comparison, award, escrow, and milestone review in one calm enterprise workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white shadow-[0_14px_32px_rgba(99,102,241,0.16)]">Get started</Link>
            <Link href="/login" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Sign in</Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Verified partners", "2,400+"],
            ["Average shortlist time", "4.2 days"],
            ["Tracked signals", "12.4k"],
            ["Protected value", "$8.3M"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[28px] border border-white/75 bg-white/82 p-5 shadow-[0_18px_50px_rgba(148,163,184,0.12)]">
              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">{label}</div>
              <div className="mt-3 font-display text-4xl text-slate-900">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {roleCards.map((card) => (
          <a key={card.label} href={card.href} className="rounded-[30px] border border-white/75 bg-white/82 p-6 shadow-[0_20px_60px_rgba(148,163,184,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_26px_80px_rgba(148,163,184,0.15)]">
            <div className="font-display text-3xl text-slate-900">{card.label}</div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{card.body}</p>
          </a>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[34px] border border-white/75 bg-white/84 p-7 shadow-[0_22px_70px_rgba(148,163,184,0.12)]">
          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Sponsor workflow</div>
          <h2 className="mt-3 font-display text-4xl text-slate-900">A clear path from intake to execution.</h2>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            The product is designed to feel like a real operating environment for sponsor teams, not a collection of disconnected screens.
          </p>
          <div className="mt-6 space-y-3">
            {workflow.map(([title, body], index) => (
              <div key={title} className="flex items-center gap-4 rounded-[24px] border border-slate-200/80 bg-slate-50/85 px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 font-mono text-sm text-white">0{index + 1}</div>
                <div>
                  <div className="font-display text-2xl text-slate-900">{title}</div>
                  <div className="text-sm text-slate-600">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-white/75 bg-[linear-gradient(145deg,rgba(15,23,42,0.96),rgba(30,41,59,0.94))] p-7 text-white shadow-[0_30px_100px_rgba(15,23,42,0.24)]">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">Example sponsor motion</div>
          <h2 className="mt-3 font-display text-4xl">HER2 ADC Fill-Finish</h2>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-white/70">
            See how a sponsor programme moves from structured brief into ranked vendor matches, shortlist review, RFP release, proposal comparison, award, and project execution.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ["Top fit", "WuXi XDC", "96 fit score"],
              ["Best balance", "Lonza Ibex", "EU release confidence"],
              ["Current action", "Distribute RFP", "NDA-gated release"],
              ["Live signal", "Capacity watch", "Western Europe tightening"],
            ].map(([label, value, body]) => (
              <div key={label} className="rounded-[24px] border border-white/12 bg-white/8 p-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">{label}</div>
                <div className="mt-3 font-display text-2xl text-white">{value}</div>
                <div className="mt-2 text-sm text-white/65">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[36px] border border-white/75 bg-white/84 p-8 shadow-[0_22px_70px_rgba(148,163,184,0.12)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Start the sponsor flow</div>
            <h2 className="mt-3 max-w-4xl font-display text-4xl text-slate-900 md:text-5xl">Use signup for onboarding or sign in to go straight into the workspace.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Get started</Link>
            <Link href="/login" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Sign in</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
