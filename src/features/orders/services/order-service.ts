import { supabase } from "@/lib/supabase";
import { Order } from "@/types/order";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth/auth-store";
import { transformOrder } from "../utils/order-transformer";
import { OrderSlipService } from "./order-slip-service";

export type AddPaymentDetailsParams = {
  orderId: string;
  type: "bank_transfer" | "promptpay";
  bankName?: string;
  slipImage?: File;
  transferReference?: string;
};

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
          billing_address:customer_addresses!orders_billing_address_id_fkey (
            id,
            type,
            first_name,
            last_name,
            address1,
            address2,
            city,
            state,
            postal_code,
            country,
            phone,
            is_default
          ),
          shipping_address:customer_addresses!orders_shipping_address_id_fkey (
            id,
            type,
            first_name,
            last_name,
            address1,
            address2,
            city,
            state,
            postal_code,
            country,
            phone,
            is_default
          ),
          order_items (
            id,
            variant_id,
            quantity,
            price,
            total,
            points_based_price,
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
        `,
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
    order: Omit<Order, "id" | "createdAt" | "updatedAt">,
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
        p_points_discount: order.pointsDiscount,
        p_notes: order.notes,
        p_tags: order.tags,
        p_applied_coupons: order.appliedCoupons || [],
        p_loyalty_points_used: order.loyalty_points_used || 0,
        p_items: order.items.map((item) => ({
          variant_id: item.variantId,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
          points_based_price: item.pointsBasedPrice || 0,
        })),
        p_shipping_address_id: order.shippingAddress?.id,
        p_billing_address_id: order.billingAddress?.id,
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
          points_discount: data.pointsDiscount,
          shipping: data.shipping,
          shipping_details: data.shippingDetails,
          shipping_address_id: data.shippingAddress?.id,
          billing_address_id: data.billingAddress?.id,
          applied_coupons: data.appliedCoupons,
          payment_details: data.payment_details,
          loyalty_points_used: data.loyalty_points_used,
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
                points_based_price: item.pointsBasedPrice || 0,
                total: item.total,
              })),
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
        pointsDiscount: order.points_discount,
        shipping: order.shipping,
        shippingDetails: order.shipping_details,
        billingAddress: order.billing_address,
        shippingAddress: order.shipping_address,
        tax: order.tax,
        total: order.total,
        notes: order.notes,
        tags: order.tags,
        appliedCoupons: order.applied_coupons || [],
        loyalty_points_used: order.loyalty_points_used || 0,
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
          billing_address:customer_addresses!orders_billing_address_id_fkey (
            id,
            type,
            first_name,
            last_name,
            address1,
            address2,
            city,
            state,
            postal_code,
            country,
            phone,
            is_default
          ),
          shipping_address:customer_addresses!orders_shipping_address_id_fkey (
            id,
            type,
            first_name,
            last_name,
            address1,
            address2,
            city,
            state,
            postal_code,
            country,
            phone,
            is_default
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
        `,
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
        `,
        )
        .eq("store_name", user.storeName)
        .eq("order_items.product_variants.product_id", productId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform the materialized view data to match Order type for product-specific orders
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
        pointsDiscount: order.points_discount,
        shipping: order.shipping,
        tax: order.tax,
        total: order.total,
        notes: order.notes,
        tags: order.tags,
        appliedCoupons: order.applied_coupons || [],
        loyalty_points_used: order.loyalty_points_used || 0,
        createdAt: new Date(order.created_at),
        updatedAt: new Date(order.updated_at),
      }));
    } catch (error) {
      console.error("Failed to fetch event orders:", error);
      toast.error("Failed to load event orders");
      return [];
    }
  }

  static async addPaymentDetails({
    orderId,
    type,
    bankName,
    slipImage,
    transferReference,
  }: AddPaymentDetailsParams): Promise<Order> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      let slipUrl: string | undefined;

      // Upload slip if provided
      if (slipImage) {
        slipUrl = await OrderSlipService.uploadSlip(
          slipImage,
          orderId,
          user.storeName,
        );
      }

      // Update order payment details
      const { data: updatedOrder, error } = await supabase
        .from("orders")
        .update({
          payment_details: {
            type,
            bank_name: bankName,
            slip_image: slipUrl,
            uploaded_at: slipUrl ? new Date().toISOString() : undefined,
            transfer_reference: transferReference,
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)
        .eq("store_name", user.storeName)
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
        `,
        )
        .single();

      if (error) throw error;

      toast.success("Payment details added successfully");
      return transformOrder(updatedOrder);
    } catch (error: any) {
      console.error("Failed to add payment details:", error);
      toast.error(error.message || "Failed to add payment details");
      throw error;
    }
  }

  static async confirmPayment(orderId: string, order: Order): Promise<Order> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      // Update order status and payment confirmation
      const { data: updatedOrder, error } = await supabase
        .from("orders")
        .update({
          status: "processing",
          payment_details: {
            ...order.payment_details,
            confirmed_at: new Date().toISOString(),
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)
        .eq("store_name", user.storeName)
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
        `,
        )
        .single();

      if (error) throw error;

      toast.success("Payment confirmed successfully");
      return transformOrder(updatedOrder);
    } catch (error: any) {
      console.error("Failed to confirm payment:", error);
      toast.error(error.message || "Failed to confirm payment");
      throw error;
    }
  }
}
