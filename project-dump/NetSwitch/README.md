# NetSwitch

NetSwitch is a personal macOS menu bar app that applies DNS settings based on the active primary Wi-Fi or Ethernet service. It uses a root LaunchDaemon helper for DNS writes and keeps the agent responsible for network detection and policy decisions.

The home/public DNS setup is managed from the menu bar with `Settings…`. For first-run usage and troubleshooting, see [USER_GUIDE.md](docs/USER_GUIDE.md).

## Requirements

- macOS 26.0 or newer.
- Xcode or Xcode Command Line Tools for the macOS SDK, SwiftPM, and codesign.
- An admin account for the one-time privileged helper install.

## Build And Install

Run these commands from the repository root.

For the usual local install, use the one-command path:

```sh
INSTALL_HELPER=1 CLEAN_BUILD=1 scripts/install-app.sh
```

This builds a release app, installs `NetSwitch.app` into `/Applications`, installs or repairs the privileged helper, launches the app, and removes `.build` when the command exits.

For a manual step-by-step install, use the sequence below.

1. Build the app bundle and helper:

```sh
scripts/build.sh
```

This creates:

```text
.build/release/NetSwitch.app
```

2. Install the app into `/Applications`:

```sh
scripts/install-app.sh
```

`install-app.sh` runs `scripts/build.sh` before copying the app so the installed bundle is current.

To install somewhere else:

```sh
DEST_DIR="$HOME/Applications" scripts/install-app.sh
```

3. Install or repair the privileged helper:

```sh
sudo scripts/install-helper.sh
```

The helper is required because DNS changes are system-wide network preference writes. It is installed to:

```text
/Library/PrivilegedHelperTools/NetSwitchHelper
```

The LaunchDaemon plist is installed to:

```text
/Library/LaunchDaemons/com.hairiljohan.NetSwitchHelper.plist
```

4. Launch NetSwitch:

```sh
open /Applications/NetSwitch.app
```

NetSwitch runs as a menu bar app with no Dock icon.

5. Grant Location permission when prompted.

Modern macOS requires Location permission before an app can read the current Wi-Fi SSID. If permission is missing or denied, NetSwitch treats Wi-Fi identity as unknown and does not silently apply the default public DNS profile.

6. Configure DNS from the menu bar.

Choose `Settings…`, use `Manage…` beside Home Wi-Fi Networks to add each home SSID, enter your home Ethernet router, Home DNS, and Public DNS, then click `Save & Apply`.

### Optional Tailscale Automation

Enable `Manage Tailscale` in Settings if Tailscale is installed at `/Applications/Tailscale.app`. On any configured home Wi-Fi, the home Ethernet router, or an additional network saved through `Manage Trusted Networks…`, NetSwitch runs `tailscale down` and requests that the Tailscale GUI quit normally. On other identified Wi-Fi or Ethernet networks, it launches Tailscale, waits until it is ready, then runs its bundled `tailscale up` command.

The Home Wi-Fi manager supports multiple exact, case-sensitive SSIDs. Use `Add Current Network` while connected or enter an SSID manually; every home SSID uses Home DNS and is implicitly trusted for Tailscale. The trusted-network manager separately supports exact Wi-Fi SSIDs and Ethernet router IPv4 addresses. Trusted networks keep Tailscale disconnected but do not select Home DNS.

The setting is off by default. Turning it off leaves Tailscale in its current state. Trusted networks affect only Tailscale automation and do not change DNS profile selection. If the app is missing, requires login or approval, or either command fails, NetSwitch reports the error in its menu without changing DNS behavior. NetSwitch does not automate Tailscale when macOS cannot identify the current Wi-Fi network.

7. Confirm status from the menu bar.

The menu shows the active network, current DNS servers, Tailscale status, DNS status, Location access, helper status, and actions for `Pause`, `Apply Now`, `Use Automatic DNS`, `Reload Settings`, `Settings…`, and `Quit`. `Use Automatic DNS` clears custom DNS on DHCP services and uses the active router as DNS on manual-IPv4 services. `Allow Location Access` is shown only when Location access has not been granted.

## Build Options

```sh
scripts/build.sh
```

The app bundle is created at:

```text
.build/release/NetSwitch.app
```

For a debug bundle:

```sh
BUILD_CONFIG=debug scripts/build.sh
```

To skip ad hoc signing during local iteration:

```sh
SKIP_SIGN=1 scripts/build.sh
```

## App Install Options

Build, install into `/Applications`, and launch:

```sh
scripts/install-app.sh
```

Install somewhere else:

```sh
DEST_DIR="$HOME/Applications" scripts/install-app.sh
```

Build, install, and also install or repair the privileged helper:

```sh
INSTALL_HELPER=1 scripts/install-app.sh
```

To build, install the app, install or repair the helper, launch the app, and clean `.build` in one shot:

```sh
INSTALL_HELPER=1 CLEAN_BUILD=1 scripts/install-app.sh
```

Use this when you want a clean local release install and do not need the Swift build artifacts afterward. The helper install step prompts for your admin password because it writes to `/Library/PrivilegedHelperTools` and `/Library/LaunchDaemons`.

Install without launching:

```sh
OPEN_AFTER=0 scripts/install-app.sh
```

## Script Reference

| Script                        | What it does                                                                                                                                                                 | Typical use                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `scripts/build.sh`            | Builds the Swift package, creates `NetSwitch.app`, bundles `NetSwitchHelper`, bundles the helper installer/uninstaller, and ad hoc signs the app by default.                 | `scripts/build.sh`                 |
| `scripts/install-app.sh`      | Builds the app, validates the bundle identifier, installs the app into `/Applications` by default, stops an already-running installed copy, and launches the app by default. | `scripts/install-app.sh`           |
| `scripts/install-helper.sh`   | Installs or repairs the root LaunchDaemon helper under `/Library`, fixes ownership and permissions, loads it with `launchctl`, and starts it. Requires `sudo`.               | `sudo scripts/install-helper.sh`   |
| `scripts/uninstall-helper.sh` | Stops the helper and removes the helper binary and LaunchDaemon plist from `/Library`. Requires `sudo`.                                                                      | `sudo scripts/uninstall-helper.sh` |

Useful environment variables:

| Variable         | Used by                                           | Default         | Effect                                                    |
| ---------------- | ------------------------------------------------- | --------------- | --------------------------------------------------------- |
| `BUILD_CONFIG`   | `build.sh`, `install-app.sh`, `install-helper.sh` | `release`       | Chooses `debug` or `release` build output.                |
| `SKIP_SIGN`      | `build.sh`, `install-app.sh`                      | `0`             | Set to `1` to skip ad hoc signing during local iteration. |
| `DEST_DIR`       | `install-app.sh`                                  | `/Applications` | App install destination.                                  |
| `OPEN_AFTER`     | `install-app.sh`                                  | `1`             | Set to `0` to install without launching.                  |
| `INSTALL_HELPER` | `install-app.sh`                                  | `0`             | Set to `1` to run the helper installer after app install. |
| `CLEAN_BUILD`    | `install-app.sh`                                  | `0`             | Set to `1` to remove `.build` after install.              |

## Helper Repair

Reinstall or repair the privileged helper after rebuilding:

```sh
sudo scripts/install-helper.sh
```

The helper is installed to:

```text
/Library/PrivilegedHelperTools/NetSwitchHelper
```

The LaunchDaemon plist is installed to:

```text
/Library/LaunchDaemons/com.hairiljohan.NetSwitchHelper.plist
```

## Uninstall The App

Quit NetSwitch from the menu bar, then remove the app bundle:

```sh
rm -rf /Applications/NetSwitch.app
```

## Uninstall The Helper

```sh
sudo scripts/uninstall-helper.sh
```

## Cleanup

Remove local Swift build outputs:

```sh
rm -rf .build
```
