import ProjectShell, { ProjectSection, ProjectNotes, ProjectFigure } from "./projects/ProjectShell";
import ScreenshotFolder from "./projects/ScreenshotFolder";
import { getProject } from "../data/projects";

export default function RepoWatchPage() {
  const project = getProject("repowatch");
  return (
    <ProjectShell
      project={project}
      media={<ProjectFigure image={project.cover ?? project.image} priority />}
      summary="I wanted a centralised view of the GitHub repos I monitor. Opening each one to see what changed was becoming a routine. RepoWatch puts them in one window. The list keeps growing, but at least the tab count doesn’t have to."
    >
      <ProjectSection title="One place to keep watch">
        <p>I follow projects I use and projects I’m simply curious about. I built RepoWatch to keep that list together, with the latest release, latest commit, and a clear indication of when I last checked.</p>
        <p>The sidebar is my watchlist. Selecting a repo brings its details into view, with links back to GitHub when I want to read further. A small dashboard for a fairly ordinary habit: checking whether something new has happened.</p>
      </ProjectSection>
      <ProjectFigure image={{ ...project.image, caption: "My watchlist on the left; the selected repository’s release, commit, and metadata in one view." }} />
      <ProjectSection title="The useful bits, together">
        <ProjectNotes items={[
          { title: "Releases and commits", description: "See the latest release and commit without visiting each repository separately. When a refresh detects a new release, the sidebar row is marked so it’s easier to spot." },
          { title: "A little context", description: "Star counts, fork status, and owner avatars help identify each project. Last-checked labels make it clear whether the information is fresh, older, or hasn’t been fetched yet." },
          { title: "My list, my order", description: "Drag repos into the order I want and remove the ones I’m done following. The list, its order, and fetched metadata are stored locally on my Mac." },
        ]} />
      </ProjectSection>
      <ProjectSection title="Paste a repo. Keep an eye on it.">
        <p>Adding a repository takes a GitHub URL or an owner/repo name. RepoWatch checks for duplicates regardless of capitalisation. One entry per repo is enough monitoring for me.</p>
      </ProjectSection>
      <ScreenshotFolder title="Adding a repository" images={[
        { src: "/projects/repowatch/add-repository.webp", dark: { src: "/projects/repowatch/add-repository-dark.webp", width: 1016, height: 726 }, alt: "RepoWatch Add a repository dialog accepting a GitHub URL or owner/repository", width: 1021, height: 731, caption: "Paste a full GitHub URL or enter owner/repository to add it to the watchlist." },
      ]} />
      <ProjectSection title="Refresh, with some manners">
        <p>RepoWatch fetches from GitHub’s public API without signing in, so public API rate limits apply. Refreshes run concurrently with a limit of six requests at a time, and open windows share work already in progress.</p>
        <p>If GitHub asks it to wait, it respects the cooldown instead of retrying in a loop. Missing repos and fetch errors are shown explicitly; a repo with no release is simply a repo with no release. Failed local saves also stay visible with a Retry Save action.</p>
      </ProjectSection>
      <ProjectSection title="Built for my Mac">
        <p>A native SwiftUI app for macOS 26 and later, using SwiftData for local storage and URLSession for GitHub requests. No third-party dependencies. Tests cover repository input, the GitHub service, and dashboard behaviour.</p>
      </ProjectSection>
    </ProjectShell>
  );
}
