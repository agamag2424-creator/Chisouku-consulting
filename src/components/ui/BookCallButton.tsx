import { calendlyLink, type CalendlyContent } from "../../lib/siteConfig";
import { Button } from "./Button";
import { ctas } from "../../content/offer";

type BookCallButtonProps = {
  /** utm_content value. Analytics placement is recorded by CtaTracker, not as a query parameter. */
  content: CalendlyContent;
  variant?: "secondary" | "inverse-outline";
  size?: "md" | "lg";
  className?: string;
};

/** Booking CTA. Uses the discovery-call Calendly link. */
export function BookCallButton({ content, variant = "secondary", size = "lg", className }: BookCallButtonProps) {
  return (
    <Button
      href={calendlyLink(content)}
      variant={variant}
      size={size}
      className={className}
      ctaId="book_call"
      target="_blank"
      rel="noopener noreferrer"
    >
      {ctas.primaryLabel}
    </Button>
  );
}
