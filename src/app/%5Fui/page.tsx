import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Accordion } from "../../components/ui/Accordion";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { DataTable } from "../../components/ui/DataTable";
import { EvidenceCell, type EvidenceState } from "../../components/ui/EvidenceCell";
import { PriceBlock } from "../../components/ui/PriceBlock";
import { RagBadge } from "../../components/ui/RagBadge";
import { ScoreBadge } from "../../components/ui/ScoreBadge";
import { Section } from "../../components/ui/Section";
import { Sheet } from "../../components/ui/Sheet";

// Folder is "%5Fui" because App Router treats "_ui" as a private, unroutable folder.

/**
 * Fail closed: the page exists only in `next dev` and on Vercel preview deployments.
 * Production, or any build where VERCEL_ENV is missing, returns 404.
 */
const showUiReference =
  process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";

// The 404 still streams this route's metadata, so the internal title is only set where the page renders.
export const metadata: Metadata = showUiReference
  ? { title: "UI components", robots: { index: false, follow: false } }
  : { robots: { index: false, follow: false } };

const R5 = ["Status", "Owner", "Evidence", "Date", "Action"] as const;

/** PRD 7 illustrative claims, used here only to exercise the components. */
const claims: { id: string; claim: string; marks: EvidenceState[] }[] = [
  { id: "T1", claim: "SIT complete, 98% pass rate", marks: ["present", "present", "partial", "present", "missing"] },
  { id: "I1", claim: "All 23 interfaces built and tested", marks: ["present", "present", "missing", "missing", "missing"] },
  { id: "C2", claim: "Rollback plan in place", marks: ["partial", "missing", "missing", "missing", "missing"] },
];

const evidenced = (marks: EvidenceState[]) => marks.filter((m) => m === "present").length;

type ClaimRow = Record<string, ReactNode>;

const claimRows: ClaimRow[] = claims.map((c) => ({
  id: c.id,
  claim: c.claim,
  reported: <RagBadge status="green" prefix="Reported" />,
  ...Object.fromEntries(R5.map((name, i) => [name, <EvidenceCell key={name} state={c.marks[i]} label={name} />])),
  score: <ScoreBadge score={evidenced(c.marks)} />,
}));

const numericRows = [
  { item: "Test cases executed", planned: "1,240", actual: "1,215" },
  { item: "Defects open (severity 1–2)", planned: "0", actual: "7" },
  { item: "Interfaces tested end to end", planned: "23", actual: "20" },
];

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-line pt-8">
      <h2 className="t-h2 mb-6 text-ink">{title}</h2>
      {children}
    </div>
  );
}

export default function UiPage() {
  if (!showUiReference) notFound();

  return (
    <>
      <Section tone="page" containerClassName="grid gap-16">
        <header>
          <h1 className="t-h1 text-ink">UI components</h1>
          <p className="t-body mt-3 text-muted">
            Internal reference for the decision-instrument system (E0.3). Not indexed, not in the sitemap.
          </p>
        </header>

        <Demo title="Type scale">
          <div className="grid gap-3">
            <p className="t-display text-ink">Display 56 / 36</p>
            <p className="t-h1 text-ink">Heading 1 44 / 32</p>
            <p className="t-h2 text-ink">Heading 2 32 / 26</p>
            <p className="t-h3 text-ink">Heading 3 22 / 20</p>
            <p className="t-body text-ink">Body 18 / 17, line height 1.6, measure capped at 70 characters so long paragraphs stay readable on wide screens.</p>
            <p className="t-small text-muted">Small 15</p>
            <p className="t-data text-ink">T1, 3 of 5, USD 5,000</p>
          </div>
        </Demo>

        <Demo title="Button">
          <div className="grid gap-6">
            {(["md", "lg"] as const).map((size) => (
              <div key={size} className="flex flex-wrap items-center gap-4">
                <Button href="/contact" size={size}>Primary {size}</Button>
                <Button href="/contact" variant="secondary" size={size}>Secondary {size}</Button>
                <Button href="/method" variant="text" size={size}>Text link {size}</Button>
                <Button size={size}>Button element</Button>
                <Button size={size} disabled>Disabled</Button>
              </div>
            ))}
          </div>
        </Demo>

        <Demo title="Evidence cell">
          <div className="flex flex-wrap items-center gap-6">
            {(["present", "partial", "missing"] as const).map((state) => (
              <span key={state} className="inline-flex items-center gap-2 text-ink">
                <EvidenceCell state={state} label="Evidence" />
                <span className="t-small" aria-hidden>{state}</span>
              </span>
            ))}
          </div>
        </Demo>

        <Demo title="RAG and score badges">
          <div className="grid gap-4">
            <div className="flex flex-wrap gap-3">
              <RagBadge status="green" prefix="Reported" />
              <RagBadge status="amber" prefix="Reported" />
              <RagBadge status="red" prefix="Reported" />
              <RagBadge status="green" />
            </div>
            <div className="flex flex-wrap gap-3">
              {[5, 4, 3, 2, 1, 0].map((score) => (
                <ScoreBadge key={score} score={score} />
              ))}
            </div>
          </div>
        </Demo>

        <Demo title="Data table">
          <div className="grid gap-8">
            <DataTable
              id="ui-claims"
              caption="Readiness claims scored on READINESS-5. Illustrative example. Fictional programme."
              columns={[
                { key: "id", header: "ID", rowHeader: true },
                { key: "claim", header: "Claim as reported" },
                { key: "reported", header: "Reported" },
                ...R5.map((name) => ({ key: name, header: name.charAt(0) })),
                { key: "score", header: "Evidenced" },
              ]}
              rows={claimRows}
              getRowKey={(row) => String(row.id)}
              minWidth={760}
            />
            <DataTable
              id="ui-numeric"
              caption="Numeric columns use mono, tabular figures, right-aligned."
              columns={[
                { key: "item", header: "Measure", rowHeader: true },
                { key: "planned", header: "Planned", numeric: true },
                { key: "actual", header: "Actual", numeric: true },
              ]}
              rows={numericRows}
              getRowKey={(row) => row.item}
            />
          </div>
        </Demo>

        <Demo title="Callout">
          <div className="grid gap-4">
            <Callout title="Info">The review does not guarantee go-live success.</Callout>
            <Callout tone="caution" title="Caution">
              Not a re-test of your system, not a regulatory certification.
            </Callout>
            <Callout>Info without a title.</Callout>
          </div>
        </Demo>

        <Demo title="Price block">
          <div className="grid gap-6 min-[641px]:grid-cols-2">
            <PriceBlock offer="evidenceCheck" />
            <PriceBlock offer="decisionReview" />
            <PriceBlock offer="continuous" />
            <PriceBlock offer="decisionReview" foundingSlotsRemaining={0} />
          </div>
        </Demo>

        <Demo title="Accordion">
          <Accordion
            items={[
              { id: "ui-acc-1", summary: "Open by default", content: "Native details element; works without JavaScript.", defaultOpen: true },
              { id: "ui-acc-2", summary: "Closed item", content: "Enter or Space toggles it from the keyboard." },
              { id: "ui-acc-3", summary: "Another closed item", content: "The chevron rotates only when motion is allowed." },
            ]}
          />
        </Demo>

        <Demo title="Sheet">
          <Sheet className="p-6">
            <p className="text-ink">Paper surface, 1px line, 4px radius. No blur, shadow or hover lift.</p>
          </Sheet>
        </Demo>
      </Section>

      <Section tone="paper">
        <h2 className="t-h2 text-ink">Section, tone paper</h2>
        <p className="t-body mt-3 text-muted">The section above uses tone page. Both use 64px vertical padding on mobile and 96px from 641px.</p>
      </Section>
    </>
  );
}
