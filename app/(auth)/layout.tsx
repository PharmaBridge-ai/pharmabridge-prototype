export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_26%),radial-gradient(circle_at_top_right,rgba(45,212,191,0.10),transparent_26%),linear-gradient(180deg,#f7f8fc_0%,#eef3f9_100%)] px-4 py-8 text-slate-900 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  );
}

