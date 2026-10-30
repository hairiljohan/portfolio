import ProjectShell, { ProjectSection, ProjectNotes, ProjectFigure } from "./projects/ProjectShell";
import { getProject } from "../data/projects";

export default function TheaterViewPage() {
  const project = getProject("theaterview");
  return (
    <ProjectShell
      project={project}
      media={<ProjectFigure image={project.cover ?? project.image} priority />}
      summary="I got annoyed with pressing the same YouTube toggles over and over, so I built TheaterView to do it for me: theater mode, the highest available non-Premium quality, and Public videos on channel pages."
    >
      <ProjectSection title="Fewer repeat clicks">
        <p>Every time I sat down to watch YouTube, I found myself making the same adjustments again. They were small clicks, but repeating them got annoying. I built this personal extension so my preferred viewing setup would be ready without that routine.</p>
        <p>TheaterView handles a few familiar adjustments when opening YouTube. It enables theater mode on watch pages, can select the highest non-Premium quality, and selects the Public filter on a channel’s Videos tab when that option is available.</p>
      </ProjectSection>
      <ProjectSection title="Three switches, my defaults">
        <ProjectFigure image={project.image} />
        <p>Enable TheaterView controls the extension as a whole. Auto highest quality and Auto Public can be turned off independently. All three default to on, and settings are saved locally.</p>
      </ProjectSection>
      <ProjectSection title="What changes">
        <ProjectNotes items={[
          { title: "Open a video → a wider view", description: "TheaterView waits for the watch player to match the video you opened before attempting theater mode. It uses a limited number of attempts, rather than repeatedly clicking the player controls." },
          { title: "Choose quality → skip the extra steps", description: "Auto highest quality selects the highest available option that is not marked Premium, Enhanced bitrate, or High bitrate. Once selected, it leaves later manual quality choices alone. Opening the player’s settings menu hands control back to you for that visit." },
          { title: "Visit a channel → start with Public", description: "On the Videos tab, Auto Public selects the Public filter once when it is available. Subsequent manual filter changes are left alone. Leaving the tab and returning begins a new visit." },
        ]} />
      </ProjectSection>
      <ProjectSection title="Small by design">
        <p>Built as a Manifest V3 web extension with a Safari macOS host app. A content script handles the YouTube page and a popup holds the settings, without a background service worker or runtime messaging.</p>
        <p>Watch-page automation is scoped to eligible videos; Shorts and unrelated pages are left alone. Public filtering currently recognizes the English Public label. YouTube interface changes may require updates to the extension.</p>
      </ProjectSection>
      <ProjectSection title="Keeping it predictable">
        <p>Automated tests use simulated pages to check saved settings, navigation, delayed controls, manual overrides, and cancellation. Theater and quality work pauses during navigation, and Public-filter automation pauses while the tab is hidden or unfocused.</p>
      </ProjectSection>
    </ProjectShell>
  );
}
