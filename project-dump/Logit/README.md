# LogIt

A personal macOS utility for viewing your **Open at Login** items, quitting or launching their applications together, and removing blacklisted login entries after their watched apps quit. Requires macOS 26+ and Xcode with a macOS 26+ SDK. No third-party dependencies, developer account, or notarization required.

## Build and run

The main script builds a Release app with `LogIt/Resources/logit.icns`, verifies its signature and icon, installs **`/Applications/LogIt.app`**, then removes both `.build` and the older `DerivedData` folder:

```sh
./scripts/build-app.sh
open /Applications/LogIt.app
```

Build output and errors appear directly in the terminal; the scripts do not save log files or start log-streaming processes. A failed build preserves the previous installed app and intermediate build files. Use `BUILD_CONFIG=Debug` for Debug, or `CLEAN_BUILD=0` to retain both build folders for faster rebuilds. A default clean build closes any older LogIt copy running from this project’s `DerivedData` before removing that folder. Both configuration names also accept lowercase.

The scripts follow the supplied examples, adapted for this native Xcode project:

| Script | Purpose |
| --- | --- |
| `scripts/build-app.sh` | Build, include the icon, install to `/Applications/LogIt.app`, and clean intermediates by default. |
| `scripts/clean_build_artifacts.sh` | Remove `.build` and legacy `DerivedData`; preserve the installed app and source icons. Close any LogIt running from `DerivedData` first. |
| `scripts/import_app_icon.sh /path/to/icon.icns` | Validate and replace the project's `LogIt/Resources/logit.icns`; rebuild to apply it. |
| `scripts/generate_app_icon.sh` | Compile the full-bleed `LogIt/Resources/logit-source.png` with Apple's macOS icon mask into `logit.icns`; rebuild to apply it. |
| `scripts/install_app.sh` | Build and install to `/Applications/LogIt.app`, then open it. |
| `scripts/release_app.sh` | Release build, install, launch, and clean intermediates; optionally import `IMPORT_ICON_SOURCE` first. |
| `scripts/build_and_run.sh` | Debug build, install, and launch from Applications; retain intermediates by default. Used by the Codex Run action. |

All build/run/install scripts accept `DEST_DIR="$HOME/Applications"` for a user-local install. `build-app.sh` installs without launching; `install_app.sh` and `release_app.sh` also launch unless `OPEN_AFTER=0`. `SKIP_BUILD=1` on `install_app.sh` verifies and opens the existing installation without rebuilding. A successful build removes the old project-local `dist/LogIt.app` if it belongs to LogIt; other files in `dist` are preserved. No script requests `sudo`.

The Run script supports `--verify` and `--debug`. A build/cleanup lock prevents simultaneous operations in the same workspace. If a process is killed and leaves `.logit-build.lock`, remove that empty directory only after confirming no script is running.

You can also open `LogIt.xcodeproj` in Xcode and run the **LogIt** scheme. Direct command-line builds include the icon through the project's Copy Bundle Resources phase:

```sh
xcodebuild -project LogIt.xcodeproj -scheme LogIt -configuration Debug \
  -destination "platform=macOS,arch=$(uname -m)" -derivedDataPath DerivedData build
```

The project uses Swift 5 language mode, deployment target 26.0, ad-hoc signing (`-`), App Sandbox off, and Hardened Runtime off. No developer account or notarization is needed. Keep the installed app at a consistent path for predictable Automation permission behavior.

## Permissions

On first read, macOS may ask whether **LogIt** can control **System Events**. Choose **Allow**. This permits reading login-item names and paths and removing entries you explicitly blacklist; Accessibility and Full Disk Access are not needed. Background cleanup does not repeatedly request permission: open the login-item page and click Refresh to request access, then use Retry Cleanup.

If denied, use **Open Automation Settings**, or navigate manually to **System Settings → Privacy & Security → Automation → LogIt**, enable **System Events**, then return and click **Refresh**. Changes to the signing identity or bundle location can require permission again. The `NSAppleEventsUsageDescription` is in `LogIt/Info.plist`.

## Behavior

- Check the boxes beside apps, then use **Quit Selected** or **Launch Selected**. Only checked apps are targeted; running/stopped state determines which action applies. **Clear Selection** unchecks everything. Selection lasts for the current session, survives Refresh for items still present, and is locked while an operation runs.
- LogIt excludes itself from the managed login-item list, counts, selection, and batch launch/quit actions by bundle identifier or canonical application path. Its own startup registration remains controlled in Settings.
- **Refresh** rereads System Events. Running indicators update when macOS reports a running-application change, including background apps. There is no periodic status timer.
- **Quit All** requests normal termination, waits up to five seconds, then force-quits surviving original processes. It finishes early when every original process has exited. Unsaved changes can be lost. LogIt always excludes itself and never force-quits newly relaunched replacement processes.
- Quit actions show an immediate result message. No quit history is stored; previously saved history is cleared when the updated app starts.
- **Launch All** opens all stopped application login items without requesting activation. Apps can still choose to present their own windows.
- Missing locations are skipped. Existing documents and folders stay visible as **Not an application** and are excluded from batch actions.
- **Open Login Items Settings** opens the system panel. Blacklist cleanup removes only matching System Events login entries. LogIt does not manage the background-activity list.

## Background cleanup and blacklist

- Opening LogIt shows the normal **Open at Login** page and Dock icon. Closing its window keeps the process monitoring quietly, without a Dock or menu-bar icon. Open LogIt again through Applications or Spotlight to restore its normal page. Minimizing retains the Dock icon. **Quit LogIt** or Command-Q stops monitoring.
- In **Blacklist → Add Rule**, select an existing login item or an application, then choose the app whose exit should trigger removal. **Add FigmaAgent Rule** validates the installed Figma and its bundled helper and opens the rule editor. Save explicitly to enable it; no rules are created automatically.
- Figma's rule watches `com.figma.Desktop` and removes `com.figma.agent` login entries. It leaves the running FigmaAgent process alone. Other rules default to watching the selected target application, and can be edited to watch a different app.
- Cleanup waits five seconds after the last watched-app instance exits. A restart cancels that attempt. A one-time check also runs on startup, rule enablement, and resume, only when the watched app is absent. There is no periodic scanning timer or separate helper process.
- Rules and pause state persist in local preferences. Matching uses exact bundle identifiers, or a canonical path if the selected app has no identifier. Names are never used as identity. LogIt excludes itself.
- **Pause Cleanup** suspends automatic work. **Retry Cleanup** retries failures explicitly. Editing, disabling, or deleting a rule cancels pending work. Deleting a rule does not restore a removed startup entry.
- Reads and removals share one serial worker and a 15-second Apple Event timeout. Cleanup waits for launch/quit operations to finish, rechecks eligibility, and verifies removal. Unsupported or unidentifiable entries produce a visible error instead of a success claim.
- **Settings → Launch LogIt at Login** is off by default. It uses Apple's Service Management registration for LogIt itself and reports when system approval is needed. Login launches remain hidden; manual launches open the normal page.
- Entries added after cleanup may remain until another watched-app exit or startup check. Cleanup cannot suppress the initial “Login Item Added” notification or undo a launch that already happened. It never edits app files, quits the target agent, or modifies unrelated background services.

## Tests

Build/cleanup/install workflow checks run in temporary workspaces, including paths with spaces, without installing in `/Applications`:

```sh
python3 tests/build_workflow/test_build_workflow.py
```

App tests:

```sh
xcodebuild -project LogIt.xcodeproj -scheme LogIt \
  -destination "platform=macOS,arch=$(uname -m)" -derivedDataPath DerivedData test
```

The unhosted XCTest target compiles the shared logic without launching LogIt. Its injected reader, process handles, and clock never operate on personal applications or request Automation permission.

For an opt-in live login-item check, run `./scripts/verify_login_item_actions.sh`. It creates temporary watcher and agent apps, registers only the disposable agent as a login item, and verifies cleanup five seconds after the watcher exits while the agent remains running. It compares unrelated login entries before and after, and removes its own fixture on failure. This check may request Automation access for its test runner. Fixtures and the result are retained at the printed path.

For an opt-in live AppKit check, run `./scripts/verify_process_actions.sh`. It builds two disposable apps in a temporary directory and checks background launch, already-running detection, graceful termination, and forced termination after five seconds. It does not register login items. Temporary bundles are retained at the printed path; their processes are terminated at the end.

## Original macOS 26 verification and limitations

Verified on **macOS 26.7 (25G229), Xcode 27.0 (27A266a)**:

- Clean Debug and Release builds completed with zero warnings/errors; all 26 unit tests passed. Both app signatures passed strict verification.
- System Events returned 26 Open at Login items, matching the Settings list. Names, paths, icons, and running state appeared in the app. Refresh and the Login Items settings button worked.
- The live fixture test passed, including preserved foreground application, observed background-app launches/exits, early graceful completion, and the five-second forced-exit deadline.
- No runtime problem with the System Events login-item call was observed. Missing/empty-path handling is covered by a regression fixture, not an observed OS failure.
- A fresh Automation prompt and the live denial/re-enable flow were not observed during verification; permission error mapping and recovery are covered by unit tests. The Automation deep link has a manual-navigation fallback.
- `NSAppleScript` execution and filesystem metadata reads run on a shared serial worker queue. Refresh awaits the result without blocking the main actor; icons and UI state are updated on the main actor. Requests use a 15-second Apple Event timeout. Running-state observation does not run AppleScript. Apple DTS confirms that [secondary-thread execution is supported when serialized](https://developer.apple.com/forums/thread/759287).
- Xcode 27 emitted an App Intents metadata warning when that framework was absent. The project links Apple's system AppIntents framework to satisfy the extraction step; it defines no App Intents.
