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
import { useTranslation } from "@/lib/i18n/hooks";
import { OrderService } from "@/features/orders/services/order-service";
import { Order } from "@/types/order";
import { format } from "date-fns";
import { ScanModal } from "@/components/scan-modal";
import { TicketService } from "@/features/tickets/services/ticket-service";
import { ScanResultData } from "@/types/events";

interface AttendeesProps {
  form: UseFormReturn<Product>;
}

export function Attendees({ form }: AttendeesProps) {
  const t = useTranslation();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showScanModal, setShowScanModal] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e: Record<string, string>) => {
    const ticketCode = e.ticketCode;
    if (!ticketCode.trim()) return;

    const result = await TicketService.scanTicketByCode(ticketCode);

    // Transform the data to match our UI format
    const transformedResult: ScanResultData = {
      ticketNumber: result.ticket.code,
      attendeeName: result.order.customerName,
      email: result.order.customerEmail,
      ticketType: result.order.items[0]?.variantName || "Unknown",
      status: result.ticket.status === "unused" ? "valid" : "used",
      groupId: result.order.id,
      groupTickets: result.groupTickets?.map((ticket) => ({
        ticketNumber: ticket.id,
        attendeeName: ticket.metadata.attendeeName,
        code: ticket.code,
        ticketType:
          result.order.items.find((item) => item.id === ticket.orderItemId)
            ?.variantName || "Unknown",
        status: ticket.status === "unused" ? "valid" : "used",
      })),
    };

    return transformedResult;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const productId = form.getValues("id");
        if (!productId) {
          console.error("Product ID not found");
          return;
        }
        const eventOrders =
          await OrderService.getEventOrdersByProduct(productId);
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
          <h2 className="text-lg font-semibold">
            {t.products.products.form.sections.attendees.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.products.products.form.sections.attendees.description}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {/* Ticket Scanning Section */}
        <div className="mb-6">
          <Card className="bg-blue-50/50 border-blue-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <QrCode className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 md:space-y-2 space-y-4 text-center md:text-left">
                  <div className="space-y-2">
                    <h3 className="font-medium">
                      {
                        t.products.products.form.sections.attendees
                          .ticketScanning.title
                      }
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {
                        t.products.products.form.sections.attendees
                          .ticketScanning.description
                      }
                    </p>
                  </div>
                  <Button
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700"
                    type="button"
                    onClick={() => setShowScanModal(true)}
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    {
                      t.products.products.form.sections.attendees.ticketScanning
                        .scanButton
                    }
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
                <TableHead>
                  {t.products.products.form.sections.attendees.table.attendee}
                </TableHead>
                <TableHead>
                  {t.products.products.form.sections.attendees.table.ticketType}
                </TableHead>
                <TableHead>
                  {
                    t.products.products.form.sections.attendees.table
                      .purchaseDate
                  }
                </TableHead>
                {/* <TableHead>{t.products.products.form.sections.attendees.table.price}</TableHead> */}
                <TableHead>
                  {t.products.products.form.sections.attendees.table.status}
                </TableHead>
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
                    {/* <TableCell>{formatCurrency(order.total)}</TableCell> */}
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

      <ScanModal
        open={showScanModal}
        onOpenChange={setShowScanModal}
        onSubmit={(data) => handleSubmit(data)}
        onResult={() => {}}
        formFields={[
          {
            id: "ticketCode",
            label: "Ticket code",
            placeholder: "Enter ticket code",
            type: "text",
          },
        ]}
        title="Scan Ticket"
      />
    </Card>
  );
}
