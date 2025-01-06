import { z } from 'zod';

export const CustomerTierSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Tier name is required'),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
  requirements: z.array(
    z.object({
      id: z.string(),
      type: z.enum(['points', 'spending', 'orders', 'duration', 'group']),
      value: z.number().min(0, 'Value must be non-negative'),
      enabled: z.boolean(),
      groups: z.array(z.string()).optional(),
    })
  ),
  rewardsMultiplier: z.number().min(1, 'Rewards multiplier must be at least 1'),
  discountPercentage: z.number().min(0, 'Discount must be non-negative').max(100, 'Discount cannot exceed 100%'),
  freeShipping: z.boolean(),
  prioritySupport: z.boolean(),
  earlyAccess: z.boolean(),
  status: z.enum(['active', 'inactive']),
});