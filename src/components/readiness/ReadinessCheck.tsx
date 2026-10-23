"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import {
  answerOptions,
  areaLine,
  areaProgress,
  areas,
  bandOrder,
  bands,
  bookButton,
  briefButton,
  controls,
  helperLine,
  intro,
  jargon,
  progressLabel,
  questions,
  scoreLine,
  scoreOfTwo,
  scorePrefix,
  scoreSuffix,
  selfAssessment,
  smallPrint,
  startButton,
  subtitle,
  supportingLine,
  title,
  weakestAreaLine,
  type FlatQuestion,
} from "../../content/readiness";
import { calendlyLink } from "../../lib/siteConfig";
import {
  formatScore,
  NO_WEAKEST_AREA,
  scoreAnswers,
  type BandId,
  type Choice,
  type ReadinessScore,
} from "../../lib/readinessScore";
import { postReadinessCompletion } from "../../lib/readinessCompletion";
import { track } from "../../lib/track";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { Sheet } from "../ui/Sheet";

const briefHref = "/contact?request=brief";
const mobileQuery = "(max-width: 767px)";

type Phase = "intro" | "questions" | "results";
type Answers = (Choice | null)[];

function subscribeToMobile(onStoreChange: () => void) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function mobileNow() {
  return window.matchMedia(mobileQuery).matches;
}

/** First paint is one question per screen, which is what a phone must show. Desktop widens after hydration. */
function mobileOnServer() {
  return true;
}

function useNarrowStep() {
  return useSyncExternalStore(subscribeToMobile, mobileNow, mobileOnServer);
}

function bandTone(band: BandId): { dot: string; fill: string; tint: string } {
  switch (band) {
    case "not_ready":
      return { dot: "bg-ev-miss", fill: "bg-ev-miss", tint: "bg-ev-miss-tint" };
    case "partly_ready":
      return { dot: "bg-ev-part", fill: "bg-ev-part", tint: "bg-ev-part-tint" };
    case "ready":
      return { dot: "bg-ev-ok", fill: "bg-ev-ok", tint: "bg-ev-ok-tint" };
    default: {
      const exhaustive: never = band;
      return exhaustive;
    }
  }
}

function answeredInArea(areaIndex: number, answers: Answers): number {
  const start = areaIndex * 2;
  return [answers[start], answers[start + 1]].filter((answer) => answer !== null).length;
}

function asChoices(answers: Answers): Choice[] | null {
  if (answers.some((answer) => answer === null)) return null;
  return answers as Choice[];
}

function blankAnswers(): Answers {
  return Array.from({ length: questions.length }, () => null);
}

export function ReadinessCheck() {
  const narrow = useNarrowStep();
  const stepSize = narrow ? 1 : 2;
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Answers>(blankAnswers);
  const [cursor, setCursor] = useState(0);
  const introHeadingRef = useRef<HTMLHeadingElement>(null);
  const progressHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef<{ phase: Phase; cursor: number } | null>(null);

  const stepStart = narrow ? cursor : Math.floor(cursor / 2) * 2;
  const visible = questions.slice(stepStart, stepStart + stepSize);
  const canProceed = visible.every((question) => answers[question.number - 1] !== null);

  useEffect(() => {
    const prior = previousStep.current;
    previousStep.current = { phase, cursor };
    if (!prior || (prior.phase === phase && prior.cursor === cursor)) return;
    const heading =
      phase === "intro" ? introHeadingRef.current : phase === "questions" ? progressHeadingRef.current : resultHeadingRef.current;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    heading?.focus({ preventScroll: true });
  }, [phase, cursor]);

  function start() {
    track("readiness_start");
    setCursor(0);
    setPhase("questions");
  }

  function goBack() {
    if (stepStart === 0) {
      setPhase("intro");
      return;
    }
    setCursor(stepStart - stepSize);
  }

  function goNext() {
    if (!canProceed) return;
    const nextStart = stepStart + stepSize;
    if (nextStart < questions.length) {
      setCursor(nextStart);
      return;
    }
    const choices = asChoices(answers);
    if (!choices) return;
    const scored = scoreAnswers(choices);
    const weakest =
      scored.weakestAreaIndex === null ? NO_WEAKEST_AREA : areas[scored.weakestAreaIndex].name;
    track("readiness_complete", { band: bands[scored.band].label, weakest_area: weakest });
    postReadinessCompletion(scored.band);
    setPhase("results");
  }

  function choose(index: number, choice: Choice) {
    setAnswers((current) => {
      const next = current.slice();
      next[index] = choice;
      return next;
    });
  }

  function startAgain() {
    setAnswers(blankAnswers());
    setCursor(0);
    setPhase("intro");
  }

  if (phase === "intro") {
    return <Intro headingRef={introHeadingRef} onStart={start} />;
  }

  if (phase === "questions") {
    return (
      <Questions
        answers={answers}
        canProceed={canProceed}
        headingRef={progressHeadingRef}
        visible={visible}
        onBack={goBack}
        onChoose={choose}
        onNext={goNext}
      />
    );
  }

  if (phase === "results") {
    const choices = asChoices(answers);
    if (!choices) return null;
    return <Results headingRef={resultHeadingRef} result={scoreAnswers(choices)} onStartAgain={startAgain} />;
  }

  const exhaustive: never = phase;
  return exhaustive;
}

function Intro({ headingRef, onStart }: { headingRef: RefObject<HTMLHeadingElement | null>; onStart: () => void }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
      <div>
        <h1 ref={headingRef} tabIndex={-1} id="readiness-title" className="t-h1 text-balance text-ink">
          {title}
        </h1>
        <p className="t-body mt-5 font-semibold text-ink">{subtitle}</p>
        <p className="t-body mt-4 text-muted">{intro}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {areas.map((area, index) => (
            <li
              key={area.id}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 t-small text-ink"
            >
              <span className="font-semibold text-teal">{index + 1}</span>
              {area.name}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button size="lg" onClick={onStart}>
            {startButton}
          </Button>
        </div>
      </div>
      <Sheet className="p-6">
        <BandKey />
      </Sheet>
    </div>
  );
}

function BandKey() {
  return (
    <ul className="flex flex-col gap-3">
      {bandOrder.map((id) => (
        <li key={id} className="flex items-center gap-2 t-small text-ink">
          <span aria-hidden className={cn("size-2 shrink-0 rounded-full", bandTone(id).dot)} />
          <span className="font-semibold">{bands[id].label}</span>
          <span className="text-muted">{bands[id].range}</span>
        </li>
      ))}
    </ul>
  );
}

function Questions({
  answers,
  canProceed,
  headingRef,
  visible,
  onBack,
  onChoose,
  onNext,
}: {
  answers: Answers;
  canProceed: boolean;
  headingRef: RefObject<HTMLHeadingElement | null>;
  visible: readonly FlatQuestion[];
  onBack: () => void;
  onChoose: (index: number, choice: Choice) => void;
  onNext: () => void;
}) {
  const first = visible[0];
  const area = areas[first.areaIndex];

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-x-12 md:gap-y-4">
        <div>
          <div className="flex items-center justify-between gap-4 md:flex-col md:items-stretch">
            <Button variant="text" className="min-h-11 self-start px-1" onClick={onBack}>
              {controls.back}
            </Button>
            <h1
              ref={headingRef}
              tabIndex={-1}
              id="readiness-progress"
              className="t-small font-semibold text-teal"
            >
              {progressLabel(first.number)}
            </h1>
          </div>
          <ProgressBar questionNumber={first.number} className="mt-4" />
          <ol className="mt-6 hidden flex-col gap-3 md:flex">
            {areas.map((item, index) => {
              const current = index === first.areaIndex;
              return (
                <li
                  key={item.id}
                  aria-current={current ? "step" : undefined}
                  className="flex items-start justify-between gap-3"
                >
                  <span className="flex min-w-0 items-start gap-2">
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full t-small font-semibold",
                        current ? "bg-teal text-paper" : "border border-line text-muted",
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className={cn("t-small", current ? "font-semibold text-ink" : "text-muted")}>{item.name}</span>
                  </span>
                  <span className="t-small shrink-0 tabular-nums text-muted">{areaProgress(answeredInArea(index, answers))}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex flex-col gap-8 md:min-h-[36rem]">
          <p className="t-small font-semibold text-teal">{area.name}</p>
          {visible.map((question, index) => (
            <QuestionField
              key={question.id}
              question={question}
              selected={answers[question.number - 1]}
              showProgress={index > 0}
              onSelect={(choice) => onChoose(question.number - 1, choice)}
            />
          ))}
          <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-page px-[var(--content-padding-x-mobile)] py-3 md:static md:z-auto md:mt-auto md:border-0 md:bg-transparent md:px-0 md:py-0">
            <div className="md:flex md:justify-end">
              <Button size="lg" className="w-full md:w-auto" disabled={!canProceed} onClick={onNext}>
                {controls.next}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Clears the fixed Next bar on small screens. The bar is in normal flow from 768px. */}
      <div className="h-16 md:hidden" aria-hidden />
    </div>
  );
}

function ProgressBar({ questionNumber, className }: { questionNumber: number; className?: string }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={12}
      aria-valuenow={questionNumber}
      aria-valuetext={progressLabel(questionNumber)}
      className={cn("h-1.5 overflow-hidden rounded-full bg-line", className)}
    >
      <div className="h-full rounded-full bg-teal" style={{ width: `${(questionNumber / 12) * 100}%` }} />
    </div>
  );
}

function QuestionField({
  question,
  selected,
  showProgress,
  onSelect,
}: {
  question: FlatQuestion;
  selected: Choice | null;
  showProgress: boolean;
  onSelect: (choice: Choice) => void;
}) {
  const hintId = `${question.id}-hint`;
  const helpId = `${question.id}-help`;
  const jargonId = `${question.id}-jargon`;
  const describedBy = [hintId, helpId, question.jargon.length > 0 ? jargonId : null].filter(Boolean).join(" ");

  return (
    <div className="flex flex-col gap-3">
      {showProgress ? <p className="t-small font-semibold text-teal">{progressLabel(question.number)}</p> : null}
      <fieldset aria-describedby={describedBy} className="flex min-w-0 flex-col gap-4">
        <legend className="w-full p-0 text-left t-h2 text-balance text-ink">{question.text}</legend>
        <p id={hintId} className="t-small text-muted">
          {helperLine}
        </p>
        <div className="flex flex-col gap-3">
          {answerOptions.map((option) => {
            const id = `${question.id}-${option.choice}`;
            return (
              <label
                key={option.choice}
                htmlFor={id}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-control border border-line bg-paper px-4 py-3 has-[:checked]:border-teal has-[:checked]:bg-teal-tint has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal"
              >
                <input
                  id={id}
                  type="radio"
                  name={question.id}
                  value={option.choice}
                  checked={selected === option.choice}
                  onChange={() => onSelect(option.choice)}
                  className="size-5 shrink-0 accent-teal"
                />
                <span className="font-semibold text-ink">{option.label}</span>
              </label>
            );
          })}
        </div>
        <p id={helpId} className="t-small text-muted">
          {answerOptions.map((option, index) => (
            <span key={option.choice}>
              {index > 0 ? " " : null}
              <span className="font-semibold text-ink">{option.label}:</span> {option.help}
            </span>
          ))}
        </p>
        {question.jargon.length > 0 ? (
          <ul id={jargonId} className="flex flex-col gap-1">
            {question.jargon.map((id) => (
              <li key={id} className="t-small text-muted">
                <span className="font-semibold text-ink">{jargon[id].term}:</span> {jargon[id].hint}
              </li>
            ))}
          </ul>
        ) : null}
      </fieldset>
    </div>
  );
}

function Results({
  headingRef,
  result,
  onStartAgain,
}: {
  headingRef: RefObject<HTMLHeadingElement | null>;
  result: ReadinessScore;
  onStartAgain: () => void;
}) {
  const band = bands[result.band];
  const tone = bandTone(result.band);
  const totalLabel = formatScore(result.total);
  const weakest = result.weakestAreaIndex === null ? null : areas[result.weakestAreaIndex];

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
      <Sheet className="p-6 min-[641px]:p-8">
        <h1 ref={headingRef} tabIndex={-1} id="readiness-result" className="text-ink">
          <span className="t-small font-semibold text-muted">{scorePrefix}</span>{" "}
          <span className="t-display mt-2 block">
            {totalLabel} <span className="t-h3">{scoreSuffix}</span>
          </span>
        </h1>
        <p className="mt-4">
          <span className={cn("inline-flex items-center gap-1.5 rounded-control px-2.5 py-1 t-small font-semibold text-ink", tone.tint)}>
            <span aria-hidden className={cn("size-2 rounded-full", tone.dot)} />
            {band.label}
          </span>
        </p>
        <p className="t-body mt-4 text-ink">{band.text}</p>
        <p className="mt-4 font-semibold text-ink">{selfAssessment}</p>
        <BandMeter result={result} />
        <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-4">
          {areas.map((area, index) => (
            <li
              key={area.id}
              className={cn("t-small text-ink", index === result.weakestAreaIndex && "font-semibold")}
            >
              {areaLine(area.name, formatScore(result.areaScores[index]))}
            </li>
          ))}
        </ul>
      </Sheet>

      <div className="flex flex-col gap-6">
        {weakest && result.weakestAreaIndex !== null ? (
          <Sheet className="p-6 min-[641px]:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="t-h3 text-ink">{weakestAreaLine(weakest.name)}</h2>
              <p className="t-small font-semibold text-ink">
                {scoreOfTwo(formatScore(result.areaScores[result.weakestAreaIndex]))}
              </p>
            </div>
            <p className="t-body mt-3 text-ink">{weakest.nextStep}</p>
          </Sheet>
        ) : null}
        <p className="t-small text-muted">{smallPrint}</p>
        <div className="flex flex-col gap-4">
          <p className="t-body text-ink">{supportingLine}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              href={calendlyLink("readiness_result")}
              ctaId="book_call"
              size="lg"
              className="w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookButton}
            </Button>
            <Button href={briefHref} ctaId="readiness_brief" variant="secondary" size="lg" className="w-full sm:w-auto">
              {briefButton}
            </Button>
          </div>
          <Button variant="text" className="min-h-11 self-start px-1" onClick={onStartAgain}>
            {controls.startAgain}
          </Button>
        </div>
      </div>
    </div>
  );
}

function BandMeter({ result }: { result: ReadinessScore }) {
  const percent = (result.total / 12) * 100;
  return (
    <div
      className="mt-6"
      role="meter"
      aria-valuemin={0}
      aria-valuemax={12}
      aria-valuenow={result.total}
      aria-valuetext={`${scoreLine(formatScore(result.total))}, ${bands[result.band].label}`}
    >
      <div className="relative h-2 rounded-full bg-faint">
        <div
          className={cn("absolute inset-y-0 left-0 rounded-full", bandTone(result.band).fill)}
          style={{ width: `${percent}%` }}
        />
        <span
          aria-hidden
          className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-paper bg-ink"
          style={{ left: `clamp(0px, calc(${percent}% - 6px), calc(100% - 12px))` }}
        />
      </div>
      <ol className="mt-3 grid grid-cols-3 gap-2">
        {bandOrder.map((id, index) => (
          <li key={id} className={cn("min-w-0 t-small text-ink", index === 1 && "text-center", index === 2 && "text-right")}>
            <span aria-hidden className={cn("mr-1 inline-block size-2 rounded-full align-middle", bandTone(id).dot)} />
            <span className="font-semibold">{bands[id].label}</span>
            <span className="mt-0.5 block text-muted">{bands[id].range}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
