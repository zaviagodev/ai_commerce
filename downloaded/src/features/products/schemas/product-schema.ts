import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  variantOptions: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      values: z.array(z.string()),
      position: z.number(),
    })
  ).default([]),
  variants: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      sku: z.string(),
      price: z.number().min(0, 'Price must be greater than or equal to 0'),
      compareAtPrice: z.number().optional(),
      quantity: z.number().optional(),
      stockStatus: z.enum(['in_stock', 'out_of_stock', 'low_stock']).optional(),
      lowStockThreshold: z.number().optional(),
      options: z.array(
        z.object({
          name: z.string(),
          value: z.string(),
        })
      ),
      status: z.enum(['active', 'inactive']),
      position: z.number(),
    })
  ).default([]),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      alt: z.string(),
      position: z.number(),
    })
  ).default([]),
  category: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }).optional(),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  compareAtPrice: z.number().optional(),
  cost: z.number().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  trackQuantity: z.boolean(),
  quantity: z.number().nullish(),
  weight: z.number().min(0, 'Weight must be greater than or equal to 0'),
  weightUnit: z.enum(['kg', 'lb']),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ).default([]),
  status: z.enum(['draft', 'active', 'archived']),
}).refine((data) => {
  // Only require quantity if trackQuantity is true and no variants are defined
  if (data.trackQuantity && data.variantOptions.length === 0 && (data.quantity === null || data.quantity === undefined)) {
    return false;
  }
  return true;
}, {
  message: 'Quantity is required when tracking inventory',
  path: ['quantity'],
});
