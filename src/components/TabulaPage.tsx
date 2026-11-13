import ProjectShell, { ProjectSection } from "./projects/ProjectShell";
import { getProject } from "../data/projects";

export default function TabulaPage() {
  return (
    <ProjectShell
      project={getProject("tabula")}
      summary="I wanted an easy place to put my favourite sites. I also wanted it to look pretty. That was the brief."
    >
      <ProjectSection title="A very specific problem">
        <p>I tend to visit the same sites. Tabula gives me somewhere to add them and come back to them, with a search field for the occasions when I venture elsewhere.</p>
        <p>Could I have used bookmarks? Yes. I appear to have made a project out of it.</p>
      </ProjectSection>
      <ProjectSection title="Mostly the sites I like">
        <p>The layout keeps the search field and favourite sites together, with room around them. There is a small add button for the next site that earns a place.</p>
        <p>The screenshots show my own setup. A couple of favourite sites, a search box, and a fairly generous allocation of empty space.</p>
      </ProjectSection>
      <ProjectSection title="It looks pretty">
        <p>That was part of the point. I wanted something calm to look at before going somewhere considerably less calm.</p>
        <p>There are light and dark versions. The sites are the same. The mood is adjustable.</p>
      </ProjectSection>
    </ProjectShell>
  );
}
