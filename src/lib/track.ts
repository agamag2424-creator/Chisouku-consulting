import { track as vercelTrack } from "@vercel/analytics";

type Props = Record<string, string | number | boolean>;
type UmamiWindow = Window & { umami?: { track: (event: string, data?: Props) => void } };

/**
 * Analytics events: cta_click {id, page, placement}, calculator_used, self_check_complete {band}, form_submit
 * {request_type}, form_error. Sent to Umami Cloud (production, cookieless) and Vercel Analytics (previews).
 * No cookies. Never send what a visitor typed or answered.
 */
export function track(event: string, props?: Props): void {
  try {
    vercelTrack(event, props);
  } catch {
    // Analytics must never break the page.
  }
  try {
    (window as UmamiWindow).umami?.track(event, props);
  } catch {
    // Umami not loaded (no website ID, blocked, or not yet ready).
  }
}

/** Stable CTA id from a link: "/contact?request=pricing" → "contact-request-pricing", "/" → "home". */
export function ctaIdFromHref(href: string): string {
  const id = href
    .replace(/^https?:\/\//, "")
    .replace(/^\/+/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return id || "home";
}
