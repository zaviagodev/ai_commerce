import { supabase } from '@/lib/supabase';
import { Campaign } from '@/types/campaign';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/auth/auth-store';
import { CampaignRulesService } from './campaign-rules.service';
import { CampaignCondition, CampaignProductRule } from '../types/campaign-rules';

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

      // Fetch rules for each campaign
      const campaignsWithRules = await Promise.all(
        (campaigns || []).map(async (campaign) => {
          const rules = await CampaignRulesService.getCampaignRules(campaign.id);
          return {
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
            conditions: rules.conditions,
            productRules: rules.productRules,
            createdAt: new Date(campaign.created_at),
            updatedAt: new Date(campaign.updated_at),
          };
        })
      );

      return campaignsWithRules;
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

      // Extract rules and conditions
      const { conditions = [], productRules = [], ...campaignData } = campaign;

      // Convert to snake_case for database
      const dbCampaign = {
        store_name: user.storeName,
        name: campaignData.name,
        description: campaignData.description,
        type: campaignData.type,
        multiplier: campaignData.multiplier,
        bonus_points: campaignData.bonusPoints,
        start_date: campaignData.startDate.toISOString(),
        end_date: campaignData.endDate.toISOString(),
        target_type: campaignData.targetType,
        target_tiers: campaignData.targetTiers,
        target_groups: campaignData.targetGroups,
        status: campaignData.status,
        qr_enabled: campaignData.qrEnabled,
        qr_point_type: campaignData.qrPointType,
        qr_point_value: campaignData.qrPointValue,
        qr_scan_limit: campaignData.qrScanLimit,
        qr_total_scans: campaignData.qrTotalScans,
        click_link_enabled: campaignData.clickLinkEnabled,
        click_link_limit: campaignData.clickLinkLimit,
        has_product_rules: campaignData.hasProductRules,
        has_conditions: campaignData.hasConditions,
      };

      // Create campaign
      const { data, error } = await supabase
        .from('campaigns')
        .insert(dbCampaign)
        .select()
        .single();

      if (error) throw error;

      // Create rules and conditions
      await CampaignRulesService.createCampaignRules(
        data.id,
        conditions as CampaignCondition[],
        productRules as CampaignProductRule[]
      );

      toast.success('Campaign created successfully');
      return {
        ...campaign,
        id: data.id,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };
    } catch (error: any) {
      console.error('Failed to create campaign:', error);
      toast.error(error.message || 'Failed to create campaign');
      throw error;
    }
  }

  static async updateCampaign(id: string, campaign: Partial<Campaign>): Promise<Campaign> {
    console.log("service =>", campaign);
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      // Extract rules and conditions
      const { conditions, productRules, ...campaignData } = campaign;

      // Convert to snake_case for database
      const dbCampaign: Record<string, any> = {};
      
      if (campaignData.name) dbCampaign.name = campaignData.name;
      if (campaignData.description) dbCampaign.description = campaignData.description;
      if (campaignData.type) dbCampaign.type = campaignData.type;
      if (campaignData.multiplier) dbCampaign.multiplier = campaignData.multiplier;
      if (campaignData.bonusPoints) dbCampaign.bonus_points = campaignData.bonusPoints;
      if (campaignData.startDate) dbCampaign.start_date = campaignData.startDate.toISOString();
      if (campaignData.endDate) dbCampaign.end_date = campaignData.endDate.toISOString();
      if (campaignData.targetType) dbCampaign.target_type = campaignData.targetType;
      if (campaignData.targetTiers) dbCampaign.target_tiers = campaignData.targetTiers;
      if (campaignData.targetGroups) dbCampaign.target_groups = campaignData.targetGroups;
      if (campaignData.status) dbCampaign.status = campaignData.status;
      if (campaignData.qrEnabled !== undefined) dbCampaign.qr_enabled = campaignData.qrEnabled;
      if (campaignData.qrPointType) dbCampaign.qr_point_type = campaignData.qrPointType;
      if (campaignData.qrPointValue) dbCampaign.qr_point_value = campaignData.qrPointValue;
      if (campaignData.qrScanLimit) dbCampaign.qr_scan_limit = campaignData.qrScanLimit;
      if (campaignData.qrTotalScans) dbCampaign.qr_total_scans = campaignData.qrTotalScans;
      if (campaignData.clickLinkEnabled !== undefined) dbCampaign.click_link_enabled = campaignData.clickLinkEnabled;
      if (campaignData.clickLinkLimit) dbCampaign.click_link_limit = campaignData.clickLinkLimit;
      if (campaignData.hasProductRules !== undefined) dbCampaign.has_product_rules = campaignData.hasProductRules;
      if (campaignData.hasConditions !== undefined) dbCampaign.has_conditions = campaignData.hasConditions;

      dbCampaign.updated_at = new Date().toISOString();

      // Update campaign
      const { data, error } = await supabase
        .from('campaigns')
        .update(dbCampaign)
        .eq('id', id)
        .eq('store_name', user.storeName)
        .select()
        .single();

      if (error) throw error;

      // Update rules and conditions if provided
      if (conditions || productRules) {
        await CampaignRulesService.updateCampaignRules(
          id,
          conditions as CampaignCondition[] || [],
          productRules as CampaignProductRule[] || []
        );
      }

      toast.success('Campaign updated successfully');
      return {
        ...campaign,
        id: data.id,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      } as Campaign;
    } catch (error: any) {
      console.error('Failed to update campaign:', error);
      toast.error(error.message || 'Failed to update campaign');
      throw error;
    }
  }

  static async deleteCampaign(id: string): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id)
        .eq('store_name', user.storeName);

      if (error) throw error;

      toast.success('Campaign deleted successfully');
    } catch (error) {
      console.error('Failed to delete campaign:', error);
      toast.error('Failed to delete campaign');
      throw error;
    }
  }
}