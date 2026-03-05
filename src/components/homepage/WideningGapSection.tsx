import * as React from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { GapVisualization } from "./GapVisualization";

export function WideningGapSection() {
  return (
    <section className="relative bg-void text-[var(--color-text-primary)]">
      <div className="mx-auto max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] py-[100px] md:px-[var(--content-padding-x)] md:pb-[120px]">
        <div className="mx-auto max-w-[580px] text-center">
          <SectionLabel color="amber">THE WIDENING GAP</SectionLabel>
          <h2 className="text-h1 mb-4">
            The distance between AI&apos;s potential and your readiness is
            growing every quarter.
          </h2>
          <p className="text-body">
            On one trajectory: autonomous workflows, governed intelligence,
            AI-native operations. On the other: manual reporting, ungoverned
            tool sprawl, framework fatigue. The gap doesn&apos;t close on its
            own.
          </p>
        </div>
        <GapVisualization />
      </div>
    </section>
  );
}

