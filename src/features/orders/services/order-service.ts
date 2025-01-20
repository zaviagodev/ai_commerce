import { supabase } from "@/lib/supabase";
import { Order } from "@/types/order";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth/auth-store";
import { transformOrder } from "../utils/order-transformer";

export class OrderService {
  static async getOrders(): Promise<Order[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: orders, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          customers (
            first_name,
            last_name,
            email,
            phone
          ),
          order_items (
            id,
            variant_id,
            quantity,
            price,
            total,
            product_variants (
              name,
              options,
              product:products (
                name,
                status,
                product_images (
                  id,
                  url,
                  alt,
                  position
                )
              )
            )
          )
        `
        )
        .eq("store_name", user.storeName)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (orders || []).map(transformOrder);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to load orders");
      return [];
    }
  }

  static async createOrder(
    order: Omit<Order, "id" | "createdAt" | "updatedAt">
  ): Promise<Order> {
    try {
      // Validate required customer ID
      if (!order.customerId) {
        throw new Error("Customer is required");
      }

      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: newOrder, error } = await supabase.rpc("create_order", {
        p_store_name: user.storeName,
        p_customer_id: order.customerId,
        p_status: order.status,
        p_subtotal: order.subtotal,
        p_discount: order.discount,
        p_shipping: order.shipping,
        p_tax: order.tax,
        p_total: order.total,
        p_notes: order.notes,
        p_tags: order.tags,
        p_applied_coupons: order.appliedCoupons || [],
        p_items: order.items.map((item) => ({
          variant_id: item.variantId,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        })),
      });

      if (error) throw error;
      if (!newOrder?.[0]) throw new Error("Failed to create order");

      toast.success("Order created successfully");
      return {
        ...order,
        id: newOrder[0].id,
        createdAt: new Date(newOrder[0].created_at),
        updatedAt: new Date(newOrder[0].updated_at),
      };
    } catch (error: any) {
      console.error("Failed to create order:", error);
      toast.error(error.message || "Failed to create order");
      throw error;
    }
  }

  static async updateOrder(id: string, data: Partial<Order>): Promise<Order> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      // Start by updating the order details
      const { data: updatedOrder, error } = await supabase
        .from("orders")
        .update({
          customer_id: data.customerId,
          status: data.status,
          subtotal: data.subtotal,
          discount: data.discount,
          shipping: data.shipping,
          applied_coupons: data.appliedCoupons,
          tax: data.tax,
          total: data.total,
          notes: data.notes,
          tags: data.tags,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("store_name", user.storeName)
        .select()
        .single();

      if (error) throw error;

      // If there are items to update
      if (data.items) {
        // First delete existing order items
        const { error: deleteError } = await supabase
          .from("order_items")
          .delete()
          .eq("order_id", id);

        if (deleteError) throw deleteError;

        // Then insert the new items
        if (data.items.length > 0) {
          const { error: insertError } = await supabase
            .from("order_items")
            .insert(
              data.items.map((item) => ({
                order_id: id,
                variant_id: item.variantId,
                quantity: item.quantity,
                price: item.price,
                total: item.total,
              }))
            );

          if (insertError) throw insertError;
        }
      }
      toast.success("Order updated successfully");
      return {
        ...data,
        id,
        createdAt: new Date(updatedOrder.created_at),
        updatedAt: new Date(updatedOrder.updated_at),
      } as Order;
    } catch (error: any) {
      console.error("Failed to update order:", error);
      toast.error(error.message || "Failed to update order");
      throw error;
    }
  }

  static async deleteOrder(id: string): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", id)
        .eq("store_name", user.storeName);

      if (error) throw error;

      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order");
      throw error;
    }
  }

  static async getEventOrders(): Promise<Order[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: orders, error } = await supabase
        .from("event_orders")
        .select("*")
        .eq("store_name", user.storeName)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform the materialized view data to match Order type
      return (orders || []).map((order) => ({
        id: order.id,
        customerId: order.customer_id,
        customerName: `${order.customer_first_name} ${order.customer_last_name}`,
        customerEmail: order.customer_email,
        customerPhone: order.customer_phone,
        status: order.status,
        items: order.order_items.map((item: any) => ({
          id: item.id,
          variantId: item.variant_id,
          name: item.product_variant.product.name,
          variant: {
            name: item.product_variant.name,
            options: item.product_variant.options,
          },
          price: item.price,
          quantity: item.quantity,
          total: item.total,
        })),
        subtotal: order.subtotal,
        discount: order.discount,
        shipping: order.shipping,
        tax: order.tax,
        total: order.total,
        notes: order.notes,
        tags: order.tags,
        appliedCoupons: order.applied_coupons || [],
        createdAt: new Date(order.created_at),
        updatedAt: new Date(order.updated_at),
      }));
    } catch (error) {
      console.error("Failed to fetch event orders:", error);
      toast.error("Failed to load event orders");
      return [];
    }
  }

  static async getOrder(id: string): Promise<Order | null> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: order, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          customers (
            first_name,
            last_name,
            email,
            phone
          ),
          order_items (
            id,
            variant_id,
            quantity,
            price,
            total,
            product_variants (
              name,
              options,
              product:products (
                name,
                status,
                product_images (
                  id,
                  url,
                  alt,
                  position
                )
              )
            )
          )
        `
        )
        .eq("id", id)
        .eq("store_name", user.storeName)
        .single();

      if (error) throw error;
      if (!order) return null;

      return transformOrder(order);
    } catch (error) {
      console.error("Failed to fetch order:", error);
      toast.error("Failed to load order");
      return null;
    }
  }

  static async getEventOrdersByProduct(productId: string): Promise<Order[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: orders, error } = await supabase
        .from("event_orders")
        .select(
          `
          *,
          order_items!inner (
            id,
            variant_id,
            quantity,
            price,
            total,
            product_variant:product_variants!inner (
              name,
              options,
              product_id
            )
          )
        `
        )
        .eq("store_name", user.storeName)
        .eq("order_items.product_variants.product_id", productId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform the materialized view data to match Order type
      return (orders || []).map((order) => ({
        id: order.id,
        customerId: order.customer_id,
        customerName: `${order.customer_first_name} ${order.customer_last_name}`,
        customerEmail: order.customer_email,
        customerPhone: order.customer_phone,
        status: order.status,
        items: order.order_items.map((item: any) => ({
          id: item.id,
          variantId: item.variant_id,
          name: item.product_variant?.product?.name || "",
          variant: {
            name: item.product_variant?.name || "",
            options: item.product_variant?.options || [],
          },
          price: item.price,
          quantity: item.quantity,
          total: item.total,
        })),
        subtotal: order.subtotal,
        discount: order.discount,
        shipping: order.shipping,
        tax: order.tax,
        total: order.total,
        notes: order.notes,
        tags: order.tags,
        appliedCoupons: order.applied_coupons || [],
        createdAt: new Date(order.created_at),
        updatedAt: new Date(order.updated_at),
      }));
    } catch (error) {
      console.error("Failed to fetch event orders:", error);
      toast.error("Failed to load event orders");
      return [];
    }
  }
}
