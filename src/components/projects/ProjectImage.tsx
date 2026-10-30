import { useSyncExternalStore, type ImgHTMLAttributes } from "react";
import type { ProjectImage as ProjectImageData } from "../../types";

// Follow the rendered site theme, including explicit overrides of the OS theme.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

export default function ProjectImage({
  image,
  ...props
}: { image: ProjectImageData } & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height">) {
  const dark = useSyncExternalStore(subscribe, getSnapshot);
  const source = dark && image.dark ? image.dark : image;
  return (
    <img
      src={source.src}
      width={source.width}
      height={source.height}
      alt={image.alt}
      decoding="async"
      {...props}
    />
  );
}
