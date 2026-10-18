# E7.1 — UAE market page: checks (local production build)

| Check | Result |
|---|---|
| Route | `/go-live-readiness-uae` renders (static); `routeLive` on, so the footer "UAE" link is live |
| Facts | 2 dated facts, each with a visible link to the issuer's page (UAE Ministry of Finance, SAP Support), verified in E7.0; dates in full ("1 January 2027", "End of 2027", as SAP states it) |
| Platforms, offers | platform chips and both offer panels read from `siteConfig` |
| CTA | hero and closing band lead with "Request a free readiness brief" (`/contact?request=brief`) |
| JSON-LD | `Service` with `areaServed` Country `AE`, both offers at list price; `BreadcrumbList` |
| e2e | 30 / 30 (new: facts and sources, offers, closing CTA, JSON-LD, 360px no horizontal scroll) |
| axe | 0 violations at 1440 and 390 |
| Unit | 13 / 13 (guard test example moved to a route that is still off) |
| Copy | drafted in PRD 9.10, pending IN-10 |

Screenshots: `uae--desktop.png`, `uae--mobile.png`.
