# E5.1 — checks (`next dev`, component on the `/_ui` reference page, which is never served in production)

| Check | Result |
|---|---|
| Semantics | `<table>` with a hidden `<caption>`; 4 `th scope="col"` (the categories) and 6 `th scope="row"` (the criteria); wrapped in a focusable `role="region"` labelled by the caption |
| Data | `src/content/comparison.ts`: PRD 9.8 rows, columns and footnote verbatim |
| ChisokuLabs column | 3px teal top rule on its header and ink, semibold values; no colour fill |
| Narrow screens | table scrolls inside its box with the first column pinned; at 360px the page itself has no horizontal scroll (0 px overflow); pinned column narrowed to 8.5rem |
| Compact mode | `rows={4}` shows the first four rows (for the homepage, E5.2) |
| axe on `/_ui` (1440, 390) | 0 serious or critical, 0 other |
| Lint / typecheck | 0 problems / OK |

Screenshots: `comparison--desktop.png`, `comparison--mobile.png`, `comparison--mobile-scrolled.png`.
