import type { Metadata } from "next";
import Link from "next/link";
import { PmoOperatingMap } from "../../components/artifacts/PmoOperatingMap";
import { DragLedger } from "../../components/artifacts/DragLedger";
import { OpportunityMatrix } from "../../components/artifacts/OpportunityMatrix";
import { ImplementationBlueprint } from "../../components/artifacts/ImplementationBlueprint";
import { SampleAuditArtifact } from "../../components/artifacts/SampleAuditArtifact";
import { DiagnosticOrbit } from "../../components/artifacts/DiagnosticOrbit";

export const metadata: Metadata = {
  title: "Audit Outputs",
  description:
    "PMO Automation Audit artifacts — operating map, drag ledger, opportunity matrix, and implementation blueprint.",
  alternates: { canonical: "/sample-outputs" },
};

export default function SampleOutputsPage() {
  return (
    <>
      <section className="section pt-16">
        <div className="container max-w-3xl">
          <p className="eyebrow">Audit outputs</p>
          <h1 className="display">What the audit produces.</h1>
          <p className="subhead mt-5">
            Operating clarity artifacts — maps, ledgers, matrices, and a blueprint.
          </p>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)] pt-0">
        <div className="container grid gap-10">
          <PmoOperatingMap compact />
          <DragLedger />
          <OpportunityMatrix />
          <ImplementationBlueprint />
          <SampleAuditArtifact />
          <DiagnosticOrbit />
        </div>
        <div className="container mt-12 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="button button-primary">
            Book Audit Fit Call
          </Link>
          <Link href="/pmo-automation-audit" className="button button-secondary">
            Review the audit
          </Link>
        </div>
      </section>
    </>
  );
}
