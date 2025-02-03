import { supabase } from "@/lib/supabase";
import { PaymentSettings } from "../schemas/payment-settings-schema";

export class PaymentSettingsService {
  static async getPaymentSettings(
    storeName: string,
  ): Promise<PaymentSettings | null> {
    const { data, error } = await supabase
      .from("payment_settings")
      .select("*")
      .eq("store_name", storeName)
      .single();

    if (error) {
      console.error("Error fetching payment settings:", error);
      throw error;
    }

    if (!data) return null;

    return {
      promptpayEnabled: data.promptpay_enabled,
      promptpayQrCode: data.promptpay_qr_code_url,
      promptpayId: data.promptpay_id,
      promptpayName: data.promptpay_name,
      bankTransferEnabled: data.bank_transfer_enabled,
      bankAccounts: data.bank_accounts || [],
      notifyEmail: data.notify_email,
    };
  }

  static async updatePaymentSettings(
    storeName: string,
    settings: PaymentSettings,
  ): Promise<void> {
    const { error } = await supabase
      .from("payment_settings")
      .update({
        promptpay_enabled: settings.promptpayEnabled,
        promptpay_qr_code_url: settings.promptpayQrCode,
        promptpay_id: settings.promptpayId,
        promptpay_name: settings.promptpayName,
        bank_transfer_enabled: settings.bankTransferEnabled,
        bank_accounts: settings.bankAccounts,
        notify_email: settings.notifyEmail,
      })
      .eq("store_name", storeName);

    if (error) {
      console.error("Error updating payment settings:", error);
      throw error;
    }
  }
}
