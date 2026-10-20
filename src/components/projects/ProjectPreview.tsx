import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../types";
import styles from "./ProjectPreview.module.css";
export default function ProjectPreview({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article
      className={`${styles.preview} ${index === 0 ? styles.featured : ""}`}
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
        <a className="text-link" href={project.link}>
          View {project.title}
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
