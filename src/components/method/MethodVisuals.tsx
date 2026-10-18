import { packClaim, packClaims, packConditions, packContradictions, type PackClaim } from "../../content/samplePack";
import { evidencedCount, readiness5 } from "../hero/evidenceCheckData";
import { DataTable } from "../ui/DataTable";
import { EvidenceCell } from "../ui/EvidenceCell";
import { RagBadge } from "../ui/RagBadge";
import { ScoreBadge } from "../ui/ScoreBadge";
import { Sheet } from "../ui/Sheet";

// Method page visuals (PRD 9.4). All example data comes from the sample pack (src/content/samplePack.ts).

type ElementKey = (typeof readiness5)[number]["key"];

/** PRD 9.4 one-line tests, and the pack claim that fails each element. */
const elements: readonly { key: ElementKey; test: string; failure: string }[] = [
  { key: "S", test: "Current and specific, not “on track”.", failure: "G1" },
  {
    key: "O",
    test: "A named person with authority, not a team.",
    failure: "M1",
  },
  {
    key: "E",
    test: "An artefact you can open: test log, reconciliation output, signed approval.",
    failure: "I1",
  },
  { key: "D", test: "When it will be true, not “soon”.", failure: "T2" },
  { key: "A", test: "What happens if it slips.", failure: "T1" },
];

/** Five rows: the element and its test, then a claim from the pack that fails it. */
export function ElementCards() {
  return (
    <ol className="mt-12 grid gap-4">
      {elements.map(({ key, test, failure }) => {
        const index = readiness5.findIndex((element) => element.key === key);
        const element = readiness5[index];
        const claim = packClaim(failure);
        return (
          <li key={key}>
            <Sheet className="grid gap-6 p-6 min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[900px]:items-center min-[900px]:gap-10 min-[641px]:p-8">
              <div className="flex items-start gap-5">
                <span
                  aria-hidden
                  className="w-12 shrink-0 font-[family-name:var(--font-display)] text-[56px] font-extrabold leading-[0.85] text-teal"
                >
                  {key}
                </span>
                <div>
                  <h3 className="t-h3 text-ink">{element.name}</h3>
                  <p className="t-body mt-1 text-ink">{test}</p>
                </div>
              </div>
              <div className="rounded-sheet bg-page p-5">
                <p className="text-[13px] font-semibold text-muted">What failure looks like</p>
                <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="t-data text-[14px] text-ink">{claim.id}</span>
                  <span className="t-small text-ink">{claim.claim}</span>
                  <RagBadge status={claim.reported} prefix="Reported" />
                </p>
                <p className="t-small mt-3 flex items-start gap-2.5 text-ink">
                  <EvidenceCell state={claim.marks[index]} label={element.name} className="mt-0.5 shrink-0" />
                  <span>{claim.finding}</span>
                </p>
              </div>
            </Sheet>
          </li>
        );
      })}
    </ol>
  );
}

/** The three marks with the PRD 9.4 wording. */
export function ScoreKey() {
  const items = [
    { state: "present", label: "present" },
    { state: "partial", label: "partial (not counted)" },
    { state: "missing", label: "missing" },
  ] as const;
  return (
    <ul className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Key">
      {items.map(({ state, label }) => (
        <li key={state} className="t-small flex items-center gap-2 text-ink">
          <EvidenceCell state={state} label="Key" className="[&>.sr-only]:hidden" />
          {label}
        </li>
      ))}
    </ul>
  );
}

/** "Reported Green" next to its evidenced score, for one pack claim. */
export function ReportedVersusScore({ id }: { id: string }) {
  const claim = packClaim(id);
  return (
    <p className="flex flex-wrap items-center gap-3">
      <RagBadge status={claim.reported} prefix="Reported" />
      <svg
        viewBox="0 0 16 12"
        className="h-3 w-4 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        focusable="false"
      >
        <path d="M1 6h13M9 1l5 5-5 5" />
      </svg>
      <ScoreBadge score={evidencedCount(claim.marks)} />
    </p>
  );
}

function Marks({ claim }: { claim: PackClaim }) {
  return (
    <span className="flex gap-2">
      {claim.marks.map((mark, index) => (
        <EvidenceCell key={readiness5[index].key} state={mark} label={readiness5[index].name} />
      ))}
    </span>
  );
}

/** The pack's evidence register: every claim, its marks, score and finding. */
export function EvidenceRegister() {
  const rows = packClaims.map((claim) => ({
    id: claim.id,
    domain: claim.domain,
    claim: claim.claim,
    reported: <RagBadge status={claim.reported} />,
    marks: <Marks claim={claim} />,
    score: <ScoreBadge score={evidencedCount(claim.marks)} />,
    finding: claim.finding,
  }));
  return (
    <>
      <ul className="mt-8 grid gap-3 min-[641px]:hidden">
        {packClaims.map((claim) => (
          <li key={claim.id} className="flex flex-col gap-3 rounded-sheet border border-line bg-paper p-4">
            <p className="flex items-baseline gap-3">
              <span className="t-data text-[14px] text-ink">{claim.id}</span>
              <span className="text-[13px] text-muted">{claim.domain}</span>
            </p>
            <p className="t-small font-semibold text-ink">{claim.claim}</p>
            <p className="flex flex-wrap items-center gap-2">
              <RagBadge status={claim.reported} prefix="Reported" />
              <ScoreBadge score={evidencedCount(claim.marks)} />
            </p>
            <Marks claim={claim} />
            <p className="t-small text-ink">{claim.finding}</p>
          </li>
        ))}
      </ul>
      <DataTable
        id="evidence-register"
        caption="Evidence register: each claim as reported, tested on Status, Owner, Evidence, Date and Action"
        captionHidden
        minWidth={1100}
        className="mt-8 hidden min-[641px]:block"
        getRowKey={(row) => String(row.id)}
        rows={rows}
        columns={[
          {
            key: "id",
            header: "ID",
            rowHeader: true,
            render: (row) => <span className="t-data text-[14px]">{row.id}</span>,
          },
          { key: "domain", header: "Domain" },
          { key: "claim", header: "Claim as reported" },
          { key: "reported", header: "Reported" },
          { key: "marks", header: "S O E D A" },
          { key: "score", header: "Score" },
          { key: "finding", header: "Finding" },
        ]}
      />
    </>
  );
}

const claimLabel = (id: string) => {
  const claim = packClaim(id);
  return (
    <span className="flex flex-col gap-0.5">
      <span className="t-data text-[13px] text-teal">{claim.id}</span>
      <span>{claim.claim}</span>
    </span>
  );
};

/** The four PRD 9.4 contradiction types with their pack examples. */
export function ContradictionTable() {
  const rows = packContradictions.map((item) => ({
    type: item.type,
    a: claimLabel(item.between[0]),
    b: claimLabel(item.between[1]),
    meaning: item.text,
  }));
  return (
    <>
      <ul className="mt-8 grid gap-3 min-[641px]:hidden">
        {packContradictions.map((item) => (
          <li key={item.type} className="flex flex-col gap-3 rounded-sheet border border-line bg-paper p-4">
            <p className="t-small font-semibold text-ink">{item.type}</p>
            <div className="grid grid-cols-2 gap-3 text-[14px] text-ink">
              {claimLabel(item.between[0])}
              {claimLabel(item.between[1])}
            </div>
            <p className="t-small text-ink">{item.text}</p>
          </li>
        ))}
      </ul>
      <DataTable
        id="contradiction-types"
        caption="Four contradiction types, each with an example from the sample pack"
        captionHidden
        minWidth={960}
        className="mt-8 hidden min-[641px]:block"
        getRowKey={(row) => String(row.type)}
        rows={rows}
        columns={[
          { key: "type", header: "Contradiction", rowHeader: true },
          { key: "a", header: "Claim A" },
          { key: "b", header: "Claim B" },
          { key: "meaning", header: "What it means" },
        ]}
      />
    </>
  );
}

/** The pack's conditions for proceeding: condition, owner, evidence-by date. */
export function ConditionsTable({ className }: { className?: string }) {
  const rows = packConditions.map((item, index) => ({
    n: String(index + 1),
    condition: item.condition,
    owner: item.owner,
    by: item.by,
  }));
  return (
    <div className={className}>
      <ol className="grid gap-3 min-[641px]:hidden">
        {packConditions.map((item, index) => (
          <li key={item.by} className="flex flex-col gap-3 rounded-sheet border border-line bg-paper p-4">
            <p className="t-small flex gap-3 text-ink">
              <span className="t-data text-[14px]">{index + 1}</span>
              <span>{item.condition}</span>
            </p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[14px]">
              <dt className="text-muted">Owner</dt>
              <dd className="text-ink">{item.owner}</dd>
              <dt className="text-muted">Evidence by</dt>
              <dd className="t-data text-ink">{item.by}</dd>
            </dl>
          </li>
        ))}
      </ol>
      <DataTable
        id="decision-conditions"
        caption="Conditions for proceeding, from the sample pack"
        captionHidden
        minWidth={720}
        className="hidden min-[641px]:block"
        getRowKey={(row) => String(row.n)}
        rows={rows}
        columns={[
          {
            key: "n",
            header: "#",
            rowHeader: true,
            render: (row) => <span className="t-data text-[14px]">{row.n}</span>,
          },
          { key: "condition", header: "Condition" },
          { key: "owner", header: "Owner" },
          { key: "by", header: "Evidence by", numeric: true },
        ]}
      />
    </div>
  );
}

/** Hero card: one claim from the pack as the register shows it. */
export function ClaimCard({ id, label }: { id: string; label: string }) {
  const claim = packClaim(id);
  return (
    <Sheet className="flex flex-col gap-5 p-6 text-ink shadow-2xl min-[641px]:p-8">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="t-data text-[15px]">{claim.id}</span>
        <span className="t-body font-semibold">{claim.claim}</span>
      </p>
      <RagBadge status={claim.reported} prefix="Reported" className="self-start" />
      <dl className="grid grid-cols-5 gap-2 border-y border-line py-4">
        {claim.marks.map((mark, index) => (
          <div key={readiness5[index].key} className="flex flex-col items-center gap-2">
            <dt className="text-[13px] font-semibold text-muted">
              <abbr title={readiness5[index].name} className="no-underline">
                {readiness5[index].key}
              </abbr>
            </dt>
            <dd>
              <EvidenceCell state={mark} label={readiness5[index].name} className="[--glyph:20px]" />
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-3">
        <ScoreBadge score={evidencedCount(claim.marks)} className="self-start" />
        <p className="t-small text-ink">{claim.finding}</p>
      </div>
      <p className="text-[13px] text-muted">{label}</p>
    </Sheet>
  );
}
