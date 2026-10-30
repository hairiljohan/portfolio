"use client";
// beui.dev/components/blocks/project-folder

import { X } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { SPRING_LAYOUT, SPRING_PRESS } from "./lib/ease";
import { useHoverCapable } from "./lib/hooks/use-hover-capable";
import { cn } from "./lib/utils";
import styles from "./project-folder.module.css";

export type ProjectFolderPreview = {
  id: string;
  content: ReactNode;
};

export interface ProjectFolderProps {
  title: string;
  description?: string;
  previews?: ProjectFolderPreview[];
  count?: number;
  itemLabel?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  stacked?: boolean;
}

const MAX_PREVIEWS = 5;
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getPreviewTransform(index: number, count: number) {
  const offset = index - (count - 1) / 2;
  const distance = Math.abs(offset);
  const centerLift = Math.max(0, 2 - distance) * 8;

  return {
    x: offset * 44,
    y: 8 - centerLift,
    rotate: offset * 6,
    scale: distance === 0 ? 1.04 : distance === 1 ? 0.95 : 0.88,
    opacity: distance === 0 ? 1 : distance === 1 ? 0.78 : 0.58,
    zIndex: 10 - distance,
  };
}

export function ProjectFolder({
  title,
  description = "Updated recently",
  previews = [],
  count = previews.length,
  itemLabel = "file",
  open,
  defaultOpen = false,
  onOpenChange,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  onClick,
  disabled = false,
  ariaLabel,
  className,
  stacked = false,
}: ProjectFolderProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const layoutGroupId = useId();
  const dialogTitleId = `${layoutGroupId}-title`;
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const restoringFocusRef = useRef(false);
  const folderButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const [isClosing, setIsClosing] = useState(false);
  const openControlled = open !== undefined;
  const expandedControlled = expanded !== undefined;
  const isExpanded = expanded ?? internalExpanded;
  const isOpen = (open ?? internalOpen) || isExpanded;
  const previewItems = previews.slice(0, MAX_PREVIEWS);
  const transition: Transition = reduce ? { duration: 0 } : SPRING_LAYOUT;
  const countText = `${count} ${itemLabel}${count === 1 ? "" : "s"}`;

  const setOpen = useCallback(
    (next: boolean) => {
      if (disabled) return;
      if (!openControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [disabled, onOpenChange, openControlled],
  );

  const setExpanded = useCallback(
    (next: boolean) => {
      if (disabled || previewItems.length === 0) return;
      if (!expandedControlled) setInternalExpanded(next);
      onExpandedChange?.(next);
    },
    [disabled, expandedControlled, onExpandedChange, previewItems.length],
  );

  const finishClose = useCallback(() => {
    setIsClosing(false);
    restoringFocusRef.current = true;
    requestAnimationFrame(() => folderButtonRef.current?.focus());
  }, []);

  const closeOverlay = useCallback(() => {
    setIsClosing(true);
    setOpen(false);
    setExpanded(false);
  }, [setExpanded, setOpen]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduce && isClosing) finishClose();
  }, [finishClose, isClosing, reduce]);

  useEffect(() => {
    if (!isExpanded) return;

    const previousOverflow = document.body.style.overflow;
    const appRoot = document.getElementById("root");
    const previousInert = appRoot?.inert ?? false;
    if (appRoot) appRoot.inert = true;
    const focusFrame = requestAnimationFrame(() =>
      closeButtonRef.current?.focus(),
    );

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeOverlay();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.tabIndex >= 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      if (appRoot) appRoot.inert = previousInert;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeOverlay, isExpanded]);

  const handleFolderClick = () => {
    setIsClosing(false);
    setExpanded(true);
    setOpen(true);
    onClick?.();
  };

  // The chrome is two siblings: a backdrop spanning the viewport edges that
  // paints the scrim, and a transparent dialog inset off every edge that lays
  // out and scrolls the panel. The backdrop cannot nest inside that scroll box —
  // WebKit resolves a `position: fixed` descendant of an accelerated overflow
  // scroller against the scroller, not the viewport, so the insets would go
  // unscrimmed on a phone. The scroll box takes no pointer events and the panel
  // takes them back, so gutter presses still close the overlay. Accepted: the
  // 2rem inset sits outside the scroll box, so it stays put rather than
  // scrolling away with the content.
  //
  const overlay =
    isExpanded || isClosing ? (
      <>
        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.button
              key="project-files-backdrop"
              type="button"
              tabIndex={-1}
              aria-label="Close file overlay"
              onClick={closeOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.18 }}
              className={cn(styles.backdrop, isClosing && styles.inert)}
            />
          ) : null}
        </AnimatePresence>

        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          aria-hidden={isExpanded ? undefined : "true"}
          className={styles.dialog}
        >
          {/* 61rem, not `max-w-5xl`: the cap is on a padding-free box, so it has to
            be the 64rem border box less the 3rem the gutters take. */}
          <div className={cn(styles.panel, isClosing && styles.inert)}>
            <AnimatePresence initial={false}>
              {isExpanded ? (
                <motion.div
                  key="project-files-header"
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.18 }}
                  className={styles.header}
                >
                  <div>
                    <h2 id={dialogTitleId} className={styles.heading}>
                      {title}
                    </h2>
                    <p className={styles.count}>{countText}</p>
                  </div>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeOverlay}
                    aria-label={`Close ${title}`}
                    className={styles.close}
                  >
                    <X className={styles.closeIcon} aria-hidden="true" />
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className={cn(styles.grid, stacked && styles.stacked)}>
              {isExpanded
                ? previews.map((preview) => (
                    <motion.div
                      key={preview.id}
                      layoutId={`file-${preview.id}`}
                      transition={transition}
                      className={styles.overlayCard}
                    >
                      {preview.content}
                    </motion.div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </>
    ) : null;

  return (
    <LayoutGroup id={layoutGroupId}>
      <motion.button
        ref={folderButtonRef}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={isExpanded}
        data-open={isOpen ? "true" : "false"}
        data-expanded={isExpanded ? "true" : "false"}
        tabIndex={isExpanded ? -1 : undefined}
        onPointerEnter={() => {
          if (!canHover) return;
          hoveredRef.current = true;
          setOpen(true);
        }}
        onPointerLeave={() => {
          if (!canHover) return;
          hoveredRef.current = false;
          if (!isExpanded && !isClosing) setOpen(focusedRef.current);
        }}
        onFocus={() => {
          if (restoringFocusRef.current) {
            restoringFocusRef.current = false;
            focusedRef.current = false;
            return;
          }
          focusedRef.current = true;
          setOpen(true);
        }}
        onBlur={() => {
          focusedRef.current = false;
          if (!isExpanded && !isClosing) setOpen(hoveredRef.current);
        }}
        onClick={handleFolderClick}
        whileTap={reduce || disabled ? undefined : { scale: 0.98 }}
        transition={reduce ? { duration: 0 } : SPRING_PRESS}
        className={cn(styles.folder, className)}
      >
        <motion.span
          aria-hidden="true"
          animate={{ rotateX: isOpen && !reduce ? 15 : 0 }}
          transition={transition}
          className={styles.back}
        />

        <span aria-hidden="true" className={styles.previewLayer}>
          <span className={styles.origin}>
            <AnimatePresence initial={false}>
              {!isExpanded
                ? previewItems.map((preview, index) => {
                    const opened = getPreviewTransform(
                      index,
                      previewItems.length,
                    );
                    return (
                      <motion.span
                        key={preview.id}
                        layoutId={`file-${preview.id}`}
                        initial={false}
                        animate={
                          isOpen && !reduce
                            ? {
                                x: opened.x * 1.4,
                                y: opened.y - 8,
                                rotate: opened.rotate * 1.3,
                                scale: opened.scale * 1.02,
                                opacity: Math.min(1, opened.opacity + 0.18),
                              }
                            : {
                                x: opened.x,
                                y: opened.y,
                                rotate: opened.rotate,
                                scale: opened.scale,
                                opacity: opened.opacity,
                              }
                        }
                        transition={transition}
                        onLayoutAnimationComplete={() => {
                          if (isClosing && index === 0) finishClose();
                        }}
                        className={styles.previewCard}
                        style={{ zIndex: opened.zIndex }}
                      >
                        {preview.content}
                      </motion.span>
                    );
                  })
                : null}
            </AnimatePresence>
          </span>
        </span>

        <motion.span
          initial={false}
          animate={{ rotateX: isOpen && !reduce ? -25 : 0 }}
          transition={transition}
          className={styles.front}
        >
          <span className={styles.titleRow}>
            <span className={styles.title}>{title}</span>
          </span>
          <span className={styles.metaRow}>
            <span className={styles.metaCount}>{countText}</span>
            <span className={styles.description}>{description}</span>
          </span>
        </motion.span>
      </motion.button>

      {mounted ? createPortal(overlay, document.body) : null}
    </LayoutGroup>
  );
}
