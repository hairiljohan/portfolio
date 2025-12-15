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

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

type CardComponent = React.FC<CardProps> & {
  Content: React.FC<CardSectionProps>;
  Header: React.FC<CardSectionProps>;
  Footer: React.FC<CardSectionProps>;
};

/**
 * Flexible base Card component with composition pattern
 *
 * Features:
 * - Multiple variants for different use cases
 * - Optional hover effects
 * - Composable - children control internal layout
 * - Type-safe props
 *
 * @example
 * // Simple card
 * <Card variant="elevated">
 *   <h3>Title</h3>
 *   <p>Content</p>
 * </Card>
 *
 * @example
 * // Interactive card with hover
 * <Card
 *   variant="interactive"
 *   hover
 *   hoverClassName="md:hover:scale-105"
 *   onClick={() => console.log('clicked')}
 * >
 *   <CardContent />
 * </Card>
 *
 * @example
 * // Custom styled card
 * <Card className="h-80 w-full bg-gradient-to-br from-blue-500">
 *   <CustomContent />
 * </Card>
 */
export const Card: CardComponent = ({
  children,
  className = "",
  variant = "default",
  hover = false,
  hoverClassName = "",
  onClick,
  as: Component = "div",
}) => {
  // Base styles for all cards
  const baseStyles = "rounded-3xl overflow-hidden transition-all duration-500";

  // Variant-specific styles
  const variantStyles = {
    default: "bg-white dark:bg-white/5",
    bordered:
      "bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10",
    elevated:
      "bg-white dark:bg-white/5 shadow-sm border border-stone-100 dark:border-white/5",
    interactive:
      "bg-white dark:bg-white/5 border border-transparent cursor-pointer",
  };

  // Apply hover styles if enabled
  const hoverStyles = hover && hoverClassName ? hoverClassName : "";

  return (
    <Component
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverStyles,
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

const CardContent: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => <div className={cn("p-6 md:p-8", className)}>{children}</div>;

const CardHeader: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => <div className={cn("p-6 md:p-8 pb-0", className)}>{children}</div>;

const CardFooter: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => <div className={cn("p-6 md:p-8 pt-0", className)}>{children}</div>;

/**
 * Card.Content - Container for card content with padding
 */
Card.Content = CardContent;

/**
 * Card.Header - Header section for cards
 */
Card.Header = CardHeader;

/**
 * Card.Footer - Footer section for cards
 */
Card.Footer = CardFooter;

export default Card;
