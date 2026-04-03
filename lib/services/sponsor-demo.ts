export const onboardingAssistStages = [
  "Reading uploaded brief",
  "Extracting requirements",
  "Suggesting structured fields",
] as const;

export const aiMatchingStages = [
  "Parsing programme requirements",
  "Normalizing modality constraints",
  "Filtering incompatible vendors",
  "Checking geography and capacity",
  "Scoring technical and compliance fit",
  "Calculating composite score",
  "Generating rationale",
  "Preparing ranked shortlist",
] as const;

export const rfpAssistStages = [
  "Reading uploaded documents",
  "Extracting structured scope",
  "Detecting missing sections",
  "Suggesting distribution-ready fields",
] as const;

export const proposalComparisonStages = [
  "Parsing submitted proposals",
  "Extracting commercial and technical fields",
  "Comparing timelines and deliverables",
  "Scoring capability and risk alignment",
  "Identifying strengths and gaps",
  "Building recommendation summary",
] as const;

export const projectIntelligenceStages = [
  "Reviewing project signals",
  "Summarizing deliverables and milestones",
  "Detecting project risk",
  "Recommending next sponsor actions",
] as const;

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateStages<T extends readonly string[]>(
  stages: T,
  onTick: (progress: number, stage: T[number], stageIndex: number) => void,
  baseDelay = 340,
) {
  for (let index = 0; index < stages.length; index += 1) {
    const progress = Math.min(100, Math.round(((index + 1) / stages.length) * 100));
    await wait(baseDelay + index * 90);
    onTick(progress, stages[index], index);
  }
}

export async function simulateOnboardingAssist(onTick: (progress: number, stage: (typeof onboardingAssistStages)[number], stageIndex: number) => void) {
  await simulateStages(onboardingAssistStages, onTick, 260);
}

export async function simulateMatchProgress(onTick: (progress: number, stage: (typeof aiMatchingStages)[number], stageIndex: number) => void) {
  await simulateStages(aiMatchingStages, onTick, 360);
}

export async function simulateRfpAssist(onTick: (progress: number, stage: (typeof rfpAssistStages)[number], stageIndex: number) => void) {
  await simulateStages(rfpAssistStages, onTick, 300);
}

export async function simulateProposalComparison(onTick: (progress: number, stage: (typeof proposalComparisonStages)[number], stageIndex: number) => void) {
  await simulateStages(proposalComparisonStages, onTick, 360);
}

export async function simulateProjectIntelligence(onTick: (progress: number, stage: (typeof projectIntelligenceStages)[number], stageIndex: number) => void) {
  await simulateStages(projectIntelligenceStages, onTick, 300);
}

export async function simulateProgress(onTick: (progress: number, stage: string) => void) {
  await simulateMatchProgress((progress, stage) => onTick(progress, stage));
}

export async function simulateComparisonProgress(onTick: (progress: number, stage: string, sectionsReady: string[]) => void) {
  const sections = ["Summary", "Score matrix", "Risk flags", "Recommendation", "Executive summary", "Recommendation summary"];
  await simulateProposalComparison((progress, stage, index) => onTick(progress, stage, sections.slice(0, index + 1)));
}

