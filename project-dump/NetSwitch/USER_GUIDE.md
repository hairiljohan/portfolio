# NetSwitch User Guide

This guide explains how to install, configure, and troubleshoot NetSwitch for personal use.

## What The App Does

NetSwitch changes the DNS servers for your active primary Wi-Fi or Ethernet network service. It can also optionally manage Tailscale based on the home-network definition plus an independent list of additional trusted networks.

The intended flow is:

1. NetSwitch detects the current network.
2. It checks the DNS settings you saved from the menu bar.
3. If a rule matches, the menu bar app asks the privileged helper to apply that DNS profile.
4. The helper writes the DNS settings to macOS network preferences.

The menu bar app itself does not have permission to edit DNS. The root helper must be installed and running.

## App Whitelist

In **Settings → DNS Profiles → App Whitelist**, click **Manage…**, then **Add Apps…** to choose one or more applications. Use **Remove** to delete selected entries. **Done** updates the Settings draft; **Save & Apply** saves and activates it. Canceling the sheet discards its edits, and canceling Settings discards all unsaved edits. An empty list disables this feature.

While any listed app is running, NetSwitch uses your configured **Public DNS for all apps on the active Wi-Fi or Ethernet connection**. This includes unidentified Wi-Fi networks. When the last listed app quits, NetSwitch reevaluates the current network and applies its normal DNS rules. The menu explains which app is keeping Public DNS active, or shows the number of matching apps.

Hidden, minimized, and background apps count as running; closing an app's window may not quit it. Separate helper processes with different bundle identifiers do not count. Entries match by bundle identifier, so moving or updating an app does not require adding it again, and entries remain saved if an app is uninstalled.

**Pause** leaves the current DNS in place and stops automatic changes. **Use Automatic DNS** keeps its existing manual override until its normal reset conditions (such as a network change, sleep/wake, settings reload, or Apply Now); app launches and exits do not clear it. **Apply Now** and **Save & Apply** explicitly apply the current policy, including the whitelist, even while paused. Tailscale's network rules are unchanged.

NetSwitch reacts after an app starts, so its first DNS request may precede the switch. Cached DNS answers and existing connections can persist; NetSwitch does not flush caches or restart apps. Apps with their own DNS settings may behave differently. Quitting NetSwitch leaves the current DNS settings in place, as before.

## Recommended Install

From the project folder:

```sh
INSTALL_HELPER=1 CLEAN_BUILD=1 scripts/install-app.sh
```

This command:

- Builds the release app.
- Installs `NetSwitch.app` into `/Applications`.
- Installs or repairs the root helper.
- Launches the app.
- Deletes `.build` afterward.

The helper install will ask for your admin password because it writes to:

```text
/Library/PrivilegedHelperTools/NetSwitchHelper
/Library/LaunchDaemons/com.hairiljohan.NetSwitchHelper.plist
```

## Step-By-Step Build And Install

Use these steps if you want to see each stage separately.

1. Build the release app and helper:

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

The install script rebuilds before copying the app, stops an already-running installed copy, installs the app bundle, and launches it.

3. Install or repair the privileged helper:

```sh
sudo scripts/install-helper.sh
```

The helper must be installed as root because DNS changes are system-wide macOS network preference writes.

4. Launch the app if it is not already running:

```sh
open /Applications/NetSwitch.app
```

5. Clean build artifacts when you no longer need them:

```sh
rm -rf .build
```

## First Launch

1. Open NetSwitch from `/Applications`.
2. Click the NetSwitch menu bar item.
3. Grant Location permission when prompted.

Location permission is needed only so macOS allows NetSwitch to read the current Wi-Fi SSID. If NetSwitch cannot read the SSID, it will not silently apply a fallback public DNS profile.

## Configure Your Networks

1. Click the NetSwitch menu bar item.
2. Choose `Settings…`.
3. Choose `Manage…` beside `Home Wi-Fi Networks`, then add each home SSID manually or with `Add Current Network`.
4. Fill in `Home Ethernet Router`, `Home DNS`, and `Public DNS`.
5. Set `Other Known Wi-Fi` to `Use Public DNS` if you want non-home Wi-Fi to use `9.9.9.9`.
6. Set `Unknown Wi-Fi` to `Use Public DNS` if you want every non-home Wi-Fi case to use `9.9.9.9`.
7. Optionally enable `Manage Tailscale`.
8. Optionally choose `Manage Trusted Networks…` to add Wi-Fi or Ethernet networks where Tailscale should remain disconnected without selecting Home DNS.
9. Click `Save & Apply`.

Use `Home DNS` for the resolver you want at home, such as a Pi-hole address. Use `Public DNS` for the resolver you want on other networks.

## Optional Tailscale Automation

`Manage Tailscale` is off by default. Enable it only after installing Tailscale at:

```text
/Applications/Tailscale.app
```

When enabled, NetSwitch treats every configured `Home Wi-Fi Networks` SSID and the `Home Ethernet Router` as implicitly trusted. You can add more Tailscale-only trusted networks with `Manage Trusted Networks…`:

- On a home or additional trusted network, NetSwitch runs bundled `tailscale down`, then asks the Tailscale GUI to quit normally.
- On any other identified Wi-Fi or Ethernet network, NetSwitch launches Tailscale (if needed), waits until it is ready, then runs its bundled `tailscale up` command.
- Turning off `Manage Tailscale` makes no command or quit request and leaves Tailscale exactly as it is.

The Home Wi-Fi manager lists every SSID that should use Home DNS and keep Tailscale disconnected. The separate trusted-network manager lists only additional Tailscale-only networks. Both managers support `Add Current Network`, manual entry, and removal. Wi-Fi SSIDs match exactly and are case-sensitive; Ethernet router addresses must be valid, exact IPv4 addresses. Adding a trusted Wi-Fi SSID to Home Wi-Fi Networks promotes it out of the trusted list. Changes remain drafts until you click `Done` and then `Save & Apply` in Settings.

The NetSwitch menu shows the latest Tailscale result. Missing Tailscale, a login or approval requirement, and command failures do not affect your DNS profile. If macOS cannot identify the Wi-Fi network, NetSwitch does not automate Tailscale because it cannot safely determine whether you are home.

## Use Automatic DNS

Choose `Use Automatic DNS` from the menu bar when you want the active Wi-Fi or Ethernet service to stop using NetSwitch-applied DNS.

For a service using DHCP, the helper clears custom DNS values so macOS can use the DNS servers from its DHCP lease. For a service using manual IPv4, which has no DHCP lease, the helper configures its active router as the DNS server instead.

If a manual IPv4 service has no valid router, NetSwitch reports an error and leaves the existing DNS configuration unchanged.

This only affects the currently active primary Wi-Fi or Ethernet service. NetSwitch will not automatically reapply DNS for the same network immediately after a manual restore. A later `Apply Now`, `Reload Settings`, Settings save, wake, or network change can apply the selected NetSwitch profile again.

## Your Desired Setup: Home DNS At Home, Public DNS Elsewhere

Yes, this is possible.

For your goal:

- Home Wi-Fi networks `SINGTEL-75RF` and `SINGTEL-75RF-5G` use `192.168.1.20`.
- Home Ethernet with router `192.168.1.254` uses `192.168.1.20`.
- Any other Wi-Fi uses `9.9.9.9`.
- Any other Ethernet uses `9.9.9.9`.

Use these Settings values:

- `Home Wi-Fi Networks`: add `SINGTEL-75RF` and `SINGTEL-75RF-5G`
- `Home Ethernet Router`: `192.168.1.254`
- `Home DNS`: `192.168.1.20`
- `Public DNS`: `9.9.9.9`
- `Other Known Wi-Fi`: `Use Public DNS`
- `Unknown Wi-Fi`: `Use Public DNS`

`Other Known Wi-Fi` controls Wi-Fi networks whose names NetSwitch can read but that are not your home Wi-Fi. `Unknown Wi-Fi` controls cases where macOS does not reveal the Wi-Fi name, usually because Location permission is missing or temporarily unavailable.

After saving, NetSwitch applies the selected settings. You can also choose `Apply Now` from the menu bar.

## Common Menu Statuses

`DNS: 192.168.1.20`

The active primary network service is configured to use that DNS server.

`DNS: 9.9.9.9`

The active primary network service is configured to use the public DNS profile.

`DNS: Automatic`

The active primary network service uses DHCP and has no custom DNS servers configured, so macOS can use the DNS servers from its DHCP lease.

`DNS: 192.168.1.254`

The active primary service uses manual IPv4, and `Use Automatic DNS` configured its router as the DNS server because no DHCP-provided DNS is available.

`Tailscale: On · Untrusted network`

NetSwitch launched Tailscale if necessary and its `tailscale up` command succeeded.

`Tailscale: Off · Trusted network`

Tailscale's `tailscale down` command succeeded and NetSwitch requested a normal GUI quit.

`Tailscale: Off`

Tailscale automation is off; NetSwitch leaves Tailscale unchanged.

`Location: Allowed`

NetSwitch can ask macOS for the current Wi-Fi SSID.

`Location: Not allowed`

Open System Settings and allow Location access for NetSwitch. Without this, Wi-Fi SSID rules cannot match.

`No DNS rule matches this Wi-Fi network · DNS unchanged`

Your current Wi-Fi SSID is readable, but it does not match any `rules` entry and `Other Known Wi-Fi` is set to `No Change`.

`Wi-Fi couldn’t be identified · DNS unchanged`

NetSwitch cannot read the SSID and `Unknown Wi-Fi` is set to `No Change`. Set it to `Use Public DNS` if you want `9.9.9.9` anyway.

`Using Home DNS`

NetSwitch matched a rule and applied the selected DNS profile.

`Up to date`

The current DNS profile already matches what NetSwitch last applied.

`Automatic DNS restored`

NetSwitch cleared custom DNS for an active DHCP network and returned it to DHCP-provided DNS.

`Using router DNS 192.168.1.254`

The active service uses manual IPv4, so NetSwitch configured its router as DNS instead of leaving the resolver empty.

`Couldn’t apply DNS: <details>`

The agent asked the helper to write DNS, but the helper rejected the request or macOS returned an error.

## Uninstall

Quit NetSwitch from the menu bar, then remove the app:

```sh
rm -rf /Applications/NetSwitch.app
```

Remove the helper:

```sh
sudo scripts/uninstall-helper.sh
```

Optional cleanup:

```sh
rm -rf .build
```
