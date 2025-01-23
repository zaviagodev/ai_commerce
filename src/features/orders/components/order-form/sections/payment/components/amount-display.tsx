import { motion } from "framer-motion";
import { formatAmount } from "../utils/format-amount";
import { StatusText } from "./status-text";

interface AmountDisplayProps {
  amount: number;
  showAmount: boolean;
  displayText: string;
  isCancelled: boolean;
  isShipped: boolean;
  isPaid: boolean;
  isInitialLoad: boolean;
  isTransitioning: boolean;
}

export function AmountDisplay({
  amount,
  showAmount,
  displayText,
  isCancelled,
  isShipped,
  isPaid,
  isInitialLoad,
  isTransitioning,
}: AmountDisplayProps) {
  return (
    <motion.div
      className={`absolute w-full px-6 py-12 flex flex-col items-center justify-center z-10`}
      key={isCancelled ? "cancelled" : isShipped ? "shipped" : "normal"}
      initial={false}
      animate={{
        opacity: showAmount ? 1 : 0,
        y: showAmount ? 0 : -20,
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      <div className="text-4xl font-semibold mb-2">
        <div className="relative inline-flex items-center">
          {(isPaid || isShipped) && !isCancelled && (
            <motion.div
              initial={{ scale: 0, opacity: 0, x: -10 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{
                delay: isInitialLoad ? 1.5 : 6,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              className={`absolute -left-8 ${
                isShipped ? "text-green-400" : "text-green-400"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse duration-1000"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </motion.div>
          )}
          {isCancelled && (
            <motion.div
              initial={{ scale: 0, opacity: 0, x: -10 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              className="absolute -left-8 text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse duration-1000"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </motion.div>
          )}
          {formatAmount(
            amount,
            isCancelled,
            isPaid || isShipped,
            isInitialLoad,
            isTransitioning,
            isShipped,
          )}
        </div>
      </div>
      <StatusText
        displayText={displayText}
        isCancelled={isCancelled}
        isShipped={isShipped}
      />
    </motion.div>
  );
}
