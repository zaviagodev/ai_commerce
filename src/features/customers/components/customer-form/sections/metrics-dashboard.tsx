import {
  Clock,
  ShoppingCart,
  Package,
  Wallet,
  TrendingUp,
  History,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/hooks";

interface MetricsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtitle?: string;
  gradient: string;
  textColor: string;
}

function MetricsCard({
  title,
  value,
  icon,
  subtitle,
  gradient,
  textColor,
}: MetricsCardProps) {
  return (
    <div className="relative overflow-hidden p-6 bg-main border card-shadow">
      <div className="relative z-10">
        <div className={`mb-2 text-sm font-medium ${textColor}`}>{title}</div>
        <div className={`text-2xl font-semibold ${textColor}`}>{value}</div>
        {subtitle && (
          <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div>
        )}
      </div>
      <div className={`absolute right-4 top-4 ${textColor}`}>{icon}</div>
    </div>
  );
}

interface RecentPurchaseProps {
  image: string;
  name: string;
  date: string;
}

function RecentPurchase({ image, name, date }: RecentPurchaseProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg border bg-muted overflow-hidden">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}

export function MetricsDashboard() {
  const t = useTranslation();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <MetricsCard
        title={t.customers.customer.form.sections.metrics.lastLogin.title}
        value={t.customers.customer.form.sections.metrics.lastLogin.value}
        icon={<Clock className="h-6 w-6" />}
        gradient=""
        textColor="text-blue-500"
      />

      <MetricsCard
        title={t.customers.customer.form.sections.metrics.totalOrders.title}
        value="24"
        subtitle={
          t.customers.customer.form.sections.metrics.totalOrders.subtitle
        }
        icon={<ShoppingCart className="h-6 w-6" />}
        gradient=""
        textColor="text-purple-500"
      />

      <MetricsCard
        title={t.customers.customer.form.sections.metrics.itemsPurchased.title}
        value={t.customers.customer.form.sections.metrics.itemsPurchased.value}
        icon={<Package className="h-6 w-6" />}
        gradient=""
        textColor="text-green-500"
      />

      <div className="bg-main border p-6 card-shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-orange-500">
            {t.customers.customer.form.sections.metrics.recentPurchases.title}
          </h3>
          <History className="h-5 w-5 text-orange-500" />
        </div>
        <div className="space-y-4">
          <RecentPurchase
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            name={
              t.customers.customer.form.sections.metrics.recentPurchases.items
                .smartWatch
            }
            date={
              t.customers.customer.form.sections.metrics.recentPurchases.dates
                .today
            }
          />
          <RecentPurchase
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            name={
              t.customers.customer.form.sections.metrics.recentPurchases.items
                .headphones
            }
            date={
              t.customers.customer.form.sections.metrics.recentPurchases.dates
                .yesterday
            }
          />
          <RecentPurchase
            image="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
            name={
              t.customers.customer.form.sections.metrics.recentPurchases.items
                .cameraLens
            }
            date={
              t.customers.customer.form.sections.metrics.recentPurchases.dates
                .dec18
            }
          />
          <RecentPurchase
            image="https://images.unsplash.com/photo-1583394838336-acd977736f90"
            name={
              t.customers.customer.form.sections.metrics.recentPurchases.items
                .gamingConsole
            }
            date={
              t.customers.customer.form.sections.metrics.recentPurchases.dates
                .dec15
            }
          />
        </div>
      </div>

      <MetricsCard
        title={t.customers.customer.form.sections.metrics.totalSpending.title}
        value={formatCurrency(4521.59)}
        subtitle={
          t.customers.customer.form.sections.metrics.totalSpending.subtitle
        }
        icon={<Wallet className="h-6 w-6" />}
        gradient=""
        textColor="text-pink-500"
      />

      <MetricsCard
        title={t.customers.customer.form.sections.metrics.averageOrder.title}
        value={formatCurrency(188.4)}
        subtitle={
          t.customers.customer.form.sections.metrics.averageOrder.subtitle
        }
        icon={<TrendingUp className="h-6 w-6" />}
        gradient=""
        textColor="text-teal-500"
      />
    </div>
  );
}
