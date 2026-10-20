import { ArrowUpRight } from "lucide-react";
import ProjectShell, { ProjectSection } from "./projects/ProjectShell";
import { getProject } from "../data/projects";
import styles from "./projects/ProjectShell.module.css";
export default function LaunchConsolePage() {
  return (
    <ProjectShell
      project={getProject("launch-console")}
      summary="A playful “why does this work?” console built after I started running local AI models. It recreates the odd feeling of watching a model behave like a system with a mind of its own. No real logs. Just the vibe of me pretending to monitor a sentient process. Best viewed on desktop."
    >
      <ProjectSection title="Write-up">
        <p>
          This page shows the console from my landing page that I built after I
          started tinkering with local AI models. All system states, warnings,
          and logs come from my early attempts at running local AI models.
          Things worked, but I did not know why. That idea shaped the “why does
          this work” theme across the site. The console uses fake data. The
          buttons trigger small effects. The goal was to make something simple,
          fun, and slightly chaotic.
        </p>
      </ProjectSection>
      <ProjectSection title="Goal">
        <p>
          Test how much I could build with the help of AI tools like ChatGPT.
          Keep the project simple and focused so I could learn the basics of UI
          structure, state changes, and small interactions.
        </p>
      </ProjectSection>
      <ProjectSection title="Stack & role">
        <p>
          Vanilla HTML, CSS, and JavaScript for the console, wrapped by React,
          Vite, and custom CSS for this write-up.
        </p>
        <ul>
          <li>Designed and wrote the console UI.</li>
          <li>Created the fake system states, logs, and error messages.</li>
          <li>
            Built the button triggers (dance, panic, nuke) and their effects.
          </li>
          <li>
            Added tone, timing, and interactions to make the console feel alive.
          </li>
        </ul>
      </ProjectSection>
      <ProjectSection title="Try the console">
        <p>
          Buttons switch between system states and trigger effects. Dance shows
          emoji art and plays audio. Panic runs a short panic routine. Nuke
          simulates a full meltdown.
        </p>
        <p>
          Hint: If it asks you for a launch code, it is in the name of the site.
        </p>
        <p>
          <a className="text-link" href="#launch-console-embed">
            Jump to embed
          </a>
        </p>
      </ProjectSection>
      <div id="launch-console-embed" className={styles.demo}>
        <div className={styles.demoActions}>
          <span>Interactive demo · simulated data</span>
          <a
            className="text-link"
            href="/legacy/landingpage/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open full page
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <iframe
          src="/legacy/landingpage/index.html"
          title="Launch Console Embed"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
        />
      </div>
    </ProjectShell>
  );
}
