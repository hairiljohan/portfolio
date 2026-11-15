# RepoWatch

RepoWatch is a macOS SwiftUI dashboard for monitoring GitHub repositories. It tracks repository metadata, latest releases, latest commits, star counts, fork status, fetch errors, and refresh state.

Repos are stored locally with SwiftData. GitHub data is fetched with unauthenticated async `URLSession` calls through a `GitHubService` actor, so GitHub's public API rate limits apply.

## Features

- Add repositories by `owner/repo` slug or full GitHub URL.
- Prevent duplicate repos case-insensitively.
- Refresh repos concurrently, sharing in-flight work across windows and limiting GitHub requests to six at a time.
- Honor GitHub rate-limit cooldowns without automatic retry loops.
- Treat latest-release `404` as “no release” instead of an error.
- Show typed GitHub errors for unauthorized requests, rate limits, and missing repos.
- Persist repos, custom sidebar order, and fetched metadata with SwiftData. Failed saves stay visible with a Retry Save action; pending changes remain available until saved or the app exits.
- Drag repos in the sidebar to reorder them.
- Right-click or toolbar-remove repos.
- Show owner/org avatars in the sidebar.
- Mark rows when a refresh detects a new release, including a first release after a successful no-release check.
- Show compact last-checked text such as `Just now`, `12m ago`, or `Never`, updated every minute while the window is active.

## Project Structure

```text
RepoWatch.xcodeproj/
RepoWatch/
  App/
    RepoWatchApp.swift
  Models/
    RepoEntry.swift
  Services/
    GitHubService.swift
  ViewModels/
    DashboardViewModel.swift
  Views/
    DashboardView.swift
    RepoRowView.swift
    RepoDetailView.swift
    AddRepoView.swift
  Support/
    RepoInputParser.swift
    Formatters.swift
  RepoWatch.entitlements
RepoWatchTests/
  RepoInputParserTests.swift
  GitHubServiceTests.swift
  DashboardViewModelTests.swift
scripts/
  build.sh
  install-app.sh
```

## Scripts

### `scripts/build.sh`

Builds the app with `xcodebuild`:

```bash
scripts/build.sh
```

It builds the `RepoWatch` scheme for macOS and writes DerivedData under:

```text
.build/DerivedData
```

The debug app bundle is produced at:

```text
.build/DerivedData/Build/Products/Debug/RepoWatch.app
```

### `scripts/install-app.sh`

Builds, installs, launches, and cleans up the local app:

```bash
scripts/install-app.sh
```

By default, it:

- runs `scripts/build.sh`
- quits a running `RepoWatch` app if one exists
- copies the built app to `/Applications/RepoWatch.app`
- launches `/Applications/RepoWatch.app`
- removes `.build` afterward to save disk space

Optional overrides:

```bash
OPEN_AFTER=0 scripts/install-app.sh
CLEAN_BUILD=0 scripts/install-app.sh
DEST_APP="$HOME/Applications/RepoWatch.app" scripts/install-app.sh
```

## Tests

Run the XCTest suite with:

```bash
xcodebuild test \
  -project RepoWatch.xcodeproj \
  -scheme RepoWatch \
  -destination 'platform=macOS' \
  -derivedDataPath .build/DerivedData
```

## Requirements

- macOS 26 or newer
- Xcode 26 or newer
- No third-party dependencies
