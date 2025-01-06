// Types for campaign conditions and rules
export interface CampaignCondition {
  id?: string;
  type: 'total_spent' | 'order_count' | 'last_order' | 'location';
  operator: 'greater_than' | 'less_than' | 'equal_to';
  value: string;
  enabled: boolean;
}

export interface CampaignProductRule {
  id?: string;
  type: 'product_purchased' | 'product_quantity' | 'product_amount' | 'category_purchased' | 'category_quantity' | 'category_amount';
  operator: 'greater_than' | 'less_than' | 'equal_to';
  value: string;
  enabled: boolean;
  productId?: string;
  categoryId?: string;
}

export interface CampaignRules {
  conditions: CampaignCondition[];
  productRules: CampaignProductRule[];
}