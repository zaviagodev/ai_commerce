import { supabase } from "@/lib/supabase";

export class StorageService {
  static async uploadQrCode(file: File, storeName: string): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${storeName}/qr-codes/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(import.meta.env.VITE_SUPABASE_STORAGE_BUCKET)
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading QR code:", uploadError);
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from(import.meta.env.VITE_SUPABASE_STORAGE_BUCKET)
      .getPublicUrl(filePath);

    return publicUrl;
  }

  static async deleteQrCode(url: string): Promise<void> {
    // Extract the path from the URL
    const path = url.split("/").slice(-3).join("/");

    const { error } = await supabase.storage
      .from(import.meta.env.VITE_SUPABASE_STORAGE_BUCKET)
      .remove([path]);

    if (error) {
      console.error("Error deleting QR code:", error);
      throw error;
    }
  }
}
