import { calendlyLink, type CalendlyContent } from "../../lib/siteConfig";
import { Button } from "./Button";

type BookCallButtonProps = {
  /** utm_content value. Analytics placement is recorded by CtaTracker, not as a query parameter. */
  content: CalendlyContent;
  variant?: "secondary" | "inverse-outline";
  size?: "md" | "lg";
  className?: string;
};

/** Secondary booking CTA. "Discuss your programme" and the readiness brief stay the primary actions. */
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
      Book a 30-minute call
    </Button>
  );
}
