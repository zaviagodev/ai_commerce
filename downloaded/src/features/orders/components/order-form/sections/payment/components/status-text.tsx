import { motion } from 'framer-motion';

interface StatusTextProps {
  displayText: string;
  isCancelled: boolean;
  isShipped: boolean;
}

export function StatusText({ displayText, isCancelled, isShipped }: StatusTextProps) {
  return (
    <div className="relative h-5 w-full">
      <motion.p
        className="text-sm absolute inset-0 flex items-center justify-center whitespace-nowrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: displayText === "Total Outstanding" && !isShipped ? 1 : 0,
          y: displayText === "Total Outstanding" && !isShipped ? 0 : -20
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
        style={{
          color: "rgb(156, 163, 175)"
        }}
      >
        Total Outstanding
      </motion.p>
      <motion.p
        className="text-sm absolute inset-0 flex items-center justify-center whitespace-nowrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: displayText === "Payment Completed" && !isShipped ? 1 : 0,
          y: displayText === "Payment Completed" && !isShipped ? 0 : 20
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: "easeInOut"
        }}
        style={{
          color: "rgb(74, 222, 128)"
        }}
      >
        Payment Completed
      </motion.p>
      <motion.p
        className="text-sm absolute inset-0 flex items-center justify-center whitespace-nowrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: displayText === "Completed and Shipped" && isShipped ? 1 : 0,
          y: displayText === "Completed and Shipped" && isShipped ? 0 : 20
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: "easeInOut"
        }}
        style={{
          color: "rgb(74, 222, 128)"
        }}
      >
        Completed and Shipped
      </motion.p>
      <motion.p
        className="text-sm absolute inset-0 flex items-center justify-center whitespace-nowrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: displayText === "Order Cancelled" ? 1 : 0,
          y: displayText === "Order Cancelled" ? 0 : 20
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: "easeInOut"
        }}
        style={{
          color: "rgb(239, 68, 68)"
        }}
      >
        Order Cancelled
      </motion.p>
    </div>
  );
}