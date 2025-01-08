import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/auth/auth-store';
import { transformProduct } from '../utils/product-transformer';

export class ProductService {
  static async getProducts(): Promise<Product[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: products, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (*),
          product_tags (*),
          product_categories (
            id,
            name,
            slug,
            description
          )
        `)
        .eq('store_name', user.storeName)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (products || []).map(transformProduct);
    } catch (error: any) {
      console.error('Failed to fetch products:', error);
      toast.error(error.message || 'Failed to load products');
      return [];
    }
  }

  static async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: newProduct, error: productError } = await supabase
        .from('products')
        .insert({
          store_name: user.storeName,
          name: product.name,
          description: product.description,
          category_id: product.category?.id,
          price: product.price,
          compare_at_price: product.compareAtPrice,
          cost: product.cost,
          sku: product.sku,
          barcode: product.barcode,
          track_quantity: product.trackQuantity,
          quantity: product.quantity,
          weight: product.weight,
          weight_unit: product.weightUnit,
          status: product.status,
        })
        .select(`
          *,
          product_images (*),
          product_tags (*),
          product_categories (
            id,
            name,
            slug,
            description
          )
        `)
        .single();

      if (productError) throw productError;

      toast.success('Product created successfully');
      return transformProduct(newProduct);
    } catch (error: any) {
      console.error('Failed to create product:', error);
      toast.error(error.message || 'Failed to create product');
      throw error;
    }
  }

  static async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: updatedProduct, error: productError } = await supabase
        .from('products')
        .update({
          name: product.name,
          description: product.description,
          category_id: product.category?.id,
          price: product.price,
          compare_at_price: product.compareAtPrice,
          cost: product.cost,
          sku: product.sku,
          barcode: product.barcode,
          track_quantity: product.trackQuantity,
          quantity: product.quantity,
          weight: product.weight,
          weight_unit: product.weightUnit,
          status: product.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('store_name', user.storeName)
        .select(`
          *,
          product_images (*),
          product_tags (*),
          product_categories (
            id,
            name,
            slug,
            description
          )
        `)
        .single();

      if (productError) throw productError;

      // Update product images if provided
      if (product.images) {
        // Delete existing images
        const { error: deleteImagesError } = await supabase
          .from('product_images')
          .delete()
          .eq('product_id', id);

        if (deleteImagesError) throw deleteImagesError;

        // Insert new images
        if (product.images.length > 0) {
          const { error: imagesError } = await supabase
            .from('product_images')
            .insert(
              product.images.map((image, index) => ({
                product_id: id,
                url: image.url,
                alt: image.alt,
                position: index,
              }))
            );

          if (imagesError) throw imagesError;
        }
      }

      // Update product tags if provided
      if (product.tags) {
        // Delete existing tags
        const { error: deleteTagsError } = await supabase
          .from('product_tags')
          .delete()
          .eq('product_id', id);

        if (deleteTagsError) throw deleteTagsError;

        // Insert new tags
        if (product.tags.length > 0) {
          const { error: tagsError } = await supabase
            .from('product_tags')
            .insert(
              product.tags.map(tag => ({
                product_id: id,
                name: tag.name,
              }))
            );

          if (tagsError) throw tagsError;
        }
      }

      toast.success('Product updated successfully');
      return transformProduct(updatedProduct);
    } catch (error: any) {
      console.error('Failed to update product:', error);
      toast.error(error.message || 'Failed to update product');
      throw error;
    }
  }

  static async deleteProduct(id: string): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .eq('store_name', user.storeName);

      if (error) throw error;

      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product');
      throw error;
    }
  }
}