import Link from "next/link";
import { AuditFitForm } from "../../components/contact/AuditFitForm";
import { PmoOperatingMap } from "../../components/artifacts/PmoOperatingMap";
import { siteConfig } from "../../lib/siteConfig";

type Props = {
  searchParams?: Promise<{ interest?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const interest = params.interest;

  return (
    <section className="section pt-16">
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">Fit call</p>
          <h1 className="display">AI automation for delivery systems.</h1>
          <p className="subhead mt-5">
            Starting at PMO reporting. Share brief context — then schedule.
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
                Run the Free PMO Diagnostic
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
          <div className="mt-10 hidden lg:block">
            <PmoOperatingMap compact />
          </div>
        </div>

        <AuditFitForm defaultInterest={interest} />
      </div>
    </section>
  );
}
