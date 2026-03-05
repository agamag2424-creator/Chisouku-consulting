import * as React from "react";

export function TrustStripSection() {
  return (
    <section className="relative w-full border-b border-[var(--color-border)] bg-void text-[var(--color-text-primary)]">
      <div className="mx-auto max-w-[var(--content-max-width)] px-[40px] py-[80px]">
        {/* Trust grid */}
        <div className="rounded-[10px] bg-[var(--color-border-light)] p-px overflow-hidden">
          <div className="grid grid-cols-1 bg-[var(--color-panel)] sm:grid-cols-3">
            <TrustCell stat="11+" label="Years enterprise program management" />
            <TrustCell stat="$90M+" label="Portfolio across 9+ countries" />
            <TrustCell stat="108%" label="Revenue growth delivered" />
          </div>
        </div>

        {/* Logo row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[9px] font-semibold tracking-[0.12em] uppercase text-[var(--color-text-muted)]">
          <span className="text-[9px] font-semibold tracking-[0.2em] text-[var(--color-text-muted)]">
            Past engagements:
          </span>
          {["HCL", "SUN LIFE", "COFORGE", "NAGARRO", "YAMAHA MOTOR"].map(
            (name) => (
              <span
                key={name}
                className="rounded-[4px] border border-[var(--color-border)] px-[14px] py-[6px] text-[var(--color-text-muted)] transition-colors duration-200 hover:border-[var(--color-border-light)] hover:text-[var(--color-text-secondary)]"
              >
                {name}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

type TrustCellProps = {
  stat: string;
  label: string;
};

function TrustCell({ stat, label }: TrustCellProps) {
  return (
    <div className="border-[var(--color-border)] bg-[var(--color-panel)] px-6 py-6 text-center text-[var(--color-text-secondary)]" style={{ borderRightWidth: 1, borderBottomWidth: 1 }}>
      <div className="mb-2 text-stat text-[1.5rem] text-[var(--color-cyan)]">
        {stat}
      </div>
      <div className="text-[12px] text-[var(--color-text-secondary)]">
        {label}
      </div>
    </div>
  );
}

