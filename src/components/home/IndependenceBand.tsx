import Link from "next/link";

// "No stake in your delivery" (restored from the pre-September site, 18 Nov 2026). Wording matches About and the
// independence and data page: no implementation fees, no software resale, no referral fees; evidence under NDA,
// never used to train AI models, deleted within 30 days of the final readout unless the client asks us to keep it.

const none = ["Implementation fees", "Software resale", "Referral fees"] as const;

const dataLines = [
  {
    text: "Shared under NDA and a written data-handling policy",
    icon: (
      <>
        <rect x="4" y="9" width="14" height="10" rx="2" />
        <path d="M7 9V6.5a4 4 0 0 1 8 0V9" />
      </>
    ),
  },
  {
    text: "Never used to train AI models",
    icon: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="M5.5 16.5l11-11" />
      </>
    ),
  },
  {
    text: "Deleted within 30 days of the final readout unless you ask us to keep it",
    icon: <path d="M4 6h14M8 6V4h6v2M6 6l1 12h8l1-12" />,
  },
] as const;

export function IndependenceBand() {
  return (
    <div className="grid gap-10 min-[1100px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] min-[1100px]:gap-16">
      <div>
        <h2 id="independence-h" className="t-h2 text-ink">
          No stake in your delivery
        </h2>
        <p className="t-body mt-5 text-ink">
          We take no implementation fees, resell no software and take no referral fees, so the findings have no reason to
          lean either way. Your documents are handled under a written policy and deleted after the readout.
        </p>
        <p className="mt-6">
          <Link
            href="/independence-and-data"
            className="text-[16px] font-semibold text-teal underline underline-offset-4 hover:decoration-2"
          >
            Independence and data handling
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <ul className="grid gap-3 min-[641px]:grid-cols-3">
          {none.map((item) => (
            <li key={item} className="flex flex-col gap-2 rounded-[4px] border border-line bg-paper p-5">
              <span className="text-[14px] font-bold text-teal">None</span>
              <span className="t-small font-semibold text-ink">{item}</span>
            </li>
          ))}
        </ul>
        <ul className="border-b border-teal/25">
          {dataLines.map((line) => (
            <li key={line.text} className="flex items-start gap-3.5 border-t border-teal/25 py-4">
              <svg
                viewBox="0 0 22 22"
                className="size-[22px] shrink-0 text-teal"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
                aria-hidden
                focusable="false"
              >
                {line.icon}
              </svg>
              <span className="t-small text-ink">{line.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
