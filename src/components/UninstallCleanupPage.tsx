import ProjectShell, {
  ProjectSection,
  ProjectNotes,
} from "./projects/ProjectShell";
import { getProject } from "../data/projects";
import { handleCards, footerCards } from "../data/uninstallCleanupData";
import styles from "./projects/ProjectShell.module.css";
export default function UninstallCleanupPage() {
  return (
    <ProjectShell
      project={getProject("uninstall-cleanup")}
      summary="A small helper I built for macOS to clean up the files, folders, and traces that remain after uninstalling an app, especially when third-party cleaners miss things."
      media={
        <figure className={styles.figure}>
          <video
            className={styles.video}
            controls
            playsInline
            preload="none"
            poster="/cleaner/poster.webp"
            width={1280}
            height={720}
            aria-label="Uninstall Cleanup Tool walkthrough"
          >
            <source src="/cleaner/demo.mp4" type="video/mp4" />
            Your browser does not support video.{" "}
            <a href="/cleaner/demo.mp4">Download the walkthrough.</a>
          </video>
          <figcaption>
            The utility wraps a long find command into a simple prompt: I type
            an app name once, the script searches the whole system for related
            files, and I use ChatGPT to review which ones are safe to delete.
            This silent recording plays only when you choose.
          </figcaption>
        </figure>
      }
    >
      <ProjectSection title="Why this exists">
        <p>
          The Mac ecosystem has a lot of third-party apps for productivity,
          workflows, and tiny utilities. There is even a Reddit community
          (r/macapps) dedicated to sharing and discussing them. I like trying
          new tools, which means I install and remove apps often. Dragging an
          app to the trash looks like a clean uninstall, but it leaves behind
          support files and small traces scattered around the system.
        </p>
        <p>
          Apps like Pearcleaner and AppCleaner helped, yet I still found
          leftover files they missed. I eventually discovered a terminal command
          that can search the entire system for matches to an app name, but
          typing it out by hand every time was slow and error-prone. This tool
          exists to make that deep search feel like filling in a single field
          instead of running a long command.
        </p>
      </ProjectSection>
      <ProjectSection title="What it handles">
        <ProjectNotes items={handleCards} />
      </ProjectSection>
      <ProjectSection title="Three simple passes">
        <ol>
          <li>
            Enter an app name once in the Script Editor dialog and let the tool
            build the full find command.
          </li>
          <li>
            Run the search and collect all paths where that app still shows up
            across the system.
          </li>
          <li>
            Paste results into ChatGPT (or review manually) to decide which
            files are safe to delete and which should be kept.
          </li>
        </ol>
      </ProjectSection>
      <ProjectSection title="Stack & status">
        <ProjectNotes items={footerCards} />
      </ProjectSection>
    </ProjectShell>
  );
}
