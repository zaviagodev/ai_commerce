import { supabase } from '../supabase';
import { useAuthStore } from '../auth/auth-store';

export class MediaService {
  static async uploadProductImage(file: File) {
    const user = useAuthStore.getState().user;
    if (!user?.storeName) throw new Error('Store not found');

    // Create path for the file
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${user.storeName}/products/${fileName}`;

    // Upload file to storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);

    return {
      url: publicUrl,
      path: data.path,
    };
  }

  static async deleteProductImage(path: string) {
    const { error } = await supabase.storage
      .from('product-images')
      .remove([path]);

    if (error) throw error;
  }
}