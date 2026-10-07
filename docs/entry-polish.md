# Task 5 — entry and motion polish

## Entry architecture and timing

`intro.ts` supplies a small, inline head bootstrap. Before the first body paint it opts eligible first visits into an overlay; otherwise the overlay remains `display:none`. It uses only `sessionStorage` (`portfolio:intro-seen`), never persistent intro state. Reloads, back/forward entries and hashes skip the cinematic entry. In development `?introDebug` replays it; this override is disabled in production.

`EntryIntro` coordinates a bounded wait for the critical Hero portrait's `decode()`. The minimum lead-in is 1100ms, readiness deadline 1500ms and handoff 400ms: intended total 1.5–1.9 seconds. Warm Chromium production runs measured about 1.51 seconds; a cold/busy sample measured about 2.02 seconds. A 2200ms bootstrap fail-open also covers failed hydration. Browser scheduling can add small timing variation.

The sequence uses the existing display type: off-white ink stroke, masked BHAVYA / MADAN, one coral mark, then the small stroke travels to the Hero route's measured origin. A temporary SVG copies the real Hero path and draws its initial 16% as the backdrop clears. The underlying route begins at the same fraction, avoiding a disappearing handoff. Two coordinated Hero groups settle: portrait and copy. All subsequent progression remains scroll-controlled.

There is no scroll lock, focus trap, fake percentage or hidden semantic content. The visual overlay is aria-hidden and ignores pointer hit testing. Scroll, keyboard, pointer, focus, resize, reduced-motion changes and page departure dismiss it. The bootstrap handles input before hydration and hands ownership to the component after its listeners are installed. Temporary handlers/timers are cleaned up; there is no new animation-frame loop.

## Polish

- Navigation receives a short ink underline on hover and visible keyboard focus.
- Project numbers receive a coral underline; arrows nudge by two pixels and frame color responds subtly. Real anchor behavior is unchanged, including Enter, Ctrl-click and middle-click.
- Camera movement suppresses project hover accents and resets tilt. The quiet interval now uses the shared motion token.
- Text/social arrows use the same fast editorial timing.
- Light/dark changes transition only selected surface/color/border properties over 160ms; illustration filters are not animated.
- A static chapter cue fades with initial scrolling. It never bounces.
- Contact's footer sits below its skyline at tablet/desktop sizes, preserving a clean final composition and the existing one-time endpoint settle.

Motion CSS variables are now emitted from the shared TypeScript tokens at the document root, so navigation and entry share the same FAST/NORMAL/SLOW durations and editorial easing as the page. Task 4's grid, stops, camera interpolation, sticky range and restoration architecture are unchanged. Work → About and the shorter Capabilities shift retain their approved choreography.

## Image and performance audit

The three source PNGs remain intact: designer 2,892,240 bytes (1024×1536), city 3,415,373 bytes (1536×1024), desk 2,772,241 bytes (1774×887). Static Next Image imports now supply generated blur placeholders and hashed immutable asset URLs. Explicit dimensions preserve geometry; responsive sizes are capped at 850px beyond the large-desktop breakpoint. Only the Hero portrait is preloaded. Other illustrations retain default lazy loading and never block entry.

A 1440px Chromium sample delivered optimized image bodies of 344,284 bytes for the portrait, 176,376 for the city and 119,228 for the desk, rather than transferring the original PNG sizes. Repeated uses share optimized URLs/cache entries. Those values are one viewport/DPR sample, not a universal transfer budget.

The sampled first entry reported CLS 0. Content and scene markup remain server-rendered; the new client component only controls a temporary overlay. The journey still uses one demand-driven frame scheduler, cached geometry and no React state per frame. No persistent will-change declarations, font downloads, animated blur/filter effects or heavy dependencies were added. Entry uses short CSS animations and timers; the extra scroll-dismiss observer exists only during entry. SVG geometry remains modest and code-native.

## Verification and limits

Production checks cover first/repeat entry, production replay exclusion, development replay, Work refresh, reverse scroll, navigation/history, keyboard project focus, all seven requested widths in Light/Dark/System, reduced motion, no JavaScript and input/resize cancellation during entry. Additional checks cover a delayed portrait and blocked hydration scripts. No horizontal overflow or hydration errors were detected in the exercised flows.

Without JavaScript the overlay is absent and all five chapters and project links remain visible in normal flow. Reduced motion skips entry and keeps the complete static route. Slow image delivery beyond the readiness deadline uses the blur placeholder rather than holding the visitor; sharp artwork can resolve afterward. If session storage is unavailable, entry is skipped. Testing is Chromium-based, not physical-device, Safari/Firefox or Lighthouse certification. No new feature phase, protected route, audio, CMS or analytics expansion is included.
