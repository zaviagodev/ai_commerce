import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProgressLineProps {
  onComplete?: () => void;
  isCancelled?: boolean;
  isShipped?: boolean;
}

export function ProgressLine({
  onComplete,
  isCancelled,
  isShipped,
}: ProgressLineProps) {
  const getProgressColor = () => {
    if (isCancelled) return "bg-red-500";
    if (isShipped) return "bg-purple-500";
    return "bg-green-500";
  };

  const getBadgeColor = () => {
    if (isCancelled) return "text-red-500";
    if (isShipped) return "text-purple-500";
    return "text-main";
  };

  const getBadgeText = () => {
    if (isCancelled) return "Cancelling Order";
    if (isShipped) return "Adding Shipping";
    return "Saving Payment";
  };

  return (
    <motion.div
      className="relative w-full h-12 flex items-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background line */}
      <div className="absolute inset-x-4 h-2 bg-gray-800 rounded-full" />

      {/* Animated progress line */}
      <motion.div
        className={`absolute inset-x-4 h-2 rounded-full origin-left ${getProgressColor()}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 2,
          ease: [0.6, 0, 0.1, 1],
          type: "tween",
        }}
        onAnimationComplete={onComplete}
      />

      {/* Moving badge */}
      <motion.div
        className="absolute left-4"
        initial={{ x: 0 }}
        animate={{
          x: "calc(100% + 600px)",
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 2,
          ease: [0.6, 0, 0.1, 1],
          type: "tween",
        }}
      >
        <Badge
          variant="outline"
          className={cn(
            "bg-gray-900 border-gray-700 whitespace-nowrap",
            getBadgeColor(),
            "flex items-center gap-1.5 py-1.5 px-3",
            "transition-all duration-300",
          )}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                isCancelled
                  ? "bg-red-400"
                  : isShipped
                    ? "bg-purple-400"
                    : "bg-green-400"
              }`}
            />
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                isCancelled
                  ? "bg-red-500"
                  : isShipped
                    ? "bg-purple-500"
                    : "bg-green-500"
              }`}
            />
          </span>
          {getBadgeText()}
        </Badge>
      </motion.div>

      {/* "Saved" badge */}
      <motion.div
        className="absolute right-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.5,
          duration: 0.5,
          ease: "easeInOut",
          times: [0, 1], // Keep full opacity until 80% of animation
        }}
      >
        <Badge
          className={`transition-all duration-300 ${
            isCancelled
              ? "bg-red-600"
              : isShipped
                ? "bg-purple-600"
                : "bg-green-600"
          } text-main`}
        >
          {isCancelled ? "Cancelled" : isShipped ? "Shipped" : "Saved"}
        </Badge>
      </motion.div>
    </motion.div>
  );
}
