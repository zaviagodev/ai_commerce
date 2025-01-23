import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";

const REQUIREMENTS = {
  minimum: {
    platform: "Web-based SaaS",
    browser: "Modern web browser (Chrome, Firefox, Safari, Edge)",
    internet: "Broadband internet connection",
    storage: "500MB available space for caching",
  },
  integrations: [
    "Shopify",
    "WooCommerce",
    "Magento",
    "BigCommerce",
    "Square",
    "QuickBooks",
  ],
};

export function SystemRequirements() {
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
    <div className="space-y-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="rounded-lg border"
      >
        <div className="border-b p-4">
          <h3 className="font-medium">System Requirements</h3>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-2">
          {Object.entries(REQUIREMENTS.minimum).map(([key, value], index) => (
            <motion.div
              key={key}
              variants={item}
              className="flex items-start gap-3"
            >
              <Info className="mt-0.5 h-4 w-4 text-blue-500" />
              <div>
                <div className="font-medium capitalize">{key}</div>
                <div className="text-sm text-muted-foreground">{value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="rounded-lg border"
      >
        <div className="border-b p-4">
          <h3 className="font-medium">Supported Integrations</h3>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-2 md:grid-cols-3">
          {REQUIREMENTS.integrations.map((integration, index) => (
            <motion.div
              key={integration}
              variants={item}
              className="flex items-center gap-2 text-sm"
            >
              <Check className="h-4 w-4 text-green-500" />
              <span>{integration}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
