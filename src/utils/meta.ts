import { MetaEntry } from "../data/meta";

const ensureTag = (key: "name" | "property", value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${key}="${value}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, value);
    document.head.appendChild(el);
  }
  return el;
};

export const applyMeta = (meta: MetaEntry) => {
  if (typeof document === "undefined") return;

  const {
    title,
    description,
    url,
    author,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
  } = meta;

  document.title = title;

  ensureTag("name", "description").setAttribute("content", description);
  if (author) {
    ensureTag("name", "author").setAttribute("content", author);
  }

  // Open Graph
  ensureTag("property", "og:type").setAttribute("content", "website");
  ensureTag("property", "og:url").setAttribute("content", url);
  ensureTag("property", "og:title").setAttribute("content", title);
  ensureTag("property", "og:description").setAttribute("content", description);
  if (image) {
    ensureTag("property", "og:image").setAttribute("content", image);
    if (imageWidth) {
      ensureTag("property", "og:image:width").setAttribute(
        "content",
        imageWidth
      );
    }
    if (imageHeight) {
      ensureTag("property", "og:image:height").setAttribute(
        "content",
        imageHeight
      );
    }
    if (imageAlt) {
      ensureTag("property", "og:image:alt").setAttribute("content", imageAlt);
    }
  }

  // Twitter
  ensureTag("name", "twitter:card").setAttribute(
    "content",
    "summary_large_image"
  );
  ensureTag("name", "twitter:url").setAttribute("content", url);
  ensureTag("name", "twitter:title").setAttribute("content", title);
  ensureTag("name", "twitter:description").setAttribute("content", description);
  if (image) {
    ensureTag("name", "twitter:image").setAttribute("content", image);
    if (imageAlt) {
      ensureTag("name", "twitter:image:alt").setAttribute("content", imageAlt);
    }
  }
};
