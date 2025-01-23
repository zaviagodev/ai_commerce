import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
}

export function AnimatedContainer({ children }: AnimatedContainerProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0,
          y: -20,
          borderRadius: 50,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
          borderRadius: 16,
          transition: {
            type: "spring",
            duration: 0.6,
            bounce: 0.3,
          },
        }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
