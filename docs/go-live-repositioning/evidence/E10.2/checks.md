# E10.2 — Remove unused components and assets: checks

| Check | Result |
|---|---|
| Deleted code | `src/components/artifacts/*` (12), `components/aeo/GuidePage.tsx`, `DirectAnswer.tsx`, `components/contact/AuditFitForm.tsx` (re-export), `lib/legacyOffer.ts`, `lib/legacyAeo.ts` |
| Deleted assets | `og-audit.png`, `og-contact.png`, `og-diagnostic.png`, `images/pmo-operating-map-cover.png`, starter SVGs (`file`, `globe`, `next`, `vercel`, `window`) |
| CSS | `globals.css` 959 → 256 lines: 104 rules for classes nothing uses (old page system, map/ledger/report artefacts, `.drag-slider`) removed with a postcss script; empty media blocks dropped |
| Visual check | 12 pages × desktop and mobile, full page, before vs after: **24 / 24 pixel-identical** |
| `/_ui` | kept with the fail-closed guard (E0.3): 404 in a production build |
| Build | `npm run build` passes; lint 0 warnings; typecheck OK; unit 13/13; e2e 78/78 |
| Size | homepage JS (gzip, chunks the page loads): 197,546 → 197,546 bytes (unchanged); `.next/static` total 1,066,499 → 1,031,108 bytes (−35 KB) |
