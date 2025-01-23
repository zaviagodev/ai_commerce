import { supabase } from "@/lib/supabase";
import {
  CampaignCondition,
  CampaignProductRule,
} from "../types/campaign-rules";
import { useAuthStore } from "@/lib/auth/auth-store";

export class CampaignRulesService {
  static async createCampaignRules(
    campaignId: string,
    conditions: CampaignCondition[],
    productRules: CampaignProductRule[],
  ) {
    const user = useAuthStore.getState().user;
    if (!user?.storeName) throw new Error("Store not found");

    // Insert conditions
    if (conditions.length > 0) {
      const { error: conditionsError } = await supabase
        .from("campaign_conditions")
        .insert(
          conditions.map((condition) => ({
            campaign_id: campaignId,
            store_name: user.storeName,
            type: condition.type,
            operator: condition.operator,
            value: condition.value,
            enabled: condition.enabled,
          })),
        );

      if (conditionsError) throw conditionsError;
    }

    // Insert product rules
    if (productRules.length > 0) {
      const { error: rulesError } = await supabase
        .from("campaign_product_rules")
        .insert(
          productRules.map((rule) => ({
            campaign_id: campaignId,
            store_name: user.storeName,
            type: rule.type,
            operator: rule.operator,
            value: rule.value,
            enabled: rule.enabled,
            product_id: rule.productId,
            category_id: rule.categoryId,
          })),
        );

      if (rulesError) throw rulesError;
    }
  }

  static async getCampaignRules(campaignId: string) {
    const [{ data: conditions }, { data: productRules }] = await Promise.all([
      supabase
        .from("campaign_conditions")
        .select("*")
        .eq("campaign_id", campaignId),
      supabase
        .from("campaign_product_rules")
        .select("*")
        .eq("campaign_id", campaignId),
    ]);

    return {
      conditions:
        conditions?.map((condition) => ({
          id: condition.id,
          type: condition.type,
          operator: condition.operator,
          value: condition.value,
          enabled: condition.enabled,
        })) || [],
      productRules:
        productRules?.map((rule) => ({
          id: rule.id,
          type: rule.type,
          operator: rule.operator,
          value: rule.value,
          enabled: rule.enabled,
          productId: rule.product_id,
          categoryId: rule.category_id,
        })) || [],
    };
  }

  static async updateCampaignRules(
    campaignId: string,
    conditions: CampaignCondition[],
    productRules: CampaignProductRule[],
  ) {
    const user = useAuthStore.getState().user;
    if (!user?.storeName) throw new Error("Store not found");

    // Delete existing rules
    await Promise.all([
      supabase
        .from("campaign_conditions")
        .delete()
        .eq("campaign_id", campaignId),
      supabase
        .from("campaign_product_rules")
        .delete()
        .eq("campaign_id", campaignId),
    ]);

    // Create new rules
    await this.createCampaignRules(campaignId, conditions, productRules);
  }
}
