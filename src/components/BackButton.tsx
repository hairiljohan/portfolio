import React from "react";
import { ArrowLeft } from "lucide-react";
import { useCanHover } from "../hooks/useCanHover";
import { cn, hoverClass } from "../utils/classNames";
import { navigateTo } from "../utils/navigation";

interface BackButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  href,
  className,
}) => {
  const canHover = useCanHover();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (href) {
      navigateTo(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 text-charcoal/60 dark:text-cream/60 transition-colors text-sm font-medium",
        hoverClass(canHover, "md:hover:text-charcoal md:dark:hover:text-cream"),
        className
      )}
    >
      <ArrowLeft size={16} />
      Back to portfolio
    </button>
  );
};

export default BackButton;
