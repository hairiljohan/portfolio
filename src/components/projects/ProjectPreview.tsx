import { ExpandingArrowLink } from "../beui/expanding-arrow-link";
import type { Project } from "../../types";
import styles from "./ProjectPreview.module.css";
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
      className={`${styles.preview} ${index === 0 ? styles.featured : ""} ${compact ? styles.card : ""}`}
    >
      <a
        className={styles.media}
        href={project.link}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={project.image.src}
          alt=""
          width={project.image.width}
          height={project.image.height}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
        />
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
        <ExpandingArrowLink href={project.link}>
          View {project.title}
        </ExpandingArrowLink>
      </div>
    </article>
  );
}
