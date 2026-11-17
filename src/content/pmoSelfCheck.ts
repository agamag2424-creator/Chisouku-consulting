/**
 * PMO self-check content (research file `pmo-self-check-research.md`, 17 Nov 2026).
 * The ten dimensions are the PMO Health Scorecard: the free self-check scores them from one person's answers, and the
 * paid PMO Health Check fills the same ten in with evidence. Questions, levels and bands are added in Epic 5.
 */

export const dimensionIds = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const;

export type DimensionId = (typeof dimensionIds)[number];

export type Dimension = {
  id: DimensionId;
  name: string;
  /** Short label for diagrams. */
  short: string;
};

export const dimensions: readonly Dimension[] = [
  { id: "A", name: "Governance and decision rights", short: "Governance" },
  { id: "B", name: "Portfolio prioritisation", short: "Prioritisation" },
  { id: "C", name: "Benefits realisation", short: "Benefits" },
  { id: "D", name: "Risk and RAID", short: "RAID" },
  { id: "E", name: "Reporting and data quality", short: "Reporting" },
  { id: "F", name: "Resource and capacity", short: "Capacity" },
  { id: "G", name: "Stakeholder engagement", short: "Stakeholders" },
  { id: "H", name: "Methods and tooling", short: "Methods" },
  { id: "I", name: "Financial control", short: "Finance" },
  { id: "J", name: "PMO value perception", short: "PMO value" },
];
