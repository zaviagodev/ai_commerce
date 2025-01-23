import { useQuery } from "@tanstack/react-query";
import { OrderService } from "../../orders/services/order-service";
import { OrderList } from "../../orders/components/order-list";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/loading";
import { useTranslation } from "@/lib/i18n/hooks";

export default function EventOrdersPage() {
  const t = useTranslation();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["event-orders"],
    queryFn: () => OrderService.getEventOrders(),
  });

  if (isLoading) {
    return (
      <div className="pt-14">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OrderList
        title={t.events.event.list.eventOrders.title}
        description={t.events.event.list.eventOrders.description}
        path="/dashboard/event-orders"
        orders={orders || []}
        addButtonText={t.events.event.list.eventOrders.actions.addEventOrder}
        isLoading={isLoading}
      />
    </div>
  );
}
