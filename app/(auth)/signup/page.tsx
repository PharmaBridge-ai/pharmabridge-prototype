"use client";

import Link from "next/link";
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
      <div className="rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(240,245,255,0.8))] p-8 shadow-[0_28px_90px_rgba(148,163,184,0.16)] md:p-10">
        <div className="text-[11px] uppercase tracking-[0.22em] text-indigo-500">Sponsor onboarding</div>
        <h1 className="mt-4 font-display text-5xl leading-tight text-slate-900">Create your sponsor account and move straight into onboarding.</h1>
        <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">New sponsor signups never jump directly into the dashboard. They always route into role selection and onboarding first.</p>
      </div>
      <form onSubmit={submit} className="rounded-[32px] border border-white/70 bg-white/86 p-8 shadow-[0_24px_70px_rgba(148,163,184,0.14)]">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-600 md:col-span-2">Full name<input value={form.name} onChange={(event) => update("name", event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Work email<input value={form.email} onChange={(event) => update("email", event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" /></label>
          <label className="text-sm text-slate-600">Password<input type="password" value={form.password} onChange={(event) => update("password", event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" /></label>
          <label className="text-sm text-slate-600">Country<input value={form.country} onChange={(event) => update("country", event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Company name<input value={form.company} onChange={(event) => update("company", event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" /></label>
        </div>
        <label className="mt-5 flex items-center gap-3 text-sm text-slate-600"><input checked={form.accepted} onChange={(event) => update("accepted", event.target.checked)} type="checkbox" />Accept terms and privacy policy</label>
        {error ? <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="submit" className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Create account</button>
          <button type="button" onClick={() => router.push("/onboarding/role-select")} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Continue with SSO</button>
        </div>
        <div className="mt-6 text-sm text-slate-500">Already have an account? <Link href="/login" className="text-indigo-600">Sign in</Link></div>
      </form>
    </div>
  );
}

