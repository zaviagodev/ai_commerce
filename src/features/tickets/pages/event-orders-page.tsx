import { useQuery } from "@tanstack/react-query";
import { OrderService } from "../../orders/services/order-service";
import { OrderList } from "../../orders/components/order-list";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/lib/i18n/hooks";

export default function EventOrdersPage() {
  const t = useTranslation();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["event-orders"],
    queryFn: () => OrderService.getEventOrders(),
  });

  if (isLoading) {
    return <Skeleton className="w-full h-[200px]" />;
  }

  return (
    <div className="space-y-6">
      <OrderList
        title={t.orders.orders.title}
        description={t.orders.orders.description}
        path="/dashboard/events/orders"
        orders={orders || []}
        isLoading={isLoading}
      />
    </div>
  );
}
