"use client";

import Link from "next/link";
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
      <div className="rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(240,245,255,0.8))] p-8 shadow-[0_28px_90px_rgba(148,163,184,0.16)] md:p-10">
        <div className="text-[11px] uppercase tracking-[0.22em] text-indigo-500">Sponsor access</div>
        <h1 className="mt-4 font-display text-5xl leading-tight text-slate-900">Sign in to continue your sponsor workflow.</h1>
        <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">Returning sponsors with completed onboarding go straight to dashboard. Incomplete onboarding resumes automatically.</p>
        <div className="mt-8 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-500">
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1.5">Try `resume@asterion.bio` for resume flow</span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1.5">Try `maya@asterion.bio` for dashboard</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="rounded-[32px] border border-white/70 bg-white/86 p-8 shadow-[0_24px_70px_rgba(148,163,184,0.14)]">
        <div className="font-display text-3xl text-slate-900">Welcome back</div>
        <div className="mt-6 space-y-4">
          <label className="block text-sm text-slate-600">
            Work email
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none" />
          </label>
          <label className="block text-sm text-slate-600">
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none" />
          </label>
        </div>
        {error ? <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="submit" disabled={loading} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white disabled:opacity-60">{loading ? "Signing in..." : "Log in"}</button>
          <button type="button" onClick={() => router.push("/app/sponsor/dashboard")} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Continue with SSO</button>
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
          <Link href="/forgot-password" className="text-indigo-600">Forgot password</Link>
          <Link href="/signup" className="text-indigo-600">Create account</Link>
        </div>
      </form>
    </div>
  );
}

