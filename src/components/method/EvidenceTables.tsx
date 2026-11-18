import {
  claimLabel,
  evidenceElements,
  evidencedCount,
  evidenceStateLabel,
  sampleClaims,
  sampleContradictions,
  sampleLabel,
} from "../../content/heroEvidence";
import { EvidenceCell } from "../ui/EvidenceCell";
import { RagBadge } from "../ui/RagBadge";
import { ScoreBadge } from "../ui/ScoreBadge";

// Method page tables (restored from the pre-September site, 18 Nov 2026): every claim in the fictional sample
// programme scored on the five checks, and the contradictions found between its reports.

const box =
  "relative max-w-full overflow-x-auto rounded-[4px] border border-line bg-paper shadow-[0_1px_2px_rgba(17,24,32,0.04),0_10px_30px_rgba(17,24,32,0.06)]";
const head = "t-small px-4 pb-3 pt-4 text-left align-bottom font-semibold text-ink";
const cell = "t-small px-4 py-3.5 align-top";

/** Six claims, all reported Green, each checked for Status, Owner, Evidence, Date and Action. */
export function ScoringTable() {
  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted" aria-hidden>
        {(["present", "partial", "missing"] as const).map((state) => (
          <span key={state} className="flex items-center gap-1.5">
            <EvidenceCell state={state} label="Key" className="[--glyph:12px] [&>.sr-only]:hidden" />
            {state === "partial" ? "Partial (not counted)" : evidenceStateLabel[state]}
          </span>
        ))}
      </div>
      <div role="region" aria-labelledby="scoring-caption" tabIndex={0} className={box}>
        <table className="w-full min-w-[900px] border-collapse">
          <caption id="scoring-caption" className="sr-only">
            Claims in a fictional programme, reported Green, checked on Status, Owner, Evidence, Date and Action
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={head}>ID</th>
              <th scope="col" className={head}>Area</th>
              <th scope="col" className={head}>Claim as reported</th>
              <th scope="col" className={head}>Reported</th>
              {evidenceElements.map((element) => (
                <th key={element.key} scope="col" className={`${head} w-8 px-1 text-center`}>
                  <abbr title={element.name} className="no-underline">
                    {element.key}
                  </abbr>
                </th>
              ))}
              <th scope="col" className={head}>Score</th>
              <th scope="col" className={head}>Finding</th>
            </tr>
          </thead>
          <tbody>
            {sampleClaims.map((claim) => (
              <tr key={claim.id} className="border-b border-line last:border-b-0">
                <th scope="row" className={`${cell} t-data font-semibold text-ink`}>
                  {claim.id}
                </th>
                <td className={`${cell} text-muted`}>{claim.domain}</td>
                <td className={`${cell} font-semibold text-ink`}>{claim.claim}</td>
                <td className={cell}>
                  <RagBadge status={claim.reported} />
                </td>
                {claim.marks.map((mark, index) => (
                  <td key={evidenceElements[index].key} className={`${cell} px-1 text-center`}>
                    <EvidenceCell state={mark} label={evidenceElements[index].name} />
                  </td>
                ))}
                <td className={`${cell} whitespace-nowrap`}>
                  <ScoreBadge score={evidencedCount(claim.marks)} />
                </td>
                <td className={`${cell} min-w-[260px] text-muted`}>{claim.finding}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="text-[13px] text-muted">{sampleLabel}</figcaption>
    </figure>
  );
}

/** Where two reports in the same programme say different things. */
export function ContradictionTable() {
  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <div role="region" aria-labelledby="contradictions-caption" tabIndex={0} className={box}>
        <table className="w-full min-w-[760px] border-collapse">
          <caption id="contradictions-caption" className="sr-only">
            Contradictions between reports in a fictional programme
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={head}>Contradiction</th>
              <th scope="col" className={head}>Claim A</th>
              <th scope="col" className={head}>Claim B</th>
              <th scope="col" className={head}>What it means</th>
            </tr>
          </thead>
          <tbody>
            {sampleContradictions.map((row) => (
              <tr key={row.type} className="border-b border-line last:border-b-0">
                <th scope="row" className={`${cell} text-left font-semibold text-ink`}>
                  <span className="flex items-start gap-2">
                    <span aria-hidden className="mt-[0.5em] size-2 shrink-0 rounded-full bg-ev-miss" />
                    {row.type}
                  </span>
                </th>
                {row.between.map((id) => (
                  <td key={id} className={`${cell} text-muted`}>
                    <span className="t-data block font-semibold text-ink">{id}</span>
                    {claimLabel(id)}
                  </td>
                ))}
                <td className={`${cell} text-muted`}>{row.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="text-[13px] text-muted">{sampleLabel}</figcaption>
    </figure>
  );
}
