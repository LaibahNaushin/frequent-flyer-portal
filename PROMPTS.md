# PROMPTS.md — ENG-163087

## Prompt 1 — Architecture
Build the End-to-End Frequent Flyer Portal from the supplied TRD. Use a clean monochromatic corporate design and cover happy paths, empty states, loading states, invalid inputs, accessibility, analytics simulation, XSS sanitization and offline/spotty connectivity behavior.

## Prompt 2 — TDD first
Write the Vitest + React Testing Library test suite before the final implementation. Cover validation, XSS sanitization, empty search, loading/async behavior, accessibility and analytics.

## Prompt 3 — Implementation
Implement the portal to satisfy the tests. Use semantic HTML, accessible labels, visible focus states, aria-invalid/aria-describedby, responsive layout, visible loading indicators and an offline notice.

## Prompt 4 — Edge cases
Review slow connectivity, empty results, malformed IDs/emails, XSS payloads and offline status. Prevent crashes and blank screens.

## Prompt 5 — Quality gate
Run tests, lint and production build. Remove unused imports and avoid real API keys or sensitive production PII.
