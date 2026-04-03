"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("maya@asterion.bio");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    window.setTimeout(() => {
      setLoading(false);
      if (!email.includes("@")) {
        setError("Enter a valid work email.");
        return;
      }
      if (email.includes("resume") || email.includes("new")) {
        router.push("/onboarding/sponsor/resume");
        return;
      }
      router.push("/app/sponsor/dashboard");
    }, 700);
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <section className="rounded-[36px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,248,252,0.84))] p-8 shadow-[0_28px_90px_rgba(148,163,184,0.14)] backdrop-blur-2xl md:p-10 lg:p-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/80 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-sky-700">
          <Sparkles className="h-3.5 w-3.5" />
          Sponsor access
        </div>
        <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-[-0.05em] text-slate-950 md:text-[4.25rem]">
          Sign in to continue your sponsor workflow.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
          Returning sponsors move straight into their operational workspace. Incomplete onboarding resumes automatically with the last saved context.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            "Resume incomplete onboarding with intelligent draft recovery",
            "Go directly to dashboard if sponsor onboarding is complete",
            "Protected enterprise access with regulated workflow trust cues",
            "SSO-first path supported for buyer teams and procurement ops",
          ].map((item) => (
            <div key={item} className="rounded-[22px] border border-white/80 bg-white/72 p-4 text-sm leading-6 text-slate-600 shadow-[0_10px_24px_rgba(148,163,184,0.08)]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-emerald-500" />
                <span>{item}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
          <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5">Use `resume@asterion.bio` for resume flow</span>
          <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5">Use `maya@asterion.bio` for dashboard</span>
        </div>
      </section>

      <form onSubmit={onSubmit} className="rounded-[34px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.88))] p-8 shadow-[0_24px_70px_rgba(148,163,184,0.14)] backdrop-blur-2xl md:p-9">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Secure sign in</div>
            <div className="mt-2 font-display text-3xl tracking-[-0.04em] text-slate-950">Welcome back</div>
          </div>
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-3 text-emerald-700">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-7 space-y-5">
          <label className="block text-sm text-slate-600">
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Work email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-[20px] border border-slate-200/80 bg-white/90 px-4 py-3.5 text-slate-900 outline-none ring-0 transition focus:border-sky-300" />
          </label>
          <label className="block text-sm text-slate-600">
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-[20px] border border-slate-200/80 bg-white/90 px-4 py-3.5 text-slate-900 outline-none ring-0 transition focus:border-sky-300" />
          </label>
        </div>

        {error ? <div className="mt-5 rounded-[20px] border border-rose-200/80 bg-rose-50/85 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

        <div className="mt-7 flex flex-wrap gap-3">
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)] disabled:opacity-60">
            {loading ? "Signing in..." : "Log in"}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => router.push("/app/sponsor/dashboard")} className="rounded-full border border-slate-200/80 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:border-slate-300 hover:text-slate-950">
            Continue with SSO
          </button>
        </div>

        <div className="mt-7 flex items-center justify-between text-sm text-slate-500">
          <Link href="/forgot-password" className="text-sky-700 hover:text-sky-800">Forgot password</Link>
          <Link href="/signup" className="text-sky-700 hover:text-sky-800">Create account</Link>
        </div>
      </form>
    </div>
  );
}

