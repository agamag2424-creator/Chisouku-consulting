# E10.4 — Release QA: final Evidence Report

**Date:** 17 Oct 2026 · **Code:** `site/E10.4-release-qa` (E1–E10.3 + production hotfixes), local production build.

## Release gate (BACKLOG E10.4)
| Gate | Result |
|---|---|
| Build | ✅ |
| Lint | ✅ 0 warnings |
| Typecheck | ✅ |
| Unit tests | ✅ 15 / 15 |
| e2e (Playwright) | ✅ 78 / 78 |
| Leak scan | ✅ 0 hits after the founder's decision (18 Oct 2026) to keep the Calendly link `calendly.com/agam-agrawwal` for launch and replace it after go-live; added to the reviewed allow-list with that note |
| Axe | ✅ 0 serious/critical on all 16 live routes at 1440 and 390 (`axe.txt`) |
| Lighthouse mobile ≥ 90 | `/readiness-evidence-check` 95 · `/go-live-decision-review` 93 · `/see-it-first` 93 — ✅. **`/`: first batch median 85 (runs 82/85/91), re-run median 93 (87/93/96)**; the sandbox is noisy, so confirm with PageSpeed Insights on the live URL. Accessibility 100 and SEO 100 on all four. Best Practices 96 locally only because Vercel's analytics script does not exist on a local server (`lighthouse.txt`) |
| IN-1 prices | ✅ approved |
| IN-2 public email | ✅ deferred by the founder: keep `agam@chisokulabs.com` for launch |
| IN-3 principal paragraph | ✅ approved |
| IN-4 data statements | ✅ confirmed |
| IN-5 Calendly | ✅ deferred by the founder: keep the current link for launch |
| Form delivery test | ✅ live form test received by the founder (18 Oct 2026); staging tested end to end by the founder |
| Founder approves production promotion | ✅ "ready for deployment" (18 Oct 2026) |

## Full-site pass
Screenshots of every live route, desktop (1440) and mobile (390), full page: `screens/` (32 files). All 16 routes return 200; no horizontal scroll at 390.

## README
Rewritten: positioning, stack, environment (`RESEND_API_KEY`), content model (`siteConfig`, `routeLive`/`routeRenders`, `seo.ts`, content modules, copy approval), structure, analytics events, leak scan, proof rules.

## Launch steps (after the gate)
1. Restore DNS (checklist given to the founder: Vercel A/CNAME, Zoho MX, Resend, Google TXT).
2. Merge the E10 PRs into `release/go-live`, then `release/go-live` into `main` (the founder merges; `main` is already an ancestor, so no conflicts).
3. On www.chisokulabs.com: one form test per request type (founder confirms receipt), PageSpeed Insights on `/`, both offers and `/see-it-first`, `curl -I` on the old URLs, and resubmit the sitemap in Search Console.
