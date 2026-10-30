import ProjectShell, { ProjectSection, ProjectNotes, ProjectFigure } from "./projects/ProjectShell";
import ScreenshotFolder from "./projects/ScreenshotFolder";
import DockSenseDemo from "./projects/DockSenseDemo";
import { getProject } from "../data/projects";
import styles from "./DockSensePage.module.css";

// Add the recording to public/projects/docksense/, then set its URL here.
// Example: "/projects/docksense/demo.mp4"
const demoVideoSrc: string = "";

export default function DockSensePage() {
  return (
    <ProjectShell
      project={getProject("docksense")}
      media={
        <figure className={styles.videoFigure}>
          {demoVideoSrc ? (
            <video className={styles.video} src={demoVideoSrc} controls playsInline preload="metadata" aria-label="DockSense docking and undocking demonstration" />
          ) : (
            <div className={styles.videoPlaceholder}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <rect x="4" y="8" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="m28 16 8-5v18l-8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span>Video walkthrough coming soon</span>
            </div>
          )}
          <figcaption>From desk to laptop: watch the Dock hide and the keyboard light up when I unplug, then switch back when I reconnect.</figcaption>
        </figure>
      }
      summary="Unplug my Mac: hide the macOS Dock and light up the keyboard. Plug it back in: show the Dock and turn the keyboard backlight off. I built DockSense to automate that everyday routine."
    >
      <ProjectSection title="Why I built it">
        <p>I wanted my Mac to adjust automatically whenever I moved between my desk and using it undocked. Away from the desk, I want the macOS Dock to hide and the keyboard backlight to come on. When I reconnect to my docking station, I want the opposite: the Dock visible and the keyboard backlight off.</p>
        <p>DockSense takes care of those repeated settings changes. It watches for a USB device that only appears when my docking station is connected, then uses that signal to apply my setup. The menu bar keeps the current state and manual controls within reach.</p>
      </ProjectSection>
      <DockSenseDemo />
      <ProjectSection title="In the menu bar">
        <ProjectFigure image={getProject("docksense").image} />
      </ProjectSection>
      <ProjectSection title="Teach it your setup">
        <ol>
          <li>Connect the docking station and open DockSense from the menu bar.</li>
          <li>Use List USB Devices to find a device that only appears with the dock.</li>
          <li>Choose Configure USB Signature, select that device, give it a label, and save.</li>
          <li>Disconnect and reconnect the dock to check the state changes.</li>
        </ol>
        <p>My screenshots show a CalDigit TS4 setup. The saved USB signature is the docking signal; the app does not rely on a network speed check.</p>
      </ProjectSection>
      <ScreenshotFolder title="USB setup" stacked images={[
        { src: "/projects/docksense/usb-signature.webp", dark: { src: "/projects/docksense/usb-signature-dark.webp", width: 1328, height: 940 }, alt: "DockSense Configure USB Signature dialog with a CalDigit TS4 hub selected", width: 1328, height: 940, caption: "Choose a dock-only USB device and give the signature a recognizable label." },
        { src: "/projects/docksense/usb-devices.webp", dark: { src: "/projects/docksense/usb-devices-dark.webp", width: 1648, height: 1436 }, alt: "DockSense USB Devices window listing attached devices and their technical identifiers", width: 1648, height: 1436, caption: "Inspect connected USB devices before choosing the one that identifies your dock." },
      ]} />
      <ProjectSection title="Bring back the right brightness">
        <ProjectNotes items={[
          { title: "Remember the undocked level", description: "Enable Remember Undocked Brightness, then set a value from 0–100% with the slider or percentage field. Changes made through macOS controls while undocked are remembered too. Zero is a valid off setting." },
          { title: "Turn it off at the desk", description: "With Turn Off When Docked enabled, DockSense captures the active brightness before switching the keyboard backlight off. Adjusting the slider while docked sets the level for the next undock without lighting the keyboard immediately." },
          { title: "Restore once, then let go", description: "On undocking, the saved level is restored once. It does not continually override manual adjustments or macOS brightness behavior. Closed-lid and idle-dimmed states defer restoration; reconnecting cancels the pending restore." },
        ]} />
      </ProjectSection>
      <ProjectSection title="Designed for transitions">
        <ProjectNotes items={[
          { title: "Wait for USB changes to settle", description: "USB changes are debounced before devices are enumerated. If notification registration fails, the menu keeps the error visible, and Refresh or wake/session events retry it." },
          { title: "Keep control close by", description: "Pause stops visibility updates and keyboard automation. New brightness values, reconnecting, pausing, or disabling automation cancel obsolete brightness writes." },
          { title: "Respect the system", description: "Keyboard control uses Apple’s private CoreBrightness framework, so compatibility can vary between macOS releases. DockSense checks for the required hardware and methods and reports failures. It leaves system auto-brightness and inactivity settings unchanged." },
        ]} />
      </ProjectSection>
      <ProjectSection title="A personal utility">
        <p>Built with Swift, with configuration stored locally in DockSense’s Application Support folder. Automated tests simulate state changes; physical keyboard illumination and OS compatibility still need checks on real hardware.</p>
      </ProjectSection>
    </ProjectShell>
  );
}
