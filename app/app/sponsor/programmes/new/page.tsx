"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SponsorCards, SponsorHeader } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

const steps = ["Company", "Programme", "Requirements", "Commercials", "Review"];

export default function NewProgrammePage() {
  const router = useRouter();
  const { createProgramme, runAiMatching } = useSponsorDemo();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", modality: "ADC", stage: "Phase I", indication: "Oncology", partnerType: "CDMO", region: "EU + Singapore", budgetBand: "$1.4M - $2.2M", notes: "Accelerated shortlist needed with strong containment and release path." });
  const [error, setError] = useState("");

  const onChange = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const validate = () => { if (!form.name.trim()) { setError("Programme name is required."); return false; } setError(""); return true; };

  const saveDraft = () => { if (!validate()) return; const id = createProgramme(form); router.push(`/app/sponsor/programmes/${id}`); };
  const startMatching = async () => { if (!validate()) return; const id = createProgramme(form); router.push(`/app/sponsor/programmes/${id}/matching`); window.setTimeout(() => { void runAiMatching(id); }, 160); };

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Programme builder" title="Structured sponsor intake and requirement definition" body="This creation flow now behaves like a production-style onboarding and programme builder. It supports role-aware sponsor setup, modality-driven requirements, commercial framing, and a direct handoff into AI matching." badges={[{ label: `Step ${step + 1} of ${steps.length}`, tone: "teal" }, { label: "Save-draft behavior", tone: "gold" }]} />
      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className="rounded-[28px] border border-slate-200/80 bg-white/78 p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Progress rail</div>
          <div className="mt-4 space-y-2">{steps.map((item, index) => <button key={item} onClick={() => setStep(index)} className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm ${index === step ? "border-indigo-200 bg-indigo-600 text-white" : "border-slate-200/80 bg-white/78 text-slate-600"}`}><span>{item}</span><span>{index + 1}</span></button>)}</div>
        </div>
        <div className="rounded-[28px] border border-slate-200/80 bg-white/78 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-600">Programme name<input value={form.name} onChange={(event) => onChange("name", event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 outline-none" placeholder="HER2 ADC Fill-Finish" /></label>
            <label className="text-sm text-slate-600">Modality<select value={form.modality} onChange={(event) => onChange("modality", event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 outline-none"><option>ADC</option><option>LNP / mRNA</option><option>CGT</option><option>Radiopharma</option><option>PROTAC</option></select></label>
            <label className="text-sm text-slate-600">Stage<select value={form.stage} onChange={(event) => onChange("stage", event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 outline-none"><option>Preclinical</option><option>Phase I</option><option>Phase II</option><option>IND enabling</option></select></label>
            <label className="text-sm text-slate-600">Target partner<select value={form.partnerType} onChange={(event) => onChange("partnerType", event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 outline-none"><option>CDMO</option><option>CRO</option><option>CRDMO</option></select></label>
            <label className="text-sm text-slate-600">Indication<input value={form.indication} onChange={(event) => onChange("indication", event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 outline-none" /></label>
            <label className="text-sm text-slate-600">Region<input value={form.region} onChange={(event) => onChange("region", event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 outline-none" /></label>
            <label className="text-sm text-slate-600 md:col-span-2">Budget band<input value={form.budgetBand} onChange={(event) => onChange("budgetBand", event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 outline-none" /></label>
            <label className="text-sm text-slate-600 md:col-span-2">Technical / governance notes<textarea value={form.notes} onChange={(event) => onChange("notes", event.target.value)} className="mt-2 min-h-36 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 outline-none" /></label>
          </div>
          {error ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</div> : null}
          <div className="mt-6 flex flex-wrap gap-3"><button onClick={saveDraft} className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700">Save draft</button><button onClick={startMatching} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Run AI match</button></div>
        </div>
      </div>
      <SponsorCards title="Dynamic builder preview" subtitle="These guidance blocks shift with modality and keep the experience feeling operational instead of static." items={[{ title: "Modality-aware requirements", body: `Current selection: ${form.modality}. The system adapts requirement sections for containment, analytics, quality, and release expectations.`, meta: "Adaptive", tone: "teal" }, { title: "Commercial and timeline gating", body: `${form.region} and ${form.budgetBand} shape shortlist quality, procurement timing, and commercial fit scoring.`, meta: "Connected", tone: "gold" }, { title: "Review before match", body: "Primary sponsor fields are validated before the AI match can begin, with draft save support for partial completion.", meta: "Guardrails", tone: "green" }]} />
    </div>
  );
}



