# Portfolio redesign and custom CSS migration

Status: agreed direction; implementation has not started.

## Branch and deployment workflow

- Work and commit on `codex/portfolio-redesign`.
- `main` is the Vercel production branch. Do not commit redesign work directly to it.
- Local edits and commits do not trigger Git deployments.
- Push the redesign branch when an online preview is wanted; under the standard Vercel Git integration this creates a preview deployment.
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
- Remove the decorative custom cursor.
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
2. Selected projects
3. About
4. Skills and interests
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

- Present the existing five projects as spacious image-and-text previews rather than a fixed-height carousel.
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

This document records the plan. Creating it does not implement the redesign or authorize publishing the site.
