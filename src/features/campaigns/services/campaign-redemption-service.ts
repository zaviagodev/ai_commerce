import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export class CampaignRedemptionService {
  static async redeemCampaign(campaignId: string, customerId: string, storeName: string) {
    try {
      const { data, error } = await supabase
        .rpc('redeem_campaign', {
          p_campaign_id: campaignId,
          p_customer_id: customerId,
          p_store_name: storeName,
        });

      if (error) throw error;

      toast.success('Campaign redeemed successfully');
      return data;
    } catch (error: any) {
      console.error('Failed to redeem campaign:', error);
      toast.error(error.message || 'Failed to redeem campaign');
      throw error;
    }
  }

  static async getRedemptions(campaignId: string) {
    try {
      const { data, error } = await supabase
        .from('campaign_redemptions')
        .select(`
          *,
          customers (
            first_name,
            last_name,
            email
          )
        `)
        .eq('campaign_id', campaignId)
        .order('redeemed_at', { ascending: false });

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Failed to fetch redemptions:', error);
      toast.error('Failed to load redemptions');
      return [];
    }
  }
}