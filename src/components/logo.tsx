import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-fg", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 3.2 26 7.1v8.6c0 6.1-4.2 10.7-10 13.1-5.8-2.4-10-7-10-13.1V7.1L16 3.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 8.4v4.2M12.2 20.2 16 12.6l3.8 7.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2 16.2h9.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <Mark className="size-7" />
      <span className="font-display text-sm font-semibold tracking-tight">
        RoadGuard <span className="text-accent">TW</span>
      </span>
    </span>
  );
}
