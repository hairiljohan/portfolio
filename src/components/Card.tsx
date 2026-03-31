import React from "react";
import { cn } from "../utils/classNames";

interface CardProps {
  /** Content to render inside the card */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Card variant - controls base styling */
  variant?: "default" | "bordered" | "elevated" | "interactive";
  /** Whether card has hover effects */
  hover?: boolean;
  /** Custom hover classes (only applied if hover is true) */
  hoverClassName?: string;
  /** onClick handler - makes card clickable */
  onClick?: () => void;
  /** HTML element to render as */
  as?: "div" | "article" | "section" | "figure";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  hover = false,
  hoverClassName = "",
  onClick,
  as: Component = "div",
}) => {
  const baseStyles = "rounded-3xl overflow-hidden transition-all duration-500";

  const variantStyles = {
    default: "bg-white dark:bg-white/5",
    bordered:
      "bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10",
    elevated:
      "bg-white dark:bg-white/5 shadow-sm border border-stone-100 dark:border-white/5",
    interactive:
      "bg-white dark:bg-white/5 border border-transparent cursor-pointer",
  };

  const hoverStyles = hover && hoverClassName ? hoverClassName : "";

  return (
    <Component
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverStyles,
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

export default Card;
