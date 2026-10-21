import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../arc/button/button";
import type { Project } from "../../types";
import ProjectPreview from "./ProjectPreview";
import styles from "./ProjectCarousel.module.css";

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLDivElement>(null);
  const id = useId();
  const navigationFrame = useRef(0);
  const [range, setRange] = useState({ first: 1, last: 1, atStart: true, atEnd: false });

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    let frame = 0;
    const measure = () => {
      const viewport = node.getBoundingClientRect();
      const slides = Array.from(node.children);
      // Count cards whose centre is in view; a mobile peek is not a second card.
      const visible = slides.flatMap((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const centre = rect.left + rect.width / 2;
        return centre >= viewport.left - 1 && centre <= viewport.right + 1 ? [index + 1] : [];
      });
      const next = {
        first: visible[0] ?? 1,
        last: visible.at(-1) ?? 1,
        atStart: node.scrollLeft <= 2,
        atEnd: node.scrollLeft >= node.scrollWidth - node.clientWidth - 2,
      };
      setRange(previous => Object.keys(next).every(key => previous[key as keyof typeof next] === next[key as keyof typeof next]) ? previous : next);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(node);
    node.addEventListener("scroll", schedule, { passive: true });
    measure();
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(navigationFrame.current);
      resize.disconnect();
      node.removeEventListener("scroll", schedule);
    };
  }, [projects.length]);

  const moveTo = (index: number) => {
    const node = track.current;
    const slide = node?.children[Math.max(0, Math.min(projects.length - 1, index))];
    if (!node || !slide) return;
    cancelAnimationFrame(navigationFrame.current);
    // Cancel any remaining wheel/smooth scroll, then let resize snapping settle
    // before measuring the target. WebKit can otherwise restore the old snap.
    node.scrollTo({ left: node.scrollLeft, behavior: "instant" });
    navigationFrame.current = requestAnimationFrame(() => {
      node.scrollTo({
        left: node.scrollLeft + slide.getBoundingClientRect().left - node.getBoundingClientRect().left,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    });
  };
  const step = (direction: number) => moveTo(direction > 0 && range.atEnd ? 0 : range.first - 1 + direction);

  return (
    <section className={styles.carousel} aria-label="More projects" aria-roledescription="carousel">
      <div className={styles.toolbar}>
        <h3>More projects</h3>
        <div className={`${styles.controls} arc-controls`}>
          <span className={styles.count} aria-live="polite" aria-atomic="true">
            {range.first === range.last ? range.first : `${range.first}–${range.last}`} of {projects.length}
          </span>
          <Button type="button" variant="secondary" className={styles.arrow} aria-label="Previous projects" aria-controls={id} aria-disabled={range.atStart} onClick={() => step(-1)}>
            <ArrowLeft size={20} aria-hidden="true" />
          </Button>
          <Button type="button" variant="secondary" className={styles.arrow} aria-label="Next projects" aria-controls={id} aria-disabled={range.atStart && range.atEnd} onClick={() => step(1)}>
            <ArrowRight size={20} aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div id={id} ref={track} className={styles.track} role="group" aria-label="Project cards" tabIndex={0}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          if (event.key === "Home") moveTo(0);
          else if (event.key === "End") moveTo(projects.length - 1);
          else step(event.key === "ArrowRight" ? 1 : -1);
        }}
        onFocusCapture={event => {
          if (event.target === event.currentTarget) return;
          const slide = event.target.closest<HTMLElement>("[data-project-slide]");
          const node = track.current;
          if (!slide || !node) return;
          const rect = slide.getBoundingClientRect();
          const viewport = node.getBoundingClientRect();
          if (rect.left < viewport.left - 1 || rect.right > viewport.right + 1) {
            node.scrollTo({ left: node.scrollLeft + rect.left - viewport.left, behavior: "instant" });
          }
        }}>
        {projects.map((project, index) => (
          <div key={project.id} data-project-slide className={styles.slide} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}`}>
            <ProjectPreview project={project} index={index + 1} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
