import { z } from 'zod';

export const RedeemItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number().min(1),
  points: z.number().min(0),
  image: z.string().optional(),
});

export const RedeemSchema = z.object({
  id: z.string(),
  code: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  customerAddress: z.string(),
  pickupLocation: z.string(),
  pointsRedeemed: z.number().min(0),
  items: z.array(RedeemItemSchema),
  couponCode: z.string(),
  status: z.enum(['pending', 'completed', 'cancelled']),
  redeemedAt: z.date(),
});