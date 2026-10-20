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

## Mobile drawer — 21 October 2026

Added Drawer and Icon Morph from the public registry after inspecting them with
`shadcn view`:

- https://uiarc.dev/r/drawer.json
- https://uiarc.dev/r/icon-morph.json

Their source and CSS Modules retain the upstream implementations. Drawer adds
`@radix-ui/react-dialog` for modal focus management, scroll locking, and Escape
handling, and reuses the existing Motion dependency. Only `MenuIcon` is imported
from the icon collection; unused icons can be tree-shaken.

The portalled drawer receives `.arc-controls` directly so its theme tokens remain
available outside the header. The header supplies large semantic navigation links,
a theme selector, and a no-scroll focus return callback for the sticky trigger.
At desktop widths the drawer closes and the inline navigation and theme selector
remain available. The source uses its upstream header drag-to-dismiss behavior;
reduced motion uses an opacity fade and disables dragging.
