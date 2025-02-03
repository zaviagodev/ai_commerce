import { supabase } from "@/lib/supabase";
import { Event, EventProduct, Product } from "@/types/product";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth/auth-store";
import {
  transformEvent,
  transformEventProduct,
} from "../utils/event-transformer";

export class EventService {
  static async getEvents(): Promise<EventProduct[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data, error } = await supabase
        .from("events")
        .select(
          `
          *,
          product:products!inner(
            *,
            product_images (*),
            product_variants (
              id,
              name,
              sku,
              price,
              points_based_price,
              compare_at_price,
              quantity,
              options,
              status,
              position
            ),
            product_categories (
              id,
              name,
              slug,
              description
            ),
            product_tags (*)
          )
        `,
        )
        .eq("store_name", user.storeName)
        .order("start_datetime", { ascending: true });

      if (error) throw error;
      if (!data) return [];
      return data.map(transformEventProduct);
    } catch (error: any) {
      console.error("Failed to fetch events:", error);
      toast.error(error.message || "Failed to load events");
      return [];
    }
  }

  static async getEvent(productId: string): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("product_id", productId)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // Record not found
        throw error;
      }
      if (!data) return null;

      return transformEvent(data);
    } catch (error: any) {
      console.error("Failed to fetch event:", error);
      toast.error(error.message || "Failed to load event");
      throw error;
    }
  }

  static async getEventProduct(
    productId: string,
  ): Promise<EventProduct | null> {
    try {
      const { data, error } = await supabase
        .from("events")
        .select(
          `
          *,
          product:products!inner (
            *,
            product_images (*),
            product_variants (
              id,
              name,
              sku,
              price,
              points_based_price,
              compare_at_price,
              quantity,
              options,
              status,
              position
            ),
            product_categories (
              id,
              name,
              slug
            ),
            product_tags (*)
          )
        `,
        )
        .eq("product_id", productId)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // Record not found
        throw error;
      }
      if (!data) return null;

      return transformEventProduct(data);
    } catch (error: any) {
      console.error("Failed to fetch event product:", error);
      toast.error(error.message || "Failed to load event product");
      throw error;
    }
  }

  static async createEvent(
    productData: Omit<Product, "id" | "createdAt" | "updatedAt">,
    eventData: Omit<
      Event,
      "id" | "productId" | "storeName" | "createdAt" | "updatedAt"
    >,
  ): Promise<EventProduct> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: result, error } = await supabase.rpc("create_event", {
        p_store_name: user.storeName,
        // Product fields
        p_name: productData.name,
        p_description: productData.description,
        p_category_id: productData.category?.id,
        p_price: productData.price,
        p_compare_at_price: productData.compareAtPrice,
        p_cost: productData.cost,
        p_sku: productData.sku,
        p_barcode: productData.barcode,
        p_track_quantity: productData.trackQuantity,
        p_weight: productData.weight,
        p_weight_unit: productData.weightUnit,
        p_status: productData.status,
        p_variant_options: productData.variantOptions,
        p_variants: productData.variants,
        p_images: productData.images,
        p_tags: productData.tags.map((tag) => tag.name),
        p_is_reward: productData.isReward,

        // Event fields
        p_start_datetime: eventData.startDateTime,
        p_end_datetime: eventData.endDateTime,
        // p_gate_opening_datetime: eventData.gateOpeningDateTime,
        // p_gate_closing_datetime: eventData.gateClosingDateTime,
        p_venue_name: eventData.venueName,
        p_venue_address: eventData.venueAddress,
        p_google_maps_link: eventData.googleMapsLink,
        p_organizer_name: eventData.organizerName,
        p_organizer_contact: eventData.organizerContact,
        p_attendance_points: eventData.attendancePoints,
      });

      if (error) throw error;
      if (!result) throw new Error("Failed to create event");

      return transformEventProduct(result);
    } catch (error: any) {
      console.error("Failed to create event:", error);
      toast.error(error.message || "Failed to create event");
      throw error;
    }
  }

  static async updateEvent(
    productId: string,
    eventData: Partial<
      Omit<
        EventProduct,
        "id" | "productId" | "storeName" | "createdAt" | "updatedAt"
      >
    >,
  ): Promise<EventProduct> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: event, error: eventError } = await supabase
        .from("events")
        .select("id")
        .eq("product_id", productId)
        .single();

      if (eventError) throw eventError;
      if (!event) throw new Error("Event not found");

      const { data: result, error } = await supabase.rpc("update_event", {
        p_event_id: event.id,
        p_product_id: productId,
        p_store_name: user.storeName,
        // Product fields
        p_name: eventData.name,
        p_description: eventData.description,
        p_category_id: eventData.category?.id,
        p_price: eventData.price,
        p_compare_at_price: eventData.compareAtPrice,
        p_cost: eventData.cost,
        p_sku: eventData.sku,
        p_barcode: eventData.barcode,
        p_track_quantity: eventData.trackQuantity,
        p_weight: eventData.weight,
        p_weight_unit: eventData.weightUnit,
        p_status: eventData.status,
        p_variant_options: eventData.variantOptions,
        p_variants: eventData.variants,
        p_images: eventData.images,
        p_tags: eventData.tags?.map((tag) => tag.name),
        p_is_reward: eventData.isReward,
        // Event fields
        p_start_datetime: eventData.startDateTime,
        p_end_datetime: eventData.endDateTime,
        // p_gate_opening_datetime: eventData.gateOpeningDateTime,
        // p_gate_closing_datetime: eventData.gateClosingDateTime,
        p_venue_name: eventData.venueName,
        p_venue_address: eventData.venueAddress,
        p_google_maps_link: eventData.googleMapsLink,
        p_organizer_name: eventData.organizerName,
        p_organizer_contact: eventData.organizerContact,
        p_attendance_points: eventData.attendancePoints,
      });

      if (error) throw error;
      if (!result) throw new Error("Failed to update event");

      return transformEventProduct(result);
    } catch (error: any) {
      console.error("Failed to update event:", error);
      toast.error(error.message || "Failed to update event");
      throw error;
    }
  }

  static async deleteEvent(eventId: string): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId)
        .eq("store_name", user.storeName);

      if (error) throw error;

      toast.success("Event deleted successfully");
    } catch (error: any) {
      console.error("Failed to delete event:", error);
      toast.error(error.message || "Failed to delete event");
      throw error;
    }
  }
}
