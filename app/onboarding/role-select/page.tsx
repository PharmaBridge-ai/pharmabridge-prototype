"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const roles = ["Sponsor", "CRDMO/CDMO", "CRO"] as const;

export default function RoleSelectPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<typeof roles[number]>("Sponsor");

  return (
    <div className="mx-auto max-w-4xl rounded-[34px] border border-white/70 bg-white/86 p-8 shadow-[0_28px_90px_rgba(148,163,184,0.16)] md:p-10">
      <div className="text-[11px] uppercase tracking-[0.22em] text-indigo-500">Role selection</div>
      <h1 className="mt-4 font-display text-5xl text-slate-900">Choose how you’ll use PharmaBridge.</h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">The connected prototype is implemented for Sponsor users. Other roles remain visible in the public site but route back here for now.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {roles.map((role) => (
          <button key={role} onClick={() => setSelected(role)} className={`rounded-[28px] border p-5 text-left ${selected === role ? "border-indigo-200 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-700"}`}>
            <div className="font-display text-3xl">{role}</div>
            <p className={`mt-3 text-sm leading-7 ${selected === role ? "text-white/85" : "text-slate-600"}`}>{role === "Sponsor" ? "Create programmes, shortlist vendors, run RFPs, and manage awarded work." : "Reserved for later role-specific implementation."}</p>
          </button>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <button onClick={() => router.push(selected === "Sponsor" ? "/onboarding/sponsor" : "/onboarding/role-select")} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Continue</button>
      </div>
    </div>
  );
}

