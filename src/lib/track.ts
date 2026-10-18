import { track as vercelTrack } from "@vercel/analytics";

/**
 * Analytics events (PRD 11) through Vercel Analytics: cta_click {id, page, placement}, sample_pack_view,
 * sample_pack_download, hero_view_toggle {view}, slip_estimate_used, form_submit {request_type}, form_error.
 * No cookies beyond Vercel Analytics defaults. Never send what a visitor typed.
 */
export function track(event: string, props?: Record<string, string | number | boolean>): void {
  try {
    vercelTrack(event, props);
  } catch {
    // Analytics must never break the page.
  }
}

/** Stable CTA id from a link: "/contact?request=brief" → "contact-request-brief", "/" → "home". */
export function ctaIdFromHref(href: string): string {
  const id = href
    .replace(/^https?:\/\//, "")
    .replace(/^\/+/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return id || "home";
}
