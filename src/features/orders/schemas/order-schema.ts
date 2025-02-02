import { z } from "zod";

import { CustomerAddress } from "@/types/customer";

// Schema for variant options
const VariantOptionSchema = z.object({
  name: z.string(),
  value: z.string(),
});

// Schema for variant
const VariantSchema = z.object({
  name: z.string(),
  options: z.array(VariantOptionSchema),
});

const OrderCouponSchema = z.object({
  code: z.string(),
  type: z.enum(["percentage", "fixed", "shipping", "points"]),
  value: z.number(),
  discount: z.number(),
});

const OrderItemSchema = z.object({
  id: z.string(),
  variantId: z.string(),
  name: z.string(),
  variant: VariantSchema.optional(),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  total: z.number().min(0, "Total must be greater than or equal to 0"),
});

export const OrderSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().min(1, "Customer is required"),
  customerName: z.string().optional(),
  customerEmail: z.string().optional(),
  customerPhone: z.string().optional(),
  shippingAddress: z
    .object({
      id: z.string(),
      type: z.enum(["billing", "shipping"]),
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
    })
    .optional(),
  status: z.enum([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
  items: z.array(OrderItemSchema).min(1, "At least one item is required"),
  subtotal: z
    .number()
    .min(0)
    .or(z.string())
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val)),
  discount: z
    .number()
    .min(0)
    .or(z.string())
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val)),
  shipping: z
    .number()
    .min(0)
    .or(z.string())
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val)),
  tax: z
    .number()
    .min(0)
    .or(z.string())
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val)),
  total: z
    .number()
    .min(0)
    .or(z.string())
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val)),
  notes: z.string().optional(),
  tags: z.array(z.string()),
  appliedCoupons: z.array(OrderCouponSchema).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  loyalty_points_used: z.number().default(0),
  payment_details: z
    .object({
      type: z.string(),
      bank_name: z.string().optional(),
      slip_image: z.string().optional(),
      confirmed_at: z.string().optional(),
    })
    .optional(),
  shipping_details: z
    .object({
      courier: z.string(),
      tracking_number: z.string(),
      shipped_at: z.string(),
    })
    .optional(),
});
