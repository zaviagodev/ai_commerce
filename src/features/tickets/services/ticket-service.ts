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
}
