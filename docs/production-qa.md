# Task 6 — Production QA and deployment

Verified 4 October 2026. Production: https://bhavya-madan.vercel.app

## Deployment and versions

- Separate Vercel project: `bhavya-madan`, in the owner's existing account. The previous portfolio project was not modified.
- Final deployment: `dpl_Bj9HjWPrYdafEeZCgHnYXWaTSerS`; Vercel build succeeded. The stable production URL was opened in the in-app browser and tested in isolated Chromium sessions without login or a protection bypass.
- Next.js **16.3.8**, React / React DOM **19.3.0**. Production Node **24.x** (Vercel project setting); local verification used **24.19.0**. The hosted patch version was not independently measured.
- Normal Next.js framework preset, default build/output settings, npm lockfile. No `vercel.json` needed. `.vercelignore` excludes repository documentation from uploads; the documents remain in the repository.
- CLI linking automatically connected the old Git repository. That integration was disconnected to prevent old-main pushes replacing this uncommitted V2 deployment. Future deployments currently use `vercel deploy --prod`; connect the intended branch only after committing/reviewing V2.

## Files added in Task 6

- `.nvmrc`: supported Node LTS line.
- `.vercelignore`: documentation/debug upload exclusions.
- `lib/portfolio/site.ts`: shared metadata strings and production-origin resolution.
- `app/robots.ts`, `app/sitemap.ts`: crawl metadata.
- `app/opengraph-image.tsx`: static generated 1200 × 630 social preview.
- `app/icon.svg`, `app/apple-icon.png`: matching paper/ink/coral monogram icons.
- `docs/production-qa.md`: this report.

Vercel also created ignored local `.vercel/project.json` and `.env.local`. They are not source files and must not be committed.

## Files modified / deleted in Task 6

Modified: `.gitignore`, `README.md`, `package.json`, `package-lock.json`, `app/layout.tsx`, `app/globals.css`, `lib/portfolio/intro.ts`, `components/portfolio/entry-intro.tsx`, `public/favicon.ico`.

Deleted: unused `public/hero.png` (816 KB). The favicon was replaced, reducing it from approximately 122 KB to a small matching icon. No approved illustration was removed. No application dependencies were added or upgraded. Vercel CLI, Lighthouse and axe were used from npm's temporary cache, outside the application dependency graph.

## Identity and project content

Public identity is **Bhavya Madan**. A case-insensitive search of repository text, including hidden metadata, found the old doubled-a spelling only in:

| File | Occurrences / reason retained |
| --- | --- |
| `data/identity.ts:5` | One: existing LinkedIn account URL. Its destination was preserved. |
| `.git/config:9` | One: existing GitHub remote URL. |
| `.git/FETCH_HEAD:1–3` | Three: fetched repository URLs. |
| `.git/logs/HEAD:1` | One: original clone record. |
| `.git/logs/refs/heads/main:1` | One: original clone record. |
| `.git/logs/refs/remotes/origin/HEAD:1` | One: original clone record. |

Binary artwork, generated caches, dependency internals and compressed Git objects were excluded from this text occurrence inventory. Git history was not rewritten. No old spelling remains in public page copy or metadata. GitHub and X currently return external profile titles using the previous spelling; changing those accounts is outside this task.

Project order remains Legal Connect → Insta-VitaminC-Advertisement → Traveless → Pre DAP → FlowSync → Water Supply Management. Design leads, development supports it. Existing titles, categories and URLs remain the source of truth. No outcomes, dates, metrics or case studies were invented.

## SEO and social preview

- Title and description prioritize UI/UX, product design and creative development.
- Canonical verified as `https://bhavya-madan.vercel.app/`.
- `metadataBase` uses `SITE_URL` when explicitly configured, otherwise Vercel's stable production domain. Local builds use localhost only as their metadata base and omit an invented public canonical.
- Open Graph website metadata and Twitter large-image card resolve to the production-generated preview. The preview uses oversized editable typography and a coral route on paper.
- `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/icon.svg`, `/apple-icon.png` and `/favicon.ico` all returned HTTP 200. Social preview visually inspected.

## Accessibility and actual fixes

- Exactly one meaningful H1, logical H2/H3 section/project hierarchy, main/navigation landmarks, skip link and labeled theme select verified.
- Decorative art has empty alt text and hidden decorative wrappers. Real project title/preview anchors remain accessible; decorative duplicate art anchors are excluded from keyboard navigation.
- Keyboard focus brings each project link into the desktop viewport. Navigation, history, Enter, Ctrl-click and middle-click preserve normal anchor behavior.
- An axe scan found low contrast in receding project captions. Fixed by applying camera-presence opacity only to artwork; captions remain fully readable. Final WCAG A/AA scans detected **zero violations in both themes**. This is not a claim of exhaustive accessibility certification.
- Reflow checked at 320 CSS pixels, equivalent to the content width of a 1280px viewport at 400% zoom. Native browser-menu zoom and screen-reader use were not tested.

## External link audit

| Destination | Result |
| --- | --- |
| GitHub profile and four project repositories | HTTP 200, expected destination/title |
| X profile | HTTP 200, expected account |
| Résumé on Drive | HTTP 200, `Resume.pdf` viewer; résumé contents not rewritten |
| Traveless preview | HTTP 200, expected project |
| Pre DAP preview | HTTP 200, expected project |
| LinkedIn | HTTP 200 browser/CAPTCHA challenge; account content not independently verified |
| Both Figma Community links | HTTP 403 from automated requests; validity remains uncertain, not classified as confirmed broken |

All twelve unique data-module URLs were requested. No destinations were changed. No case-study URLs are currently supplied.

## Performance

Final Lighthouse 13.5.0 runs against the public production URL:

| Profile | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile simulated | 100 | 100 | 100 | 100 | 1.1 s | 0 | 30 ms |
| Desktop | 99 | 100 | 100 | 100 | 0.7 s | 0 | 0 ms |

An earlier mobile run scored 98 Performance with 1.4 s LCP and 150 ms TBT. Run-to-run variance is expected; these are lab observations, not guaranteed field scores. Real-user INP and percentile Core Web Vitals are not available yet.

Final mobile navigation transferred approximately 549 KB total: 371 KB images, 155 KB JavaScript, 9 KB CSS, no webfonts. System display/body fonts avoid a font-loading dependency. Hero art retains Next Image preload and blur placeholder; other images remain lazy. Existing source PNGs total about 9 MB, but responsive optimized image output is served to visitors.

Motion audit confirmed a shared event-driven requestAnimationFrame scheduler, cached geometry, one Work-world transform and no per-frame React state updates. No new animation library, permanent loop, blur animation or client-content boundary was added. Vercel Analytics now only loads in Vercel environments, removing its avoidable localhost script request. No console errors, hydration warnings, failed assets or unhandled page exceptions were observed in final production checks.

## Loader and camera production behavior

- Fresh isolated session: cinematic intro, portrait decoded before normal handoff. Final measured intro **1.50 s**, CLS **0**; an earlier cold run was 1.71 s.
- Repeat session: skipped. Production ignores development intro replay/debug UI. Refresh, hash entry and Work refresh skip unnecessary replay.
- Slow-image test delayed portrait delivery by 2.8 s: bounded entry still opened with its blur placeholder. Blocking all external JavaScript also failed open rather than leaving an overlay.
- Fixed an early wheel-input edge case: temporary passive wheel/touch listeners now dismiss entry on input intent, even before a scroll event occurs. No default prevention or scroll locking.
- Desktop 2400 × 1800 Work geometry and named stops are unchanged. Forward/reverse wheel input, rapid movement, direct scroll-position changes, keyboard focus, navigation/hash history, Work refresh and pinned resize passed.
- Pinned resize preserved chapter progress across 1024, 1280, 1440 and 1920px; theme switching while pinned retained the camera. About releases to natural flow and Contact endpoint reaches its completed state.
- Actual physical trackpad gestures and dragging the native scrollbar thumb were not separately exercised; wheel and programmatic rapid-position input were used.

## Mobile, themes and failure behavior

All five chapters were checked at 390, 430, 768, 1024, 1280, 1440 and 1920px across Light/Dark/System, with no horizontal document overflow. Exact mobile viewports **390 × 844**, **430 × 932** and **768 × 1024** passed in both themes. Below 1024px, the Work viewport remains normal flow instead of a pinned camera. Desktop composition, artwork and hierarchy remain unchanged.

Reduced motion: intro skipped, complete static path and normal-flow projects retained. No JavaScript: identity, role, all six project links, About, Capabilities and Contact visible; overlay absent. Theme selection requires JavaScript, while system-theme CSS remains available without it.

Browsers actually tested: **Chromium 148.0.7778.96** through Playwright/Lighthouse, plus the Codex in-app browser for opening/navigation/visual review. Firefox and WebKit/Safari were not installed and were not tested. Mobile testing is viewport emulation, not physical-device certification.

## Security baseline and repository hygiene

- No application API endpoints, Firebase client/server modules or Firebase dependencies remain in the current working tree.
- Targeted secret-pattern scans found no private-key/token/Firebase credential patterns in source or client build assets. Exact-value comparison found no local private environment values in `.next/static`. This is a targeted baseline, not a full historical secret-audit service.
- `.env.local`, `.vercel`, `node_modules`, `.next`, debug logs and TypeScript build info are ignored. Development overlays are production-guarded.
- npm is the sole retained package manager; the normal install refreshed/validated `package-lock.json`. Existing `yarn.lock` deletion is part of the earlier foundation work.
- `npm audit --omit=dev`: **0 vulnerabilities**. Full audit: **5 high-severity dependency-chain findings**, all from the same unpatched `braces` nesting issue through Next's ESLint plugin. Published `braces` is still 3.0.3. npm suggests a breaking Next lint-config downgrade; this was not applied. ESLint 9.39.5 is flagged unsupported by the registry, but current React/JSX accessibility plugin peer ranges do not support ESLint 10. No force install, ignored peer conflict or broad downgrade was used. These development-tooling warnings remain open.
- Vercel logs also warn that `unrs-resolver` has an install script awaiting npm allowScripts review. The build succeeds; no blanket script authorization was added.
- QA screenshots, recording, link results, axe reports and Lighthouse JSON are stored outside the repository in the task's artifact directory. Intentional project docs were retained.

## Commands and Git

`npm install`, `npm run typecheck`, `npm run lint` and `npm run build` all passed normally with Node 24.19.0. No `--force`, `--legacy-peer-deps`, suppressed TypeScript errors or ignored lint failures. A fresh Vercel build installed 367 packages successfully and built the production application; the follow-up deployment also succeeded.

Branch remains `portfolio-v2`. The working tree includes the large, pre-existing uncommitted Tasks 1–5 foundation/design replacement as well as Task 6 changes. Nothing was committed, merged, pushed or history-rewritten by this task. A complete `git status --short` snapshot is included with the QA artifacts.

## Remaining limitations

Figma/LinkedIn account contents need a human browser check if their public availability is critical. External profile display names still need owner review. Firefox/Safari, real touch hardware, native zoom and field INP remain unverified. Development dependency advisories/support warnings remain as described above. Git auto-deployment is intentionally disconnected until V2 is committed and its intended production branch is selected. No `/cool` or subsequent task was started.
