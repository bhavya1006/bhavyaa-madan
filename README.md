# Bhavya Madan — Portfolio V2

A static manga/editorial portfolio composition for UI/UX and product design, with frontend and creative development alongside it. AI / ML and backend are supporting disciplines.

## Local development

Use npm 11.7.0 and Node.js 24 LTS (24.19.0 tested locally). `.nvmrc` and `package.json` select the supported 24.x line, including on Vercel; `.node-version` records the tested patch. Direct dependencies are pinned; `package-lock.json` is the only lockfile. Use `npm ci` for a clean, reproducible checkout or `npm install` after an intentional dependency change.

```sh
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm start
```

No Firebase credentials or backend services are required. Vercel Analytics loads only on Vercel deployments. Canonical and social URLs use Vercel's stable production-domain environment variable. Set `SITE_URL` to the full HTTPS origin if a custom canonical domain is assigned.

## Structure

- `app/page.tsx`: server-rendered composition of navigation and portfolio sections.
- `components/navigation`: accessible anchor navigation and light/dark/system theme selection.
- `components/portfolio`: hero, selected work, about, capabilities and contact.
- `data/identity.ts`: display identity, original social URLs and résumé URL.
- `data/projects.ts`: six original projects, ordered by explicit priority with design first.
- `lib/portfolio/types.ts`: extensible project model; unknown details remain optional.
- `app/globals.css`: paper/ink tokens, configurable accent and fonts, responsive layout, focus and reduced-motion baseline.
- `hooks/use-reduced-motion.ts`: live OS motion preference for later interaction work; conservative server fallback.

To add or remove work, edit `data/projects.ts`. `featured` controls inclusion and `priority` controls ordering. Do not fabricate missing years, roles, outcomes, covers or case-study links.

Themes persist locally through `next-themes`. An early theme script avoids an incorrect initial theme where possible; CSS also respects the system theme when JavaScript is disabled. All portfolio content is visible without animation or JavaScript. Theme selection itself requires JavaScript.

## Current scope

The static world combines editable oversized type, three reusable ink illustrations, unequal project frames and paper/ink surfaces. `scene-art.tsx` places optimized decorative images; `journey-path.tsx` joins static SVG segments at shared section boundaries. `editorial.tsx` holds shared numbering and labels. Project-specific desktop placement uses stable slugs, with a default layout for additional projects. Tablet reduces rotation; mobile places art beneath text and keeps priority order with staggered panel widths in normal document flow. See `docs/art-direction.md` for references, asset provenance and generation prompts.

Illustrated project settings are decorative compositions, not claimed screenshots of the work. The character is fictional, not a verified likeness of Bhavya. No project metrics, roles or dates have been invented. This page has no feedback, ratings, public comments, application API routes or Firebase dependencies. Page transitions and `/cool` remain out of scope.

Before later visual work, check 390, 768, 1024 and 1440 px layouts, keyboard navigation, both color themes and reduced motion. Typecheck, lint and production build are independent required checks; build errors are not suppressed.

## Motion foundation

Task 3 progressively draws the coral route using one native scroll controller. It adds restrained scene movement, fine-pointer project tilt and a one-time Contact endpoint settle. Reduced motion and no-JavaScript views retain the complete static design. See `docs/motion-foundation.md` for architecture, tokens, exact amplitudes and validation scope.

## Spatial desktop journey

Task 4 adds a sticky Work viewport at 1024px and above, driven entirely by native vertical scrolling. The existing grid content becomes an authored 2400 × 1800 spread with named camera stops and a synchronized coral route. Keyboard focus selects project stops; mobile, reduced-motion and no-JavaScript layouts retain normal flow. Capabilities has a smaller unpinned diagonal shift. See `docs/spatial-journey.md` for geometry, restoration, accessibility and debugging (`?cameraDebug`, development only).

## Cinematic entry and polish

Task 5 adds a short, session-only ink/title intro with a measured Hero path handoff. It skips refreshes/deep links and reduced motion, dismisses immediately on input, and fails open if hydration stalls. Development replay: `?introDebug`. Static Next Image imports provide blur placeholders; the Hero portrait alone is preloaded. Shared motion tokens now cover navigation, frame accents, theme surfaces and entry. See `docs/entry-polish.md` for timing, performance measurements and fallback behavior.
