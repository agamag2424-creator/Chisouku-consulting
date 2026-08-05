import Link from "next/link";
import { AuditFitForm } from "../../components/contact/AuditFitForm";
import { siteConfig } from "../../lib/siteConfig";

export default function ContactPage() {
  return (
    <section className="section pt-16">
      <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Contact / Audit Fit Call</p>
          <h1 className="display">Check whether the audit is a fit.</h1>
          <p className="subhead mt-5">
            Share enough context to qualify. If the free diagnostic is the better
            next step, that will be clear quickly.
          </p>
          <div className="mt-8 space-y-4 text-sm text-[var(--color-muted)]">
            <p>
              Prefer email?{" "}
              <a
                className="font-bold text-[var(--color-cyan-strong)]"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </p>
            <p>
              Not ready for a call?{" "}
              <a
                className="font-bold text-[var(--color-cyan-strong)]"
                href={siteConfig.diagnosticUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Run the PMO Maturity Tool
              </a>
              .
            </p>
            <p>
              Want the offer detail first?{" "}
              <Link
                className="font-bold text-[var(--color-cyan-strong)]"
                href="/pmo-automation-audit"
              >
                Review the audit
              </Link>
              .
            </p>
          </div>
        </div>

        <AuditFitForm />
      </div>
    </section>
  );
}
