import { supabase } from "@/lib/supabase";
import { StoreOrder } from "../types/store-order";
import { CustomerService } from "./store-customer.service";
import { toast } from "sonner";

export class StoreOrderService {
  static async placeOrder(order: StoreOrder): Promise<void> {
    try {
      // Validate order items
      if (!order.items?.length) {
        throw new Error("Order must contain at least one item");
      }

      // Validate products exist and are active
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("id, name, status, quantity, track_quantity")
        .eq("store_name", order.storeName)
        .eq("status", "active")
        .in(
          "id",
          order.items.map((item) => item.productId),
        );

      if (productsError) throw productsError;

      // Check all products exist and are active
      const foundProducts = new Set(products?.map((p) => p.id));
      const missingProducts = order.items.filter(
        (item) => !foundProducts.has(item.productId),
      );

      if (missingProducts.length > 0) {
        throw new Error(`Some products are no longer available`);
      }

      // Check stock levels
      for (const product of products || []) {
        const orderItem = order.items.find(
          (item) => item.productId === product.id,
        );
        if (!orderItem) continue;

        if (
          product.track_quantity &&
          (product.quantity || 0) < orderItem.quantity
        ) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }
      }

      // Create or get customer
      const customer = await CustomerService.createOrGetCustomer({
        storeName: order.storeName,
        firstName: order.customer.firstName,
        lastName: order.customer.lastName,
        email: order.customer.email,
        phone: order.customer.phone,
      });

      // Create customer address
      await CustomerService.createCustomerAddress({
        customerId: customer.id,
        storeName: order.storeName,
        ...order.customer,
      });

      // Create the order
      const { error: orderError } = await supabase.rpc("place_order", {
        p_store_name: order.storeName,
        p_customer_id: customer.id,
        p_status: "pending",
        p_subtotal: order.subtotal,
        p_discount: 0,
        p_shipping: 0,
        p_tax: 0,
        p_total: order.total,
        p_notes: "",
        p_tags: [],
        p_items: order.items,
      });

      if (orderError) throw orderError;

      toast.success("Order placed successfully!");
    } catch (error: any) {
      console.error("Failed to place order:", error);
      toast.error(error.message || "Failed to place order");
      throw error;
    }
  }
}
