"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("maya@asterion.bio");
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl items-center">
      <div className="w-full rounded-[32px] border border-white/70 bg-white/86 p-8 shadow-[0_24px_70px_rgba(148,163,184,0.14)]">
        <div className="text-[11px] uppercase tracking-[0.22em] text-indigo-500">Password recovery</div>
        <h1 className="mt-4 font-display text-4xl text-slate-900">Reset your PharmaBridge password.</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">Enter your work email and we’ll simulate a reset email for the prototype.</p>
        {sent ? (
          <div className="mt-6 rounded-[28px] border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">Reset instructions were sent to {email}.</div>
        ) : (
          <div className="mt-6 space-y-4">
            <label className="block text-sm text-slate-600">Work email<input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" /></label>
            <button onClick={() => setSent(true)} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Send reset link</button>
          </div>
        )}
      </div>
    </div>
  );
}

