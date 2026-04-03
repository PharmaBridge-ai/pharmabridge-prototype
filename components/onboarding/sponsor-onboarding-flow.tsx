"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Save, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { simulateOnboardingAssist } from "@/lib/services/sponsor-demo";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

const storageKey = "pb-sponsor-onboarding-draft";
const defaultDraft = {
  companyLegalName: "Asterion Therapeutics Inc.",
  companyType: "Clinical-stage biotech",
  headquartersCountry: "United States",
  headquartersCity: "Cambridge",
  primaryContactName: "Maya Chen",
  primaryContactTitle: "VP, CMC Strategy",
  teamSizeBand: "51-200",
  therapeuticFocus: "Oncology, rare disease",
  website: "",
  programmeName: "HER2 ADC Fill-Finish",
  modality: "ADC",
  stage: "Phase I",
  indication: "Metastatic breast cancer",
  targetPartnerType: "CRDMO",
  preferredGeography: "EU + Singapore",
  desiredTimeline: "Kickoff in 8 weeks",
  urgency: "High",
  requirementSummary: "Need a high-containment partner for conjugation support, aseptic fill-finish, analytical transfer, and regulatory-ready PPQ planning.",
  technicalNeeds: "Containment, sterile DP, method transfer, stability and GDP-ready logistics.",
  complianceRequirements: "FDA, EMA, Annex 1, data integrity controls.",
  qualityExpectations: "Dedicated QA lead and weekly governance cadence.",
  budgetBand: "$1.5M - $2.5M",
  preferredVendorProfile: "Mid-large oncology-focused CRDMO",
  notes: "Board review depends on a credible shortlist this month.",
  uploads: ["ADC_Brief_v2.pdf"],
  lastStep: 1,
};

function getStoredDraft() {
  if (typeof window === "undefined") return defaultDraft;
  const raw = window.localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : defaultDraft;
}

export function SponsorOnboardingFlow({ resume = false, reviewOnly = false }: { resume?: boolean; reviewOnly?: boolean }) {
  const router = useRouter();
  const { createProgramme, updateOnboarding } = useSponsorDemo();
  const initialDraft = useMemo(() => getStoredDraft(), []);
  const [draft, setDraft] = useState(initialDraft);
  const [step, setStep] = useState(reviewOnly ? 4 : resume ? initialDraft.lastStep || 1 : 1);
  const [assist, setAssist] = useState({ active: false, progress: 0, stage: "Ready" });

  const saveDraft = (nextStep?: number) => {
    const payload = { ...draft, lastStep: nextStep ?? step };
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
    setDraft(payload);
  };

  const runAssist = async () => {
    setAssist({ active: true, progress: 0, stage: "Reading uploaded brief" });
    await simulateOnboardingAssist((progress, stageLabel) => setAssist({ active: true, progress, stage: stageLabel }));
    setAssist({ active: false, progress: 100, stage: "Structured fields suggested" });
  };

  const complete = () => {
    saveDraft(4);
    const programmeId = createProgramme({ name: draft.programmeName, modality: draft.modality, stage: draft.stage, indication: draft.indication, partnerType: draft.targetPartnerType, region: draft.preferredGeography, budgetBand: draft.budgetBand, notes: draft.requirementSummary });
    updateOnboarding({ status: "approved", currentStep: 5, completion: 100, companyName: draft.companyLegalName, role: "Sponsor", contactName: draft.primaryContactName });
    window.localStorage.setItem("pb-last-programme-id", programmeId);
    router.push("/onboarding/sponsor/success");
  };

  const sections = useMemo(() => [{ id: 1, title: "Company" }, { id: 2, title: "Programme basics" }, { id: 3, title: "Requirements" }, { id: 4, title: "Review" }], []);
  const progress = Math.round((step / 4) * 100);

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
      <aside className="space-y-4 xl:sticky xl:top-28 xl:h-fit">
        <div className="rounded-[30px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,250,252,0.78))] p-5 shadow-[0_18px_50px_rgba(148,163,184,0.12)] backdrop-blur-2xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Sponsor onboarding</div>
          <div className="mt-3 font-display text-[2rem] leading-[1.02] tracking-[-0.05em] text-slate-950">Guided setup</div>
          <div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" style={{ width: `${progress}%` }} /></div>
          <div className="mt-2 text-sm text-slate-500">{reviewOnly ? "Review ready" : `${progress}% complete`}</div>
          <div className="mt-5 space-y-2">
            {sections.map((section) => (
              <div key={section.id} className={`rounded-[18px] border px-4 py-3 text-sm ${section.id === step ? "border-slate-900 bg-slate-950 text-white shadow-[0_12px_28px_rgba(15,23,42,0.14)]" : "border-slate-200/80 bg-white/80 text-slate-700"}`}>
                {section.id}. {section.title}
              </div>
            ))}
          </div>
          {resume ? <div className="mt-5 rounded-[18px] border border-amber-200/80 bg-amber-50/85 px-4 py-3 text-sm text-amber-800">Resume mode reopened the last incomplete step.</div> : null}
        </div>
      </aside>

      <div className="space-y-6 rounded-[34px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.86))] p-6 shadow-[0_24px_70px_rgba(148,163,184,0.14)] backdrop-blur-2xl md:p-8">
        <div className="border-b border-slate-200/70 pb-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-sky-700">{reviewOnly ? "Step 4" : `Step ${step} of 4`}</div>
          <h1 className="mt-3 font-display text-4xl tracking-[-0.05em] text-slate-950 md:text-[3rem]">{reviewOnly ? "Review sponsor onboarding" : sections.find((section) => section.id === step)?.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base md:leading-8">Create the sponsor organization and first programme context in a guided sequence, then continue directly into the operating workspace.</p>
        </div>

        {step === 1 && !reviewOnly ? <div className="grid gap-4 md:grid-cols-2"><Field label="Company legal name" value={draft.companyLegalName} onChange={(value) => setDraft({ ...draft, companyLegalName: value })} /><Field label="Company type" value={draft.companyType} onChange={(value) => setDraft({ ...draft, companyType: value })} /><Field label="HQ country" value={draft.headquartersCountry} onChange={(value) => setDraft({ ...draft, headquartersCountry: value })} /><Field label="HQ city" value={draft.headquartersCity} onChange={(value) => setDraft({ ...draft, headquartersCity: value })} /><Field label="Primary contact name" value={draft.primaryContactName} onChange={(value) => setDraft({ ...draft, primaryContactName: value })} /><Field label="Primary contact title" value={draft.primaryContactTitle} onChange={(value) => setDraft({ ...draft, primaryContactTitle: value })} /><Field label="Team size band" value={draft.teamSizeBand} onChange={(value) => setDraft({ ...draft, teamSizeBand: value })} /><Field label="Therapeutic focus" value={draft.therapeuticFocus} onChange={(value) => setDraft({ ...draft, therapeuticFocus: value })} /></div> : null}
        {step === 2 && !reviewOnly ? <div className="grid gap-4 md:grid-cols-2"><Field label="Programme name" value={draft.programmeName} onChange={(value) => setDraft({ ...draft, programmeName: value })} /><Field label="Modality" value={draft.modality} onChange={(value) => setDraft({ ...draft, modality: value })} /><Field label="Stage" value={draft.stage} onChange={(value) => setDraft({ ...draft, stage: value })} /><Field label="Indication" value={draft.indication} onChange={(value) => setDraft({ ...draft, indication: value })} /><Field label="Target partner type" value={draft.targetPartnerType} onChange={(value) => setDraft({ ...draft, targetPartnerType: value })} /><Field label="Preferred geography" value={draft.preferredGeography} onChange={(value) => setDraft({ ...draft, preferredGeography: value })} /><Field label="Desired timeline" value={draft.desiredTimeline} onChange={(value) => setDraft({ ...draft, desiredTimeline: value })} /><Field label="Urgency" value={draft.urgency} onChange={(value) => setDraft({ ...draft, urgency: value })} /></div> : null}
        {step === 3 && !reviewOnly ? <div className="space-y-4"><Area label="Requirement summary" value={draft.requirementSummary} onChange={(value) => setDraft({ ...draft, requirementSummary: value })} /><Area label="Technical / service needs" value={draft.technicalNeeds} onChange={(value) => setDraft({ ...draft, technicalNeeds: value })} /><Area label="Compliance requirements" value={draft.complianceRequirements} onChange={(value) => setDraft({ ...draft, complianceRequirements: value })} /><Area label="Quality expectations" value={draft.qualityExpectations} onChange={(value) => setDraft({ ...draft, qualityExpectations: value })} /><div className="grid gap-4 md:grid-cols-2"><Field label="Budget band" value={draft.budgetBand} onChange={(value) => setDraft({ ...draft, budgetBand: value })} /><Field label="Preferred vendor profile" value={draft.preferredVendorProfile} onChange={(value) => setDraft({ ...draft, preferredVendorProfile: value })} /></div><Area label="Notes" value={draft.notes} onChange={(value) => setDraft({ ...draft, notes: value })} /><div className="rounded-[28px] border border-sky-100/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(238,247,255,0.82))] p-5 shadow-[0_16px_40px_rgba(59,130,246,0.08)]"><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="font-display text-2xl tracking-[-0.04em] text-slate-950">Uploaded brief</div><p className="mt-1 text-sm text-slate-600">{draft.uploads.join(", ")}</p></div><button onClick={runAssist} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.14)]"><Sparkles className="h-4 w-4" />Analyze upload</button></div><div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" style={{ width: `${assist.progress}%` }} /></div><div className="mt-3 text-sm text-slate-500">{assist.active ? assist.stage : assist.progress ? assist.stage : "AI assist available for uploaded documents."}</div></div></div> : null}
        {(step === 4 || reviewOnly) ? <div className="grid gap-4 md:grid-cols-3"><SummaryCard title="Company" body={`${draft.companyLegalName}\n${draft.companyType}\n${draft.headquartersCity}, ${draft.headquartersCountry}`} href="/onboarding/sponsor" /><SummaryCard title="Programme" body={`${draft.programmeName}\n${draft.modality} / ${draft.stage}\n${draft.targetPartnerType}`} href="/onboarding/sponsor" /><SummaryCard title="Requirements" body={`${draft.requirementSummary}\n${draft.budgetBand}`} href="/onboarding/sponsor" /></div> : null}

        <div className="flex flex-wrap gap-3 border-t border-slate-200/70 pt-6">
          <button onClick={() => { saveDraft(step); }} className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-5 py-3 text-sm font-medium text-slate-700"><Save className="h-4 w-4" />Save draft</button>
          {!reviewOnly && step > 1 ? <button onClick={() => setStep((current: number) => current - 1)} className="rounded-full border border-slate-200/80 bg-white px-5 py-3 text-sm font-medium text-slate-700">Back</button> : null}
          {!reviewOnly && step < 3 ? <button onClick={() => { saveDraft(step + 1); setStep((current: number) => current + 1); }} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">Continue<ArrowRight className="h-4 w-4" /></button> : null}
          {!reviewOnly && step === 3 ? <button onClick={() => { saveDraft(4); router.push("/onboarding/sponsor/review"); }} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">Review<ArrowRight className="h-4 w-4" /></button> : null}
          {(reviewOnly || step === 4) ? <button onClick={complete} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">Complete onboarding<CheckCircle2 className="h-4 w-4" /></button> : null}
          <Link href="/login" className="rounded-full border border-slate-200/80 bg-white px-5 py-3 text-sm font-medium text-slate-700">Return to sign in</Link>
        </div>
      </div>

      <aside className="space-y-4 xl:sticky xl:top-28 xl:h-fit">
        <div className="rounded-[30px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,250,252,0.78))] p-5 shadow-[0_18px_50px_rgba(148,163,184,0.12)] backdrop-blur-2xl">
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Why this flow matters</div>
          <div className="mt-3 font-display text-[1.8rem] leading-tight tracking-[-0.04em] text-slate-950">Regulated workflow confidence, without the giant-form feel.</div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <div className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 flex-none text-emerald-500" /><span>Clear step progression with calmer grouping.</span></div>
            <div className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 flex-none text-emerald-500" /><span>AI assist presented as a premium helper, not a gimmick.</span></div>
            <div className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 flex-none text-emerald-500" /><span>Draft save and resume remain intact for sponsor teams.</span></div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="text-sm text-slate-600"><span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-[20px] border border-slate-200/80 bg-white/90 px-4 py-3.5 text-slate-900 outline-none transition focus:border-sky-300" /></label>;
}
function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block text-sm text-slate-600"><span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-32 w-full rounded-[20px] border border-slate-200/80 bg-white/90 px-4 py-3.5 text-slate-900 outline-none transition focus:border-sky-300" /></label>;
}
function SummaryCard({ title, body, href }: { title: string; body: string; href: string }) {
  return <div className="rounded-[26px] border border-slate-200/80 bg-white/82 p-5 shadow-[0_12px_28px_rgba(148,163,184,0.08)]"><div className="font-display text-2xl tracking-[-0.04em] text-slate-950">{title}</div><p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">{body}</p><a href={href} className="mt-4 inline-flex text-sm font-medium text-sky-700">Edit</a></div>;
}

