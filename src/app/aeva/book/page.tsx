import type { Metadata } from "next";
import { CalendlyInlineWidget } from "../../../components/CalendlyInlineWidget";

export const metadata: Metadata = {
  title: "Book an AI Governance Discovery Call",
  description:
    "Book a 30-minute conversation to assess how AEVA can apply to your organisation.",
  keywords: [
    "AI governance consultant",
    "book discovery call",
    "ChisokuLab contact",
  ],
};

const expectations = [
  "What AI governance challenges you are currently navigating",
  "How AEVA has been applied in similar contexts",
  "Whether there is a fit worth exploring further",
];

export default function AevaBookPage() {
  return (
    <>
      <section className="bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
        <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
          <p className="text-label text-[#00d4ff]">20 MINUTES · FREE · NO PITCH</p>
          <h1 className="mt-4 text-display text-[#dde6f0]">
            See how AEVA applies to your organisation
          </h1>

          <ul className="mt-8 space-y-3 text-body-lg text-[#6b8aaa]">
            {expectations.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>

          <div className="mt-8 rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-4 md:p-6">
            <CalendlyInlineWidget
              className="calendly-inline-widget"
              url="https://calendly.com/agam-agrawwal/discovery-call"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>

          <p className="mt-5 text-[12px] text-[#6b8aaa]">
            Agam Agrawwal · Founder, ChisokuLab · Creator of AEVA Framework ·
            agam.ag2424@gmail.com
          </p>
        </div>
      </section>
    </>
  );
}
