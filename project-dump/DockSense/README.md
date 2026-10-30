# DockSense

DockSense is a personal macOS menu bar app. It shows or hides the Dock and menu bar based on whether your docking station USB device is connected.

## Scripts

Run these from the project root.

| Script                             | Purpose                                                                                                   | When to use it                                              |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `scripts/build-app.sh`             | Builds `DockSense.app` into `.build/DockSense.app`. It does not install or open the app.                  | Use this when you only want to check that the app builds.   |
| `scripts/import_app_icon.sh`       | Imports `Resources/DockSense.icns` from an `.icns` file or the current Finder icon on `/Applications/DockSense.app`. | Use this when changing the app icon.                        |
| `scripts/install_app.sh`           | Builds, ad-hoc signs, installs, and opens the app. Default install path is `/Applications/DockSense.app`. | Use this for normal testing on your Mac.                    |
| `scripts/release_app.sh`           | Ensures the app icon is present, builds a release version, installs it, then cleans `.build/`.             | Use this when you want a clean local release install.       |
| `scripts/clean_build_artifacts.sh` | Deletes `.build/`, generated app bundles, and `.DS_Store` files.                                          | Use this when you want a fresh build or want to free space. |

## Common Commands

Build the app bundle only:

```bash
scripts/build-app.sh
```

Install and open the app:

```bash
scripts/install_app.sh
```

Import or refresh the app icon:

```bash
scripts/import_app_icon.sh /path/to/DockSense.icns
```

If you already pasted a Finder custom icon onto `/Applications/DockSense.app`,
run `scripts/import_app_icon.sh` with no arguments to convert that icon into
`Resources/DockSense.icns`.

Install a release build:

```bash
BUILD_CONFIG=release scripts/install_app.sh
```

Release install and clean build files:

```bash
scripts/release_app.sh
```

Release install with a refreshed icon:

```bash
IMPORT_ICON_SOURCE=/path/to/DockSense.icns scripts/release_app.sh
```

Clean build files:

```bash
scripts/clean_build_artifacts.sh
```

Run tests:

```bash
swift test
```

## Useful Options

Add these before a script command when needed.

| Option                 | Example                                                          | What it does                                              |
| ---------------------- | ---------------------------------------------------------------- | --------------------------------------------------------- |
| `BUILD_CONFIG=debug`   | `BUILD_CONFIG=debug scripts/build-app.sh`                        | Builds the debug version.                                 |
| `BUILD_CONFIG=release` | `BUILD_CONFIG=release scripts/install_app.sh`                    | Builds the release version.                               |
| `OPEN_AFTER=0`         | `OPEN_AFTER=0 scripts/install_app.sh`                            | Installs without opening the app.                         |
| `DEST_DIR=/some/path`  | `DEST_DIR=/private/tmp/test OPEN_AFTER=0 scripts/install_app.sh` | Installs somewhere other than `/Applications`.            |
| `SKIP_SIGN=1`          | `SKIP_SIGN=1 scripts/install_app.sh`                             | Skips ad-hoc signing. Useful for temporary test installs. |
| `CLEAN_BUILD=1`        | `CLEAN_BUILD=1 scripts/install_app.sh`                           | Deletes `.build/` after install.                          |
| `IMPORT_ICON_SOURCE=/path/to/icon.icns` | `IMPORT_ICON_SOURCE=/path/to/DockSense.icns scripts/release_app.sh` | Refreshes `Resources/DockSense.icns` before release install. |

## First Setup

1. Build and install DockSense:

```bash
scripts/install_app.sh
```

2. Open the DockSense menu bar item while docked.
3. Choose `List USB Devices...` or `Configure USB Signature...`.
4. Pick a USB device that only appears when your dock is connected.
5. Disconnect and reconnect the dock to test it.

USB changes are debounced before device enumeration. If USB notification
registration fails, the menu keeps the error visible until registration succeeds;
**Refresh** and wake/session events retry registration.

DockSense stores its config here:

```text
~/Library/Application Support/DockSense/config.json
```

## Keyboard Backlight

Open **Keyboard Backlight → Remember Undocked Brightness** to enable the feature.
It is disabled by default when upgrading an existing configuration.

- Adjust the **0–100% slider**, or **click the percentage** to type a whole number
  and press Return (Apply), while undocked to set and save the brightness.
  Escape (Cancel) leaves the value unchanged; values outside 0–100 are rejected.
  Zero is an intentional off setting. While docked, the slider changes the value
  that will be restored on the next undock, without lighting the keyboard now.
- Changes made through macOS keyboard brightness controls are remembered while
  undocked. **Use Current Brightness** captures the current active level directly.
- On docking, DockSense captures the active brightness before optionally turning
  it off. Enable **Turn Off When Docked** if you want that behavior.
- On undocking, the saved level is restored once. Refreshing or changing the
  auto-hide scope does not continually reset manual brightness adjustments.
- The remembered level is saved in the existing `config.json`. Starting while
  docked does not replace it with a docked or closed-lid zero.
- Closed-lid, suppressed, and idle-dimmed readings are ignored when remembering
  brightness. Restoration waits for an open lid and the end of idle dimming;
  suppression alone does not block the write that wakes the backlight. A deferred
  restore is canceled if you reconnect.
- Pause stops keyboard automation as well as visibility updates.
- Brightness settling waits are asynchronous. New brightness values, reconnecting,
  pausing, or disabling automation cancel obsolete writes.
- Deferred restoration retries back off from 2 seconds to at most one attempt per
  minute. Keyboard activity and wake events restart the short retry interval.

Keyboard control uses Apple's private CoreBrightness framework and may vary
between macOS releases. DockSense checks the built-in keyboard and required
methods, validates brightness values, and reports failures in the submenu.
It never changes the system auto-brightness preference or inactivity timeout.
The system may subsequently adjust a restored value according to those settings;
DockSense does not continuously enforce a brightness level.

For a hardware check: with the lid open and keyboard active, choose 35%, dock,
then undock and check that 35% returns. Repeat after changing brightness through
macOS, and with 0%. Also check sleep/wake, idle dimming, closed-lid undocking, and
manual adjustment after restoring. Automated tests simulate these state changes;
they cannot verify physical illumination or compatibility with a future OS.
