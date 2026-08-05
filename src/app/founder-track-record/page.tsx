import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Founder Track Record",
  description:
    "Agam Agrawwal — PMO, programme, and delivery track record behind ChisokuLabs.",
  alternates: { canonical: "/founder-track-record" },
};

const proof = [
  ["11+ years", "PMO, programme, and delivery leadership"],
  ["40+ FTE", "Concurrent workstream exposure"],
  ["UK fintech PMO", "Regulated financial services context"],
  ["7 countries", "Multi-market programme coordination"],
];

const achievements = [
  {
    title: "Central PMO, UK fintech",
    detail:
      "Built and led a Central PMO in a regulated financial services environment — delivery teams, client PM liaison, and operating cadence.",
  },
  {
    title: "108% programme growth",
    detail:
      "Owned delivery across three concurrent workstreams with 40+ FTE exposure on a large aviation programme.",
  },
  {
    title: "On-time: 63% → 92%",
    detail:
      "Tightened estimation, milestone tracking, and day-to-day delivery focus across engineering and QA.",
  },
  {
    title: "7-country delivery",
    detail:
      "Kept plans, estimates, and stakeholder expectations aligned across a multi-country software programme.",
  },
  {
    title: "Zero Sev-1 at go-live",
    detail:
      "Delivered a mission-critical airport platform with disciplined scope and schedule control through launch.",
  },
  {
    title: "Asia Pacific coordination",
    detail:
      "Managed delivery scope and stakeholder engagement across Asian markets with sharper on-time performance.",
  },
];

export default function FounderTrackRecordPage() {
  return (
    <>
      <section className="section report-cover pt-16">
        <div className="container grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <figure className="relative">
            <div className="absolute -left-5 -top-5 hidden h-full w-full border border-[rgba(17,24,32,0.16)] md:block" />
            <div className="relative overflow-hidden shadow-[0_34px_90px_rgba(17,24,32,0.18)]">
              <Image
                src="/images/founder-agam.png"
                alt="Agam Agrawwal"
                width={1254}
                height={1254}
                className="aspect-[4/5] w-full max-h-[680px] object-cover object-[50%_18%]"
                priority
              />
            </div>
          </figure>
          <div>
            <p className="eyebrow">Founder</p>
            <h1 className="display">Agam Agrawwal</h1>
            <p className="subhead mt-5">
              Built in delivery rooms — PMO, programme leadership, and operating
              clarity for complex software programmes.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <p className="eyebrow">At a glance</p>
          <h2 className="headline">The operating range.</h2>
          <div className="report-board paper-grain mt-10 grid sm:grid-cols-2 lg:grid-cols-4">
            {proof.map(([title, detail], index) => (
              <div
                key={title}
                className={[
                  "p-6",
                  index < proof.length - 1 ? "border-b border-[rgba(17,24,32,0.1)] sm:border-b-0" : "",
                  "sm:odd:border-r sm:[&:nth-child(2)]:border-r-0 lg:border-r lg:[&:nth-child(4)]:border-r-0 lg:[&:nth-child(2)]:border-r",
                ].join(" ")}
              >
                <div className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.02em]">
                  {title}
                </div>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Selected outcomes</p>
          <h2 className="headline">What the work produced.</h2>
          <div className="mt-10">
            {achievements.map((item, index) => (
              <article key={item.title} className="editorial-row">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-band atmosphere-band">
        <div className="container flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow !text-[rgba(0,166,200,0.9)]">Next</p>
            <h2 className="headline">If the drag is real, map the audit.</h2>
          </div>
          <Link href="/contact" className="button button-light">
            Book Audit Fit Call
          </Link>
        </div>
      </section>
    </>
  );
}
