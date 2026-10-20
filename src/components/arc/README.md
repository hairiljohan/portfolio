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
