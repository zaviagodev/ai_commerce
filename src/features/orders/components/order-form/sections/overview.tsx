import { Order } from "@/types/order";
import { CustomerAddress } from "@/types/customer";
import { TicketOverview } from "./ticket-overview";
import { PaymentSection } from "./payment/payment-section";
import { ShippingDetailsSection } from "./shipping-details-section";

interface OverviewProps {
  order: Order;
  shippingAddress?: CustomerAddress;
}

export function Overview({ order, shippingAddress }: OverviewProps) {
  return (
    <div className="space-y-6">
      <PaymentSection order={order} />
      <ShippingDetailsSection order={order} shippingAddress={shippingAddress} />
      <TicketOverview order={order} shippingAddress={shippingAddress} />
    </div>
  );
}
