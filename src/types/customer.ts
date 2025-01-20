export interface CustomerAddress {
  id: string;
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  isVerified: boolean;
  acceptsMarketing: boolean;
  tags: string[];
  addresses: CustomerAddress[];
  tierId?: string;
  tier?: CustomerTier;
  createdAt: Date;
  updatedAt: Date;
}

export type ConditionOperator = 'greater_than' | 'less_than' | 'equal_to';
export type ConditionType = 'total_spent' | 'order_count' | 'last_order' | 'location';

export interface CustomerGroupCondition {
  id: string;
  type: ConditionType;
  operator: ConditionOperator;
  value: string;
  enabled: boolean;
}

export interface CustomerGroup {
  id: string;
  name: string;
  description?: string;
  color: string;
  autoAssign: boolean;
  conditions: CustomerGroupCondition[];
  members: string[];
  status: 'active' | 'inactive';
}

export interface CustomerTier {
  id: string;
  name: string;
  description?: string;
  color: string;
  requirements: any[];
  rewardsMultiplier: number;
  discountPercentage: number;
  freeShipping: boolean;
  prioritySupport: boolean;
  earlyAccess: boolean;
  status: 'active' | 'inactive';
}