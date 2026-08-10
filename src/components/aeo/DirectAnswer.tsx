import Link from "next/link";

type DirectAnswerProps = {
  eyebrow?: string;
  answer: string;
  bullets: readonly string[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryExternal?: boolean;
};

/** Visible quotable strip for AEO — one declarative sentence + bullets + CTA. */
export function DirectAnswer({
  eyebrow = "Direct answer",
  answer,
  bullets,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  secondaryExternal = false,
}: DirectAnswerProps) {
  return (
    <aside className="artifact-sheet paper-grain mt-10 p-6 md:p-7" aria-label={eyebrow}>
      <p className="kicker-title">{eyebrow}</p>
      <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--color-ink)] md:text-lg">
        {answer}
      </p>
      <ul className="mt-5 space-y-2">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-3 text-sm leading-relaxed text-[var(--color-muted)]"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]"
              aria-hidden
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {primaryHref.startsWith("http") ? (
          <a
            href={primaryHref}
            className="button button-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {primaryLabel}
          </a>
        ) : (
          <Link href={primaryHref} className="button button-primary">
            {primaryLabel}
          </Link>
        )}
        {secondaryHref && secondaryLabel ? (
          secondaryExternal || secondaryHref.startsWith("http") ? (
            <a
              href={secondaryHref}
              className="button button-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {secondaryLabel}
            </a>
          ) : (
            <Link href={secondaryHref} className="button button-secondary">
              {secondaryLabel}
            </Link>
          )
        ) : null}
      </div>
    </aside>
  );
}
