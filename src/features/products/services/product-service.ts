import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth/auth-store";
import { transformProduct } from "../utils/product-transformer";
import { VariantService } from "./variant-service";

export type ProductFilters = {
  isReward?: boolean;
  status?: string;
  categoryId?: string;
};

export class ProductService {
  static async getProducts(filters?: ProductFilters): Promise<Product[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      let query = supabase
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
        .eq("store_name", user.storeName);

      // Apply filters if provided
      if (filters?.isReward !== undefined) {
        query = query.eq("is_reward", filters.isReward);
      }
      if (filters?.status) {
        query = query.eq("status", filters.status);
      }
      if (filters?.categoryId) {
        query = query.eq("category_id", filters.categoryId);
      }

      query = query.order("created_at", { ascending: false });

      const { data: products, error } = await query;

      if (error) throw error;

      return (products || []).map(transformProduct);
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
      toast.error(error.message || "Failed to load products");
      return [];
    }
  }

  static async getProduct(id: string): Promise<Product | null> {
    const user = useAuthStore.getState().user;
    if (!user?.storeName) throw new Error("Store not found");
    try {
      const { data: product, error } = await supabase
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
        .eq("id", id)
        .eq("store_name", user.storeName)
        .single();

      if (error) throw error;

      return transformProduct(product);
    } catch (error: any) {
      console.error("Failed to fetch product:", error);
      toast.error(error.message || "Failed to load product");
      return null;
    }
  }

  static async createProduct(
    product: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ): Promise<Product> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      // Create product
      const { data: newProduct, error: productError } = await supabase
        .from("products")
        .insert({
          store_name: user.storeName,
          name: product.name,
          description: product.description,
          category_id: product.category?.id,
          price: product.price,
          is_reward: product.isReward,
          is_gift_card: product.isGiftCard,
          points_based_price: product.pointsBasedPrice,
          compare_at_price: product.compareAtPrice,
          cost: product.cost,
          sku: product.sku,
          barcode: product.barcode,
          track_quantity: product.trackQuantity,
          variant_options: product.variantOptions,
          weight: product.weight,
          weight_unit: product.weightUnit,
          status: product.status,
        })
        .select()
        .single();

      if (productError) throw productError;

      // Create variants if provided
      if (product.variants?.length > 0) {
        await VariantService.createVariants(newProduct.id, product.variants);
      }

      toast.success("Product created successfully");
      return transformProduct(newProduct);
    } catch (error: any) {
      console.error("Failed to create product:", error);
      toast.error(error.message || "Failed to create product");
      throw error;
    }
  }

  static async updateProduct(
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
          name: product.name,
          description: product.description,
          category_id: product.category?.id,
          price: product.price,
          is_reward: product.isReward,
          is_gift_card: product.isGiftCard,
          points_based_price: product.pointsBasedPrice,
          compare_at_price: product.compareAtPrice,
          cost: product.cost,
          sku: product.sku,
          barcode: product.barcode,
          track_quantity: product.trackQuantity,
          variant_options: product.variantOptions,
          weight: product.weight,
          weight_unit: product.weightUnit,
          status: product.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("store_name", user.storeName)
        .select()
        .single();

      if (productError) throw productError;

      // Update variants if provided
      if (product.variants) {
        await VariantService.updateVariants(id, product.variants);
      }

      toast.success("Product updated successfully");
      return transformProduct(updatedProduct);
    } catch (error: any) {
      console.error("Failed to update product:", error);
      toast.error(error.message || "Failed to update product");
      throw error;
    }
  }

  static async deleteProduct(id: string): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .eq("store_name", user.storeName);

      if (error) throw error;

      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
      throw error;
    }
  }
}
