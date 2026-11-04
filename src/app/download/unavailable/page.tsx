import type { Metadata } from "next";
import { Section } from "../../../components/ui/Section";
import { siteConfig } from "../../../lib/siteConfig";

// Where /download/[token] sends a link that cannot be used (brief section 5). Draft wording for owner approval,
// except the expired case, which follows the brief: email hello@chisokulabs.com for a re-send.

export const metadata: Metadata = {
  title: { absolute: "Download link unavailable | ChisokuLabs" },
  robots: { index: false, follow: false },
};

const reasons: Record<string, { title: string; text: string }> = {
  expired: { title: "This download link has expired", text: "Download links stay active for 30 days. Email us and we'll re-send it." },
  refunded: { title: "This download is no longer available", text: "The order for this link has been refunded." },
  not_ready: { title: "Your download is not ready yet", text: "Your download link will arrive by email within 48 hours of payment." },
  not_found: { title: "We couldn't find this download link", text: "Check the link in your email, or email us and we'll re-send it." },
};

export default async function DownloadUnavailablePage({ searchParams }: { searchParams: Promise<{ reason?: string | string[] }> }) {
  const { reason } = await searchParams;
  const copy = reasons[typeof reason === "string" ? reason : ""] ?? reasons.not_found;
  return (
    <Section tone="page">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h1 className="t-h2 text-ink">{copy.title}</h1>
        <p className="t-body text-ink">{copy.text}</p>
        <p className="t-small text-muted">
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-teal underline underline-offset-4">
            {siteConfig.email}
          </a>
        </p>
      </div>
    </Section>
  );
}
