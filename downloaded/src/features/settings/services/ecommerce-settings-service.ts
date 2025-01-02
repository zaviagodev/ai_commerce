import { supabase } from '@/lib/supabase';
import { EcommerceSettings } from '../schemas/ecommerce-settings-schema';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/auth/auth-store';

export class EcommerceSettingsService {
  static async getSettings(): Promise<EcommerceSettings | null> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: settings, error } = await supabase
        .from('store_settings')
        .select('*')
        .eq('store_name', user.storeName)
        .single();

      if (error) throw error;
      if (!settings) return null;

      return {
        currency: settings.currency,
        weightUnit: settings.weight_unit,
        dimensionUnit: settings.dimension_unit,
        orderPrefix: settings.order_prefix,
        guestCheckout: settings.guest_checkout,
        requirePhone: settings.require_phone,
        requireShipping: settings.require_shipping,
        requireBilling: settings.require_billing,
        trackInventory: settings.track_inventory,
        lowStockThreshold: settings.low_stock_threshold,
        outOfStockBehavior: settings.out_of_stock_behavior,
        taxCalculation: settings.tax_calculation,
        taxInclusive: settings.tax_inclusive,
        defaultTaxRate: settings.default_tax_rate,
      };
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      toast.error('Failed to load settings');
      return null;
    }
  }

  static async updateSettings(settings: EcommerceSettings): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { error } = await supabase
        .from('store_settings')
        .upsert({
          store_name: user.storeName,
          currency: settings.currency,
          weight_unit: settings.weightUnit,
          dimension_unit: settings.dimensionUnit,
          order_prefix: settings.orderPrefix,
          guest_checkout: settings.guestCheckout,
          require_phone: settings.requirePhone,
          require_shipping: settings.requireShipping,
          require_billing: settings.requireBilling,
          track_inventory: settings.trackInventory,
          low_stock_threshold: settings.lowStockThreshold,
          out_of_stock_behavior: settings.outOfStockBehavior,
          tax_calculation: settings.taxCalculation,
          tax_inclusive: settings.taxInclusive,
          default_tax_rate: settings.defaultTaxRate,
          updated_at: new Date().toISOString(),
        })
        .select();

      if (error) throw error;

      toast.success('Settings updated successfully');
    } catch (error: any) {
      console.error('Failed to update settings:', error);
      toast.error(error.message || 'Failed to update settings');
      throw error;
    }
  }
}