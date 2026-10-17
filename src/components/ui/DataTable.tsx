import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export type DataTableColumn<Row> = {
  key: keyof Row & string;
  header: string;
  /** Mono, tabular, right-aligned. */
  numeric?: boolean;
  /** Render this column's cells as row headers (<th scope="row">). */
  rowHeader?: boolean;
  render?: (row: Row) => ReactNode;
};

type DataTableProps<Row> = {
  /** Used for the caption id, which labels the scroll region. */
  id: string;
  caption: string;
  captionHidden?: boolean;
  columns: DataTableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => string;
  /** Below this width the table scrolls inside its container instead of the page. */
  minWidth?: number;
  className?: string;
};

/**
 * Semantic table. On narrow screens it scrolls horizontally inside a focusable region.
 * `relative` keeps absolutely positioned screen-reader text inside the scroll box.
 */
export function DataTable<Row extends Record<string, ReactNode>>({
  id,
  caption,
  captionHidden = false,
  columns,
  rows,
  getRowKey,
  minWidth,
  className,
}: DataTableProps<Row>) {
  const captionId = `${id}-caption`;
  return (
    <div
      role="region"
      aria-labelledby={captionId}
      tabIndex={0}
      className={cn("relative max-w-full overflow-x-auto rounded-sheet border border-line bg-paper", className)}
    >
      <table id={id} className="w-full border-collapse text-left" style={minWidth ? { minWidth } : undefined}>
        <caption
          id={captionId}
          className={captionHidden ? "sr-only" : "caption-top px-4 pt-3 pb-2 text-left t-small text-muted"}
        >
          {caption}
        </caption>
        <thead>
          <tr className="border-y border-line bg-faint">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "t-small px-4 py-3 font-semibold text-ink",
                  column.numeric && "text-right",
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={getRowKey(row, index)} className="border-b border-line last:border-b-0">
              {columns.map((column) => {
                const content = column.render ? column.render(row) : row[column.key];
                const classes = cn(
                  "px-4 py-3 align-top text-ink",
                  column.numeric ? "t-data whitespace-nowrap text-right" : "t-small",
                  column.rowHeader && "font-medium",
                );
                return column.rowHeader ? (
                  <th key={column.key} scope="row" className={classes}>
                    {content}
                  </th>
                ) : (
                  <td key={column.key} className={classes}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
