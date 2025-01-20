import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import { Users, Check, Clock, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { TicketScanModal } from "./ticket-scanning/ticket-scan-modal";
import { OrderService } from "@/features/orders/services/order-service";
import { Order } from "@/types/order";
import { format } from "date-fns";

interface AttendeesProps {
  form: UseFormReturn<Product>;
}

export function Attendees({ form }: AttendeesProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showScanModal, setShowScanModal] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const productId = form.getValues("id");
        if (!productId) {
          console.error("Product ID not found");
          return;
        }
        const eventOrders = await OrderService.getEventOrdersByProduct(
          productId
        );
        setOrders(eventOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [form]);

  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const currentOrders = orders.slice(startIndex, endIndex);

  // Helper function to determine if order is paid
  const isPaid = (order: Order) => {
    return (
      order.status === "processing" ||
      Boolean(order.payment_details?.confirmed_at)
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
          <Users className="h-5 w-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">Attendees</h2>
          <p className="text-sm text-muted-foreground">
            Manage event attendees and ticket status
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {/* Ticket Scanning Section */}
        <div className="mb-6">
          <Card className="bg-blue-50/50 border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <QrCode className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium">Ticket Scanning</h3>
                  <p className="text-sm text-muted-foreground">
                    Scan QR codes or barcodes to validate tickets and track
                    attendance
                  </p>
                  <Button
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700"
                    type="button"
                    onClick={() => setShowScanModal(true)}
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Scan Ticket
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Variant</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Loading attendees...
                  </TableCell>
                </TableRow>
              ) : currentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No attendees found
                  </TableCell>
                </TableRow>
              ) : (
                currentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.customerEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.items.map((item) => (
                        <Badge
                          key={item.id}
                          variant="secondary"
                          className="mr-1"
                        >
                          {item.variant?.name || item.name}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell>
                      {format(new Date(order.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {isPaid(order) ? (
                          <Badge className="bg-green-100 text-green-700">
                            <Check className="mr-1 h-3 w-3" />
                            Paid
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-100 text-yellow-700"
                          >
                            <Clock className="mr-1 h-3 w-3" />
                            Unpaid
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="border-t p-4 bg-main rounded-b-lg">
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={Math.ceil(orders.length / pageSize)}
              totalItems={orders.length}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      </CardContent>

      <TicketScanModal open={showScanModal} onOpenChange={setShowScanModal} />
    </Card>
  );
}
