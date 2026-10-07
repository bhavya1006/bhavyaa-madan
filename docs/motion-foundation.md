# Task 3 — motion foundation

The approved composition is unchanged. No dependencies were added: native passive scroll observation, requestAnimationFrame, ResizeObserver, matchMedia and a one-shot Web Animation cover this layer.

## Controller and progress

`components/portfolio/journey-motion.tsx` is a null-rendering client controller inside the server-rendered page. A single pending frame coalesces scroll, pointer and resize events. It publishes normalized document progress (0–1) as `--journey-progress`; there is no per-frame React state or continuous idle loop. Layout reads are batched on resize/content-size changes, independently of per-frame style writes. Cleanup removes observers, listeners, styles and the endpoint animation.

`lib/portfolio/motion.ts` owns FAST (160ms), NORMAL (420ms), SLOW (700ms), editorial/settle easing and scene translation amplitudes. Scroll-driven drawing has no duration or lag: it tracks the input directly. Entrance transforms ease spatially with a cubic settle, rather than starting unrelated time-based animations.

## Path

Five section-local SVG paths retain the approved geometry. Adjacent entry/exit coordinates match (70, 1080, 130, 1000) across identical section widths. Rounded stroke ends meet at the boundaries. Each path uses `pathLength=1` and normalized dash offsets. One reading position, derived from document progress, advances through the section boundaries; a following segment cannot begin until the previous one finishes. Backwards scrolling reverses the drawing. The last segment reaches its dot at the page bottom, and the dot settles once per component mount. Reload/history restoration and resizing recompute from the current scroll position.

## Scene behavior

- Hero: headline drifts up to 18px, figure counter-moves by 8.1px, coral sun moves by 12px in the opposite direction. On mobile these shrink to 3px, 1.35px and 2px.
- Work: heading moves from the left by at most 22px; featured environment settles vertically by 18px. Supporting projects approach from different directions at 6–12px. Approved static rotations stay intact.
- About: copy settles by 8px, portrait by 6px with a shallow 7% bottom clip; no opacity hiding or motion on every detail.
- Capabilities: Design ribbon slides 20px toward its existing position; Development and AI settle by 7px.
- Contact: copy settles by 8px, then the arriving line triggers a single 700ms endpoint settle.
- Fine mouse pointers above 768px rotate project panels by at most 1.25 degrees and move the arrow 2px. Leaving, scrolling, resizing or changing input preferences resets the tilt. Touch events never tilt panels.

At 768px and below entrance translations reduce to 30%; all scrolling remains natural vertical scrolling. Reduced motion immediately shows the complete line and dot, clears entrances/clipping, and disables parallax, tilt and endpoint animation. Without JavaScript the entire static design remains readable.

## Validation and limits

Browser checks cover both themes at 390, 768, 1024 and 1440px, sequential drawing, backwards/rapid scrolling, resize, halfway refresh, hash history, keyboard navigation, project destinations, pointer reset, runtime preference changes and the no-JavaScript fallback. Screenshots are captured at multiple desktop scroll positions and on mobile. This is Chromium validation, not a real-device or cross-browser performance certification.

Local path length is normalized in SVG coordinates; non-uniform responsive scaling means apparent drawing speed can vary around curves. Some line portions intentionally pass behind artwork. Geometry will need reevaluation if Task 4 changes the scene layout or introduces a camera. There is no camera, pinning, scroll hijacking, cursor, loader, audio or route transition in this task.
