import { z } from 'zod';

import { CustomerAddress } from '@/types/customer';

export const OrderItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  name: z.string(),
  product: z.object({
    images: z.array(
      z.object({
        url: z.string(),
        alt: z.string().optional()
      })
    ).optional()
  }).optional(),
  price: z.number().min(0).or(z.string()).transform((val) => 
    typeof val === 'string' ? parseFloat(val) : val
  ),
  quantity: z.number().min(1),
  total: z.number().min(0).or(z.string()).transform((val) => 
    typeof val === 'string' ? parseFloat(val) : val
  ),
});

export const OrderSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().min(1, 'Customer is required'),
  customerName: z.string().optional(),
  customerEmail: z.string().optional(),
  customerPhone: z.string().optional(),
  shippingAddress: z.object({
    id: z.string(),
    type: z.enum(['billing', 'shipping']),
    firstName: z.string(),
    lastName: z.string(),
    company: z.string().optional(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
    phone: z.string().optional(),
    isDefault: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
  }).optional(),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  items: z.array(OrderItemSchema),
  subtotal: z.number().min(0).or(z.string()).transform((val) => 
    typeof val === 'string' ? parseFloat(val) : val
  ),
  discount: z.number().min(0).or(z.string()).transform((val) => 
    typeof val === 'string' ? parseFloat(val) : val
  ),
  shipping: z.number().min(0).or(z.string()).transform((val) => 
    typeof val === 'string' ? parseFloat(val) : val
  ),
  tax: z.number().min(0).or(z.string()).transform((val) => 
    typeof val === 'string' ? parseFloat(val) : val
  ),
  total: z.number().min(0).or(z.string()).transform((val) => 
    typeof val === 'string' ? parseFloat(val) : val
  ),
  notes: z.string().optional(),
  tags: z.array(z.string()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});