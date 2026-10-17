import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export type AccordionItem = {
  id: string;
  summary: ReactNode;
  content: ReactNode;
  defaultOpen?: boolean;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

/** Native <details>/<summary>: keyboard and screen-reader support without JavaScript. */
export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.id} id={item.id} open={item.defaultOpen} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <span>{item.summary}</span>
            <svg
              viewBox="0 0 16 16"
              className="size-4 shrink-0 text-muted motion-safe:transition-transform group-open:rotate-180"
              aria-hidden
              focusable="false"
            >
              <path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </summary>
          <div className="max-w-[70ch] pb-5 text-ink">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
