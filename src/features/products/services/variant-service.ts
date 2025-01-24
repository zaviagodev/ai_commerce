import { supabase } from "@/lib/supabase";
import { ProductVariant } from "@/types/product";
import { toast } from "sonner";

export class VariantService {
  static async createVariants(
    productId: string,
    variants: Omit<ProductVariant, "id">[],
  ): Promise<void> {
    try {
      const { error } = await supabase.from("product_variants").insert(
        variants.map((variant) => ({
          product_id: productId,
          name: variant.name,
          sku: variant.sku,
          price: variant.price,
          compare_at_price: variant.compareAtPrice,
          quantity: variant.quantity,
          options: variant.options,
          status: variant.status,
          position: variant.position,
        })),
      );

      if (error) throw error;
    } catch (error: any) {
      console.error("Failed to create variants:", error);
      toast.error(error.message || "Failed to create variants");
      throw error;
    }
  }

  static async updateVariants(
    productId: string,
    variants: ProductVariant[],
  ): Promise<void> {
    try {
      // Delete existing variants
      const { error: deleteError } = await supabase
        .from("product_variants")
        .delete()
        .eq("product_id", productId);

      if (deleteError) throw deleteError;

      // Insert new variants
      if (variants.length > 0) {
        const { error: insertError } = await supabase
          .from("product_variants")
          .insert(
            variants.map((variant) => ({
              product_id: productId,
              name: variant.name,
              sku: variant.sku,
              price: variant.price,
              compare_at_price: variant.compareAtPrice,
              points_based_price: variant.pointsBasedPrice,
              quantity: variant.quantity,
              options: variant.options,
              status: variant.status,
              position: variant.position,
            })),
          );

        if (insertError) throw insertError;
      }
    } catch (error: any) {
      console.error("Failed to update variants:", error);
      toast.error(error.message || "Failed to update variants");
      throw error;
    }
  }
}
