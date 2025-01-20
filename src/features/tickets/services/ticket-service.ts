import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth/auth-store";

export interface Ticket {
  id: string;
  orderId: string;
  orderItemId: string;
  code: string;
  status: "unused" | "used";
  metadata: {
    eventId: string;
    eventName: string;
    attendeeName: string;
    attendeeEmail: string;
    ticketNumber: string;
    purchaseDate: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export class TicketService {
  static async getTicketsByOrderId(orderId: string): Promise<Ticket[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: tickets, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("order_id", orderId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      return (tickets || []).map((ticket) => ({
        id: ticket.id,
        orderId: ticket.order_id,
        orderItemId: ticket.order_item_id,
        code: ticket.code,
        status: ticket.status,
        metadata: ticket.metadata,
        createdAt: new Date(ticket.created_at),
        updatedAt: new Date(ticket.updated_at),
      }));
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      toast.error("Failed to load tickets");
      return [];
    }
  }

  static async updateTicketStatus(
    ticketId: string,
    status: "unused" | "used"
  ): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { error } = await supabase
        .from("tickets")
        .update({ status })
        .eq("id", ticketId);

      if (error) throw error;

      toast.success("Ticket status updated successfully");
    } catch (error) {
      console.error("Failed to update ticket status:", error);
      toast.error("Failed to update ticket status");
      throw error;
    }
  }

  static async scanTicketByCode(code: string): Promise<{
    ticket: Ticket;
    order: {
      id: string;
      customerName: string;
      customerEmail: string;
      items: Array<{
        id: string;
        variantName: string;
        quantity: number;
      }>;
    };
    groupTickets?: Ticket[];
  }> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      // First get the ticket by code
      const { data: ticket, error: ticketError } = await supabase
        .from("tickets")
        .select("*")
        .eq("code", code)
        .single();

      if (ticketError) throw ticketError;
      if (!ticket) throw new Error("Ticket not found");

      // Get the order details
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .select(
          `
          id,
          customers (
            first_name,
            last_name,
            email
          ),
          order_items (
            id,
            product_variants (
              name
            ),
            quantity
          )
        `
        )
        .eq("id", ticket.order_id)
        .single();

      if (orderError) throw orderError;
      if (!order) throw new Error("Order not found");

      // Get all tickets from the same order (group tickets)
      const { data: groupTickets, error: groupError } = await supabase
        .from("tickets")
        .select("*")
        .eq("order_id", ticket.order_id);

      if (groupError) throw groupError;

      const transformedTicket: Ticket = {
        id: ticket.id,
        orderId: ticket.order_id,
        orderItemId: ticket.order_item_id,
        code: ticket.code,
        status: ticket.status,
        metadata: ticket.metadata,
        createdAt: new Date(ticket.created_at),
        updatedAt: new Date(ticket.updated_at),
      };

      const transformedOrder = {
        id: order.id,
        customerName: `${order.customers?.first_name} ${order.customers?.last_name}`,
        customerEmail: order.customers?.email,
        items: order.order_items.map((item: any) => ({
          id: item.id,
          variantName: item.product_variants?.name || "Unknown",
          quantity: item.quantity,
        })),
      };

      const transformedGroupTickets = groupTickets?.map((t) => ({
        id: t.id,
        orderId: t.order_id,
        orderItemId: t.order_item_id,
        code: t.code,
        status: t.status,
        metadata: t.metadata,
        createdAt: new Date(t.created_at),
        updatedAt: new Date(t.updated_at),
      }));

      return {
        ticket: transformedTicket,
        order: transformedOrder,
        groupTickets: transformedGroupTickets,
      };
    } catch (error) {
      console.error("Failed to scan ticket:", error);
      toast.error("Failed to scan ticket");
      throw error;
    }
  }
}
