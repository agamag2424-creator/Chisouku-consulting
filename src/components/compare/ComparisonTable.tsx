import { comparisonColumns, comparisonFootnote, comparisonRows } from "../../content/comparison";
import { cn } from "../../lib/utils";

type ComparisonTableProps = {
  /** Show only the first n rows (the homepage shows 4). */
  rows?: number;
  id?: string;
  className?: string;
};

const ours = comparisonColumns.length - 1;

/**
 * PRD 9.8 as a semantic table. Scrolls inside its own box on narrow screens with the first column pinned;
 * the ChisokuLabs column is marked by a teal top rule, not a fill.
 */
export function ComparisonTable({ rows = comparisonRows.length, id = "comparison", className }: ComparisonTableProps) {
  const captionId = `${id}-caption`;
  return (
    <figure className={cn("flex min-w-0 flex-col gap-3", className)}>
      <div
        role="region"
        aria-labelledby={captionId}
        tabIndex={0}
        className="relative max-w-full overflow-x-auto rounded-sheet border border-line bg-paper"
      >
        <table id={id} className="w-full min-w-[760px] border-collapse text-left max-[640px]:min-w-[680px]">
          <caption id={captionId} className="sr-only">
            How ChisokuLabs compares with the usual go-live assurance options
          </caption>
          <thead>
            <tr className="border-b border-line">
              <td className="sticky left-0 z-10 w-[24%] bg-paper max-[640px]:w-[8.5rem]" aria-hidden />
              {comparisonColumns.map((column, index) => (
                <th
                  key={column}
                  scope="col"
                  className={cn(
                    "t-small px-4 pb-3 pt-4 align-bottom font-semibold text-ink",
                    index === ours && "border-t-[3px] border-teal",
                  )}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.slice(0, rows).map((row) => (
              <tr key={row.criterion} className="border-b border-line last:border-b-0">
                <th
                  scope="row"
                  className="t-small sticky left-0 z-10 border-r border-line bg-paper px-4 py-3.5 align-top font-semibold text-ink max-[640px]:px-3"
                >
                  {row.criterion}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={comparisonColumns[index]}
                    className={cn("t-small px-4 py-3.5 align-top", index === ours ? "font-semibold text-ink" : "text-muted")}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="text-[13px] text-muted">{comparisonFootnote}</figcaption>
    </figure>
  );
}
