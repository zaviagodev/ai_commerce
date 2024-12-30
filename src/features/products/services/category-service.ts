import { supabase } from '@/lib/supabase';
import { ProductCategory } from '@/types/product';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/auth/auth-store';

export class CategoryService {
  static async getCategories(): Promise<ProductCategory[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: categories, error } = await supabase
        .from('product_categories')
        .select('*')
        .eq('store_name', user.storeName)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Categories fetch error:', error);
        throw error;
      }

      return categories.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
      }));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to load categories');
      return [];
    }
  }

  static async createCategory(category: Omit<ProductCategory, 'id'>): Promise<ProductCategory> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      // Validate slug uniqueness
      const { count, error: checkError } = await supabase
        .from('product_categories')
        .select('id', { count: 'exact', head: true })
        .eq('store_name', user.storeName)
        .eq('slug', category.slug);

      if (checkError) throw checkError;
      if (count && count > 0) {
        throw new Error('A category with this slug already exists');
      }

      const { data, error } = await supabase
        .from('product_categories')
        .insert({
          store_name: user.storeName,
          name: category.name,
          slug: category.slug,
          description: category.description,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Category created successfully');
      return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        description: data.description,
      };
    } catch (error: any) {
      console.error('Failed to create category:', error);
      toast.error(error.message || 'Failed to create category');
      throw error;
    }
  }

  static async updateCategory(id: string, category: Partial<ProductCategory>): Promise<ProductCategory> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      // Check if slug is being updated and validate uniqueness
      if (category.slug) {
        const { count, error: checkError } = await supabase
          .from('product_categories')
          .select('id', { count: 'exact', head: true })
          .eq('store_name', user.storeName)
          .eq('slug', category.slug)
          .neq('id', id);

        if (checkError) throw checkError;
        if (count && count > 0) {
          throw new Error('A category with this slug already exists');
        }
      }

      const { data, error } = await supabase
        .from('product_categories')
        .update({
          name: category.name,
          slug: category.slug,
          description: category.description,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('store_name', user.storeName)
        .select()
        .single();

      if (error) throw error;

      toast.success('Category updated successfully');
      return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        description: data.description,
      };
    } catch (error: any) {
      console.error('Failed to update category:', error);
      toast.error(error.message || 'Failed to update category');
      throw error;
    }
  }

  static async deleteCategory(id: string): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { error } = await supabase
        .from('product_categories')
        .delete()
        .eq('id', id)
        .eq('store_name', user.storeName);

      if (error) throw error;

      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error('Failed to delete category');
      throw error;
    }
  }
}