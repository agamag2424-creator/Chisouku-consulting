import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DimensionOrbit } from "../../../components/diagrams/DimensionOrbit";
import { FindingsBoard } from "../../../components/diagrams/FindingsBoard";
import { HealthCheckStrip } from "../../../components/diagrams/HealthCheckStrip";
import { PmoHealthMap } from "../../../components/diagrams/PmoHealthMap";
import { ScorecardExcerpt } from "../../../components/diagrams/ScorecardExcerpt";
import { Section } from "../../../components/ui/Section";

/** Review page for the September diagrams (PRD Epic 2). Development and Vercel previews only; 404 in production. */
const showUiReference = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = showUiReference
  ? { title: "Diagrams", robots: { index: false, follow: false } }
  : { robots: { index: false, follow: false } };

const diagrams = [
  { id: "health-map", name: "PMO Health Map", node: <PmoHealthMap /> },
  { id: "findings", name: "What we usually find", node: <FindingsBoard /> },
  { id: "strip", name: "Health Check in five working days", node: <HealthCheckStrip /> },
  { id: "orbit", name: "Ten dimensions around the overall band", node: <DimensionOrbit /> },
  { id: "orbit-flagged", name: "Orbit with flagged dimensions (result page)", node: <DimensionOrbit flagged={["D", "E"]} centreTitle="Building consistency" /> },
  { id: "excerpt", name: "Sample scorecard excerpt", node: <ScorecardExcerpt /> },
];

export default function DiagramsReferencePage() {
  if (!showUiReference) notFound();
  return (
    <Section>
      <h1 className="t-h1">Diagrams</h1>
      <p className="t-body mt-3 text-muted">Every September diagram with its new labels. Check each at 375 px and 1280 px.</p>
      <div className="mt-12 space-y-16">
        {diagrams.map((d) => (
          <section key={d.id} id={d.id} data-diagram={d.id} aria-labelledby={`${d.id}-h`}>
            <h2 id={`${d.id}-h`} className="t-h3 mb-4">{d.name}</h2>
            {d.node}
          </section>
        ))}
      </div>
    </Section>
  );
}
