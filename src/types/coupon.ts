export interface Coupon {
  id: string;
  code: string;
  description?: string;
  type: 'percentage' | 'fixed' | 'shipping' | 'points';
  value: number;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  pointsValue?: number;
  maxPointsEarned?: number;
  pointsValidity?: number;
  usageLimit?: number;
  usageCount?: number;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'scheduled' | 'active' | 'expired';
  advancedMode: boolean;
  conditions?: {
    id: string;
    type: 'cart_total' | 'product_quantity' | 'customer_group' | 'first_purchase';
    operator: 'greater_than' | 'less_than' | 'equal_to';
    value: string;
    enabled: boolean;
    logicGate?: 'and' | 'or';
  }[];
}