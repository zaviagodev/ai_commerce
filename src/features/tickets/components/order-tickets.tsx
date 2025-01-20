import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TicketService, Ticket } from "../services/ticket-service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface OrderTicketsProps {
  orderId: string;
}

export function OrderTickets({ orderId }: OrderTicketsProps) {
  const queryClient = useQueryClient();

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["tickets", orderId],
    queryFn: () => TicketService.getTicketsByOrderId(orderId),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      ticketId,
      status,
    }: {
      ticketId: string;
      status: "used" | "unused";
    }) => TicketService.updateTicketStatus(ticketId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets", orderId] });
    },
  });

  if (isLoading) {
    return <Skeleton className="w-full h-[200px]" />;
  }

  if (!tickets?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tickets found for this order
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ticket Code</TableHead>
          <TableHead>Event</TableHead>
          <TableHead>Attendee</TableHead>
          <TableHead>Purchase Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Mark as Used</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell className="font-mono">{ticket.code}</TableCell>
            <TableCell>{ticket.metadata.eventName}</TableCell>
            <TableCell>
              <div>{ticket.metadata.attendeeName}</div>
              <div className="text-sm text-muted-foreground">
                {ticket.metadata.attendeeEmail}
              </div>
            </TableCell>
            <TableCell>
              {format(new Date(ticket.metadata.purchaseDate), "PPp")}
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  ticket.status === "used"
                    ? "bg-red-100 text-red-700 border-red-200"
                    : "bg-green-100 text-green-700 border-green-200"
                }
              >
                {ticket.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Switch
                checked={ticket.status === "used"}
                onCheckedChange={(checked) =>
                  updateStatusMutation.mutate({
                    ticketId: ticket.id,
                    status: checked ? "used" : "unused",
                  })
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
