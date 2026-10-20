import ProjectShell, {
  ProjectSection,
  ProjectFigure,
  ProjectNotes,
} from "./projects/ProjectShell";
import ScreenshotFolder from "./projects/ScreenshotFolder";
import { getProject } from "../data/projects";
import {
  whatList,
  whyList,
  buildingBlocks,
  media,
} from "../data/privateLocalAIData";
export default function PrivateLocalAIPage() {
  return (
    <ProjectShell
      project={getProject("private-local-ai")}
      summary="I wanted my local AI stack to feel like a real app, not a localhost secret. Caddy, Pi-hole, and Tailscale now give every service a clean domain, private routing, and a stable URL from any device I own."
      media={
        <ProjectFigure
          image={{ ...media.desktop, width: 3638, height: 2912 }}
          priority
        />
      }
    >
      <ProjectSection title="What you are seeing">
        <ul>
          {whatList.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </ProjectSection>
      <ProjectSection title="Why this matters">
        <ul>
          {whyList.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </ProjectSection>
      <ProjectSection title="Building blocks">
        <ProjectNotes items={buildingBlocks} />
      </ProjectSection>
      <ScreenshotFolder
        title="Everyday access"
        images={[
          { ...media.mobile, width: 1320, height: 2868 },
          { ...media.caddyControl, width: 1064, height: 552 },
        ]}
      />
      <ProjectSection title="Routing and DNS">
        <p>
          Admin views from the stack that make the friendly domains work: the
          proxy rules in Caddy and the DNS entries living in Pi-hole.
        </p>
      </ProjectSection>
      <ScreenshotFolder
        title="Routing and DNS"
        images={[
          { ...media.caddyfile, width: 1570, height: 1102 },
          { ...media.pihole, width: 1456, height: 1502 },
        ]}
      />
      <ProjectSection title="Why I built Caddy Control">
        <ul>
          <li>
            A shell-scripted macOS helper replaces the usual start, stop, and
            status commands for Caddy.
          </li>
          <li>
            One-click launch/quit and a quick status check mean no Terminal
            needed to manage the reverse proxy.
          </li>
          <li>
            Feels like a normal desktop tool now: fast, visible, and easy to
            remember.
          </li>
        </ul>
      </ProjectSection>
    </ProjectShell>
  );
}
