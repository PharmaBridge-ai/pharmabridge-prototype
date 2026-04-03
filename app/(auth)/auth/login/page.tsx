import Link from "next/link";

const demoLinks = [
  { href: "/app/sponsor/dashboard", label: "Continue as Sponsor", tone: "indigo" },
  { href: "/app/cdmo/dashboard", label: "Continue as CDMO", tone: "amber" },
  { href: "/app/cro/dashboard", label: "Continue as CRO", tone: "violet" },
  { href: "/app/admin/overview", label: "Continue as Admin", tone: "cyan" },
] as const;

const toneClasses = {
  indigo: "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
  amber: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
  violet: "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_24%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.08),transparent_22%),linear-gradient(180deg,#f8f9fc_0%,#eef3f9_100%)] px-6 py-12 text-slate-800">
      <div className="mx-auto max-w-md rounded-[32px] border border-slate-200/80 bg-white/88 p-8 shadow-[0_28px_80px_rgba(148,163,184,0.14)] backdrop-blur-xl">
        <p className="text-[11px] uppercase tracking-[0.26em] text-indigo-500/80">Demo access</p>
        <h1 className="mt-4 font-display text-4xl text-slate-900">Sign in to PharmaBridge</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">Authentication is simulated for the prototype. Use the role shortcuts below to enter the right application shell.</p>
        <div className="mt-6 space-y-3">
          {demoLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`block rounded-2xl border px-4 py-3 text-sm transition hover:-translate-y-0.5 ${toneClasses[link.tone]}`}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
