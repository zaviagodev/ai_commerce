import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, Star, Users, Shield, Server } from "lucide-react";
import { AppScreenshots } from "../components/app-details/app-screenshots";
import { AppFeatures } from "../components/app-details/app-features";
import { AppReviews } from "../components/app-details/app-reviews";
import { SystemRequirements } from "../components/app-details/system-requirements";
import { AppPricing } from "../components/app-details/app-pricing";

const APP_DATA = {
  id: "3",
  name: "Inventory Master",
  developer: "StockControl Ltd",
  description:
    "Complete inventory management solution with advanced features for modern e-commerce businesses.",
  longDescription: `Inventory Master is a comprehensive inventory management system designed specifically for e-commerce businesses. It provides real-time tracking, automated reordering, and powerful analytics to help you optimize your stock levels and reduce costs.

  Our solution integrates seamlessly with your existing systems and provides powerful tools to help you manage your inventory more efficiently. From barcode scanning to automated purchase orders, Inventory Master has everything you need to streamline your operations.`,
  icon: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=128&h=128&fit=crop",
  rating: 4.2,
  reviews: 156,
  price: 49.99,
  category: "Inventory",
  version: "2.1.0",
  lastUpdated: "2024-01-15",
  size: "24.5 MB",
  screenshots: [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d",
    "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  ],
};

export function AppDetailsPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16 -mx-6">
      <div className="pt-14 h-14 sticky top-0 z-10" />
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background pt-8 -mt-14">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start gap-8 pt-14"
          >
            {/* App Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
              <img
                src={APP_DATA.icon}
                alt={APP_DATA.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* App Info */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl font-bold"
                >
                  {APP_DATA.name}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
                >
                  <span>{APP_DATA.developer}</span>
                  <span>•</span>
                  <Badge variant="secondary">{APP_DATA.category}</Badge>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{APP_DATA.rating}</span>
                    <span>({APP_DATA.reviews} reviews)</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </motion.div>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="hidden lg:grid grid-cols-1 gap-4 min-w-[200px]"
            >
              <div className="flex items-center gap-3 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>10k+ active users</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Server className="h-4 w-4 text-muted-foreground" />
                <span>99.9% uptime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6">
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="w-fit justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <AppScreenshots screenshots={APP_DATA.screenshots} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="prose prose-gray max-w-none"
            >
              <h2 className="text-xl font-semibold mb-4">
                About {APP_DATA.name}
              </h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {APP_DATA.longDescription}
              </p>
            </motion.div>
            <SystemRequirements />
          </TabsContent>

          <TabsContent value="features">
            <AppFeatures />
          </TabsContent>

          <TabsContent value="pricing">
            <AppPricing />
          </TabsContent>

          <TabsContent value="reviews">
            <AppReviews rating={APP_DATA.rating} reviews={APP_DATA.reviews} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
