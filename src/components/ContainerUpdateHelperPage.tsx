import ProjectShell, {
  ProjectSection,
  ProjectFigure,
  ProjectNotes,
  Gallery,
} from "./projects/ProjectShell";
import { getProject } from "../data/projects";
import {
  introParagraph,
  workflowParagraph,
  workflowCards,
  owuiCaption,
  searxngCaption,
  groupedImages,
} from "../data/containerUpdateHelperData";
export default function ContainerUpdateHelperPage() {
  return (
    <ProjectShell
      project={getProject("container-update-helper")}
      summary="A tiny macOS helper that turns my usual Docker update sequence into a row of buttons, so I can update containers without retyping the same commands."
    >
      <ProjectSection title="What this is">
        <p>{introParagraph}</p>
        <p>{workflowParagraph}</p>
      </ProjectSection>
      <ProjectSection title="Workflow notes">
        <ProjectNotes items={workflowCards} />
      </ProjectSection>
      {groupedImages.map((group) => (
        <ProjectSection
          key={group.id}
          title={group.id === "owui" ? "Open WebUI updates" : "SearXNG updates"}
        >
          <p>{group.id === "owui" ? owuiCaption : searxngCaption}</p>
          <Gallery>
            {group.images.map((image, index) => (
              <ProjectFigure
                key={image.file}
                image={{
                  ...image,
                  width: index === 0 ? 904 : 344,
                  height: index === 0 ? 660 : group.id === "owui" ? 360 : 348,
                }}
              />
            ))}
          </Gallery>
        </ProjectSection>
      ))}
    </ProjectShell>
  );
}
