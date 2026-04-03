import { SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { documents } from "@/lib/mock-data/sponsor";

export default async function ProjectDocumentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Document vault" title={`Controlled document vault for ${id.replace(/-/g, " ")}`} body="The document vault stores NDAs, contracts, technical records, milestone evidence, reports, and a full document audit trail with version compare and permission-aware sharing." badges={[{ label: "Version-aware", tone: "teal" }, { label: "Audit log", tone: "gold" }]} />
      <SponsorTable title="Project documents" subtitle="Documents grouped for regulated execution work." columns={["Document", "Type", "Version", "Usage"]} rows={documents.map((document) => [document.name, document.type, document.version, document.access])} />
    </div>
  );
}
