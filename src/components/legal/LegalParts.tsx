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

/** Bullet list matching the privacy-page style. */
export function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="t-body flex gap-3 text-ink">
          <span aria-hidden className="mt-[0.6em] size-2 shrink-0 rounded-full bg-teal" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Body({ children }: { children: ReactNode }) {
  return <p className="t-body text-ink">{children}</p>;
}
