# E7.2 — Saudi Arabia market page: checks (local production build)

| Check | Result |
|---|---|
| Route | `/go-live-readiness-saudi-arabia` renders (static); `routeLive` on, so the footer "Saudi Arabia" link is live |
| Facts | 2 dated facts with visible source links (ZATCA wave 25 announcement, SAP Support), verified in E7.0; dates in full |
| Layout | the shared `MarketPage` from E7.1; platforms and offers from `siteConfig` |
| JSON-LD | `Service` with `areaServed` Country `SA`, both offers at list price; `BreadcrumbList` |
| e2e | 32 / 32 (the market spec now covers both pages) |
| axe | 0 violations at 1440 and 390 |
| Internal-material scan | clean on both market pages |
| Copy | drafted in PRD 9.10, pending IN-10 |

Screenshots: `saudi-arabia--desktop.png`, `saudi-arabia--mobile.png`.
