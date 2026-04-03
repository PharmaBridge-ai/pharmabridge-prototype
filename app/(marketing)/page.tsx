import Link from "next/link";

const roles = [
  {
    label: "Sponsor",
    href: "/solutions/sponsors",
    body: "Create programmes, run matching, distribute RFPs, compare proposals, and manage awarded projects.",
  },
  {
    label: "CRDMO / CDMO",
    href: "/solutions/crdmo",
    body: "Present capabilities, quality posture, and capacity inside a sponsor-ready sourcing environment.",
  },
  {
    label: "CRO",
    href: "/solutions/cro",
    body: "Surface research expertise and service breadth within the same connected platform.",
  },
];

const steps = ["Create brief", "Run AI match", "Launch RFP", "Compare proposals", "Manage execution"];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="rounded-[34px] border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(244,247,252,0.86))] p-8 shadow-[0_24px_80px_rgba(148,163,184,0.12)] md:p-12">
          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Pharmaceutical outsourcing platform</div>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] text-slate-900 md:text-[72px]">
            A simpler way to find, award, and manage outsourcing partners.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            PharmaBridge connects sponsor onboarding, AI matching, RFP orchestration, proposal review, award, escrow, and milestone control in one clear workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-full bg-slate-900 px-5 py-3 text-sm text-white">Get started</Link>
            <Link href="/login" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Sign in</Link>
          </div>
        </div>

        <div className="rounded-[34px] border border-white/75 bg-white/84 p-7 shadow-[0_20px_60px_rgba(148,163,184,0.12)]">
          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">At a glance</div>
          <div className="mt-5 space-y-5">
            {[
              ["Verified partners", "2,400+"],
              ["Average shortlist time", "4.2 days"],
              ["Tracked signals", "12.4k"],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-slate-200 pb-5 last:border-b-0 last:pb-0">
                <div className="text-sm text-slate-500">{label}</div>
                <div className="mt-2 font-display text-4xl text-slate-900">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => (
          <a key={role.label} href={role.href} className="rounded-[28px] border border-white/75 bg-white/84 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(148,163,184,0.14)]">
            <div className="font-display text-3xl text-slate-900">{role.label}</div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{role.body}</p>
          </a>
        ))}
      </section>

      <section className="rounded-[34px] border border-white/75 bg-white/84 p-8 shadow-[0_20px_60px_rgba(148,163,184,0.12)] md:p-10">
        <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Workflow</div>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} className="rounded-[22px] border border-slate-200/80 bg-slate-50/85 px-4 py-5 text-center">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">0{index + 1}</div>
              <div className="mt-3 font-display text-2xl text-slate-900">{step}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[34px] border border-white/75 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,41,59,0.94))] p-8 text-white shadow-[0_28px_90px_rgba(15,23,42,0.22)] md:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">Start the sponsor flow</div>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-5xl">
              Use signup for onboarding, or sign in and continue directly in the workspace.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-full bg-white px-5 py-3 text-sm text-slate-900">Get started</Link>
            <Link href="/login" className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white">Sign in</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
