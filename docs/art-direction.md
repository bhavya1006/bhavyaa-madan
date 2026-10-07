# Task 2B art direction

## References and composition

`reference-hero.png` informs the integrated live headline, seated figure, urban fragments and coral swoosh. `reference-sections-grid.png` informs the four connected scenes: dominant Work spread, quiet About portrait, Design-first capabilities ribbon, and closing skyline. Neither reference is shipped as page UI.

## Assets and provenance

Generated with the built-in image generation tool using the supplied visual references; no CLI or additional dependencies. The three independent assets live in `public/art/` and are rendered with Next Image. All text, navigation, project links, frames and routes remain HTML/CSS/SVG. The designer is an original fictional character, not a verified portrait of Bhavya. City and desk images are decorative settings, not real project screenshots. Original PNGs are retained; Next Image supplies responsive optimized renditions.

- `public/art/designer-ink.png`: transparent character; reused with different crops.
- `public/art/city-ink.png`: environmental linework.
- `public/art/desk-ink.png`: sketching scene.

## Static path

One reusable component contains a segment per section. Shared boundary coordinates keep the route joined as section heights change. Paths are decorative, noninteractive and unanimated; later spatial motion will require geometry adapted to the chosen interaction model.

## Generation prompts

### Character

Create a standalone website illustration asset, NOT a website screenshot or poster. Use the supplied image solely as manga ink-line style and pose direction. An original thoughtful young adult creative designer with tousled black hair, seated on a low ledge, three-quarter view looking slightly upward left, casual structured jacket over plain tee, forearm resting on knee, professional and contemplative. Strong silhouette, exquisite hand-drawn black ink contours, crosshatching, rough brush shadows, warm off-white highlights. Portrait-oriented composition, full head and torso and bent knee visible, figure filling frame; no surroundings beyond a small stone ledge at the lower edge. Transparent background outside the figure. Monochrome black and warm off-white ONLY. No lettering, no logos, no recognizable franchise, no UI, no typography, no colored background. This is an illustrative character, not a verified likeness of the portfolio owner. Keep the head in upper third and the pose open to left so live HTML headline can sit beside the figure.

### Urban environment

Standalone panoramic ink illustration asset for an editable designer portfolio, NOT a website or poster. Use reference only for art style. A contemporary urban neighborhood viewed from a rooftop: architectural facades, railings, overhead wires, distant train on elevated track, a few leafy branches in upper corner, two small birds against mostly open warm off-white sky. Hand-drawn manga-inspired black ink, bold brush shadows, refined crosshatching, lightly distressed paper texture. Landscape 3:2 composition with skyline in middle and lower half, ample sky. Black and warm off-white monochrome only, no color (coral will be layered in CSS), no words, no lettering, no signs, no UI, no logos, no figures or franchise references. Treat as environmental storytelling art, not a screenshot of a real project.

### Creative workspace

Standalone wide manga-inspired black-ink illustration asset for a designer's capabilities section, NOT a UI poster. Close-up scene of a hand holding a pencil over loose paper with abstract interface layout sketches on a wooden creative workspace; notebook, plain mug, a laptop edge and bright window with plant leaves. Deliberate hand-drawn black contours, expressive crosshatching, dry brush texture, warm off-white paper highlights, sophisticated editorial manga energy. Cropped cinematic landscape composition, hand and sketchbook foreground. Monochrome only, no colored fills, no words, no legible writing, no logos, no project names, no imaginary metrics, no finished app screenshot. The loose diagrams must look like generic pencil studies, not claimed project work.

