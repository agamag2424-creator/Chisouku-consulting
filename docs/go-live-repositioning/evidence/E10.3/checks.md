# E10.3 — Leak scan: checks

| Check | Result |
|---|---|
| Script | `scripts/leak-scan.mjs`, `npm run leak-scan`; scans 180 files (built HTML/RSC/text bodies + src/); exit 1 on any hit |
| Unit tests | `scripts/leakScan.test.mjs`: whole-word, case-insensitive, catches hyphenated names and URLs, allows the reviewed phrases; `npm run test:unit` 15/15 |
| README | new "Leak scan" section |
| Result on this build | **2 hits, both the Calendly link** `calendly.com/agam-agrawwal` ("Agam", "Agrawwal") in `src/lib/siteConfig.ts`. Everything else is clean. Founder decision needed: a Calendly link without the name (e.g. `calendly.com/chisokulabs`), or an explicit exception |

```
src/lib/siteConfig.ts:9  "agam"  …L4 calendlyUrl: "https://calendly.com/agam-agrawwal", // IN-5, founder 17 Oct 2026…
src/lib/siteConfig.ts:9  "agrawwal"  …calendlyUrl: "https://calendly.com/agam-agrawwal", // IN-5, founder 17 Oct 2026 /** Se…
leak-scan: 180 files, 2 hits
```
