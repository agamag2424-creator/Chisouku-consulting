import * as React from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { TickerStrip } from "./TickerStrip";
import { StatGrid } from "./StatGrid";

export function IndustryShiftSection() {
  return (
    <section
      id="shift"
      className="relative bg-void text-[var(--color-text-primary)]"
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] py-[120px] md:px-[var(--content-padding-x)] md:pb-[100px]">
        <div className="text-center max-w-[600px] mx-auto">
          <SectionLabel>THE AI SHIFT IS ACCELERATING</SectionLabel>
          <h2 className="text-h1 mb-4">
            The industry is moving. Is your organization keeping up?
          </h2>
          <p className="text-body mb-14">
            While enterprises deploy AI at scale and regulations tighten
            globally, mid-market companies face a widening gap — between
            where AI is heading and where their governance and operations
            actually are.
          </p>
        </div>
        <TickerStrip />
        <StatGrid />
      </div>
    </section>
  );
}

