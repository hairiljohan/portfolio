import ProjectShell, {
  ProjectSection,
  ProjectFigure,
  ProjectNotes,
  Gallery,
} from "./projects/ProjectShell";
import { getProject } from "../data/projects";
import {
  highlights,
  screenshotSrc,
  wifiSrc,
  iconSrc,
} from "../data/networkCheckerData";
export default function NetworkCheckerPage() {
  return (
    <ProjectShell
      project={getProject("network-checker")}
      summary="A small macOS utility I built with a shell script and Automator to tell me instantly whether my docked Mac is on 10 Mbps, 100 Mbps, gigabit, or Wi-Fi, without having to run a full speedtest every time."
      media={
        <Gallery>
          <ProjectFigure
            priority
            image={{
              src: screenshotSrc,
              alt: "Network Checker dialog showing Thunderbolt Ethernet at 1 Gbps",
              width: 1064,
              height: 520,
              caption:
                "Example output when my docked Mac is using Thunderbolt Ethernet at a full 1 Gbps.",
            }}
          />
          <ProjectFigure
            priority
            image={{
              src: wifiSrc,
              alt: "Network Checker dialog showing a Wi-Fi connection",
              width: 1064,
              height: 488,
              caption:
                "What I see when the Mac has fallen back to Wi-Fi instead of the wired dock connection.",
            }}
          />
        </Gallery>
      }
    >
      <ProjectSection title="What this is">
        <p>
          I use a MacBook with a dock, and sometimes the connection quietly
          drops or negotiates to a slower speed. I used to open a browser and
          run a speedtest just to see if I was getting a full gigabit over
          Ethernet. That got old quickly, so I wrote a small script and wrapped
          it in an Automator app. Now I can click one icon and immediately see
          what link speed my Mac is actually using.
        </p>
      </ProjectSection>
      <ProjectSection title="What I am tracking">
        <ul>
          <li>Whether my Mac is on wired Ethernet or Wi-Fi when docked.</li>
          <li>
            If the link speed quietly dropped from gigabit to 100 Mbps or 10
            Mbps.
          </li>
          <li>
            How often I need to troubleshoot the dock or cables instead of
            blaming the ISP.
          </li>
          <li>
            That higher speeds (2.5G, 5G, 10G) are detected correctly when I
            eventually upgrade.
          </li>
        </ul>
      </ProjectSection>
      <ProjectSection title="How it works">
        <ProjectNotes items={highlights} />
      </ProjectSection>
      <ProjectSection title="A small native wrapper">
        <p>
          A small bash script does the detection, and Automator wraps it as a
          clickable app. I can trigger it from the dock or Spotlight and read
          the result almost instantly.
        </p>
        <ProjectFigure
          image={{
            src: iconSrc,
            alt: "Network Checker app icon",
            width: 344,
            height: 360,
            caption:
              "I generated this icon with ChatGPT, exported it as a PNG, converted it to an ICNS file, and use it as the custom app icon for the Network Checker utility.",
          }}
        />
      </ProjectSection>
    </ProjectShell>
  );
}
