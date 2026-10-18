# E9.1 — "Discuss your programme" form: checks (local production build, no RESEND_API_KEY)

| Check | Result |
|---|---|
| Fields (PRD 11) | name*, work email*, company*, country* (UAE, Saudi Arabia, Other GCC, Other), role (5 options), request type* (Discuss a review, Free readiness brief, Pricing question), platform (config + Other), go-live decision date (month picker), message |
| Preset | `?request=review|brief|pricing` checks the request type; button reads "Send", "Request my readiness brief", "Ask about pricing" (e2e, all three) |
| Validation | plain-language inline messages, `aria-invalid` + `aria-describedby`, focus moves to the first invalid field (e2e) |
| Keyboard | full keyboard-only submission reaches the server; the honeypot is skipped (e2e) |
| Honeypot | filled → 200, nothing sent (e2e on the API) |
| API | requires `request_type`; subject `[ChisokuLabs] {request type} — {company}`; sender `website@chisokulabs.com`, reply-to the visitor; **no key → 503, Resend failure → 502, never a false success**; message bodies never logged |
| Success | "Thanks. We'll reply within one business day." plus, for briefs, "Your readiness brief arrives within two business days." |
| Contact page | H1 "Discuss your programme", the form, Calendly "Book a call" (new link, IN-5), email shown as text; metadata from the SEO map; old PMO wording, links and image gone |
| Rename | `AuditFitForm.tsx` re-exports `ProgrammeForm` until E10 |
| Footer fix | E8.3's footer grid fell back to 2 columns at desktop (a `md:` rule ordered after the 1100px rule); fixed, with a layout test |
| e2e | 62 / 62 · axe 0 at 1440 and 390 · no horizontal scroll |

**Still to do (needs the founder):** add **Preview** to `RESEND_API_KEY` in Vercel (it is Production only), then one test email per request type from the staging site, and confirm receipt.

**17 Oct 2026:** `RESEND_API_KEY` is now set for Production and Preview. The live-delivery test is on hold: chisokulabs.com lapsed at the registrar and currently has no MX records, so mail to agam@chisokulabs.com cannot arrive. Run one test per request type from staging once DNS is restored (`chisokulabs-dns-records.md` checklist given to the founder).
