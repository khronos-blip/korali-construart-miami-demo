# QA report — 2026-09-23

Command: `npm run qa`

## Result: PASS

- Structural: required disclosure/facts present; 6/6 unique project assets resolved; 9 image references with non-empty alt text; no duplicate IDs; no form action or external page dependencies.
- JavaScript: `node --check` passed for `public/script.js` and `worker.js`.
- Desktop: 1440 × 1000; no horizontal overflow; 0 broken images.
- Mobile: 390 × 844; no horizontal overflow; 0 broken images.
- Interactions: project filters, estimator validation/summary/completion, and mobile navigation passed.
- Runtime: 0 console errors, 0 page errors, 0 failed requests, 0 off-origin requests.
- Visual: full-page desktop and mobile captures inspected; no material overlap, breakage, unreadable section, or misleading placeholder found.
- Worker: Wrangler 4.136.3 dry-run passed with Static Assets binding and both configured route patterns. No deploy executed.

Evidence:

- `qa/outputs/browser-report.json`
- `qa/outputs/desktop.png`
- `qa/outputs/mobile.png`
- `qa/outputs/worker/`
