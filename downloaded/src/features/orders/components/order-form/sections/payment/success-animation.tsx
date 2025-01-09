import { motion } from 'framer-motion';

interface SuccessAnimationProps {
  onComplete: () => void;
  isCancelled: boolean;
  isShipped?: boolean;
}

export function SuccessAnimation({
  onComplete,
  isCancelled,
  isShipped,
}: SuccessAnimationProps) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          type: 'tween',
          duration: 0.8,
          ease: [0.65, 0, 0.35, 1],
        },
        opacity: { duration: 0.2 },
      },
    },
  };

  const containerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.6,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.8,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-8 -translate-y-[calc(100%+400px)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={() => {
        // Delay the completion callback to allow full animation visibility
        setTimeout(onComplete, 4000);
      }}
    >
      {/* Checkmark SVG */}
      <div className="relative w-16 h-16 mb-4 transform">
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full"
          style={{
            backgroundColor: isCancelled
              ? '#EF4444'
              : isShipped
              ? '#22C55E'
              : '#22C55E',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'tween',
            duration: 0.6,
            ease: [0.65, 0, 0.35, 1],
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 50 50"
          fill="none"
          stroke="white"
          strokeWidth={isCancelled ? '3' : '4'}
        >
          {isCancelled ? (
            <>
              <motion.path
                d="M17 17l16 16"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                strokeLinecap="round"
              />
              <motion.path
                d="M33 17l-16 16"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                strokeLinecap="round"
              />
            </>
          ) : (
            <motion.path
              d="M14 27l7 7 16-16"
              variants={pathVariants}
              custom={isCancelled}
              initial="hidden"
              animate="visible"
              strokeLinecap="round"
              strokeLinejoin="round"
              transition={{
                pathLength: {
                  type: 'tween',
                  duration: 1.2,
                  ease: [0.65, 0, 0.35, 1],
                },
                opacity: { duration: 0.3 },
              }}
            />
          )}
        </svg>
      </div>

      {/* Success Text */}
      <motion.div
        className="text-center"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <h3
          className={`text-lg font-medium mb-1 ${
            isCancelled
              ? 'text-red-500'
              : isShipped
              ? 'text-white'
              : 'text-white'
          }`}
        >
          {isCancelled
            ? 'Order Cancelled'
            : isShipped
            ? 'Shipping Added'
            : 'Payment Confirmed'}
        </h3>
        <p className="text-sm text-gray-400">
          {isCancelled
            ? 'This order has been cancelled'
            : isShipped
            ? 'Shipping tracking has been added successfully'
            : 'Your payment has been successfully processed'}
        </p>
      </motion.div>
    </motion.div>
  );
}
