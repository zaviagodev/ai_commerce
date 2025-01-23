import { format } from "date-fns";
import { Order, CustomerAddress } from "@/types/order";
import { TicketOverview } from "./ticket-overview";
import { PaymentSection } from "./payment/payment-section";

interface OverviewProps {
  order: Order;
  shippingAddress?: CustomerAddress;
}

export function Overview({ order, shippingAddress }: OverviewProps) {
  return (
    <div className="space-y-6">
      <PaymentSection order={order} />
      <TicketOverview order={order} shippingAddress={shippingAddress} />
    </div>
  );
}
