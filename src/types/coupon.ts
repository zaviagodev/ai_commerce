export interface Coupon {
  id: string;
  code: string;
  description?: string;
  type: "percentage" | "fixed" | "shipping" | "points";
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
  status: "active" | "inactive";
  advancedMode: boolean;
  conditions?: (RuleCondition | RuleGroup | RuleOperator)[];
}

interface RuleCondition {
  id: string;
  type:
    | "cart_total"
    | "product_quantity"
    | "customer_group"
    | "first_purchase"
    | "item_count"
    | "shipping_country"
    | "total_spent"
    | "category"
    | "tag";
  operator: "greater_than" | "less_than" | "equal_to";
  value: string;
  enabled: boolean;
  logicGate?: "and" | "or";
}

interface RuleGroup {
  id: string;
  type: "group";
  match: "all" | "any";
  conditions: RuleCondition[];
}

interface RuleOperator {
  id: string;
  type: "group_operator";
  operator: "AND" | "OR";
}
