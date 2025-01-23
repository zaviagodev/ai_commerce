import { motion } from "framer-motion";

export function formatAmount(
  amount: number,
  isCancelled: boolean,
  isPaid: boolean,
  isInitialLoad: boolean,
  isTransitioning: boolean,
  isShipped?: boolean,
) {
  const [whole, decimal] = amount.toFixed(2).split(".");
  const textColor = isCancelled
    ? "rgb(239, 68, 68)" // Red for cancelled
    : isPaid || isShipped
      ? "rgb(74, 222, 128)" // Green for paid
      : "rgb(255, 255, 255)"; // White for default

  return (
    <motion.span
      className="font-mono inline-flex items-baseline"
      animate={{
        color: textColor,
      }}
      transition={{
        duration: 0.5,
        delay: isTransitioning ? 0 : isInitialLoad ? 1 : 5.5,
        ease: "easeInOut",
      }}
    >
      <motion.span
        className="mr-1"
        animate={{
          color: isCancelled
            ? "rgba(239, 68, 68, 0.7)"
            : isPaid || isShipped
              ? "rgba(74, 222, 128, 0.7)"
              : "rgba(156, 163, 175, 0.7)",
        }}
        transition={{
          duration: 0.5,
          delay: isTransitioning ? 0 : isInitialLoad ? 1 : 5.5,
          ease: "easeInOut",
        }}
      >
        $
      </motion.span>
      <span>{whole}</span>
      <motion.span
        className="text-sm"
        animate={{
          color: isCancelled
            ? "rgba(239, 68, 68, 0.7)"
            : isPaid || isShipped
              ? "rgba(74, 222, 128, 0.7)"
              : "rgba(156, 163, 175, 0.7)",
        }}
        transition={{
          duration: 0.5,
          delay: isTransitioning ? 0 : isInitialLoad ? 1 : 5.5,
          ease: "easeInOut",
        }}
      >
        .{decimal}
      </motion.span>
    </motion.span>
  );
}
