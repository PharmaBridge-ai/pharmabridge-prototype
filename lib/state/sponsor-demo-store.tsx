"use client";

import { useEffect, type ReactNode } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { simulateComparisonProgress, simulateProgress } from "@/lib/services/sponsor-demo";

export type DemoScenario = "new_sponsor" | "active_shortlisting" | "live_rfp" | "awarded_project" | "at_risk_project" | "intelligence_heavy";
export type ProgrammeStatus = "draft" | "ready_for_matching" | "matching_in_progress" | "shortlist_ready" | "rfp_draft" | "rfp_live" | "evaluating" | "awarded" | "in_execution" | "completed";
export type VendorRelationship = "discovered" | "watched" | "shortlisted" | "invited" | "finalist" | "awarded" | "flagged";
export type RfpStatus = "draft" | "live" | "clarification_open" | "proposals_incoming" | "comparison_ready" | "award_pending" | "awarded";
export type ProposalStatus = "invited" | "nda_pending" | "in_progress" | "submitted" | "incomplete" | "finalist" | "rejected" | "selected";
export type ProjectStatus = "pending_funding" | "active" | "at_risk" | "paused" | "disputed" | "completed";
export type MilestoneStatus = "pending" | "in_progress" | "awaiting_review" | "approved" | "disputed" | "overdue" | "paid";
export type AlertStatus = "info" | "action_required" | "high_risk" | "critical" | "dismissed" | "watched";

export type Programme = {
  id: string;
  name: string;
  modality: string;
  stage: string;
  vendorType: string;
  status: string;
  next: string;
  owner: string;
  shortlistIds: string[];
  region: string;
  budgetBand: string;
  timeline: string;
  indication: string;
  summary: string;
  compliance: string[];
  requirements: { label: string; value: string }[];
  linkedRfpId?: string;
  linkedProjectId?: string;
};

export type Vendor = {
  id: string;
  name: string;
  fit: number;
  score: number;
  availability: "Available" | "Moderate" | "Tight" | "Critical";
  geography: string;
  rationale: string;
  risks: string;
  badges: string[];
  relationship: string;
  notes: string[];
  services: string[];
  capacitySignals: string[];
  regulatorySummary: string;
  qualitySummary: string;
  riskLevel: "Low" | "Moderate" | "High";
  sites: { name: string; region: string; focus: string }[];
  documents: string[];
};

export type Rfp = {
  id: string;
  title: string;
  state: string;
  deadline: string;
  next: string;
  programmeId: string;
  invitedVendorIds: string[];
  distributed: boolean;
  ndaMode: string;
  workPackages: string[];
  rubric: { label: string; weight: number }[];
};

export type Proposal = {
  id: string;
  rfpId: string;
  vendorId: string;
  vendor: string;
  tech: number;
  price: number;
  timeline: number;
  regulatory: number;
  total: number;
  note: string;
  status: string;
  completeness: number;
  priceBand: string;
};

export type Project = {
  id: string;
  programmeId: string;
  name: string;
  vendorId: string;
  vendorName: string;
  status: string;
  escrowStatus: string;
  escrowBalance: number;
  pendingRelease: number;
  qualityScore: number;
  site: string;
};

export type Milestone = { id: string; projectId: string; title: string; state: string; escrow: number; due: string; owner: string; summary: string };
export type Alert = { id: string; title: string; tone: "teal" | "gold" | "red"; body: string; status: string; linkedVendorId?: string; linkedProgrammeId?: string };
export type Watchlist = { id: string; name: string; scope: string; threshold: string; vendorIds: string[] };
export type Invoice = { id: string; label: string; amount: number; status: string; due: string };
export type Activity = { id: string; title: string; detail: string; time: string };
export type Toast = { id: string; title: string; body: string; tone: "teal" | "gold" | "red" };
export type AiRun = { active: boolean; programmeId?: string; progress: number; stage: string; partialVendorIds: string[] };
export type ComparisonRun = { active: boolean; rfpId?: string; progress: number; stage: string; sectionsReady: string[] };
export type SponsorOnboarding = { status: string; currentStep: number; completion: number; companyName: string; role: string; contactName: string };
export type CreateProgrammeInput = { name: string; modality: string; stage: string; indication: string; partnerType: string; region: string; budgetBand: string; notes: string };

type SponsorDemoState = {
  hydrated: boolean;
  scenario: DemoScenario;
  onboarding: SponsorOnboarding;
  programmes: Programme[];
  vendors: Vendor[];
  rfps: Rfp[];
  proposals: Proposal[];
  milestones: Milestone[];
  alerts: Alert[];
  watchlists: Watchlist[];
  invoices: Invoice[];
  project: Project;
  aiRun: AiRun;
  comparisonRun: ComparisonRun;
  compareVendorIds: string[];
  shortlistCount: number;
  toasts: Toast[];
  activity: Activity[];
  setHydrated: (hydrated: boolean) => void;
  createProgramme: (input: CreateProgrammeInput) => string;
  updateProgramme: (programmeId: string, patch: Partial<Programme>) => void;
  updateOnboarding: (patch: Partial<SponsorOnboarding>) => void;
  runAiMatching: (programmeId: string) => Promise<void>;
  addVendorToShortlist: (programmeId: string, vendorId: string) => void;
  removeVendorFromShortlist: (programmeId: string, vendorId: string) => void;
  saveShortlist: (programmeId: string, vendorIds: string[]) => void;
  toggleVendorWatch: (vendorId: string) => void;
  flagVendorRisk: (vendorId: string) => void;
  toggleCompareVendor: (vendorId: string) => void;
  createRfp: (programmeId: string) => string | null;
  distributeRfp: (rfpId: string) => void;
  submitMockProposal: (rfpId: string, vendorId: string) => void;
  generateComparison: (rfpId: string) => Promise<void>;
  awardVendor: (rfpId: string, vendorId: string) => void;
  fundEscrow: () => void;
  approveMilestone: (milestoneId: string) => void;
  raiseDispute: (milestoneId: string) => void;
  respondToAlert: (alertId: string, action: "dismiss" | "watch" | "escalate") => void;
  dismissAlert: (alertId: string) => void;
  fastForwardProposals: (rfpId: string) => void;
  setScenario: (scenario: DemoScenario) => void;
  simulateAlert: () => void;
  markMilestoneOverdue: (milestoneId?: string) => void;
  autoSubmitProposals: (rfpId: string) => void;
  rerunAiMatch: (programmeId?: string) => Promise<void>;
  injectVendorRiskFlag: (vendorId?: string) => void;
  resetDemo: () => void;
  removeToast: (toastId: string) => void;
};

type StoreSetter = (recipe: (state: SponsorDemoState) => Partial<SponsorDemoState>) => void;
const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
const recalcShortlistCount = (programmes: Programme[]) => programmes.reduce((count, programme) => count + programme.shortlistIds.length, 0);

function buildBaseState(scenario: DemoScenario) {
  const vendors: Vendor[] = [
    { id: "wuxi-xdc", name: "WuXi XDC", fit: 96, score: 94, availability: "Moderate", geography: "Singapore / Shanghai", rationale: "Strong ADC DS/DP, payload synthesis, and site-specific conjugation.", risks: "Pricing premium; July slot compression in one suite.", badges: ["FDA", "EMA", "PMDA"], relationship: "finalist", notes: ["Strong sponsor familiarity in oncology outsourcing."], services: ["Payload synthesis", "Conjugation", "Fill-finish", "Analytics"], capacitySignals: ["2 moderate-capacity Q3 slots", "Singapore DP suite favored for speed"], regulatorySummary: "Recent inspections clean, strong containment maturity.", qualitySummary: "High release reliability and robust deviation closure cadence.", riskLevel: "Moderate", sites: [{ name: "Singapore ADC Campus", region: "APAC", focus: "DP / fill-finish" }, { name: "Shanghai Conjugation Hub", region: "APAC", focus: "DS / conjugation" }], documents: ["Quality Agreement v4", "Containment Summary", "Inspection Digest"] },
    { id: "lonza-ibex", name: "Lonza Ibex", fit: 91, score: 89, availability: "Tight", geography: "Visp, Switzerland", rationale: "Excellent EU release path and mature containment strategy.", risks: "West Europe line pressure in Q3 could extend PPQ sequencing.", badges: ["FDA", "EMA", "WHO"], relationship: "shortlisted", notes: [], services: ["Bioconjugation", "Fill-finish", "PPQ", "Release testing"], capacitySignals: ["Single preferred slot remaining in target window"], regulatorySummary: "Strong EU inspection history and documentation discipline.", qualitySummary: "Consistently high batch-release confidence.", riskLevel: "Moderate", sites: [{ name: "Visp Bioconjugates", region: "Europe", focus: "ADC DS / DP" }], documents: ["EU Release Pathway", "Batch Genealogy Example"] },
    { id: "abzena", name: "Abzena", fit: 84, score: 78, availability: "Available", geography: "UK / US", rationale: "Good early-phase fit with agile technical engagement.", risks: "Lower comparative score on supply resilience for complex scale-up.", badges: ["FDA", "EMA"], relationship: "discovered", notes: [], services: ["ADC development", "Analytics", "Fill-finish"], capacitySignals: ["Open onboarding window in May", "Flexible non-clinical support"], regulatorySummary: "Good inspection record with lighter global footprint.", qualitySummary: "Solid quality systems with smaller multi-site redundancy.", riskLevel: "Moderate", sites: [{ name: "Bristol Development Site", region: "Europe", focus: "Development / analytics" }], documents: ["Sponsor Experience Pack", "Facility Capabilities"] },
    { id: "catalent-bloomington", name: "Catalent Bloomington", fit: 83, score: 82, availability: "Tight", geography: "Indiana, United States", rationale: "Good sterile manufacturing depth and US release convenience.", risks: "Fill-finish demand elevated for Q3/Q4.", badges: ["FDA", "MHRA"], relationship: "discovered", notes: [], services: ["Sterile fill-finish", "Packaging", "Tech transfer"], capacitySignals: ["US slots under pressure"], regulatorySummary: "Stable compliance profile.", qualitySummary: "Reliable sterile operations.", riskLevel: "Moderate", sites: [{ name: "Bloomington", region: "North America", focus: "Sterile DP" }], documents: ["Sterile Platform Pack"] },
  ];

  const programmes: Programme[] = [
    { id: "adc-her2-phase1", name: "HER2 ADC Fill-Finish", modality: "ADC", stage: "Phase I", vendorType: "CDMO", status: scenario === "new_sponsor" ? "draft" : "ready_for_matching", next: scenario === "new_sponsor" ? "Complete onboarding requirements" : "Run AI shortlist", owner: "CMC Lead", shortlistIds: scenario === "live_rfp" || scenario === "awarded_project" || scenario === "at_risk_project" ? ["wuxi-xdc", "lonza-ibex", "abzena"] : [], region: "EU + Singapore", budgetBand: "$1.4M - $2.2M", timeline: "Award in 4 weeks", indication: "Oncology", summary: "Identify a high-containment ADC partner for DS/DP transfer, PPQ planning, and Phase I GMP readiness.", compliance: ["FDA", "EMA", "OEB5", "GDP"], requirements: [{ label: "Containment", value: "OEB5 payload handling" }, { label: "Drug product", value: "Aseptic fill-finish" }, { label: "Target start", value: "May 2026" }, { label: "Release path", value: "US + EU" }] },
    { id: "lnp-rare-disease", name: "Rare Disease mRNA Transfer", modality: "LNP / mRNA", stage: "Phase II", vendorType: "CDMO", status: scenario === "live_rfp" ? "rfp_live" : scenario === "awarded_project" || scenario === "at_risk_project" ? "in_execution" : "shortlist_ready", next: scenario === "live_rfp" ? "Review incoming proposals" : scenario === "awarded_project" || scenario === "at_risk_project" ? "Monitor project workspace" : "Confirm shortlist", owner: "Tech Ops", shortlistIds: ["wuxi-xdc", "lonza-ibex"], region: "US + EU", budgetBand: "$3.2M - $4.8M", timeline: "Tech transfer by June", indication: "Rare disease", summary: "Transfer mRNA/LNP process into a late-clinical manufacturing network with strong release support.", compliance: ["FDA", "EMA", "Annex 1"], requirements: [{ label: "Platform", value: "mRNA / LNP" }, { label: "Scale", value: "Clinical to PPQ bridge" }, { label: "Region", value: "North America / Europe" }, { label: "Quality", value: "Annex 1 readiness" }], linkedRfpId: "rfp-24021", linkedProjectId: scenario === "awarded_project" || scenario === "at_risk_project" ? "active-ppq" : undefined },
    { id: "cgt-autologous", name: "Autologous CGT Tech Transfer", modality: "CGT", stage: "IND enabling", vendorType: "CDMO", status: "draft", next: "Complete governance setup", owner: "ATMP Lead", shortlistIds: [], region: "US", budgetBand: "$2.1M - $3.0M", timeline: "Vendor decision in 6 weeks", indication: "Hematology", summary: "Evaluate autologous viral vector and cell processing partners.", compliance: ["FDA", "Chain of identity"], requirements: [{ label: "Vector", value: "Lentiviral support" }, { label: "Logistics", value: "Chain of identity" }] },
  ];
  const rfps: Rfp[] = [
    { id: "rfp-24018", title: "ADC Fill-Finish Phase I", state: scenario === "new_sponsor" ? "draft" : "comparison_ready", deadline: "Apr 12", next: "Review AI comparison board", programmeId: "adc-her2-phase1", invitedVendorIds: ["wuxi-xdc", "lonza-ibex", "abzena"], distributed: true, ndaMode: "Mutual NDA required before technical package access", workPackages: ["DP transfer", "Engineering runs", "Analytical transfer"], rubric: [{ label: "Technical fit", weight: 40 }, { label: "Commercials", weight: 20 }, { label: "Timeline", weight: 20 }, { label: "Regulatory / quality", weight: 20 }] },
    { id: "rfp-24021", title: "Rare Disease mRNA Transfer", state: scenario === "live_rfp" ? "live" : "award_pending", deadline: "Apr 16", next: scenario === "live_rfp" ? "Clarification window open" : "Confirm award recommendation", programmeId: "lnp-rare-disease", invitedVendorIds: ["wuxi-xdc", "lonza-ibex"], distributed: true, ndaMode: "One-way NDA accepted electronically", workPackages: ["DS transfer", "LNP encapsulation", "Stability package"], rubric: [{ label: "Technical fit", weight: 35 }, { label: "Price", weight: 20 }, { label: "Timeline", weight: 20 }, { label: "Quality", weight: 25 }] },
  ];

  const proposals: Proposal[] = [
    { id: "wuxi-xdc-proposal", rfpId: "rfp-24018", vendorId: "wuxi-xdc", vendor: "WuXi XDC", tech: 92, price: 71, timeline: 84, regulatory: 93, total: 86, note: "Best technical fit with strong integrated ADC scope, priced 8% above benchmark.", status: scenario === "live_rfp" ? "in_progress" : "submitted", completeness: scenario === "live_rfp" ? 62 : 100, priceBand: "$2.05M" },
    { id: "lonza-ibex-proposal", rfpId: "rfp-24018", vendorId: "lonza-ibex", vendor: "Lonza Ibex", tech: 88, price: 82, timeline: 76, regulatory: 91, total: 84, note: "Best balance of quality and commercial discipline, with tighter slot timing.", status: "submitted", completeness: 100, priceBand: "$1.92M" },
    { id: "abzena-proposal", rfpId: "rfp-24018", vendorId: "abzena", vendor: "Abzena", tech: 80, price: 78, timeline: 89, regulatory: 74, total: 80, note: "Fastest path to start, but lowest confidence on later-stage resilience.", status: scenario === "live_rfp" ? "nda_pending" : "submitted", completeness: scenario === "live_rfp" ? 24 : 100, priceBand: "$1.84M" },
    { id: "wuxi-xdc-rfp-24021", rfpId: "rfp-24021", vendorId: "wuxi-xdc", vendor: "WuXi XDC", tech: 90, price: 69, timeline: 82, regulatory: 92, total: 84, note: "Strong LNP scale-up path with premium pricing.", status: scenario === "live_rfp" ? "in_progress" : "finalist", completeness: scenario === "live_rfp" ? 58 : 100, priceBand: "$4.3M" },
    { id: "lonza-ibex-rfp-24021", rfpId: "rfp-24021", vendorId: "lonza-ibex", vendor: "Lonza Ibex", tech: 87, price: 81, timeline: 78, regulatory: 90, total: 84, note: "Balanced scorecard with trusted release path.", status: scenario === "live_rfp" ? "submitted" : "selected", completeness: 100, priceBand: "$4.0M" },
  ];

  const milestones: Milestone[] = [
    { id: "m1", projectId: "active-ppq", title: "Tech Transfer Package", state: "approved", escrow: 80000, due: "Jan 20", owner: "PMO", summary: "Transfer documents accepted and executed." },
    { id: "m2", projectId: "active-ppq", title: "Feasibility Study", state: "approved", escrow: 120000, due: "Feb 10", owner: "CMC", summary: "Scale and process assumptions approved." },
    { id: "m3", projectId: "active-ppq", title: "Engineering Runs x3", state: scenario === "at_risk_project" ? "overdue" : "awaiting_review", escrow: 340000, due: "Mar 28", owner: "Sponsor QA", summary: "Evidence package uploaded; sponsor review pending." },
    { id: "m4", projectId: "active-ppq", title: "Method Transfer & Validation", state: scenario === "at_risk_project" ? "disputed" : "in_progress", escrow: 95000, due: "Apr 15", owner: "Analytical Lead", summary: "Validation evidence partially complete." },
    { id: "m5", projectId: "active-ppq", title: "GMP Batch 1", state: "pending", escrow: 450000, due: "Jun 01", owner: "Operations", summary: "Pending upstream completion." },
  ];

  const alerts: Alert[] = [
    { id: "alert-1", title: "FDA observation linked to shortlisted ADC site", tone: "red", body: "Review before moving WuXi XDC to final award for the ADC sourcing motion.", status: scenario === "intelligence_heavy" ? "critical" : "high_risk", linkedVendorId: "wuxi-xdc", linkedProgrammeId: "adc-her2-phase1" },
    { id: "alert-2", title: "Western Europe OEB5 capacity above 90% utilization", tone: "gold", body: "Consider accelerating award timing or expanding APAC fallback options.", status: "action_required", linkedVendorId: "lonza-ibex" },
    { id: "alert-3", title: "New mRNA benchmark released for late-clinical transfer programmes", tone: "teal", body: "Commercial benchmark could improve negotiation posture on the live RFP.", status: "info", linkedProgrammeId: "lnp-rare-disease" },
  ];

  return {
    hydrated: false,
    scenario,
    onboarding: { status: scenario === "new_sponsor" ? "in_progress" : "approved", currentStep: scenario === "new_sponsor" ? 2 : 5, completion: scenario === "new_sponsor" ? 42 : 100, companyName: "Helixion Biologics", role: "Sponsor", contactName: "Maya Chen" },
    programmes,
    vendors,
    rfps,
    proposals,
    milestones,
    alerts,
    watchlists: [
      { id: "watch-1", name: "ADC finalists", scope: "3 vendors", threshold: "Any GMP change", vendorIds: ["wuxi-xdc", "lonza-ibex", "abzena"] },
      { id: "watch-2", name: "mRNA transfer watch", scope: "2 modalities", threshold: "Capacity < 2 slots", vendorIds: ["wuxi-xdc", "lonza-ibex"] },
    ],
    invoices: [
      { id: "inv-1", label: "Platform subscription Q2 2026", amount: 48000, status: "paid", due: "Apr 01, 2026" },
      { id: "inv-2", label: "Escrow funding tranche 02", amount: 340000, status: "due", due: "Apr 04, 2026" },
      { id: "inv-3", label: "Advisory intelligence package", amount: 18000, status: "scheduled", due: "Apr 21, 2026" },
    ],
    project: { id: "active-ppq", programmeId: "lnp-rare-disease", name: "Rare Disease mRNA Execution", vendorId: scenario === "awarded_project" || scenario === "at_risk_project" ? "lonza-ibex" : "wuxi-xdc", vendorName: scenario === "awarded_project" || scenario === "at_risk_project" ? "Lonza Ibex" : "WuXi XDC", status: scenario === "at_risk_project" ? "at_risk" : scenario === "awarded_project" ? "active" : "pending_funding", escrowStatus: scenario === "awarded_project" || scenario === "at_risk_project" ? "funded" : "partially_funded", escrowBalance: scenario === "awarded_project" || scenario === "at_risk_project" ? 520000 : 180000, pendingRelease: 340000, qualityScore: scenario === "at_risk_project" ? 82 : 92, site: "Visp, Switzerland" },
    aiRun: { active: false, progress: 0, stage: "Ready", partialVendorIds: [] },
    comparisonRun: { active: false, progress: 0, stage: "Ready", sectionsReady: [] },
    compareVendorIds: ["wuxi-xdc", "lonza-ibex"],
    shortlistCount: recalcShortlistCount(programmes),
    toasts: [],
    activity: [
      { id: "a-1", title: "Programme created", detail: "HER2 ADC Fill-Finish is queued for structured sponsor intake.", time: "5m ago" },
      { id: "a-2", title: "Milestone pending", detail: "Engineering Runs x3 is awaiting sponsor QA review.", time: "18m ago" },
      { id: "a-3", title: "Alert elevated", detail: "Western Europe OEB5 capacity signal exceeded watch threshold.", time: "42m ago" },
    ],
  };
}

function pushToast(set: StoreSetter, title: string, body: string, tone: Toast["tone"] = "teal") {
  const toast = { id: makeId("toast"), title, body, tone };
  set((state) => ({ toasts: [...state.toasts, toast] }));
  if (typeof window !== "undefined") {
    window.setTimeout(() => sponsorDemoStore.getState().removeToast(toast.id), 3200);
  }
}

function pushActivity(set: StoreSetter, title: string, detail: string) {
  set((state) => ({ activity: [{ id: makeId("activity"), title, detail, time: "Just now" }, ...state.activity].slice(0, 12) }));
}

export const sponsorDemoStore = create<SponsorDemoState>()(persist((set, get) => ({
  ...buildBaseState("active_shortlisting"),
  setHydrated: (hydrated) => set({ hydrated }),
  updateOnboarding: (patch) => set((state) => ({ onboarding: { ...state.onboarding, ...patch } })),
  createProgramme: (input) => {
    const id = `${input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`;
    const programme: Programme = { id, name: input.name, modality: input.modality, stage: input.stage, vendorType: input.partnerType, status: "draft", next: "Complete requirements", owner: "Sponsor Admin", shortlistIds: [], region: input.region, budgetBand: input.budgetBand, timeline: "Define target award window", indication: input.indication, summary: input.notes || "Programme created from sponsor intake wizard.", compliance: ["FDA", "Quality agreement"], requirements: [{ label: "Region", value: input.region }, { label: "Budget", value: input.budgetBand }, { label: "Indication", value: input.indication }] };
    set((state) => { const programmes = [programme, ...state.programmes]; return { programmes, shortlistCount: recalcShortlistCount(programmes) }; });
    pushActivity(set, "Programme created", `${input.name} was created as a draft sponsor programme.`);
    pushToast(set, "Programme created", "New programme added to the sponsor portfolio.", "teal");
    return id;
  },
  updateProgramme: (programmeId, patch) => set((state) => { const programmes = state.programmes.map((item) => item.id === programmeId ? { ...item, ...patch } : item); return { programmes, shortlistCount: recalcShortlistCount(programmes) }; }),
  addVendorToShortlist: (programmeId, vendorId) => set((state) => { const programmes = state.programmes.map((item) => item.id === programmeId && !item.shortlistIds.includes(vendorId) ? { ...item, shortlistIds: [...item.shortlistIds, vendorId], status: "shortlist_ready", next: "Create RFP draft" } : item); return { programmes, vendors: state.vendors.map((item) => item.id === vendorId ? { ...item, relationship: "shortlisted" } : item), shortlistCount: recalcShortlistCount(programmes) }; }),
  removeVendorFromShortlist: (programmeId, vendorId) => set((state) => { const programmes = state.programmes.map((item) => item.id === programmeId ? { ...item, shortlistIds: item.shortlistIds.filter((id) => id !== vendorId) } : item); return { programmes, vendors: state.vendors.map((item) => item.id === vendorId ? { ...item, relationship: "discovered" } : item), shortlistCount: recalcShortlistCount(programmes) }; }),
  saveShortlist: (programmeId, vendorIds) => { get().updateProgramme(programmeId, { shortlistIds: vendorIds, status: "shortlist_ready", next: "Create RFP draft" }); pushActivity(set, "Shortlist saved", `${vendorIds.length} vendors are now saved to the programme shortlist.`); pushToast(set, "Shortlist saved", "Programme shortlist is ready for RFP creation.", "teal"); },
  toggleVendorWatch: (vendorId) => { const vendor = get().vendors.find((item) => item.id === vendorId); if (!vendor) return; const watched = vendor.relationship === "watched"; set((state) => ({ vendors: state.vendors.map((item) => item.id === vendorId ? { ...item, relationship: watched ? "discovered" : "watched" } : item), alerts: watched ? state.alerts : [{ id: makeId("alert"), title: `${vendor.name} added to watchlist`, body: "Capacity, regulatory, and delivery signals will appear in sponsor intelligence.", tone: "teal", status: "watched", linkedVendorId: vendorId }, ...state.alerts] })); if (!watched) { pushActivity(set, "Vendor watched", `${vendor.name} now appears in sponsor watchlists and intelligence.`); pushToast(set, "Vendor watched", "A new intelligence watch has been created.", "teal"); } },
  flagVendorRisk: (vendorId) => { const vendor = get().vendors.find((item) => item.id === vendorId); if (!vendor) return; set((state) => ({ vendors: state.vendors.map((item) => item.id === vendorId ? { ...item, relationship: "flagged", notes: [...item.notes, "Flagged by sponsor risk review"], riskLevel: "High" } : item), alerts: [{ id: makeId("alert"), title: `${vendor.name} flagged for risk review`, body: "Risk note added and vendor elevated across matching, intelligence, and compare surfaces.", tone: "red", status: "high_risk", linkedVendorId: vendorId }, ...state.alerts] })); pushToast(set, "Risk flagged", "Vendor was flagged and added to active sponsor alerts.", "red"); },
  toggleCompareVendor: (vendorId) => set((state) => ({ compareVendorIds: state.compareVendorIds.includes(vendorId) ? state.compareVendorIds.filter((id) => id !== vendorId) : [...state.compareVendorIds, vendorId].slice(-4) })),
  createRfp: (programmeId) => { const programme = get().programmes.find((item) => item.id === programmeId); if (!programme || !programme.shortlistIds.length) return null; const id = `rfp-${Date.now()}`; const draft: Rfp = { id, title: `${programme.name} RFP`, state: "draft", deadline: "Apr 21", next: "Review and distribute", programmeId, invitedVendorIds: programme.shortlistIds, distributed: false, ndaMode: "Mutual NDA required", workPackages: ["Technical package", "Timeline", "Quality response"], rubric: [{ label: "Technical fit", weight: 40 }, { label: "Commercials", weight: 20 }, { label: "Timeline", weight: 20 }, { label: "Regulatory / quality", weight: 20 }] }; set((state) => ({ rfps: [draft, ...state.rfps], programmes: state.programmes.map((item) => item.id === programmeId ? { ...item, status: "rfp_draft", next: "Review draft RFP", linkedRfpId: id } : item) })); pushToast(set, "RFP draft created", "Shortlisted vendors have been moved into a structured RFP draft.", "teal"); return id; },
  distributeRfp: (rfpId) => { const rfp = get().rfps.find((item) => item.id === rfpId); if (!rfp) return; set((state) => ({ rfps: state.rfps.map((item) => item.id === rfpId ? { ...item, state: "live", distributed: true, next: "Clarification window open" } : item), programmes: state.programmes.map((item) => item.id === rfp.programmeId ? { ...item, status: "rfp_live", next: "Monitor bidder activity" } : item), vendors: state.vendors.map((item) => rfp.invitedVendorIds.includes(item.id) ? { ...item, relationship: "invited" } : item), proposals: state.proposals.map((item) => item.rfpId === rfpId ? { ...item, status: item.status === "submitted" ? item.status : "nda_pending" } : item) })); pushActivity(set, "RFP distributed", `${rfp.title} is now live for invited vendors.`); pushToast(set, "RFP distributed", "Approved bidders can now accept NDA and begin proposal work.", "teal"); },
  submitMockProposal: (rfpId, vendorId) => { const proposal = get().proposals.find((item) => item.rfpId === rfpId && item.vendorId === vendorId); if (!proposal) return; set((state) => ({ proposals: state.proposals.map((item) => item.rfpId === rfpId && item.vendorId === vendorId ? { ...item, status: "submitted", completeness: 100 } : item), rfps: state.rfps.map((item) => item.id === rfpId ? { ...item, state: "proposals_incoming", next: "Proposal received" } : item) })); pushActivity(set, "Proposal submitted", `${proposal.vendor} submitted a proposal into ${rfpId}.`); pushToast(set, "Proposal submitted", "Proposal inbox and RFP state were updated.", "gold"); },
  generateComparison: async (rfpId) => { set({ comparisonRun: { active: true, rfpId, progress: 0, stage: "Normalizing technical responses", sectionsReady: [] } }); await simulateComparisonProgress((progress, stage, sectionsReady) => set({ comparisonRun: { active: true, rfpId, progress, stage, sectionsReady } })); set((state) => ({ rfps: state.rfps.map((item) => item.id === rfpId ? { ...item, state: "comparison_ready", next: "Move to award board" } : item), comparisonRun: { active: false, rfpId, progress: 100, stage: "Comparison ready", sectionsReady: ["Summary", "Score matrix", "Risk flags", "Recommendation"] } })); pushToast(set, "Comparison generated", "Technical, commercial, timeline, and quality scores are normalized.", "teal"); },
  awardVendor: (rfpId, vendorId) => { const rfp = get().rfps.find((item) => item.id === rfpId); const vendor = get().vendors.find((item) => item.id === vendorId); if (!rfp || !vendor) return; set((state) => ({ rfps: state.rfps.map((item) => item.id === rfpId ? { ...item, state: "awarded", next: "Fund escrow" } : item), programmes: state.programmes.map((item) => item.id === rfp.programmeId ? { ...item, status: "in_execution", next: "Fund escrow", linkedProjectId: "active-ppq" } : item), vendors: state.vendors.map((item) => item.id === vendorId ? { ...item, relationship: "awarded" } : item), proposals: state.proposals.map((item) => item.rfpId === rfpId ? { ...item, status: item.vendorId === vendorId ? "selected" : "rejected" } : item), project: { ...state.project, programmeId: rfp.programmeId, vendorId, vendorName: vendor.name, status: "pending_funding" } })); pushActivity(set, "Vendor awarded", `${vendor.name} was selected from ${rfp.title}.`); pushToast(set, "Vendor awarded", `${vendor.name} is now the selected partner. Escrow funding is next.`, "teal"); },
  fundEscrow: () => { set((state) => ({ project: { ...state.project, status: "active", escrowStatus: "funded", escrowBalance: state.project.escrowBalance + 340000 } })); pushToast(set, "Escrow funded", "Project is now active and milestone payments are protected.", "teal"); },
  approveMilestone: (milestoneId) => { set((state) => ({ milestones: state.milestones.map((item) => item.id === milestoneId ? { ...item, state: "paid" } : item), project: { ...state.project, escrowStatus: "released", pendingRelease: 0 } })); pushActivity(set, "Milestone approved", `Milestone ${milestoneId.toUpperCase()} moved to paid and escrow was updated.`); pushToast(set, "Milestone approved", "Escrow release and project activity log were updated.", "teal"); },
  raiseDispute: (milestoneId) => { set((state) => ({ milestones: state.milestones.map((item) => item.id === milestoneId ? { ...item, state: "disputed" } : item), project: { ...state.project, status: "disputed" }, alerts: [{ id: makeId("alert"), title: `Milestone ${milestoneId.toUpperCase()} disputed`, body: "Project status moved to disputed and requires immediate review.", tone: "red", status: "critical" }, ...state.alerts] })); pushToast(set, "Dispute opened", "Project and milestone states have been escalated.", "red"); },
  respondToAlert: (alertId, action) => { if (action === "dismiss") { get().dismissAlert(alertId); return; } set((state) => ({ alerts: state.alerts.map((item) => item.id === alertId ? { ...item, status: action === "watch" ? "watched" : "critical" } : item) })); pushActivity(set, "Alert updated", `Alert ${alertId} was marked as ${action}.`); pushToast(set, "Alert updated", `Alert response recorded as ${action}.`, action === "escalate" ? "red" : "teal"); },
  dismissAlert: (alertId) => set((state) => ({ alerts: state.alerts.map((item) => item.id === alertId ? { ...item, status: "dismissed" } : item) })),
  fastForwardProposals: (rfpId) => { set((state) => ({ proposals: state.proposals.map((item) => item.rfpId === rfpId && item.status !== "selected" && item.status !== "rejected" ? { ...item, status: "submitted", completeness: 100 } : item), rfps: state.rfps.map((item) => item.id === rfpId ? { ...item, state: "comparison_ready", next: "Open comparison report" } : item) })); pushToast(set, "Timeline advanced", "Mock proposals were submitted and the comparison is ready.", "gold"); },
  setScenario: (scenario) => { set({ ...buildBaseState(scenario), hydrated: true }); pushToast(set, "Scenario loaded", `Demo switched to ${scenario.replace(/_/g, " ")}.`, "gold"); },
  simulateAlert: () => { set((state) => ({ alerts: [{ id: makeId("alert"), title: "Fresh intelligence signal on shortlisted vendor", body: "New regional capacity update was received and linked to the active sponsor workspace.", tone: "gold", status: "action_required", linkedVendorId: state.vendors[0]?.id }, ...state.alerts] })); pushToast(set, "Intelligence alert added", "A new alert was injected for live-demo storytelling.", "gold"); },
  markMilestoneOverdue: (milestoneId) => { const targetId = milestoneId ?? get().milestones.find((item) => item.state === "awaiting_review")?.id ?? get().milestones[0]?.id; if (!targetId) return; set((state) => ({ milestones: state.milestones.map((item) => item.id === targetId ? { ...item, state: "overdue" } : item), project: { ...state.project, status: "at_risk" } })); pushToast(set, "Milestone marked overdue", "Project risk posture was elevated for the demo.", "red"); },
  autoSubmitProposals: (rfpId) => get().fastForwardProposals(rfpId),
  rerunAiMatch: async (programmeId) => { const targetId = programmeId ?? get().programmes[0]?.id; if (targetId) await get().runAiMatching(targetId); },
  injectVendorRiskFlag: (vendorId) => { const targetId = vendorId ?? get().vendors[0]?.id; if (targetId) get().flagVendorRisk(targetId); },
  resetDemo: () => { set({ ...buildBaseState("active_shortlisting"), hydrated: true }); pushToast(set, "Demo reset", "Sponsor data returned to the seeded default scenario.", "gold"); },
  removeToast: (toastId) => set((state) => ({ toasts: state.toasts.filter((item) => item.id !== toastId) })),
  runAiMatching: async (programmeId) => { get().updateProgramme(programmeId, { status: "matching_in_progress", next: "AI shortlist running" }); set({ aiRun: { active: true, programmeId, progress: 0, stage: "Parsing programme requirements", partialVendorIds: [] } }); await simulateProgress((progress, stage) => set({ aiRun: { active: true, programmeId, progress, stage, partialVendorIds: progress >= 89 ? ["wuxi-xdc", "lonza-ibex", "abzena"] : progress >= 47 ? ["wuxi-xdc", "lonza-ibex"] : progress >= 21 ? ["wuxi-xdc"] : [] } })); const shortlistIds = ["wuxi-xdc", "lonza-ibex", "abzena"]; set((state) => { const programmes = state.programmes.map((item) => item.id === programmeId ? { ...item, status: "shortlist_ready", next: "Review shortlist", shortlistIds } : item); return { programmes, vendors: state.vendors.map((item) => shortlistIds.includes(item.id) ? { ...item, relationship: item.id === "wuxi-xdc" ? "finalist" : "shortlisted" } : item), shortlistCount: recalcShortlistCount(programmes), aiRun: { active: false, programmeId, progress: 100, stage: "Shortlist ready", partialVendorIds: shortlistIds } }; }); pushActivity(set, "AI shortlist completed", "Three ranked vendors were added with capacity and regulatory signals."); pushToast(set, "AI shortlist ready", "Top-fit vendors have been ranked with rationale, risk, and availability.", "teal"); },
}), { name: "pharmabridge-sponsor-demo", storage: createJSONStorage(() => localStorage), partialize: (state) => ({ scenario: state.scenario, onboarding: state.onboarding, programmes: state.programmes, vendors: state.vendors, rfps: state.rfps, proposals: state.proposals, milestones: state.milestones, alerts: state.alerts, watchlists: state.watchlists, invoices: state.invoices, project: state.project, compareVendorIds: state.compareVendorIds, shortlistCount: state.shortlistCount, activity: state.activity }), onRehydrateStorage: () => (state) => state?.setHydrated(true) }));

export function SponsorDemoProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    void sponsorDemoStore.persist.rehydrate();
    sponsorDemoStore.getState().setHydrated(true);
  }, []);
  return <>{children}</>;
}

export const useSponsorDemo = sponsorDemoStore;






