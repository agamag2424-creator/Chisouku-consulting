# E5.2 — checks (local production build, `next start` on :3100)

| Check | Result |
|---|---|
| Lint / typecheck / build | 0 problems / OK / OK (`/pricing` prerendered static) |
| Unit / e2e | 11 / 11; 26 / 26 (3 new: `/pricing` at 1440 and 360 with all six prices, payment terms, places remaining, full comparison (6 rows), footnote, FAQ answer, no horizontal scroll; homepage compact comparison (4 rows) and its Pricing link) |
| axe (WCAG 2.1 A/AA) | 0 violations on `/`, `/method` and `/pricing`, at 1440 and 390 |
| **Founding places = 0** | Built with `foundingSlotsRemaining: 0`: the built HTML of `/`, `/pricing`, both offer pages, `/method` and `/see-it-first` contains no "Founding-client", no "USD 2,500", no "USD 3,000", no Decision Review founding "USD 6,000" and no "places remaining". Screenshots `zero--*.png`. Reverted to 3 and rebuilt |
| Internal-material scan | clean (no non-asset files in `public/`; no internal wording on any live route) |
| Lighthouse mobile `/pricing` | 94 / 96 / 98, median 96 |
| Lighthouse mobile `/` (see note) | same machine, back to back: release head medians 90, 89, 92; this branch 87, 87, 86; this branch with the compact table removed 89 |
| Evidence marks | `EvidenceCell` now draws each mark as one CSS element instead of an SVG (same geometry: disc 13/16 of the box, 1.5px ring, left half filled for partial). Homepage elements 970 → 915. Visual comparison `evidence-marks--svg-vs-css.png` (left SVG, right CSS) |

**Note on homepage performance.** In this container the homepage sits at about the 90 line, and the compact comparison table (required by E5.2) costs about 2–3 points. Prefetching was ruled out (disabling it changed nothing), and the JavaScript is unchanged (+14 bytes). The main weight is the hero, a client component of about 400 elements. A dedicated performance story is proposed to the founder before release.

Screenshots: `pricing--desktop-part*.png`, `pricing--mobile-part*.png`, `zero--*.png`, `evidence-marks--svg-vs-css.png`.
