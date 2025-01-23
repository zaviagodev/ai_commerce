import { cn } from "@/lib/utils";

interface ScrollFadeProps {
  className?: string;
  position?: "top" | "bottom" | "both";
}

export function ScrollFade({ className, position = "both" }: ScrollFadeProps) {
  return (
    <>
      {(position === "top" || position === "both") && (
        <div
          className={cn(
            "pointer-events-none absolute top-0 z-10 h-12 w-full bg-gradient-to-b from-background to-transparent",
            className,
          )}
        />
      )}
      {(position === "bottom" || position === "both") && (
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 z-10 h-12 w-full bg-gradient-to-t from-background to-transparent",
            className,
          )}
        />
      )}
    </>
  );
}
