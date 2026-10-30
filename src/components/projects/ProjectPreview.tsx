import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../types";
import styles from "./ProjectPreview.module.css";
import ProjectImage from "./ProjectImage";
export default function ProjectPreview({
  project,
  index,
  compact = false,
}: {
  project: Project;
  index: number;
  compact?: boolean;
}) {
  return (
    <article
      className={`${styles.preview} ${index === 0 ? styles.featured : ""} ${compact ? styles.card : ""} ${project.cover ? styles.pixelCover : ""}`}
      data-project={project.id}
    >
      <a
        className={styles.media}
        href={project.link}
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProjectImage
          image={project.cover ?? project.image}
          alt=""
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
        />
        {project.cover && <span className={styles.signal} aria-hidden="true" />}
      </a>
      <div className={styles.copy}>
        <p className={styles.category}>{project.category}</p>
        <h3>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <ul className={styles.tags} aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <a className="text-link" href={project.link}>
          View {project.title}
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
