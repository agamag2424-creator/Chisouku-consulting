import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { EvidenceCell, type EvidenceState } from "../ui/EvidenceCell";
import { RagBadge } from "../ui/RagBadge";
import { Sheet } from "../ui/Sheet";
import { readiness5 } from "../hero/evidenceCheckData";

// Homepage section visuals (PRD 9.12). Static server components; wording in PRD 9.1 and 9.12.

const workstreams = [
  { name: "Testing", line: "Reports a pass rate." },
  { name: "Migration", line: "Reports a reconciliation." },
  { name: "Cutover", line: "Has a plan." },
  { name: "System integrator", line: "Has an opinion, and a milestone tied to the date." },
] as const;

/** Section 2: four workstreams, each Green, joined to a go-live decision nobody owns. */
export function WorkstreamMap() {
  const column = (items: readonly (typeof workstreams)[number][], side: "left" | "right") => (
    <ul className={cn("grid gap-5", side === "left" ? "min-[900px]:pr-12" : "min-[900px]:pl-12")}>
      {items.map((item) => (
        <li key={item.name}>
          <Sheet
            className={cn(
              "relative flex flex-col gap-2.5 p-5",
              "after:absolute after:top-1/2 after:hidden after:w-12 after:border-t-2 after:border-dashed after:border-line min-[900px]:after:block",
              side === "left" ? "after:-right-12" : "after:-left-12",
            )}
          >
            <span className="flex items-center justify-between gap-3">
              <h3 className="font-[family-name:var(--font-display)] text-[19px] font-bold text-ink">{item.name}</h3>
              <RagBadge status="green" />
            </span>
            <p className="t-small text-muted">{item.line}</p>
          </Sheet>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mt-14 grid items-center gap-6 min-[900px]:grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)] min-[900px]:gap-0">
      {column(workstreams.slice(0, 2), "left")}
      <div className="order-first mx-auto flex size-[180px] flex-col items-center justify-center gap-1.5 rounded-full border-2 border-dashed border-ink bg-paper text-center min-[900px]:order-none min-[900px]:size-[210px]">
        <span aria-hidden className="font-[family-name:var(--font-display)] text-[56px] font-extrabold leading-none text-teal">
          ?
        </span>
        <span className="t-small font-semibold text-ink">The go-live decision</span>
      </div>
      {column(workstreams.slice(2), "right")}
    </div>
  );
}

const questions: Record<(typeof readiness5)[number]["key"], string> = {
  S: "Is the status current?",
  O: "Is there a named owner?",
  E: "Is there evidence behind it?",
  D: "Is there a date?",
  A: "Is there an action if it slips?",
};

/** Section 3: the five READINESS-5 questions as tiles. */
export function ReadinessTiles() {
  return (
    <ol className="mt-12 grid gap-4 min-[641px]:grid-cols-3 min-[1100px]:grid-cols-5">
      {readiness5.map((element) => (
        <li key={element.key}>
          <Sheet className="flex h-full items-start gap-4 p-5 min-[641px]:min-h-[200px] min-[641px]:flex-col">
            <span
              aria-hidden
              className="w-11 shrink-0 font-[family-name:var(--font-display)] text-[44px] font-extrabold leading-[0.9] text-teal min-[641px]:text-[64px]"
            >
              {element.key}
            </span>
            <span>
              <span className="t-small block font-semibold text-ink">{element.name}</span>
              <span className="t-body mt-1 block text-ink">{questions[element.key]}</span>
            </span>
          </Sheet>
        </li>
      ))}
    </ol>
  );
}

/** Section 3: claims checked against each other; the middle link is the contradiction. */
export function CrossCheckStrip({ children, action }: { children: ReactNode; action: ReactNode }) {
  return (
    <div className="bg-ink mt-6 flex flex-col items-start gap-5 rounded-sheet p-6 text-paper min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-6">
      <span aria-hidden className="flex shrink-0 items-center">
        <span className="size-3.5 rounded-full bg-paper" />
        <span className="w-6 border-t-2 border-paper" />
        <span className="size-3.5 rounded-full bg-ev-miss" />
        <span className="w-6 border-t-2 border-dashed border-ev-miss" />
        <span className="size-3.5 rounded-full bg-ev-miss" />
        <span className="w-6 border-t-2 border-paper" />
        <span className="size-3.5 rounded-full bg-paper" />
      </span>
      <p className="t-body flex-1">{children}</p>
      {action}
    </div>
  );
}

const verdictIcons = {
  go: <path d="M4 11.5l4.5 4.5L18 6.5" />,
  conditional: <path d="M5 7h12M5 11h12M5 15h7" />,
  noGo: <path d="M6 6l10 10M16 6L6 16" />,
} as const;

/** Section 4: the three verdicts in the review's format. Blank lines stand for conditions, owners and dates. */
export function VerdictCards({ verdicts }: { verdicts: readonly { verdict: string; detail: string }[] }) {
  const styles = [
    { icon: verdictIcons.go, badge: "bg-ink text-paper", card: "", lines: 1 },
    { icon: verdictIcons.conditional, badge: "bg-teal text-paper", card: "border-2 border-teal", lines: 3 },
    { icon: verdictIcons.noGo, badge: "border-2 border-ink text-ink", card: "", lines: 2 },
  ];
  return (
    <ul className="mt-12 grid gap-5 min-[900px]:grid-cols-3">
      {verdicts.map(({ verdict, detail }, index) => {
        const style = styles[index];
        return (
          <li key={verdict}>
            <Sheet className={cn("flex h-full flex-col gap-4 p-7 min-[641px]:min-h-[300px]", style.card)}>
              <span className={cn("flex size-12 items-center justify-center rounded-full", style.badge)}>
                <svg
                  viewBox="0 0 22 22"
                  className="size-[22px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  focusable="false"
                >
                  {style.icon}
                </svg>
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-[30px] font-bold leading-tight text-ink">
                {verdict}
              </h3>
              <p className="t-body text-ink">{detail}</p>
              <span aria-hidden className="mt-auto flex flex-col gap-2 border-t border-faint pt-4">
                {Array.from({ length: style.lines }, (_, line) => (
                  <span key={line} className="grid grid-cols-[2fr_1fr_1fr] gap-2">
                    <span className={cn("h-2 rounded-full", index === 1 ? "bg-teal-tint" : "bg-faint")} />
                    <span className="h-2 rounded-full bg-faint" />
                    <span className="h-2 rounded-full bg-faint" />
                  </span>
                ))}
              </span>
            </Sheet>
          </li>
        );
      })}
    </ul>
  );
}

const packRows: readonly (readonly EvidenceState[])[] = [
  ["present", "present", "partial"],
  ["present", "missing", "missing"],
  ["partial", "missing", "missing"],
];

const page = "absolute flex h-[210px] w-[62%] flex-col gap-2 rounded-sheet border border-line bg-paper p-4 shadow-lg";

/** Section 6: a stack of decision-pack pages; shapes only, no text. */
export function PackIllustration() {
  return (
    <div aria-hidden className="relative mb-2 h-[240px]">
      <div className={cn(page, "left-[24%] top-5 rotate-[4deg]")}>
        <Bar className="w-1/2" />
        <Bar />
        <Bar className="w-3/4" />
      </div>
      <div className={cn(page, "left-[14%] top-2.5 -rotate-2")}>
        <Bar className="w-2/5" />
        <Bar />
      </div>
      <div className={cn(page, "left-[4%] top-0")}>
        <span className="h-2.5 w-[46%] rounded-full bg-ink" />
        <Bar className="w-[70%]" />
        <span className="mt-2 flex flex-col gap-2">
          {packRows.map((row, rowIndex) => (
            <span key={rowIndex} className="flex items-center gap-1.5">
              <Bar className="flex-1" />
              {row.map((state, cell) => (
                <EvidenceCell key={cell} state={state} label="" className="[&_svg]:size-3 [&>.sr-only]:hidden" />
              ))}
            </span>
          ))}
        </span>
        <span className="mt-auto h-5 w-3/5 rounded-sheet bg-teal-tint" />
      </div>
    </div>
  );
}

/** Section 6: a one-page readiness brief; shapes only, no text. */
export function BriefIllustration() {
  return (
    <div aria-hidden className="relative mb-2 h-[240px]">
      <div className={cn(page, "left-[18%] top-0 w-[64%]")}>
        <span className="h-2.5 w-[38%] rounded-full bg-teal" />
        <Bar />
        <Bar className="w-[85%]" />
        <Bar />
        <Bar className="w-3/5" />
        <span className="mt-2.5 grid grid-cols-3 gap-1.5">
          <span className="h-10 rounded-sheet bg-teal-tint" />
          <span className="h-10 rounded-sheet bg-faint" />
          <span className="h-10 rounded-sheet bg-faint" />
        </span>
      </div>
    </div>
  );
}

function Bar({ className }: { className?: string }) {
  return <span className={cn("block h-[7px] w-full rounded-full bg-faint", className)} />;
}

const independence = ["Implementation fees", "Software resold", "System integrator partnerships"] as const;

const dataLines = [
  {
    text: "Processed under a written data-handling policy",
    icon: (
      <>
        <rect x="4" y="9" width="14" height="10" rx="2" />
        <path d="M7 9V6.5a4 4 0 0 1 8 0V9" />
      </>
    ),
  },
  {
    text: "Never used to train models",
    icon: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="M5.5 16.5l11-11" />
      </>
    ),
  },
  {
    text: "Deleted at the end of the engagement unless you ask us to keep them",
    icon: <path d="M4 6h14M8 6V4h6v2M6 6l1 12h8l1-12" />,
  },
] as const;

/** Section 8: what we do not take, and how documents are handled. */
export function IndependencePanel() {
  return (
    <div className="flex flex-col gap-6">
      <ul className="grid gap-3 min-[641px]:grid-cols-3">
        {independence.map((item) => (
          <li key={item} className="flex flex-col gap-3 rounded-sheet bg-paper p-5">
            <span className="font-[family-name:var(--font-display)] text-[15px] font-extrabold tracking-[0.02em] text-teal">
              None
            </span>
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
  );
}

const principalChips = ["11+ years", "Aviation", "Banking", "Manufacturing", "Multi-country go-lives"] as const;

/** Section 9: a signature line, no name or photo (PRD L4). */
export function PrincipalSignature() {
  return (
    <span aria-hidden className="flex items-center gap-4">
      <span className="w-full max-w-[220px] border-t border-ink" />
      <span className="shrink-0 text-[13px] text-muted">Led and signed by a principal</span>
    </span>
  );
}

export function PrincipalChips() {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Experience">
      {principalChips.map((chip) => (
        <li key={chip} className="rounded-full border border-line bg-paper px-3.5 py-2 text-[14px] font-medium text-ink">
          {chip}
        </li>
      ))}
    </ul>
  );
}

const weeks = ["W-6", "W-5", "W-4", "W-3", "W-2", "W-1", "Go-live"] as const;

/** Section 10: six weeks to go-live; the first week is where the evidence work starts. */
export function WeekStrip() {
  return (
    <ol aria-hidden className="mt-12 grid grid-cols-4 gap-1.5 min-[641px]:grid-cols-7">
      {weeks.map((week, index) => (
        <li
          key={week}
          className={cn(
            "t-data flex h-[72px] items-end rounded-sheet p-2.5 text-[13px]",
            index === 0 ? "bg-teal text-paper" : index === weeks.length - 1 ? "bg-paper text-ink" : "bg-paper/10 text-paper/75",
          )}
        >
          {week}
        </li>
      ))}
    </ol>
  );
}
