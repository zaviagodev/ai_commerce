import { supabase } from '@/lib/supabase';
import { Campaign } from '@/types/campaign';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/auth/auth-store';
import { transformRulesToDb, transformRulesFromDb } from '../utils/rules-transformer';

export class CampaignService {
  static async getCampaigns(): Promise<Campaign[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: campaigns, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('store_name', user.storeName)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (campaigns || []).map(campaign => ({
        id: campaign.id,
        name: campaign.name,
        description: campaign.description,
        type: campaign.type,
        multiplier: campaign.multiplier,
        bonusPoints: campaign.bonus_points,
        startDate: new Date(campaign.start_date),
        endDate: new Date(campaign.end_date),
        targetType: campaign.target_type,
        targetTiers: campaign.target_tiers,
        targetGroups: campaign.target_groups,
        status: campaign.status,
        qrEnabled: campaign.qr_enabled,
        qrPointType: campaign.qr_point_type,
        qrPointValue: campaign.qr_point_value,
        qrScanLimit: campaign.qr_scan_limit,
        qrTotalScans: campaign.qr_total_scans,
        clickLinkEnabled: campaign.click_link_enabled,
        clickLinkLimit: campaign.click_link_limit,
        hasProductRules: campaign.has_product_rules,
        hasConditions: campaign.has_conditions,
        productRules: transformRulesFromDb(campaign.product_rules || []),
        conditions: transformRulesFromDb(campaign.conditions || []),
        createdAt: new Date(campaign.created_at),
        updatedAt: new Date(campaign.updated_at),
      }));
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      toast.error('Failed to load campaigns');
      return [];
    }
  }

  static async createCampaign(campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<Campaign> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: newCampaign, error } = await supabase
        .from('campaigns')
        .insert({
          store_name: user.storeName,
          name: campaign.name,
          description: campaign.description,
          type: campaign.type,
          multiplier: campaign.multiplier,
          bonus_points: campaign.bonusPoints,
          start_date: campaign.startDate.toISOString(),
          end_date: campaign.endDate.toISOString(),
          target_type: campaign.targetType,
          target_tiers: campaign.targetTiers,
          target_groups: campaign.targetGroups,
          status: campaign.status,
          qr_enabled: campaign.qrEnabled,
          qr_point_type: campaign.qrPointType,
          qr_point_value: campaign.qrPointValue,
          qr_scan_limit: campaign.qrScanLimit,
          qr_total_scans: campaign.qrTotalScans,
          click_link_enabled: campaign.clickLinkEnabled,
          click_link_limit: campaign.clickLinkLimit,
          has_product_rules: campaign.hasProductRules,
          has_conditions: campaign.hasConditions,
          product_rules: transformRulesToDb(campaign.productRules || []),
          conditions: transformRulesToDb(campaign.conditions || []),
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Campaign created successfully');
      return {
        ...campaign,
        id: newCampaign.id,
        createdAt: new Date(newCampaign.created_at),
        updatedAt: new Date(newCampaign.updated_at),
      };
    } catch (error: any) {
      console.error('Failed to create campaign:', error);
      toast.error(error.message || 'Failed to create campaign');
      throw error;
    }
  }

  static async updateCampaign(id: string, campaign: Partial<Campaign>): Promise<Campaign> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: updatedCampaign, error } = await supabase
        .from('campaigns')
        .update({
          name: campaign.name,
          description: campaign.description,
          type: campaign.type,
          multiplier: campaign.multiplier,
          bonus_points: campaign.bonusPoints,
          start_date: campaign.startDate?.toISOString(),
          end_date: campaign.endDate?.toISOString(),
          target_type: campaign.targetType,
          target_tiers: campaign.targetTiers,
          target_groups: campaign.targetGroups,
          status: campaign.status,
          qr_enabled: campaign.qrEnabled,
          qr_point_type: campaign.qrPointType,
          qr_point_value: campaign.qrPointValue,
          qr_scan_limit: campaign.qrScanLimit,
          qr_total_scans: campaign.qrTotalScans,
          click_link_enabled: campaign.clickLinkEnabled,
          click_link_limit: campaign.clickLinkLimit,
          has_product_rules: campaign.hasProductRules,
          has_conditions: campaign.hasConditions,
          product_rules: campaign.productRules ? transformRulesToDb(campaign.productRules) : undefined,
          conditions: campaign.conditions ? transformRulesToDb(campaign.conditions) : undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('store_name', user.storeName)
        .select()
        .single();

      if (error) throw error;

      toast.success('Campaign updated successfully');
      return {
        ...campaign,
        id: updatedCampaign.id,
        createdAt: new Date(updatedCampaign.created_at),
        updatedAt: new Date(updatedCampaign.updated_at),
      } as Campaign;
    } catch (error: any) {
      console.error('Failed to update campaign:', error);
      toast.error(error.message || 'Failed to update campaign');
      throw error;
    }
  }
}