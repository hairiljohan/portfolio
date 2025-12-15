import React from "react";
import { cn } from "../utils/classNames";

type Pill = {
  label: string;
  variant?: "neutral" | "accent";
};

interface DetailPillRowProps {
  pills: Pill[];
}

const pillBaseClass = "px-3 py-1 rounded-full";
const pillVariants = {
  neutral: "bg-charcoal/5 dark:bg-white/10",
  accent: "bg-accent-orange/10 text-accent-orange",
};

const DetailPillRow: React.FC<DetailPillRowProps> = ({ pills }) => {
  return (
    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-widest text-charcoal/50 dark:text-cream/50">
      {pills.map((pill) => (
        <span
          key={pill.label}
          className={cn(pillBaseClass, pillVariants[pill.variant ?? "neutral"])}
        >
          {pill.label}
        </span>
      ))}
    </div>
  );
};

export default DetailPillRow;
