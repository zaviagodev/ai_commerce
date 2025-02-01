import { format } from "date-fns";
import { Order } from "@/types/order";
import { CustomerAddress } from "@/types/customer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Truck } from "lucide-react";

interface ShippingDetailsSectionProps {
  order: Order;
  shippingAddress?: CustomerAddress;
}

export function ShippingDetailsSection({
  order,
  shippingAddress,
}: ShippingDetailsSectionProps) {
  if (!shippingAddress && !order.shippingDetails) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Truck className="w-5 h-5" />
          Shipping Details{" "}
          <div className="flex items-center gap-2 ml-auto">
            <Badge variant="outline" className="text-sm">
              {order.status === "delivered" ? "Delivered" : "In Transit"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {shippingAddress && (
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
              <div>
                <h4 className="font-medium">Delivery Address</h4>
                <p className="text-sm text-muted-foreground">
                  {shippingAddress.firstName} {shippingAddress.lastName}
                  {shippingAddress.company && (
                    <>
                      <br />
                      {shippingAddress.company}
                    </>
                  )}
                  <br />
                  {shippingAddress.address1}
                  {shippingAddress.address2 && (
                    <>
                      <br />
                      {shippingAddress.address2}
                    </>
                  )}
                  <br />
                  {shippingAddress.city}, {shippingAddress.state}{" "}
                  {shippingAddress.postalCode}
                  <br />
                  {shippingAddress.country}
                </p>
              </div>
            </div>
          </div>
        )}

        {order.shippingDetails && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Courier</p>
                <p className="font-medium">{order.shippingDetails.courier}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tracking Number</p>
                <p className="font-medium">
                  {order.shippingDetails.tracking_number}
                </p>
              </div>
              {order.shippingDetails.shipped_at && (
                <div>
                  <p className="text-muted-foreground">Shipped Date</p>
                  <p className="font-medium">
                    {format(new Date(order.shippingDetails.shipped_at), "PPP")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
