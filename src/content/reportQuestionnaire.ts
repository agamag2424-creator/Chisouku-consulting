// The Go-Live Readiness Report questionnaire (brief 3a): about 40 questions across seven areas, each answer checked
// on Status, Owner, Evidence, Date and Action. The final list, groupings and scoring come from the report model
// (due Fri 6 Nov). Until then the list is empty and buyers are told the questionnaire link follows by email.

export type ReportAreaId =
  | "scope_deadline_governance"
  | "data_master_data"
  | "erp_configuration"
  | "asp_fatoora_integration"
  | "testing_evidence"
  | "cutover_rollback"
  | "people_support";

export const reportAreas: readonly { id: ReportAreaId; name: string }[] = [
  { id: "scope_deadline_governance", name: "Scope, deadline and governance" },
  { id: "data_master_data", name: "Data and master data" },
  { id: "erp_configuration", name: "ERP configuration" },
  { id: "asp_fatoora_integration", name: "ASP, Fatoora and integration" },
  { id: "testing_evidence", name: "Testing evidence" },
  { id: "cutover_rollback", name: "Cutover and rollback" },
  { id: "people_support", name: "People and support" },
];

export type ReportQuestion = {
  id: string;
  area: ReportAreaId;
  text: string;
  /** Which countries the question applies to; omitted means both. */
  countries?: readonly ("UAE" | "KSA")[];
  /** Marks an answer that can stop a go-live whatever the score (a red flag). */
  redFlagWhen?: "no" | "partly" | "no_or_partly";
};

/** Empty until the report model lands. */
export const reportQuestions: readonly ReportQuestion[] = [];

export const questionnaireReady = reportQuestions.length > 0;
