import { ProjectFolder } from "../beui/project-folder";
import type { ProjectImage } from "../../types";
import styles from "./ScreenshotFolder.module.css";
import ProjectImageView from "./ProjectImage";

export default function ScreenshotFolder({
  title,
  images,
  stacked = false,
}: {
  title: string;
  images: ProjectImage[];
  stacked?: boolean;
}) {
  return (
    <div className={styles.collection}>
      <ProjectFolder
        title={title}
        stacked={stacked}
        description="Open gallery"
        itemLabel="image"
        ariaLabel={`Open ${title} gallery`}
        previews={images.map((image, index) => ({
          id: `${index}-${image.src}`,
          content: (
            <span className={styles.figure} role="figure">
              <ProjectImageView
                image={image}
                loading="lazy"
                decoding="async"
              />
              <span className={styles.caption}>
                {image.caption ?? image.alt}
              </span>
            </span>
          ),
        }))}
      />
    </div>
  );
}
