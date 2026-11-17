import Link from "next/link";
import { scorecardExcerpt, type ScorecardStatus } from "../../content/diagrams";
import { cn } from "../../lib/utils";

type Props = { className?: string; showLink?: boolean };

const statusStyle: Record<ScorecardStatus, { dot: string; label: string }> = {
  ok: { dot: "bg-ev-ok", label: "Evidenced" },
  part: { dot: "bg-ev-part", label: "Partly evidenced" },
  miss: { dot: "bg-ev-miss", label: "Not evidenced" },
};

/** Sample scorecard excerpt (September "Audit artifact excerpt", relabelled). Always labelled as a fictional sample. */
export function ScorecardExcerpt({ className, showLink = true }: Props) {
  const s = scorecardExcerpt;
  return (
    <figure className={cn("artifact-sheet paper-grain ink-corners overflow-hidden", className)} aria-label={s.alt}>
      <div className="grid lg:grid-cols-[1.4fr_0.6fr]">
        <div className="border-b border-ink/12 p-5 md:p-8 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="eyebrow">{s.eyebrow}</p>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-1 text-[15px] text-muted">{s.organisation}</p>
            </div>
            <span className="shrink-0 rounded-[2px] border border-gold-ink/40 bg-[rgba(168,146,95,0.1)] px-2 py-1 font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.1em] text-gold-ink">
              {s.label}
            </span>
          </div>

          <table className="mt-6 w-full border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-ink/15 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-muted">
                <th scope="col" className="py-2 pr-3 font-bold">{s.columns.dimension}</th>
                <th scope="col" className="py-2 pr-3 font-bold">{s.columns.level}</th>
                <th scope="col" className="py-2 font-bold max-[639px]:sr-only">{s.columns.evidence}</th>
              </tr>
            </thead>
            <tbody>
              {s.rows.map((row) => (
                <tr key={row.dimension} className="border-b border-ink/10 align-top max-[639px]:grid max-[639px]:grid-cols-2">
                  <th scope="row" className="py-3 pr-3 font-semibold text-ink">{row.dimension}</th>
                  <td className="py-3 pr-3">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden className={cn("h-2.5 w-2.5 rounded-full", statusStyle[row.status].dot)} />
                      {row.level}
                      <span className="sr-only">, {statusStyle[row.status].label}</span>
                    </span>
                  </td>
                  <td className="py-3 text-muted max-[639px]:col-span-2 max-[639px]:pt-0">{row.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="bg-ink/[0.03] p-5 md:p-8">
          <dl className="space-y-4">
            {s.side.map((item) => (
              <div key={item.label}>
                <dt className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{item.label}</dt>
                <dd className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em] text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
          {showLink && (
            <Link href="/see-it-first" className="mt-6 inline-block text-[15px] font-semibold text-teal underline underline-offset-4 hover:decoration-2">
              {s.linkLabel}
            </Link>
          )}
        </aside>
      </div>
    </figure>
  );
}
