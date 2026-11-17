"use client";

import * as React from "react";
import Link from "next/link";
import { ctas, primaryCtaHref } from "../../content/offer";
import {
  dimensions,
  doesNotMean,
  levels,
  notSureLabel,
  questions,
  sameScorecardLine,
  selfCheckFooter,
  type Question,
} from "../../content/pmoSelfCheck";
import { formatScore, scoreSelfCheck, type Answer, type Answers } from "../../lib/pmoScoring";
import { track } from "../../lib/track";
import { cn } from "../../lib/utils";
import { DimensionOrbit } from "../diagrams/DimensionOrbit";
import { Button } from "../ui/Button";

type Stage = { kind: "intro" } | { kind: "step"; index: number } | { kind: "result" };

/**
 * The PMO self-check (September port PRD, Epic 5). One dimension per step, ten steps. Answers live in this
 * component's state only: nothing is stored or sent. The only analytics event is `self_check_complete` with the band.
 */
export function PmoSelfCheck() {
  const [stage, setStage] = React.useState<Stage>({ kind: "intro" });
  const [answers, setAnswers] = React.useState<Answers>({});
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const reported = React.useRef(false);

  React.useEffect(() => {
    if (stage.kind !== "intro") headingRef.current?.focus();
  }, [stage]);

  const result = React.useMemo(() => scoreSelfCheck(answers), [answers]);

  React.useEffect(() => {
    if (stage.kind === "result" && !reported.current && result.band) {
      reported.current = true;
      track("self_check_complete", { band: result.band.id });
    }
  }, [stage, result.band]);

  if (stage.kind === "intro") {
    return (
      <div className="max-w-[68ch]">
        <p className="t-body text-muted">
          Fifteen questions across the ten dimensions of the PMO Health Scorecard. About five minutes. Answer for what
          happens in practice today, not what the policy says. Choose &ldquo;{notSureLabel}&rdquo; when you do not know.
        </p>
        <p className="t-small mt-4 text-muted">Your answers stay in your browser. Nothing you choose is stored or sent.</p>
        <div className="mt-8">
          <Button size="lg" onClick={() => setStage({ kind: "step", index: 0 })}>
            Start the self-check
          </Button>
        </div>
      </div>
    );
  }

  if (stage.kind === "step") {
    const dimension = dimensions[stage.index];
    const stepQuestions = questions.filter((q) => q.dimension === dimension.id);
    const complete = stepQuestions.every((q) => answers[q.id] !== undefined);
    const last = stage.index === dimensions.length - 1;
    return (
      <form
        className="max-w-[860px]"
        onSubmit={(event) => {
          event.preventDefault();
          if (!complete) return;
          setStage(last ? { kind: "result" } : { kind: "step", index: stage.index + 1 });
        }}
        data-step={dimension.id}
      >
        <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-teal">
          Dimension {stage.index + 1} of {dimensions.length}
        </p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/10" aria-hidden>
          <div className="h-full bg-cyan transition-all" style={{ width: `${((stage.index + 1) / dimensions.length) * 100}%` }} />
        </div>
        <h2 ref={headingRef} tabIndex={-1} className="t-h2 mt-6 text-ink outline-none">
          {dimension.name}
        </h2>
        <div className="mt-8 space-y-10">
          {stepQuestions.map((q) => (
            <QuestionField
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={(value) => setAnswers((a) => ({ ...a, [q.id]: value }))}
            />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => setStage(stage.index === 0 ? { kind: "intro" } : { kind: "step", index: stage.index - 1 })}
          >
            Back
          </Button>
          <Button type="submit" disabled={!complete}>
            {last ? "See my result" : "Next"}
          </Button>
          {!complete && <p className="t-small text-muted">Choose an answer for each question to continue.</p>}
        </div>
      </form>
    );
  }

  return (
    <Result
      headingRef={headingRef}
      result={result}
      onRestart={() => {
        setAnswers({});
        reported.current = false;
        setStage({ kind: "intro" });
      }}
      onBack={() => setStage({ kind: "step", index: dimensions.length - 1 })}
    />
  );
}

function QuestionField({ question, value, onChange }: { question: Question; value: Answer | undefined; onChange: (value: Answer) => void }) {
  const name = `answer-${question.id}`;
  const options: { value: Answer; label: string; text?: string }[] = [
    ...question.options.map((text, i) => ({ value: (i + 1) as Answer, label: levels[i], text })),
    { value: "unsure", label: notSureLabel },
  ];
  return (
    <fieldset data-question={question.id}>
      <legend className="t-h3 text-ink">{question.text}</legend>
      <div className="mt-4 grid gap-2">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={String(option.value)}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-control border p-3.5 transition-colors",
                checked ? "border-ink bg-ink/[0.04]" : "border-ink/15 bg-paper hover:border-ink/40",
              )}
            >
              <input
                type="radio"
                name={name}
                className="mt-1 size-4 shrink-0 accent-[var(--color-ink)]"
                checked={checked}
                onChange={() => onChange(option.value)}
                aria-label={option.text ? `${option.label}: ${option.text}` : option.label}
              />
              <span className="text-[16px] leading-[1.5]">
                <span className="font-semibold text-ink">{option.label}</span>
                {option.text && <span className="text-muted">. {option.text}</span>}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Result({
  headingRef,
  result,
  onRestart,
  onBack,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  result: ReturnType<typeof scoreSelfCheck>;
  onRestart: () => void;
  onBack: () => void;
}) {
  if (!result.band || result.overall === null) {
    return (
      <div className="max-w-[68ch]">
        <h2 ref={headingRef} tabIndex={-1} className="t-h2 text-ink outline-none">
          Not enough answers to score
        </h2>
        <p className="t-body mt-4 text-muted">
          Every answer was &ldquo;{notSureLabel}&rdquo;, so there is nothing to score. That is itself a finding: it is hard to
          see how the PMO runs. Answer at least one question per dimension you know, or book a call.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={onBack}>
            Back to the questions
          </Button>
          <Button href={primaryCtaHref("self_check_result")} ctaId="book_call" target="_blank" rel="noopener noreferrer">
            {ctas.primaryLabel}
          </Button>
        </div>
      </div>
    );
  }
  const band = result.band;
  const flaggedNames = result.dimensions.filter((d) => d.flagged).map((d) => d.name);
  return (
    <div data-result-band={band.id}>
      <p className="eyebrow">Your result</p>
      <h2 ref={headingRef} tabIndex={-1} className="t-h1 text-ink outline-none">
        {band.name}
      </h2>
      <p className="mt-2 font-[family-name:var(--font-mono)] text-[14px] font-bold text-muted">
        Overall {formatScore(result.overall)} out of 5 · band {band.range}
      </p>
      {result.provisional && (
        <p className="mt-5 max-w-[68ch] rounded-control border border-ev-part/40 bg-ev-part-tint p-4 text-[16px] text-ink" data-provisional>
          Provisional: {result.unsure.length} of {questions.length} answers were &ldquo;{notSureLabel}&rdquo;. The result
          rests on fewer answers than it should, and low visibility is itself worth looking at.
        </p>
      )}

      <div className="mt-8 grid gap-8 min-[1000px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="space-y-6">
          <section aria-labelledby="meaning-h">
            <h3 id="meaning-h" className="t-h3 text-ink">What this means</h3>
            <p className="t-body mt-2 text-ink">{band.meaning}</p>
          </section>
          <section aria-labelledby="not-mean-h">
            <h3 id="not-mean-h" className="t-h3 text-ink">What it does not mean</h3>
            <p className="t-body mt-2 text-muted">{doesNotMean}</p>
          </section>
          <section aria-labelledby="flagged-h">
            <h3 id="flagged-h" className="t-h3 text-ink">Flagged dimensions</h3>
            <p className="t-body mt-2 text-ink" data-flagged>
              {flaggedNames.length
                ? `${flaggedNames.join(", ")}: scored 2.0 or below. A single weak area can hold a PMO back even when the average looks fine.`
                : "None. No dimension scored 2.0 or below."}
            </p>
          </section>
          <section aria-labelledby="next-h" className="panel p-5">
            <h3 id="next-h" className="t-h3 text-ink">What the PMO Health Check would examine next</h3>
            <p className="t-body mt-2 text-ink">{band.examineNext}</p>
            <p className="t-small mt-3 text-muted">{sameScorecardLine}</p>
          </section>
        </div>
        <DimensionOrbit flagged={result.flagged} centreTitle={band.name} stacked className="self-start" />
      </div>

      <section aria-labelledby="scores-h" className="mt-10">
        <h3 id="scores-h" className="t-h3 text-ink">Your scores by dimension</h3>
        <table className="mt-4 w-full max-w-[720px] border-collapse text-left text-[16px]">
          <thead>
            <tr className="border-b border-ink/20 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-muted">
              <th scope="col" className="py-2 pr-4 font-bold">Dimension</th>
              <th scope="col" className="py-2 font-bold">Score</th>
            </tr>
          </thead>
          <tbody>
            {result.dimensions.map((d) => (
              <tr key={d.id} className="border-b border-ink/10" data-dimension={d.id}>
                <th scope="row" className="py-2.5 pr-4 font-normal text-ink">
                  {d.name}
                </th>
                <td className={cn("py-2.5 font-[family-name:var(--font-mono)] font-bold", d.flagged ? "text-ev-miss" : "text-ink")}>
                  {formatScore(d.score)}
                  {d.flagged && <span className="ml-2 font-[family-name:var(--font-body)] text-[14px] font-semibold">flagged</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {result.unsure.length > 0 && (
          <p className="t-small mt-3 text-muted">
            Answered &ldquo;{notSureLabel}&rdquo;: {result.unsure.join(", ")}. These are left out of the scores.
          </p>
        )}
      </section>

      <div className="no-print mt-10 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
        <Button href={primaryCtaHref("self_check_result")} size="lg" ctaId="book_call" target="_blank" rel="noopener noreferrer">
          {ctas.primaryLabel}
        </Button>
        <Button href="/pmo-health-check" variant="secondary" size="lg">
          About the PMO Health Check
        </Button>
        <Button variant="secondary" size="lg" onClick={() => window.print()}>
          Print or save as PDF
        </Button>
        <Button variant="text" onClick={onRestart}>
          Start again
        </Button>
      </div>

      <p className="t-small mt-10 max-w-[68ch] border-t border-ink/10 pt-5 text-muted">
        {selfCheckFooter}{" "}
        <Link href="/pmo-self-check/methodology" className="text-teal underline underline-offset-4">
          Methodology note
        </Link>
      </p>
    </div>
  );
}
