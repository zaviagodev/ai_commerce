import { useQuery } from "@tanstack/react-query";
import { OrderService } from "../../orders/services/order-service";
import { OrderList } from "../../orders/components/order-list";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventOrdersPage() {
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
        title="Event Orders"
        description="View and manage orders containing event products"
        path="/dashboard/event-orders"
        orders={orders || []}
        isLoading={isLoading}
      />
    </div>
  );
}
