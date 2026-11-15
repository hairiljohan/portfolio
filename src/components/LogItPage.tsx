import ProjectShell, { ProjectSection, ProjectNotes } from "./projects/ProjectShell";
import ScreenshotFolder from "./projects/ScreenshotFolder";
import { getProject } from "../data/projects";

export default function LogItPage() {
  return (
    <ProjectShell
      project={getProject("logit")}
      summary="I like quitting all my startup apps before restarting or shutting down my Mac. I’m not sure there’s any benefit. I just like it. LogIt gives that preference a window and a few buttons."
    >
      <ProjectSection title="A habit with an interface">
        <p>Closing those apps one by one was getting repetitive, so I built a small utility to bring my Open at Login items into one place. I can see what’s running, choose a few apps, or quit them together before restarting or shutting down.</p>
        <p>This is a personal routine, not a claim that macOS needs help switching off. The measurable improvement is fewer clicks from me.</p>
      </ProjectSection>
      <ProjectSection title="One list, fewer clicks">
        <ProjectNotes items={[
          { title: "Choose a few, or the whole list", description: "Checkboxes let me quit or launch selected apps. Quit All and Launch All handle the application login items together, with running indicators showing their current state. LogIt leaves itself out of the batch." },
          { title: "Bring them back when needed", description: "Launch All opens stopped application login items without requesting focus. Apps may still show their own windows. Missing apps are skipped; documents and folders remain visible but are excluded from batch actions." },
          { title: "Save first", description: "Quit All requests a normal quit, then force-quits surviving original processes after five seconds. Unsaved changes can be lost, so I save my work before using it. Newly relaunched replacement processes are left alone." },
        ]} />
      </ProjectSection>
      <ProjectSection title="Some entries need a hint">
        <p>The blacklist handles login entries I don’t want sticking around. I choose an entry and the app to watch; five seconds after that app’s last instance quits, LogIt removes the matching login entry. If the app restarts during the wait, cleanup is cancelled.</p>
        <p>The FigmaAgent rule is one example: after Figma quits, it removes FigmaAgent’s login entry while leaving the running agent alone. Rules only take effect when I explicitly save them. Apparently even my startup list needs boundaries.</p>
      </ProjectSection>
      <ScreenshotFolder title="Blacklist and settings" stacked images={[
        { src: "/projects/logit/blacklist.webp", dark: { src: "/projects/logit/blacklist-dark.webp", width: 2840, height: 1632 }, alt: "LogIt Blacklist page with a FigmaAgent rule triggered after Figma quits", width: 2840, height: 1632, caption: "Explicit rules choose which login entry to remove and which app’s exit triggers cleanup." },
        { src: "/projects/logit/settings.webp", dark: { src: "/projects/logit/settings-dark.webp", width: 2840, height: 1632 }, alt: "LogIt Settings page with Launch LogIt at Login enabled", width: 2840, height: 1632, caption: "Optional startup registration lets LogIt begin monitoring quietly at login. It is off by default; enabled in this setup." },
      ]} />
      <ProjectSection title="Quiet when I’m done">
        <p>Closing the window keeps cleanup monitoring in the background, without a Dock or menu-bar icon. Opening LogIt again brings the window back; Quit LogIt stops monitoring entirely. Pause Cleanup and Retry Cleanup keep automatic work under my control.</p>
        <p>Cleanup removes matching Open at Login entries, not application files or unrelated background services. It cannot prevent the initial Login Item Added notification, and deleting a rule does not restore an entry that has already been removed.</p>
      </ProjectSection>
      <ProjectSection title="Under the hood">
        <p>A native Swift utility for macOS 26 and later, with no third-party dependencies. It uses System Events to read and remove login entries, with Automation permission from macOS. Rules and pause state are stored locally; quit history is not retained.</p>
        <p>Running status follows macOS application events rather than a polling timer. Cleanup identifies apps by bundle identifier or canonical path, verifies removals, and reports failures. Tests use injected processes and clocks, with separate opt-in checks built around disposable apps.</p>
      </ProjectSection>
    </ProjectShell>
  );
}
