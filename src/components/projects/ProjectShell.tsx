import { InViewTitle } from "../arc/in-view-title/in-view-title";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { PROJECTS } from "../../data/projects";
import type { Project, ProjectImage } from "../../types";
import styles from "./ProjectShell.module.css";
export default function ProjectShell({
  project,
  summary,
  children,
  media,
}: {
  project: Project;
  summary: string;
  children: ReactNode;
  media?: ReactNode;
}) {
  const next = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];
  return (
    <>
      <Header />
      <main id="main" className="container">
        <div id="hero" className={styles.intro}>
          <a href="/#showcase" className={`text-link ${styles.back}`}>
            <ArrowLeft aria-hidden="true" />
            Back to projects
          </a>
          <p className={styles.category}>{project.category}</p>
          <h1>{project.title}</h1>
          <p className={styles.summary}>{summary}</p>
          <ul className={styles.tags} aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        {media ?? <ProjectFigure image={project.image} priority />}
        <div className={styles.content}>{children}</div>
        <nav className={styles.next} aria-label="More projects">
          <a href="/#showcase">All projects</a>
          <a href={next.link}>
            Next: {next.title}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </nav>
      </main>
      <Footer />
    </>
  );
}
export function ProjectFigure({
  image,
  priority = false,
}: {
  image: ProjectImage;
  priority?: boolean;
}) {
  return (
    <figure className={styles.figure}>
      <div className={styles.image}>
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}
export function ProjectSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <InViewTitle text={title} />
      <div className={styles.prose}>{children}</div>
    </section>
  );
}
export function ProjectNotes({
  items,
}: {
  items: { title: string; description: string | string[] }[];
}) {
  return (
    <div className={styles.notes}>
      {items.map((item) => (
        <section key={item.title}>
          <h3>{item.title}</h3>
          {(Array.isArray(item.description)
            ? item.description
            : [item.description]
          ).map((text) => (
            <p key={text}>{text}</p>
          ))}
        </section>
      ))}
    </div>
  );
}
export function Gallery({ children }: { children: ReactNode }) {
  return <div className={styles.gallery}>{children}</div>;
}
