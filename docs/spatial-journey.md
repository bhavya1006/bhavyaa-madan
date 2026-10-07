# Task 4 — spatial manga journey

## Architecture

The existing `JourneyMotion` controller still owns the single passive scroll listener and animation-frame scheduler. `createSpatialController` plugs into its configure / measure / render phases. Native document scrolling remains authoritative; no wheel interception, smooth-scroll library, custom physics, game engine or new dependency is involved.

The same project DOM becomes an authored CSS Grid spread at widths of at least 1024px with motion enabled. Work has a native sticky, clipped viewport and an inner camera layer. Only that layer receives the large translate3d/scale transform. Root progress remains normalized over the document; local Work progress is normalized over its measured scroll range.

## Geometry and stops

The Work world measures 2400 × 1800 design units, arranged on a 24 × 18 grid of 100-unit tracks. `camera.ts` owns the dimensions, framing scale, route geometry, named camera stops and project-to-stop mapping. CSS grid positions remain in the spatial block of `globals.css`. The world scales to available width and height without changing project order. The chapter allocates 4.5 viewport heights of travel plus one viewport for natural sticky release; this is measured again on resize.

| Stop | Chapter progress | Composition |
| --- | --- | --- |
| work-intro | 0 | Work title and dominant Legal Connect scene |
| legal | .16 | Legal Connect; next design panel begins to approach |
| vitamin-c | .34 | Coral design panel with neighboring art fragments |
| traveless | .51 | Downward diagonal into Traveless |
| pre-dap | .67 | Left/down turn toward Pre Dap |
| development-cluster | .88 | FlowSync and Water Supply together |
| work-exit | 1 | Camera settles, line completes, sticky releases |

Each interval uses smoothstep interpolation, directly evaluated from scroll position. There is no delayed camera catch-up. Scale is a responsive framing factor, not an animated zoom, and the camera never rotates. Several projects/art fragments remain in view at once. Distant panels recede only to 82% opacity; the focused panel stays opaque. New projects without authored stops automatically disable the camera layout so additional content cannot be stranded outside its route.

## Path and surrounding chapters

The desktop Work route lives inside the transformed world. Each camera keyframe includes a draw fraction, interpolated by the same easing and progress as the camera. Its entrance aligns with the Hero route and its exit approaches About's entry. The original local Work SVG remains the vertical-layout fallback. After sticky release, the reading position maps the remaining document to the Contact endpoint, so the line completes at the page bottom.

Hero remains vertical with Task 3 parallax. About stays calm and unpinned. Capabilities receives a short, unpinned diagonal shift of 36px horizontally and 16px vertically across its passage; it replaces, rather than adds to, its previous entrance translations. Contact stays stable and keeps the one-time endpoint settle.

## Input, accessibility and restoration

Project links remain real data-driven anchors. Keyboard-visible focus selects the matching Work stop through native document scrolling; mouse focus does not reposition a panel during a click. Tab order is unchanged, including separate previews. A persistent Continue to About anchor provides an immediate exit. Chapter navigation uses normal hashes/history, with initial hash alignment performed after enhanced geometry is measured.

Pointer tilt resets on scroll and is suppressed for 140ms after the latest scroll event. It resumes only on subsequent fine-mouse movement. Camera position is preserved across desktop resizes; switching to mobile or reduced motion while in Work places the nearest project into normal view. A tab-scoped session-storage snapshot on pagehide restores Work progress on reload/back-forward navigation, without modifying browser history. If storage is unavailable, native restoration remains the fallback.

Below 1024px there is no camera or pinning: the Task 3 layout and drawing remain. Reduced motion and no JavaScript render all six projects in normal document flow. The complete route remains available in reduced motion. No animation is required to discover content.

## Debugging and performance

In development, append `?cameraDebug` to inspect local progress, named stop and camera X/Y. The code is guarded by `NODE_ENV === "development"`; no debug output is created in production.

Geometry is cached and recalculated on viewport/content resizing. Frame writes primarily update the camera transform, path stroke and six inexpensive opacity values. No animated filters, blur, width, height or per-frame React state are used. Resize can force a layout measurement after the enhancement mode changes; ordinary scroll frames do not measure scene layout. There is no idle animation loop. Event listeners, styles and the debug node are cleaned up.

## Validation and limits

Chromium checks cover 1024, 1280, 1440 and 1920px in both themes, plus 390/768px vertical fallbacks; wheel and rapid/reverse scrolling; Tab through Work; real project navigation; chapter hashes/history; direct hash loading; resizing and refresh during Work; and runtime reduced-motion changes. The 1440px recording demonstrates the actual browser-rendered journey.

This is an authored composition, so future projects need deliberate grid positions, route changes and camera stops before spatial mode is reenabled. Apparent path speed varies around curves, and decorative fragments may crop at the viewport edges. Physical-device testing and Safari/Firefox profiling remain outside this Chromium verification. Full camera rotation, free panning, loaders, transitions, custom cursors, audio, WebGL and protected routes are not included.
