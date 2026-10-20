import { ProjectFolder } from "../beui/project-folder";
import type { ProjectImage } from "../../types";
import styles from "./ScreenshotFolder.module.css";

export default function ScreenshotFolder({
  title,
  images,
}: {
  title: string;
  images: ProjectImage[];
}) {
  return (
    <div className={styles.collection}>
      <ProjectFolder
        title={title}
        description="Open gallery"
        itemLabel="image"
        ariaLabel={`Open ${title} gallery`}
        previews={images.map((image, index) => ({
          id: `${index}-${image.src}`,
          content: (
            <span className={styles.figure} role="figure">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
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
