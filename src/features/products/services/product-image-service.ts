// src/features/products/services/product-image-service.ts

import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface CreateProductImageParams {
  productId: string;
  url: string;
  alt: string;
  path: string;
  position: number;
}

export class ProductImageService {
  static async createProductImage(params: CreateProductImageParams) {
    try {
      const { error } = await supabase.from("product_images").insert({
        product_id: params.productId,
        url: params.url,
        alt: params.alt,
        path: params.path,
        position: params.position,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Failed to create product image:", error);
      throw error;
    }
  }

  static async deleteProductImage(productId: string, imageId: string) {
    try {
      const { error } = await supabase
        .from("product_images")
        .delete()
        .eq("product_id", productId)
        .eq("id", imageId);

      if (error) throw error;
    } catch (error) {
      console.error("Failed to delete product image:", error);
      throw error;
    }
  }
}
