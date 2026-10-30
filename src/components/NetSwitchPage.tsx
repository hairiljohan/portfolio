import ProjectShell, { ProjectSection, ProjectFigure, ProjectNotes } from "./projects/ProjectShell";
import ScreenshotFolder from "./projects/ScreenshotFolder";
import NetSwitchDemo from "./projects/NetSwitchDemo";
import { getProject } from "../data/projects";

export default function NetSwitchPage() {
  return (
    <ProjectShell
      project={getProject("netswitch")}
      summary="Home DNS at home. Public DNS on the go. I built NetSwitch to handle the change from my Mac’s menu bar, with optional Tailscale automation and an override for apps that need Public DNS."
    >
      <ProjectSection title="One less setting to remember">
        <p>My home network uses its own DNS resolver. Away from home, I want a public resolver instead. NetSwitch watches the active primary Wi-Fi or Ethernet service and applies the profile I’ve chosen for that network.</p>
        <p>It stays in the menu bar, without a Dock icon. The current network, DNS servers, Tailscale state, and helper status are all visible in one place.</p>
      </ProjectSection>
      <NetSwitchDemo />
      <ProjectSection title="Two rules, kept separate">
        <ProjectNotes items={[
          { title: "DNS follows the network", description: "Saved home Wi-Fi names and the home Ethernet router select Home DNS. Other networks follow the configured public-DNS policy. Multiple home Wi-Fi names are supported." },
          { title: "Tailscale follows trust", description: "When enabled, Tailscale disconnects on home and additional trusted networks, and connects on other identified networks. An additional trusted network does not select Home DNS. Automation is off by default." },
          { title: "Pi-hole, even away from home", description: "My Tailscale DNS points to the Raspberry Pi running Pi-hole at home. When I’m connected through Tailscale on another network, I can still use my home Pi-hole for DNS-level ad blocking. NetSwitch manages the Tailscale connection; the Pi-hole DNS configuration lives in Tailscale." },
          { title: "An app can override DNS", description: "While a whitelisted app is running, Public DNS applies to all apps on the active connection—even at home or on unidentified Wi-Fi. When the last listed app quits, the normal network rules return. Tailscale’s rules stay the same." },
        ]} />
      </ProjectSection>
      <ScreenshotFolder title="Networks and Tailscale" stacked images={[
        { src: "/projects/netswitch/networks.webp", dark: { src: "/projects/netswitch/networks-dark.webp", width: 2936, height: 1788 }, alt: "NetSwitch Networks settings for home Wi-Fi networks and the home Ethernet router", width: 2936, height: 1788, caption: "Define home once: save Wi-Fi names and the Ethernet router that should select Home DNS." },
        { src: "/projects/netswitch/tailscale.webp", dark: { src: "/projects/netswitch/tailscale-dark.webp", width: 2936, height: 1788 }, alt: "NetSwitch Tailscale settings with automation enabled and a separate trusted network list", width: 2936, height: 1788, caption: "Tailscale automation has its own trusted-network list, independent of the DNS profile." },
      ]} />
      <ProjectSection title="Automatic, with an off switch">
        <p>Pause stops automatic DNS changes and leaves the current settings in place. Apply Now explicitly reevaluates the policy, even while paused.</p>
        <p>Use Automatic DNS restores DHCP-provided DNS, or uses the router as DNS for a manually configured IPv4 service. A later network change, wake, settings reload, or explicit apply can resume the selected profile.</p>
        <ProjectFigure image={{ src: "/projects/netswitch/menu.webp", dark: { src: "/projects/netswitch/menu-dark.webp", width: 576, height: 648 }, alt: "NetSwitch menu showing network and DNS status, Pause, Apply Now, Use Automatic DNS, and Settings", width: 582, height: 646, caption: "The real menu bar interface: current state first, manual controls within reach." }} />
      </ProjectSection>
      <ProjectSection title="Behind the menu bar">
        <ProjectNotes items={[
          { title: "Detect → decide → apply", description: "The Swift menu bar agent detects the network and evaluates the saved policy. A separate privileged LaunchDaemon helper performs the system-wide DNS writes to macOS network preferences." },
          { title: "Handle uncertainty explicitly", description: "Reading a Wi-Fi name requires Location permission. If the name is unavailable, the configured Unknown Wi-Fi policy decides whether to leave DNS unchanged or use Public DNS. Tailscale automation leaves the connection alone when Wi-Fi cannot be identified." },
          { title: "Keep the limits visible", description: "Changing DNS does not flush cached answers or restart existing connections. An app’s first request can happen before the whitelist override takes effect, and apps with their own DNS settings may behave differently." },
        ]} />
      </ProjectSection>
      <ProjectSection title="Built for my Mac">
        <p>A personal utility for macOS 26 or newer, built with Swift and Swift Package Manager. It requires a one-time administrator-approved helper installation. The screenshots here show my working setup.</p>
      </ProjectSection>
    </ProjectShell>
  );
}
