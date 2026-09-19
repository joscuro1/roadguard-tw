import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  label?: string;
};

const sizeClass = {
  sm: "size-3.5",
  md: "size-5",
  lg: "size-7",
};

export function StarRating({
  value,
  onChange,
  size = "md",
  interactive = false,
  label,
}: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div
      className="inline-flex items-center gap-0.5"
      role={interactive ? "radiogroup" : "img"}
      aria-label={label ?? `${value} / 5`}
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= shown;
        if (!interactive) {
          return (
            <Star
              key={n}
              className={cn(
                sizeClass[size],
                filled ? "fill-accent text-accent" : "text-subtle",
              )}
              strokeWidth={1.6}
            />
          );
        }
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={n === value}
            aria-label={`${n}`}
            className="relative flex size-11 items-center justify-center rounded-md text-subtle transition-colors duration-150 hover:text-accent"
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onClick={() => onChange?.(n)}
          >
            <Star
              className={cn(
                sizeClass[size],
                filled ? "fill-accent text-accent" : "text-current",
              )}
              strokeWidth={1.6}
            />
          </button>
        );
      })}
    </div>
  );
}
