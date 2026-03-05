import * as React from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { GovernTile } from "./GovernTile";
import { TransformTile } from "./TransformTile";

export function TwoPathsSection() {
  return (
    <section
      id="paths"
      className="relative bg-void text-[var(--color-text-primary)]"
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] py-[100px] md:px-[var(--content-padding-x)] md:pb-[120px]">
        <div className="mx-auto max-w-[560px] text-center">
          <SectionLabel>TWO PATHS. ONE FRAMEWORK.</SectionLabel>
          <h2 className="text-h1 mb-4">
            Whether you need control or competitive advantage — the answer
            starts here.
          </h2>
          <p className="text-body">
            Every organization&apos;s AI journey is different. Some need to
            govern what&apos;s already happening. Others need to build
            what&apos;s next. Most need both. Choose your starting point.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <GovernTile />
          <TransformTile />
        </div>
        <p className="mt-2 text-center text-[14px]">
          <span className="font-semibold text-[var(--color-text-primary)]">
            Most companies need both.
          </span>{" "}
          <span className="font-medium text-[var(--color-text-secondary)]">
            ChisokuLab delivers both in one engagement.
          </span>
        </p>
      </div>
    </section>
  );
}

