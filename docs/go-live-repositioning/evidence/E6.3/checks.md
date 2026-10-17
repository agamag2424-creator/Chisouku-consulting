# E6.3 — switch on `/independence-and-data` (IN-4 confirmed)

**Founder, 17 Oct 2026:** all twelve PRD 9.7 statements are correct; align the homepage deletion line; the page labels are approved.

| Check | Result |
|---|---|
| `routeLive["/independence-and-data"]` | `true`: the page renders in production; homepage and footer links are now real links |
| Homepage deletion wording | body and data line now read "within 30 days of the final readout" (PRD 9.1 section 8 updated to match) |
| Unit tests | 13 / 13 (the fail-closed guard test now uses a route that is still off) |
| e2e (production build) | 28 / 28; new checks: page returns 200, homepage and footer link to it, no "end of the engagement" on `/` |
| axe | 0 violations on `/independence-and-data` and `/` (1440, 390) |
| Internal-material scan | clean (only the approved "Draft findings" on the Decision Review page) |
