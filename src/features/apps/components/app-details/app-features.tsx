import { motion } from "framer-motion";
import {
  Check,
  BarChart,
  Box,
  Truck,
  Bell,
  RefreshCcw,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: BarChart,
    title: "Real-time Analytics",
    description:
      "Track inventory levels, sales, and trends in real-time with powerful analytics dashboards.",
  },
  {
    icon: Box,
    title: "Multi-warehouse Management",
    description:
      "Manage inventory across multiple locations with ease. Track stock levels and transfers between warehouses.",
  },
  {
    icon: Truck,
    title: "Automated Reordering",
    description:
      "Set up automatic purchase orders when stock levels reach your specified thresholds.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Get instant alerts for low stock, incoming shipments, and potential stockouts.",
  },
  {
    icon: RefreshCcw,
    title: "Batch Processing",
    description:
      "Process multiple orders and update inventory in bulk to save time and reduce errors.",
  },
  {
    icon: Zap,
    title: "Integration Ready",
    description:
      "Seamlessly connects with your existing e-commerce platform and other business tools.",
  },
];

export function AppFeatures() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {FEATURES.map((feature, index) => (
        <motion.div
          key={index}
          variants={item}
          className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-white to-gray-50/50 p-6"
        >
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium leading-none">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
