import * as React from "react";
import { cn } from "@/lib/utils";

interface TextShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  duration?: number;
}

export function TextShimmer({
  children,
  duration = 2,
  className,
  ...props
}: TextShimmerProps) {
  return (
    <div
      className={cn(
        "relative inline-flex overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
        className
      )}
      style={{
        WebkitMaskImage: "linear-gradient(rgb(0 0 0 / 1) 0%, rgb(0 0 0 / 1) 100%)",
        maskImage: "linear-gradient(rgb(0 0 0 / 1) 0%, rgb(0 0 0 / 1) 100%)",
        "--duration": `${duration}s`,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}