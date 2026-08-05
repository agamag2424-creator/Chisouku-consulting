import type { Metadata } from "next";
import Link from "next/link";
import { PmoOperatingMap } from "../../components/artifacts/PmoOperatingMap";
import { DragLedger } from "../../components/artifacts/DragLedger";
import { OpportunityMatrix } from "../../components/artifacts/OpportunityMatrix";
import { ImplementationBlueprint } from "../../components/artifacts/ImplementationBlueprint";
import { SampleAuditArtifact } from "../../components/artifacts/SampleAuditArtifact";

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
            One operating story — map, ledger, matrix, blueprint.
          </p>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)] pt-0">
        <div className="container">
          <p className="eyebrow">Featured</p>
          <h2 className="headline">Full artifact excerpt.</h2>
          <div className="mt-8">
            <SampleAuditArtifact />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">The sequence</p>
          <h2 className="headline">Map → Locate → Prioritize → Blueprint.</h2>
          <div className="mt-10 grid gap-8">
            <div>
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                01 · Map
              </p>
              <PmoOperatingMap compact />
            </div>
            <div>
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                02 · Locate
              </p>
              <DragLedger />
            </div>
            <div>
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                03 · Prioritize
              </p>
              <OpportunityMatrix />
            </div>
            <div>
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                04 · Blueprint
              </p>
              <ImplementationBlueprint />
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="button button-primary">
              Book Audit Fit Call
            </Link>
            <Link href="/pmo-automation-audit" className="button button-secondary">
              Review the audit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
