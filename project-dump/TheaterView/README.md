# TheaterView

TheaterView is a Manifest V3 web extension that auto-enables theater mode and can select the highest non-Premium quality on eligible YouTube watch pages (`https://www.youtube.com/watch?v=...`). It also selects the **Public** filter on channel Videos tabs when that filter is available.

## Structure

```text
TheaterView/
  README.md
  package.json
  package-lock.json
  docs/
    DEPLOY.md
  extension/
    manifest.json
    content.js
    popup.html
    popup.css
    popup.js
    icons/
      icon-16.png
      icon-32.png
      icon-48.png
      icon-128.png
  SafariApp/
    TheaterView/
      TheaterView/             # macOS host app sources and resources
      TheaterView Extension/   # Safari extension native handler
      TheaterView.xcodeproj/   # Xcode project and workspace metadata
  scripts/
    test.sh
  tests/
    content.test.cjs
    popup.test.cjs
```

See [Safari app deployment](docs/DEPLOY.md) for the Xcode build and installation workflow.

## Behavior

- Uses one content script on `*://www.youtube.com/*`.
- Persists a global toggle in `browser.storage.local.enabled`.
- Persists a highest-quality toggle in `browser.storage.local.autoQualityEnabled`.
- Persists an **Auto Public** toggle in `browser.storage.local.autoPublicEnabled`.
- All three toggles default to on.
- Popup toggle changes are applied immediately on injected YouTube tabs through `browser.storage.onChanged`.
- No background/service worker and no runtime messaging.
- Automation waits for saved settings to load. Theater and quality work pause during navigation and require the watch player's video ID to match the URL before acting.
- Theater mode makes at most three clicks per video visit. Player-wait retries stop after a bounded window; a late-ready player can still receive an immediate attempt within the same click budget.
- On channel Videos tabs, selects **Public** once per visit when available. It waits briefly for delayed filters, skips already selected filters, and leaves subsequent manual filter changes alone. Leaving Videos and returning starts a new visit; sorting and query changes do not.
- Public selection requires **Enable TheaterView** and **Auto Public** to be on, independently of the highest-quality toggle. Turning **Auto Public** off cancels pending selection without changing the current filter. Turning it back on starts a fresh selection attempt on the current channel. Automation pauses while the tab is hidden or unfocused.
- Other pages (including Shorts) are no-op.
- Highest-quality selection uses YouTube's player menu, skips labels containing `Premium`, `Enhanced bitrate`, or `High bitrate`, and may need selector updates if YouTube changes its UI.
- Highest quality is applied once per video visit, including when returning to a previously watched video. If initial retries expire before the player is ready, its media-ready events allow a new bounded attempt. After successful selection, later readiness events leave manual quality choices alone.
- Timestamp, playlist-query, and hash changes for the same video preserve quality completion. Interacting with the player's settings menu hands control to the user for that visit. Pending quality waits and retries are canceled when automation pauses or is disabled.
- Public selection recognizes the English **Public** label in the channel video filter bar. Other YouTube languages are currently left unchanged; changes to YouTube's markup may require selector updates.

## Tests

With Node.js 22.22.2+, 24.15.0+, or 26+ and npm installed, run:

```bash
./scripts/test.sh
```

`npm test` runs the same script. No separate `npm install` or `npm ci` is needed.

The script creates a unique `theaterview-tests.*` directory inside `$TMPDIR` (or `/tmp` when unset) and prints its exact location. It installs the locked development dependencies there using `npm ci`, keeps npm's cache and install logs inside that same directory, and runs the tests against the project source. It removes the temporary directory on success, failure, or an ordinary interruption such as Ctrl+C. It creates no project `node_modules` and does not change the package manifests. Internet access is required on each run because the temporary cache is removed afterward.

If the process is forcibly killed with `kill -9` or the computer shuts down, cleanup cannot run; remove the specific temporary directory printed by that run manually. When invoked through `npm test`, the outer npm command can still use its normal user-level log/cache directory; use `./scripts/test.sh` directly to avoid that extra npm invocation.

Tests execute the content script and popup against DOM fixtures, covering saved settings, Public selection, navigation, delayed controls, manual overrides, cancellation, and theater/quality behavior. jsdom is a development-only dependency; the extension needs no additional runtime dependencies or permissions.

## Safari Temporary Load Workflow (macOS)

1. Enable Safari developer features.
2. Allow unsigned web extensions in Safari developer settings.
3. Add the local `extension/` folder as a temporary extension in Safari.
4. Grant website access for `www.youtube.com`.
5. Reload the extension after local edits.

## Notes

- A YouTube tab opened before extension injection may need a manual reload.
- If Safari website access is not granted for YouTube, the extension cannot run on that tab.
- Temporary Safari-loaded extensions are removed after Safari quits or after 24 hours.
