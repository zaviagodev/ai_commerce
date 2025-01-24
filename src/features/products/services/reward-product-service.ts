import { supabase } from "@/lib/supabase";
import { Product, ProductVariant } from "@/types/product";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth/auth-store";
import { transformProduct } from "../utils/product-transformer";
import { ProductService } from "./product-service";

export class RewardProductService extends ProductService {
  static async getRewardProducts(): Promise<Product[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: products, error } = await supabase
        .from("products")
        .select(
          `
          *,
          product_images (*),
          product_variants (
            id,
            name,
            sku,
            price,
            compare_at_price,
            points_based_price,
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
        `,
        )
        .eq("store_name", user.storeName)
        .eq("is_reward", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (products || []).map(transformProduct);
    } catch (error: any) {
      console.error("Failed to fetch reward products:", error);
      toast.error(error.message || "Failed to load reward products");
      return [];
    }
  }

  static async createRewardProduct(
    product: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ): Promise<Product> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      // Create product with reward flag
      const { data: newProduct, error: productError } = await supabase
        .from("products")
        .insert({
          ...product,
          store_name: user.storeName,
          is_reward: true,
        })
        .select()
        .single();

      if (productError) throw productError;

      // Create variants with points based price if provided
      if (product.variants?.length > 0) {
        const variantsWithPoints = product.variants.map((variant) => ({
          ...variant,
          points_based_price: variant.pointsBasedPrice,
        }));
        await this.createVariants(newProduct.id, variantsWithPoints);
      }

      toast.success("Reward product created successfully");
      return transformProduct(newProduct);
    } catch (error: any) {
      console.error("Failed to create reward product:", error);
      toast.error(error.message || "Failed to create reward product");
      throw error;
    }
  }

  static async updateRewardProduct(
    id: string,
    product: Partial<Product>,
  ): Promise<Product> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      // Update product
      const { data: updatedProduct, error: productError } = await supabase
        .from("products")
        .update({
          ...product,
          is_reward: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("store_name", user.storeName)
        .select()
        .single();

      if (productError) throw productError;

      // Update variants with points based price if provided
      if (product.variants) {
        const variantsWithPoints = product.variants.map((variant) => ({
          ...variant,
          points_based_price: variant.pointsBasedPrice,
        }));
        await this.updateVariants(id, variantsWithPoints);
      }

      toast.success("Reward product updated successfully");
      return transformProduct(updatedProduct);
    } catch (error: any) {
      console.error("Failed to update reward product:", error);
      toast.error(error.message || "Failed to update reward product");
      throw error;
    }
  }

  private static async createVariants(
    productId: string,
    variants: ProductVariant[],
  ): Promise<void> {
    try {
      const { error } = await supabase.from("product_variants").insert(
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

      if (error) throw error;
    } catch (error: any) {
      console.error("Failed to create variants:", error);
      throw error;
    }
  }

  private static async updateVariants(
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

      // Create new variants
      await this.createVariants(productId, variants);
    } catch (error: any) {
      console.error("Failed to update variants:", error);
      throw error;
    }
  }
}
