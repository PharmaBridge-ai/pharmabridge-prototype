"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "Maya Chen", email: "maya@asterion.bio", password: "password", company: "Asterion Therapeutics", country: "United States", accepted: true });
  const [error, setError] = useState("");

  const update = (key: keyof typeof form, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.accepted) {
      setError("Accept the terms to continue.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Enter a valid work email.");
      return;
    }
    router.push("/onboarding/role-select");
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
      <section className="rounded-[36px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,248,252,0.84))] p-8 shadow-[0_28px_90px_rgba(148,163,184,0.14)] backdrop-blur-2xl md:p-10 lg:p-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/80 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-sky-700">
          <Sparkles className="h-3.5 w-3.5" />
          Sponsor onboarding
        </div>
        <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-[-0.05em] text-slate-950 md:text-[4.25rem]">
          Create your sponsor account and move directly into guided onboarding.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
          New sponsor accounts always begin with role selection and structured onboarding, so programme context is established before the dashboard experience opens.
        </p>

        <div className="mt-8 space-y-3">
          {[
            "Premium onboarding flow with draft save and resume support",
            "Structured sponsor context before programme creation and AI matching",
            "Trust-forward access experience designed for enterprise buyer teams",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-[22px] border border-white/80 bg-white/72 p-4 text-sm leading-6 text-slate-600 shadow-[0_10px_24px_rgba(148,163,184,0.08)]">
              <BadgeCheck className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <form onSubmit={submit} className="rounded-[34px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.88))] p-8 shadow-[0_24px_70px_rgba(148,163,184,0.14)] backdrop-blur-2xl md:p-9">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Create account</div>
          <div className="mt-2 font-display text-3xl tracking-[-0.04em] text-slate-950">Sponsor registration</div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-600 md:col-span-2"><span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Full name</span><input value={form.name} onChange={(event) => update("name", event.target.value)} className="mt-2 w-full rounded-[20px] border border-slate-200/80 bg-white/90 px-4 py-3.5 text-slate-900 outline-none transition focus:border-sky-300" /></label>
          <label className="text-sm text-slate-600 md:col-span-2"><span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Work email</span><input value={form.email} onChange={(event) => update("email", event.target.value)} className="mt-2 w-full rounded-[20px] border border-slate-200/80 bg-white/90 px-4 py-3.5 text-slate-900 outline-none transition focus:border-sky-300" /></label>
          <label className="text-sm text-slate-600"><span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Password</span><input type="password" value={form.password} onChange={(event) => update("password", event.target.value)} className="mt-2 w-full rounded-[20px] border border-slate-200/80 bg-white/90 px-4 py-3.5 text-slate-900 outline-none transition focus:border-sky-300" /></label>
          <label className="text-sm text-slate-600"><span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Country</span><input value={form.country} onChange={(event) => update("country", event.target.value)} className="mt-2 w-full rounded-[20px] border border-slate-200/80 bg-white/90 px-4 py-3.5 text-slate-900 outline-none transition focus:border-sky-300" /></label>
          <label className="text-sm text-slate-600 md:col-span-2"><span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Company name</span><input value={form.company} onChange={(event) => update("company", event.target.value)} className="mt-2 w-full rounded-[20px] border border-slate-200/80 bg-white/90 px-4 py-3.5 text-slate-900 outline-none transition focus:border-sky-300" /></label>
        </div>
        <label className="mt-5 flex items-center gap-3 rounded-[18px] border border-slate-200/80 bg-white/70 px-4 py-3 text-sm text-slate-600"><input checked={form.accepted} onChange={(event) => update("accepted", event.target.checked)} type="checkbox" />Accept terms and privacy policy</label>
        {error ? <div className="mt-4 rounded-[20px] border border-rose-200/80 bg-rose-50/85 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">Create account<ArrowRight className="h-4 w-4" /></button>
          <button type="button" onClick={() => router.push("/onboarding/role-select")} className="rounded-full border border-slate-200/80 bg-white px-5 py-3 text-sm font-medium text-slate-700">Continue with SSO</button>
        </div>
        <div className="mt-6 text-sm text-slate-500">Already have an account? <Link href="/login" className="text-sky-700">Sign in</Link></div>
      </form>
    </div>
  );
}

