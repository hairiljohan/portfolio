# beUI components

Adapted from the complete component sources and supporting helpers returned by
beUI's public MCP on 20 October 2026:

- Shared Layout Background: https://beui.dev/components/motion/shared-layout-bg
- Text Reveal: https://beui.dev/components/motion/text-animation
- Project Folder: https://beui.dev/components/blocks/project-folder

Installable registry names: `shared-layout-bg`, `text-reveal`, `project-folder`.
The larger text-animation catalog also contains other effects; only Text Reveal
is used here.

## Portfolio adaptations

- Replaced Tailwind classes with colocated CSS Modules using the existing
  light/dark theme tokens. `cn` retains `clsx`; utility merging is unnecessary.
  Shared easing constants and the hover-capability hook remain local helpers.
- Shared Layout Background wraps the navigation's list items, retaining real
  anchor links and keyboard focus feedback. Pointer feedback is gated on a
  hover-capable device. The decorative layer is hidden from assistive technology.
- Text Reveal animates the hero name once with a 6px offset and a 2px blur.
  The hero uses a 200ms lead-in, a 1.1s fade, and a 100ms word stagger for a
  roughly 1.4s reveal. Reduced motion renders it immediately without a delay.
- Project Folder retains beUI's fan, shared-layout transition, focus trap,
  Escape dismissal and focus restoration. The gallery uses larger responsive
  image panels and exposes every image and caption; the closed fan alone is
  limited to five previews. The application root becomes inert while open.
- `ScreenshotFolder` supplies existing project images and captions. Hero imagery
  and public project links remain ordinary page content.

Motion is shared with the existing Arc UI controls. `clsx` is the only added
package; Tailwind is not reinstated.

## Bottom Sheet — 21 October 2026

Source: https://beui.dev/components/motion/bottom-sheet, obtained from the public
MCP with its focus-trap, presence-gate, touch, easing, and utility helpers.

The mobile menu uses a content-sized sheet with a downward drag handle, backdrop
and Escape dismissal, and an explicit close button. Existing theme and navigation
controls remain. Tailwind utility styles were translated to CSS Modules; shared
helpers were preserved rather than overwritten. The touch helper exports the
local class hook, with touch CSS colocated in the sheet module.

Portfolio adaptations add an accessible trigger target ID, close button, dynamic
viewport sizing and safe-area padding. The application root is inert while open.
The fixed-body scroll lock runs in a layout effect and restores the position
instantly; same-page links flush closing before native anchor navigation so the
lock cannot overwrite their destination. Focus returns without scrolling.
The backdrop and sheet use a short opacity fade with reduced motion.

## Expanding Arrow Link — 22 October 2026

Source: https://beui.dev/components/motion/expanding-arrow-button, obtained as
complete source from the public MCP. Adapted from a button to a typed motion
anchor for the hero and selected-project links, preserving native navigation,
modifier clicks, accessible link names and ref forwarding.

Tailwind styles were translated to CSS Modules using navy/magenta accent tokens.
The spring expansion, dotted-chevron trail and press feedback are retained.
Labels wrap for long project names on mobile. Expansion responds to a hover-
capable pointer or visible keyboard focus; reduced motion retains the static
label and icon. Existing easing, hover and utility helpers are reused.
