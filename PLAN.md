# Portfolio redesign and custom CSS migration

Status: implemented and verified locally on `portfolio-redesign`. Hosted preview and production release remain pending explicit instruction.

## Implementation record — 20 October 2026

The original plan below has been implemented across the homepage and all five project pages. The presentation now uses custom CSS tokens and CSS Modules, Inter typography, spacious project previews, shared project-page components, and light/dark/system themes. Engineering, software projects, and personal interests remain part of the homepage.

- Preserved the six public URLs, existing section anchors, project content, metadata, external links, and embedded Launch Console demonstration.
- Replaced the carousel and decorative cursor with ordinary page flow. Removed Tailwind, obsolete components and helpers, and the unused font.
- Added an authentic Launch Console screenshot. Replaced the cleanup GIF with a controlled, non-autoplaying MP4 and static poster (approximately 185KB + 14KB versus 2.7MB for one original GIF).
- Integrated Arc UI's source-installed Button for mobile navigation and SegmentedControl for System/Light/Dark theme selection. Both share Motion and retain their upstream reduced-motion behavior. A scoped foundation maps their tokens to the portfolio themes.
- Reused the requested branch and checkout. Unrelated untracked skill files were excluded from the work. Deployment configuration and legacy demo files were unchanged.

### Local verification

`npm test` passes all 3 theme-initialization tests. `npm run typecheck`, `npm run lint`, and `npm run build` pass. The browser suite now includes 62 tests across Chromium and WebKit, covering the Arc controls, beUI interactions, and homepage reload position.

Browser coverage includes all six routes, both themes, 360/390/768/1024/1440px widths, mobile landscape, 200% text scaling, reduced motion, persisted/system themes, blocked storage, original hashes and browser back, mobile disclosure keyboard traversal and Escape focus restoration, image loading, and the embedded console command flow. Axe checks pass on the portfolio pages in both themes and engines; the unchanged legacy iframe is excluded from automated accessibility scanning. Cleanup video playback was also checked directly.

The final review identified a mobile menu tab-order issue. Moving the trigger before the navigation fixed it, with a regression test. On macOS WebKit, that test uses Option+Tab to follow the browser's default link-navigation behavior.

Visual inspection compared desktop and mobile renders with the supplied references. The implementation retains their quiet hierarchy, generous spacing, neutral surfaces, and image framing while using personal content, accessible muted text, and the agreed blue accent. Native Safari itself has not been separately tested; WebKit engine coverage is included.

Before Arc integration, summed gzip sizes across all emitted entry-point chunks decreased from 99.38KB to 79.39KB for JavaScript and from 7.68KB to 4.23KB for CSS. The later Arc integration adds approximately 54KB of shared gzipped JavaScript and 1.2KB of CSS; this tradeoff is accepted to honor the user's preference for library controls. These are build-artifact totals, not initial-page transfer measurements or performance scores.

Baseline screenshots are in `/tmp/portfolio-baseline`, final screenshots in `/tmp/portfolio-final`, and the baseline Git commit is `b9b6489`. Temporary screenshot files may be removed by the operating system; the source history remains in Git.

### Review and release

Run `npm run dev` for local review. Browser testing requires the Playwright Chromium and WebKit binaries. The remaining release work is to inspect an explicitly requested hosted preview and approve production publication. Nothing in this record authorizes a push, deployment, or merge into `main`.

Follow-up: moved About, skills, and interests ahead of Selected projects at the user's request. The introduction remains first and contact remains last. Added a mount-time anchor fallback for WebKit when back navigation restores a hash URL before its target is rendered; existing nonzero scroll positions remain intact.

Follow-up: the user explicitly requested Arc UI or similar React library components. This supersedes the initial native-button fallback. The final implementation retains Arc and Motion, with source provenance and integration notes in `src/components/arc/README.md`. At narrow mobile widths the menu uses its icon and accessible label to leave room for all three visible theme choices.

Follow-up: added all three requested beUI components. Shared Layout Background highlights navigation on hover or focus; Text Reveal animates the hero name once; Project Folder presents four screenshot collections on the Private Local AI and Container Update Helper pages. Existing captions, prominent imagery, project URLs, and section order are preserved. The source is adapted to CSS Modules and both themes, with immediate reduced-motion text and accessible modal focus handling. Source provenance and adaptations are recorded in `src/components/beui/README.md`.

Follow-up — 21 October 2026: slowed the hero name reveal to approximately 1.4s, including its lead-in and word stagger. Ordinary homepage visits and reloads now start at the hero instead of restoring a scrolled position. Explicit section hashes and browser history traversal retain their existing behavior. A Chromium regression test reproduced the reload issue before the fix; both browser engines pass it after the fix.

Follow-up — 21 October 2026: replaced the mobile disclosure with Arc UI’s right-side Drawer and morphing MenuIcon. About, Work, and Contact use large links with the existing theme selector below. Added Radix Dialog, scoped portal theme tokens, and scroll-safe focus restoration. Desktop navigation remains inline. Browser coverage includes mobile touch navigation from project pages, both themes, modal accessibility, reduced/full motion, close and Escape focus return, scroll preservation, and resize cleanup.

Follow-up — 21 October 2026: replaced the Arc mobile Drawer with the requested beUI Bottom Sheet, retaining Arc’s animated hamburger and theme selector. The sheet sizes to its content, supports downward drag dismissal, and provides an explicit close button. Adapted beUI source to CSS Modules, inert background content, dynamic viewport height, safe-area padding, and scroll-safe anchor navigation. Removed the superseded Arc Drawer and Radix Dialog dependency. Browser tests cover drag dismissal and short-screen scrolling in addition to the existing menu flows.

Follow-up — 21 October 2026: changed the shared accent to the user-requested `rgb(7, 55, 105)` in both themes and kept white text on accent-filled hover states. Build and lint pass; light-theme accessibility checks pass in Chromium and WebKit. The exact navy produces known dark-theme text-contrast failures, so the earlier all-accessibility-passing record no longer describes this palette. No lighter dark-theme substitute was introduced.

Follow-up — 21 October 2026: changed only the dark-theme accent to the requested `rgb(197, 0, 106)`, retaining `rgb(7, 55, 105)` in light mode. Build and lint pass. Light-theme accessibility checks pass in Chromium and WebKit; small accent text in dark mode still fails contrast checks with this exact magenta.

Follow-up — 21 October 2026: retained Launch Console as the full-width featured project and placed the remaining four in a carousel below it, following the user's approved recommendation. Desktop shows two cards; mobile shows one with a preview of the next. Native scroll snapping supports touch and trackpad scrolling, previous/next buttons, keyboard arrows/Home/End, and focus-driven scrolling to off-screen project links. Existing Arc buttons provide subtle control motion; reduced motion makes programmatic scrolling immediate. No autoplay, new dependencies, or Animate UI conversions were added. Updated the earlier carousel-removal decision for this limited project section. Verified an emulated Chromium touch swipe in addition to the browser suite. Carousel checks passed 18/18 repeated runs across Chromium and WebKit after fixing pending scroll/snap navigation immediately following resize. Build, typecheck, lint, and unit tests pass. The existing requested dark accent's contrast failures remain a separate known issue.

The sections below preserve the agreed plan with that updated homepage order; source line references describe the pre-redesign baseline.

## Branch and deployment workflow

- Work and commit on `portfolio-redesign`.
- `main` is the Vercel production branch. Do not commit redesign work directly to it.
- Local edits and commits do not trigger Git deployments.
- Automatic Git deployments are disabled for `portfolio-redesign` in `vercel.json`; pushing this branch with that configuration will not automatically create a preview deployment.
- Request a manual preview deployment or explicitly re-enable automatic deployments when an online preview is wanted. Other branches, including `main`, retain their existing deployment behavior.
- Merge into `main` only when the redesign is ready and release is explicitly requested. That merge triggers the production deployment.
- Creating this branch and committing the plan do not push, merge, or publish anything.

## Direction and decisions

**Recommendation: a hybrid rebuild.** Rebuild the presentation while retaining the existing application foundation, content, project URLs, and useful behavior.

The repository already has React, TypeScript, and Vite, with six page entry points. Those provide a suitable foundation for the redesign. See `package.json:12` and `vite.config.ts:13`.

### Agreed direction

- Monocle-inspired typography, generous spacing, restrained surfaces, and prominent project imagery.
- A balanced personal portfolio covering engineering, software projects, and interests.
- Both light and dark themes.
- Custom CSS, npm, and support for recent Safari and Chromium browsers.

### Recommended defaults

- Retain all six pages, existing content, and public URLs.
- Use Inter throughout, with a restrained blue accent.
- Use the later user-requested rounded triangular native cursor on fine-pointer, hover-capable devices. No circle, trail, or pointer-following animation; preserve native form, disabled-control, touch and forced-colors behavior.
- Avoid autoplay, scroll hijacking, and continuous background animation.
- Use authentic project imagery rather than copying imagery from the reference websites.

Removing Tailwind is a maintainability preference, not an automatic performance improvement. The benefit depends on replacing it with consistent tokens and reusable styles.

## Implementation sequence

### 1. Record a baseline before changing the design

- Capture every page at desktop and mobile sizes, in both themes.
- Record existing links, section anchors, metadata, project interactions, build sizes, and test results.
- Create a dedicated redesign branch and retain a known-good release for rollback.

### 2. Establish the homepage layout

Use this order:

1. Introduction
2. About
3. Skills and interests
4. Selected projects
5. Contact

Keep the hero left-aligned, with your name, a concise introduction, and “View projects” and “Get in touch” links. Use authentic project screenshots as the main visual material. Preserve existing section anchors even where sections move. The current composition is in `src/App.tsx:68`.

### 3. Define the visual system before building sections

- Use a roughly 72rem content width, fluid headings, comfortable reading widths, and generous section spacing.
- Choose off-white and charcoal surfaces with accessible muted text.
- Use modest radii and soft shadows for project imagery.
- Translate the same hierarchy into dark mode instead of simply inverting colors.
- Avoid reproducing the references’ low-contrast text.

### 4. Build a representative section first

Implement the navigation, hero, and one project preview in both themes and at mobile and desktop widths. This establishes typography, spacing, buttons, imagery, and motion before applying them across six pages. Adjust this small sample before continuing.

### 5. Add third-party components selectively

Start with **Arc UI’s button**, used for actual actions such as navigation disclosure controls. Keep navigation links as anchors. Build the portfolio layouts and project previews with custom components.

Arc documents source installation through shadcn and a shared foundation stylesheet. Inspect that stylesheet and map its tokens to the portfolio palette before importing it through the shared entry stylesheet. See [Arc installation guidance](https://uiarc.dev/docs/ai).

During implementation, run commands from the folder containing `package.json`:

```bash
# Inspect the proposed changes first.
npx shadcn@latest add https://uiarc.dev/r/button.json --dry-run

# Add the reviewed component after configuring the project.
npx shadcn@latest add https://uiarc.dev/r/button.json
```

Configure the installer for the existing TypeScript aliases and CSS entry. Do not accept unrelated framework setup or overwrite existing files blindly. The CLI supports previews of files and CSS changes. See [shadcn CLI documentation](https://ui.shadcn.com/docs/cli).

Keep npm and its lockfile. Do not install beUI alerts or OTP inputs without a real portfolio use case. If Arc introduces incompatible requirements or substantial global styling, replace this small button dependency with a local CSS implementation.

### 6. Build the shared navigation and theme behavior

- Use a compact header with Work, About, and Contact links.
- On mobile, use an expandable navigation section with a labeled button and `aria-expanded`; hidden links must leave the tab order.
- Support Escape and return focus to the trigger when appropriate.
- Retain light, dark, and system choices, persistence, and theme initialization before first paint.

### 7. Rebuild the homepage around real work

- Keep Launch Console as the spacious featured project. Present the other four as a manually controlled, responsive carousel using native CSS scroll snapping.
- Stack previews on mobile.
- Include a title, concise purpose, relevant technologies, and a clear project link in each preview.
- Remove the “future ideas” placeholder from the main showcase.
- Keep skills and interests concise without inventing achievements or proficiency ratings.

### 8. Unify the project detail pages

Create a shared page shell for the heading, summary, metadata, screenshots, content sections, and related navigation. Preserve project-specific explanations and the Launch Console demonstration.

Use a common typed project model for titles, URLs, summaries, images, and tags. Allow custom content for exceptional layouts rather than accumulating boolean props.

Keep existing public URLs. No new router, CMS, backend, or contact form is required.

### 9. Add a small, consistent motion system

Use CSS for hover, focus, and color transitions. Use a single Motion dependency for selected React animations where needed.

Default behavior:

- Controls: approximately 150–200ms transitions.
- Section entrances: approximately 300ms, with no more than 12px movement.
- Entrance animations run once; content remains available if animation fails.
- Reduced-motion mode removes movement, stagger, and smooth scrolling.
- No animated full-page blur, parallax, or delayed access to content.

**Do not run `animate all`.** Animate UI’s current CLI transforms supported component implementations; it is not simply an “install the animation library” command. It would overlap with this deliberately small motion system. See [Animate UI CLI documentation](https://animate-ui.com/docs/cli).

### 10. Complete the CSS migration, then remove Tailwind

- Migrate shared controls first, followed by the homepage and detail pages.
- Allow temporary coexistence while pages are being converted.
- Remove utility strings from content data and replace them with semantic variants.
- Only remove Tailwind, its configuration, directives, and helper utilities after every page has been migrated.
- Review PostCSS and other build dependencies separately; remove packages only when their remaining use has been checked.

### 11. Optimize assets and remove obsolete code

- Give images explicit dimensions or aspect ratios.
- Load prominent imagery eagerly and defer lower-page images.
- Replace large animated GIF delivery with a compact video and static poster where appropriate; provide controls and reduced-motion behavior.
- Remove duplicate assets, unreachable modules, superseded visual components, and unused fonts.
- Preserve assets used by the embedded demonstration.

### 12. Validate the complete redesign and release through preview

Run the checks below, inspect a preview deployment, and fix regressions before replacing the live site. Keep the previous deployment available for rollback.

## CSS architecture and component boundaries

Use this proposed structure under the existing source directory:

```text
styles/
  tokens.css       Colors, typography, spacing, radii, shadows, motion
  reset.css        Minimal browser normalization
  base.css         Document styles, typography, links, focus
  layout.css       Shared container and section layout
  global.css       Ordered imports and theme integration

components/
  ui/              Small shared controls
  layout/          Header, footer, page and section shells
  projects/        Project previews and detail-page presentation
  ...              Component.module.css beside each component
```

Use CSS Modules for component styles and descriptive names such as `.projectPreview` and `.media`. Keep global selectors limited to document defaults, theme tokens, and shared layout primitives.

Use semantic variables such as `--color-background`, `--color-text-muted`, `--color-accent`, and `--space-section`. Theme changes override variables on the document root. Avoid a second set of unrelated provider tokens.

**Interface changes:** shared presentation components and typed project data replace repeated page markup and styling fields. Existing URLs, content meaning, and external links remain stable.

## Verification, risks, and completion criteria

### Required checks

- **Navigation:** all six pages load directly; existing hashes, back navigation, external links, and the embedded demonstration work.
- **Accessibility:** keyboard access, visible focus, meaningful headings, image alternatives, accessible contrast, and 200% zoom work in both themes.
- **Responsive behavior:** check 360px, 390px, 768px, 1024px, and 1440px widths, plus mobile landscape. No clipped text or unintended horizontal scrolling.
- **Motion and themes:** test reduced motion, system theme changes, persisted preferences, and first-load theme appearance.
- **Engineering checks:** production build, TypeScript, existing tests, and lint pass. Add focused browser tests for navigation, mobile disclosure, and theme persistence. Establish lint configuration as part of implementation where needed.
- **Performance:** compare the same pages and conditions against the baseline. Inspect transferred JavaScript, CSS, image sizes, layout shifts, and animation smoothness. Investigate regressions before release.
- **Migration completion:** no remaining Tailwind dependency, directives, utility helpers, or components relying on its generated styles.

### Main risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Provider CSS changes global styles | Inspect the shared foundation, map its tokens, and validate the representative section before expanding usage. |
| Theme flashes or inconsistent dark styling | Initialize theme before first paint and test persisted and system preferences on every page. |
| Broken anchors after rearranging content | Preserve existing IDs and test direct hash navigation and browser back behavior. |
| Animation or imagery increases loading cost | Use restrained motion, optimize assets, and compare production measurements against the baseline. |
| Removing Tailwind breaks unmigrated pages | Migrate in stages and remove the dependency only after all six pages pass verification. |

### Estimate

Approximately **6–9 focused working days** using existing content and assets, including refinement and testing. This is an estimate, not a repository finding. New photography, extensive copywriting, or additional interactive features would increase it.

This document records the agreed plan and its local implementation results. It does not authorize publishing the site.

Follow-up — 21 October 2026: the carousel Next button and Right Arrow key now return to the first project at the end. Previous remains disabled at the beginning. All six carousel browser checks pass across Chromium/WebKit, mobile/desktop, both themes and reduced/full motion. An initial WebKit resize/Home check failed intermittently; the subsequent run with explicit smooth wraparound coverage passed. Typecheck, lint, unit tests and build pass.

Follow-up — 21 October 2026: added the user-referenced rounded triangular cursor without its circular background. Two 28px SVG assets provide a dark pointer in light mode and a light pointer in dark mode, each with a contrasting outline and a 4px hotspot. Shared CSS covers all six portfolio pages and enabled links/buttons, with normal native fallback cursors. No JavaScript tracking, animation or dependencies. Verified SVG decoding, theme changes, all six routes, reduced motion, disabled controls and touch fallback in Chromium/WebKit; forced-colors fallback checked in Chromium. Inspected both rendered assets at native and enlarged sizes. Build and lint pass.

Follow-up — 21 October 2026: reduced both triangle cursor assets from 28px to 24px at the user's request, preserving the shape and theme colors. Adjusted the hotspot from 4px to 3px to match the smaller pointer.

Follow-up — 21 October 2026: reduced both cursor variants from 24px to 22px at the user's request; retained the 3px hotspot and existing shape and colors. Validated both SVG dimensions and syntax.
