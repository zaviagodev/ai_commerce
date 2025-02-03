import { supabase } from "@/lib/supabase";

export class OrderSlipService {
  static async uploadSlip(
    file: File,
    orderId: string,
    storeName: string,
  ): Promise<string> {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${storeName}/slips/orders/${orderId}/${fileName}`;

      // Delete existing slip if any
      await this.deleteSlip(orderId, storeName);

      // Upload new slip
      const { error: uploadError } = await supabase.storage
        .from(import.meta.env.VITE_SUPABASE_STORAGE_BUCKET)
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage
        .from(import.meta.env.VITE_SUPABASE_STORAGE_BUCKET)
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading slip:", error);
      throw error;
    }
  }

  static async deleteSlip(orderId: string, storeName: string): Promise<void> {
    try {
      const { data: existingFiles } = await supabase.storage
        .from(import.meta.env.VITE_SUPABASE_STORAGE_BUCKET)
        .list(`${storeName}/slips/orders/${orderId}`);

      const existingSlip = existingFiles?.find((file) =>
        file.name.startsWith(orderId),
      );

      if (existingSlip) {
        const { error } = await supabase.storage
          .from(import.meta.env.VITE_SUPABASE_STORAGE_BUCKET)
          .remove([
            `${storeName}/slips/orders/${orderId}/${existingSlip.name}`,
          ]);

        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error("Error deleting slip:", error);
      throw error;
    }
  }
}
