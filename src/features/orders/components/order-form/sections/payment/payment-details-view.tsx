import { Order } from "@/types/order";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { format } from "date-fns";
import { Eye, ExternalLink } from "lucide-react";

interface PaymentDetailsViewProps {
  order: Order;
}

export function PaymentDetailsView({ order }: PaymentDetailsViewProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  if (!order.payment_details) {
    return null;
  }

  const { type, bank_name, slip_image, confirmed_at } = order.payment_details;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Payment information for this order</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Payment Method
            </p>
            <p className="text-sm">
              {type === "bank_transfer" ? "Bank Transfer" : "PromptPay"}
            </p>
          </div>
          {bank_name && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Bank Name
              </p>
              <p className="text-sm">{bank_name}</p>
            </div>
          )}
          {confirmed_at && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Confirmed At
              </p>
              <p className="text-sm">{format(new Date(confirmed_at), "PPp")}</p>
            </div>
          )}
        </div>

        {slip_image && (
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Payment Slip
            </p>
            <div className="relative aspect-[3/4] w-32 overflow-hidden rounded-lg border">
              <img
                src={slip_image}
                alt="Payment slip"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity hover:bg-black/50 hover:opacity-100">
                <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <img
                        src={slip_image}
                        alt="Payment slip"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                <Button size="icon" variant="ghost" asChild>
                  <a
                    href={slip_image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
