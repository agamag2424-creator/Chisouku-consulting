import type { ReactNode } from "react";

/** Shared section heading + body stack used by the policy pages. */
export function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="t-h3 text-ink">{title}</h2>
      {children}
    </section>
  );
}

/** Bullet list matching the privacy-page style. An item may start with a bold lead. */
export function List({ items }: { items: readonly (string | { lead: string; text: string })[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={typeof item === "string" ? item : item.lead} className="t-body flex gap-3 text-ink">
          <span aria-hidden className="mt-[0.6em] size-2 shrink-0 rounded-full bg-teal" />
          {typeof item === "string" ? (
            item
          ) : (
            <span>
              <strong className="font-semibold">{item.lead}</strong> {item.text}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Body({ children }: { children: ReactNode }) {
  return <p className="t-body text-ink">{children}</p>;
}
