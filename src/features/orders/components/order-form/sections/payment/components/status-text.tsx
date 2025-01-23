import { useTranslation } from "@/lib/i18n/hooks";
import { motion } from "framer-motion";

interface StatusTextProps {
  displayText: string;
  isCancelled: boolean;
  isShipped: boolean;
}

export function StatusText({
  displayText,
  isCancelled,
  isShipped,
}: StatusTextProps) {
  const t = useTranslation();
  return (
    <div className="relative h-5 w-full">
      <motion.p
        className="text-sm absolute inset-0 flex items-center justify-center whitespace-nowrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: displayText === "Total Outstanding" && !isShipped ? 1 : 0,
          y: displayText === "Total Outstanding" && !isShipped ? 0 : -20,
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          color: "rgb(156, 163, 175)",
        }}
      >
        {t.orders.orders.form.sections.payment.status.outstanding}
      </motion.p>
      <motion.p
        className="text-sm absolute inset-0 flex items-center justify-center whitespace-nowrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: displayText === "Payment Completed" && !isShipped ? 1 : 0,
          y: displayText === "Payment Completed" && !isShipped ? 0 : 20,
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: "easeInOut",
        }}
        style={{
          color: "rgb(74, 222, 128)",
        }}
      >
        {t.orders.orders.form.sections.payment.status.completed}
      </motion.p>
      <motion.p
        className="text-sm absolute inset-0 flex items-center justify-center whitespace-nowrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: displayText === "Completed and Shipped" && isShipped ? 1 : 0,
          y: displayText === "Completed and Shipped" && isShipped ? 0 : 20,
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: "easeInOut",
        }}
        style={{
          color: "rgb(74, 222, 128)",
        }}
      >
        {t.orders.orders.form.sections.payment.status.shipped}
      </motion.p>
      <motion.p
        className="text-sm absolute inset-0 flex items-center justify-center whitespace-nowrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: displayText === "Order Cancelled" && isCancelled ? 1 : 0,
          y: displayText === "Order Cancelled" && isCancelled ? 0 : 20,
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: "easeInOut",
        }}
        style={{
          color: "rgb(239, 68, 68)",
        }}
      >
        {t.orders.orders.form.sections.payment.status.cancelled}
      </motion.p>
    </div>
  );
}
