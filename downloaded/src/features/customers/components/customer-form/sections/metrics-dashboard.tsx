import { Clock, ShoppingCart, Package, Wallet, TrendingUp, History } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface MetricsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtitle?: string;
  gradient: string;
  textColor: string;
}

function MetricsCard({ title, value, icon, subtitle, gradient, textColor }: MetricsCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[18px] p-6 bg-white border card-shadow">
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
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <MetricsCard
        title="Last Login"
        value="2 hours ago"
        icon={<Clock className="h-6 w-6" />}
        gradient=""
        textColor="text-blue-500"
      />

      <MetricsCard
        title="Total Orders"
        value="24"
        subtitle="+12.5% from last month"
        icon={<ShoppingCart className="h-6 w-6" />}
        gradient=""
        textColor="text-purple-500"
      />

      <MetricsCard
        title="Items Purchased"
        value="142 items"
        icon={<Package className="h-6 w-6" />}
        gradient=""
        textColor="text-green-500"
      />

      <div className="rounded-[18px] bg-white border p-6 card-shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-orange-500">Recent Purchases</h3>
          <History className="h-5 w-5 text-orange-500" />
        </div>
        <div className="space-y-4">
          <RecentPurchase
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            name="Smart Watch Pro"
            date="Today at 2:34 PM"
          />
          <RecentPurchase
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            name="Wireless Headphones"
            date="Yesterday at 11:20 AM"
          />
          <RecentPurchase
            image="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
            name="Camera Lens"
            date="Dec 18, 2023"
          />
          <RecentPurchase
            image="https://images.unsplash.com/photo-1583394838336-acd977736f90"
            name="Gaming Console"
            date="Dec 15, 2023"
          />
        </div>
      </div>

      <MetricsCard
        title="Total Spending"
        value={formatCurrency(4521.59)}
        subtitle="+8.2% from last month"
        icon={<Wallet className="h-6 w-6" />}
        gradient=""
        textColor="text-pink-500"
      />

      <MetricsCard
        title="Average Order Value"
        value={formatCurrency(188.40)}
        subtitle="↑ Trending up"
        icon={<TrendingUp className="h-6 w-6" />}
        gradient=""
        textColor="text-teal-500"
      />
    </div>
  );
}