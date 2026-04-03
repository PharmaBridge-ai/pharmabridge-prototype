import type { Role } from "@/lib/types";
import { PageTransition } from "@/components/motion/page-transition";
import { TopNavigation } from "@/components/navigation/top-navigation";

const navByRole: Record<Role, { label: string; href: string }[]> = {
  sponsor: [
    { label: "Dashboard", href: "/app/sponsor/dashboard" },
    { label: "Programmes", href: "/app/sponsor/programmes" },
    { label: "Search & Match", href: "/app/sponsor/search" },
    { label: "Compare", href: "/app/sponsor/compare" },
    { label: "RFPs", href: "/app/sponsor/rfps" },
    { label: "Projects", href: "/app/sponsor/projects/active-ppq" },
    { label: "Payments", href: "/app/sponsor/payments" },
    { label: "Intelligence", href: "/app/sponsor/intelligence" },
    { label: "Documents", href: "/app/sponsor/documents" },
    { label: "Settings", href: "/app/sponsor/settings" },
  ],
  cdmo: [
    { label: "Dashboard", href: "/app/cdmo/dashboard" },
    { label: "Profile", href: "/app/cdmo/profile" },
    { label: "Facilities", href: "/app/cdmo/facilities" },
    { label: "Capabilities", href: "/app/cdmo/capabilities" },
    { label: "Capacity", href: "/app/cdmo/capacity" },
    { label: "Certificates", href: "/app/cdmo/certificates" },
    { label: "RFP Inbox", href: "/app/cdmo/rfps" },
    { label: "Proposal", href: "/app/cdmo/proposals/rfp-24018" },
    { label: "Projects", href: "/app/cdmo/projects" },
    { label: "Score", href: "/app/cdmo/score" },
    { label: "Billing", href: "/app/cdmo/billing" },
    { label: "Settings", href: "/app/cdmo/settings" },
  ],
  cro: [
    { label: "Dashboard", href: "/app/cro/dashboard" },
    { label: "Profile", href: "/app/cro/profile" },
    { label: "Services", href: "/app/cro/services" },
    { label: "Therapeutic Areas", href: "/app/cro/therapeutic-areas" },
    { label: "Accreditations", href: "/app/cro/accreditations" },
    { label: "Capacity", href: "/app/cro/capacity" },
    { label: "RFP Inbox", href: "/app/cro/rfps" },
    { label: "Proposal", href: "/app/cro/proposals/rfp-24021" },
    { label: "Projects", href: "/app/cro/projects" },
    { label: "Intelligence", href: "/app/cro/intelligence" },
    { label: "Settings", href: "/app/cro/settings" },
  ],
  admin: [
    { label: "Overview", href: "/app/admin/overview" },
    { label: "KYB", href: "/app/admin/kyb" },
    { label: "Organisation Review", href: "/app/admin/organisations/northriver-biologics" },
    { label: "Certificates", href: "/app/admin/certificates" },
    { label: "Audits", href: "/app/admin/audits" },
    { label: "Disputes", href: "/app/admin/disputes" },
    { label: "Fraud", href: "/app/admin/fraud" },
    { label: "Intelligence QA", href: "/app/admin/intelligence-qa" },
    { label: "Users", href: "/app/admin/users" },
    { label: "Reports", href: "/app/admin/reports" },
  ],
};

const accentByRole: Record<Role, "teal" | "amber" | "violet" | "cyan"> = {
  sponsor: "teal",
  cdmo: "amber",
  cro: "violet",
  admin: "cyan",
};

export function AppShell({ role, children }: { role: Role; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_24%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.08),transparent_22%),linear-gradient(180deg,#f8f9fc_0%,#eef3f9_100%)] text-slate-800">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />
      <TopNavigation items={navByRole[role]} badge={role} accent={accentByRole[role]} mode="app" showNotifications secondaryCta={{ label: "Switch role", href: "/get-started" }} primaryCta={{ label: "Open dashboard", href: navByRole[role][0].href }} />
      <div className="mx-auto grid max-w-[1600px] gap-6 px-6 py-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit rounded-[30px] border border-slate-200/80 bg-white/82 p-4 shadow-[0_20px_60px_rgba(148,163,184,0.12)] backdrop-blur-xl transition duration-500 hover:shadow-[0_24px_70px_rgba(148,163,184,0.14)]">
          <div className="border-b border-slate-200 pb-4">
            <div className="text-[11px] uppercase tracking-[0.26em] text-slate-500">Application shell</div>
            <div className="mt-3 font-display text-2xl text-slate-900">{role.toUpperCase()}</div>
            <p className="mt-2 text-sm leading-6 text-slate-500">Role-aware navigation and priorities are separated by shell, following the planning document.</p>
          </div>
          <nav className="mt-4 space-y-1">
            {navByRole[role].map((item) => (
              <a key={item.href} href={item.href} className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-slate-600 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900">
                <span>{item.label}</span>
                <span className="text-slate-400">+</span>
              </a>
            ))}
          </nav>
        </aside>
        <main className="space-y-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}

