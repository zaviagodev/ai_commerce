import { z } from 'zod';

export const CouponSchema = z.object({
  id: z.string().optional(),
  code: z.string().min(1, 'Coupon code is required'),
  description: z.string().optional(),
  type: z.enum(['percentage', 'fixed']),
  value: z.number().min(0, 'Value must be greater than or equal to 0'),
  minPurchaseAmount: z.number().min(0).optional(),
  maxDiscountAmount: z.number().min(0).optional(),
  usageLimit: z.number().min(0).optional(),
  usageCount: z.number().min(0).optional(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(['draft', 'scheduled', 'active', 'expired']),
  advancedMode: z.boolean().default(false),
  conditions: z.array(
    z.object({
      id: z.string(),
      type: z.enum(['cart_total', 'product_quantity', 'customer_group', 'first_purchase']),
      operator: z.enum(['greater_than', 'less_than', 'equal_to']),
      value: z.string(),
      enabled: z.boolean(),
      logicGate: z.enum(['and', 'or']).optional(),
    })
  ).optional(),
});