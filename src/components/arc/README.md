# Arc UI controls

Source-installed from Arc UI's public registry on 20 October 2026:

- Button: https://uiarc.dev/r/button.json
- Segmented control: https://uiarc.dev/r/segmented-control.json
- Motion tokens: https://uiarc.dev/r/arc-motion-tokens.json

The component TypeScript and CSS Modules retain the upstream implementations.
The shared motion-token export lives in `lib/motion-tokens.ts` to match their
relative imports.

`foundation.css` is a scoped integration layer mapping the tokens these controls
use to the portfolio's custom CSS theme. It replaces the full Arc foundation's
global resets and unrelated palettes. Both components use the shared `motion`
dependency and their upstream reduced-motion behavior.

Usage: the header wraps these controls in `.arc-controls`. The button controls
mobile navigation; the segmented control selects System, Light, or Dark through
the existing persisted theme hook. Navigation links remain anchors.

## Mobile menu icon — 21 October 2026

Icon Morph was added from https://uiarc.dev/r/icon-morph.json after source inspection.
Only `MenuIcon` is imported; it animates the hamburger into a close icon and
respects reduced motion. The mobile panel now uses beUI Bottom Sheet. The former
Arc Drawer source and its Radix Dialog dependency have been removed.

## Section titles and tooltips — 22 October 2026

- In-view Title: https://uiarc.dev/r/in-view-title.json
- Tooltip: https://uiarc.dev/r/tooltip.json

Complete registry sources were inspected and copied. Section headings use the
default once-only blur reveal, retaining their h2 semantics and anchor IDs.
The wrapper uses portfolio colors and aligns to the start of grid sections so
the observer measures the heading rather than the adjacent text column.

Carousel arrow buttons use the Radix-backed Tooltip, including hover/focus
activation and Escape dismissal. Portal styles map Arc tokens locally to the
portfolio palette. Both components retain upstream reduced-motion behavior.
The existing native scroll-snap carousel remains in place; arrow stepping now
reads the current scroll position to avoid stale state during rapid keypresses.
