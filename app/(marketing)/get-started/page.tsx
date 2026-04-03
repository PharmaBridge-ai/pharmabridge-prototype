import { AmbientBackdrop, Eyebrow, GlassCard, MonoBadge, SectionTitle } from "@/components/reference/ui";

const roles = [
  { title: "Sponsor", href: "/onboarding/sponsor", accent: "teal", points: ["Programme setup", "Search & compare", "RFP orchestration", "Workspace + escrow"] },
  { title: "CDMO", href: "/onboarding/cdmo", accent: "gold", points: ["Capability profile", "Certificates", "Capacity manager", "Proposal inbox"] },
  { title: "CRO", href: "/onboarding/cro", accent: "violet", points: ["Service taxonomy", "Therapeutic focus", "Accreditations", "Intelligence-linked demand"] },
];

export default function GetStartedPage() {
  return (
    <div className="relative min-h-screen px-6 py-10 text-slate-800">
      <AmbientBackdrop />
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 rounded-[32px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(241,245,255,0.82))] p-8 shadow-[0_24px_70px_rgba(148,163,184,0.12)] md:p-10">
          <Eyebrow>Role selection</Eyebrow>
          <SectionTitle title="Choose the operational path you want to demo." subtitle="Start with a cleaner role split, then continue into the deeper, role-aware onboarding wizard." />
          <div className="flex flex-wrap gap-3">
            <MonoBadge tone="teal">Sponsor onboarding</MonoBadge>
            <MonoBadge tone="gold">CDMO onboarding</MonoBadge>
            <MonoBadge tone="violet">CRO onboarding</MonoBadge>
          </div>
        </section>
        <div className="grid gap-5 lg:grid-cols-3">
          {roles.map((role) => (
            <a key={role.title} href={role.href} className="block">
              <GlassCard className="h-full p-6 transition hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">{role.title}</div>
                  <MonoBadge tone={role.accent as "teal" | "gold" | "violet"}>{role.title} role</MonoBadge>
                </div>
                <div className="mt-4 font-display text-4xl text-slate-900">{role.title}</div>
                <div className="mt-5 space-y-3">
                  {role.points.map((point) => (
                    <div key={point} className="rounded-2xl border border-slate-200/80 bg-white/74 px-4 py-3 text-sm text-slate-700">{point}</div>
                  ))}
                </div>
              </GlassCard>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

