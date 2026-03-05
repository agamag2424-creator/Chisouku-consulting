import * as React from "react";
import { Section } from "../ui/Section";
import { SectionLabel } from "../ui/SectionLabel";
import { GlowButton } from "../ui/GlowButton";

export function LeadMagnetsSection() {
  return (
    <Section id="resources">
      <div className="border-y border-[var(--color-border)] bg-[var(--color-panel)] px-[var(--content-padding-x-mobile)] py-[80px] md:px-[var(--content-padding-x)]">
        <div className="mx-auto max-w-[640px] text-center mb-10">
          <SectionLabel>FREE RESOURCES</SectionLabel>
          <h3 className="text-h2 mb-3">
            Start assessing your AI governance today.
          </h3>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1 — Checklist */}
          <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-card)] p-8">
            <div className="mb-5">
              {/* Checklist mockup */}
              <div className="space-y-2">
                {[
                  { checked: true, width: "70%" },
                  { checked: true, width: "82%" },
                  { checked: false, width: "65%" },
                  { checked: false, width: "55%" },
                ].map((row, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className="flex h-[14px] w-[14px] items-center justify-center rounded-[3px] border"
                      style={{
                        borderColor: row.checked
                          ? "var(--color-cyan)"
                          : "var(--color-border-light)",
                        backgroundColor: row.checked
                          ? "rgba(0,212,255,0.1)"
                          : "transparent",
                      }}
                    >
                      {row.checked && (
                        <div className="h-[8px] w-[8px] rounded-[2px] bg-[var(--color-cyan)]" />
                      )}
                    </div>
                    <div
                      className="h-[6px] rounded-full bg-[var(--color-border-light)]"
                      style={{ width: row.width }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <h4 className="text-h3 mb-2">
              AI Governance Readiness Checklist
            </h4>
            <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
              20-point self-assessment to score your organization&apos;s AI
              governance maturity. Most companies score below 30%.
            </p>
            <GlowButton href="/contact" variant="secondary" size="sm">
              DOWNLOAD FREE CHECKLIST
            </GlowButton>
          </div>

          {/* Card 2 — Shadow AI Audit Template */}
          <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-card)] p-8">
            <div className="mb-5">
              {/* Spreadsheet mockup */}
              <div className="overflow-hidden rounded-[6px] border border-[var(--color-border-light)] bg-[rgba(5,10,18,0.9)]">
                {Array.from({ length: 4 }).map((_, row) => (
                  <div key={row} className="flex">
                    {Array.from({ length: 5 }).map((__, col) => (
                      <div
                        key={col}
                        className="h-[16px] flex-1 border-[var(--color-border)]"
                        style={{ borderWidth: 0.5 }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <h4 className="text-h3 mb-2">Shadow AI Audit Template</h4>
            <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
              A ready-to-use spreadsheet template to start inventorying AI tools
              across your organization. Includes department mapping and risk
              scoring.
            </p>
            <GlowButton href="/contact" variant="secondary" size="sm">
              DOWNLOAD FREE TEMPLATE
            </GlowButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

