import { z } from 'zod';

export const EcommerceSettingsSchema = z.object({
  currency: z.string(),
  weightUnit: z.enum(['kg', 'lb']),
  dimensionUnit: z.enum(['cm', 'in']),
  orderPrefix: z.string(),
  guestCheckout: z.boolean(),
  requirePhone: z.boolean(),
  requireShipping: z.boolean(),
  requireBilling: z.boolean(),
  trackInventory: z.boolean(),
  lowStockThreshold: z.number().min(0),
  outOfStockBehavior: z.enum(['hide', 'show', 'backorder']),
  taxCalculation: z.enum(['line_items', 'total']),
  taxInclusive: z.boolean(),
  defaultTaxRate: z.number().min(0).max(100),
});

export type EcommerceSettings = z.infer<typeof EcommerceSettingsSchema>;