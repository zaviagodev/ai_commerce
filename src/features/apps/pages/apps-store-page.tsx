import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  BarChart2,
  ShoppingBag,
  Mail,
  Bell,
  PieChart,
  Box,
  Truck,
  Shield,
} from "lucide-react";
import { AppCard } from "../components/app-card";
import { CategoryCard } from "../components/category-card";
import { FeaturedApps } from "../components/featured-apps";

const CATEGORIES = [
  {
    id: "1",
    name: "Analytics",
    icon: BarChart2,
    color: "bg-blue-100 text-blue-600",
    count: 24,
  },
  {
    id: "2",
    name: "Marketing",
    icon: ShoppingBag,
    color: "bg-green-100 text-green-600",
    count: 18,
  },
  {
    id: "3",
    name: "Email",
    icon: Mail,
    color: "bg-purple-100 text-purple-600",
    count: 12,
  },
  {
    id: "4",
    name: "Notifications",
    icon: Bell,
    color: "bg-yellow-100 text-yellow-600",
    count: 8,
  },
  {
    id: "5",
    name: "Reports",
    icon: PieChart,
    color: "bg-pink-100 text-pink-600",
    count: 15,
  },
  {
    id: "6",
    name: "Inventory",
    icon: Box,
    color: "bg-orange-100 text-orange-600",
    count: 10,
  },
  {
    id: "7",
    name: "Shipping",
    icon: Truck,
    color: "bg-teal-100 text-teal-600",
    count: 14,
  },
  {
    id: "8",
    name: "Security",
    icon: Shield,
    color: "bg-red-100 text-red-600",
    count: 6,
  },
];

const FEATURED_APPS = [
  {
    id: "1",
    name: "Advanced Analytics Suite",
    description: "Get deep insights into your store performance",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    color:
      "linear-gradient(to right bottom, rgb(30, 64, 175), rgb(125, 211, 252))",
  },
  {
    id: "2",
    name: "Email Marketing Pro",
    description: "Powerful email automation for your business",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    color:
      "linear-gradient(to right bottom, rgb(134, 25, 143), rgb(244, 114, 182))",
  },
  {
    id: "3",
    name: "Inventory Master",
    description: "Complete inventory management solution",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    color:
      "linear-gradient(to right bottom, rgb(21, 128, 61), rgb(134, 239, 172))",
  },
];

const APPS = [
  {
    id: "1",
    name: "Analytics Pro",
    developer: "DataMetrics Inc",
    description:
      "Advanced analytics and reporting for your store with real-time insights and customizable dashboards.",
    icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop",
    rating: 4.5,
    price: 29.99,
    category: "Analytics",
  },
  {
    id: "2",
    name: "Email Automation",
    developer: "MailPro Solutions",
    description:
      "Powerful email marketing automation with templates, segmentation, and analytics.",
    icon: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=128&h=128&fit=crop",
    rating: 4.8,
    price: "Free",
    category: "Marketing",
  },
  {
    id: "3",
    name: "Inventory Manager",
    developer: "StockControl Ltd",
    description:
      "Complete inventory management with barcode scanning, alerts, and forecasting.",
    icon: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=128&h=128&fit=crop",
    rating: 4.2,
    price: 49.99,
    category: "Inventory",
  },
];

export function AppsStorePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="-mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
        <h1 className="text-2xl font-semibold">Apps Store</h1>
        <p className="text-sm text-muted-foreground">
          Discover and install apps to extend your store's functionality
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search apps..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Featured Apps */}
      <div>
        <h2 className="mb-4 text-lg font-medium">Featured Apps</h2>
        <FeaturedApps apps={FEATURED_APPS} />
      </div>

      {/* Categories */}
      <div>
        <h2 className="mb-4 text-lg font-medium">Browse by Category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* App Listings */}
      <div>
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Apps</TabsTrigger>
              <TabsTrigger value="free">Free</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4">
              {APPS.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="free" className="mt-6">
            <div className="grid gap-4">
              {APPS.filter((app) => app.price === "Free").map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="paid" className="mt-6">
            <div className="grid gap-4">
              {APPS.filter((app) => app.price !== "Free").map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
