import { z } from "zod";

export const ProductVariantSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  sku: z.string(),
  price: z.number(),
  compareAtPrice: z.number().optional(),
  pointsBasedPrice: z.number().optional(),
  quantity: z.number().optional(),
  options: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),
  status: z.enum(["active", "inactive"]),
  position: z.number(),
});

// Base schema without refinements
const BaseProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  variantOptions: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        values: z.array(z.string()),
        position: z.number(),
      }),
    )
    .default([]),
  variants: z.array(ProductVariantSchema).default([]),
  images: z
    .array(
      z.object({
        id: z.string(),
        url: z.string(),
        alt: z.string(),
        position: z.number(),
        path: z.string().optional(),
      }),
    )
    .default([]),
  category: z
    .object({
      id: z.string().optional(),
      name: z.string(),
      slug: z.string(),
      description: z.string().optional(),
    })
    .optional(),
  price: z.number(),
  compareAtPrice: z.number().optional(),
  cost: z.number().optional(),
  pointsBasedPrice: z.number().optional(),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().optional(),
  trackQuantity: z.boolean(),
  quantity: z.number().optional(),
  weight: z.number(),
  weightUnit: z.enum(["kg", "lb"]),
  width: z.number(),
  length: z.number(),
  height: z.number(),
  dimensionUnit: z.enum(["cm", "in"]),
  tags: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .default([]),
  status: z.enum(["draft", "active", "archived"]),
  isReward: z.boolean().optional(),
  isGiftCard: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const EventProductSchema = z.object({
  startDateTime: z.date().optional(),
  endDateTime: z.date().optional(),
  gateOpeningDateTime: z.date().optional(),
  gateClosingDateTime: z.date().optional(),
  venueName: z.string().optional(),
  venueAddress: z.string().optional(),
  organizerName: z.string().optional(),
  organizerContact: z.string().optional(),
});

// Schema for creating/updating products
export const ProductSchema = BaseProductSchema.refine(
  (data) => {
    // Only require quantity if trackQuantity is true and no variants are defined
    if (
      data.trackQuantity &&
      data.variantOptions.length === 0 &&
      data.quantity === undefined
    ) {
      return false;
    }
    if (data.trackQuantity && data.variantOptions.length > 0) {
      if (
        data.variants.findIndex((variant) => variant.quantity === undefined) !==
        -1
      ) {
        return false;
      }
    }
    return true;
  },
  {
    message: "Quantity is required when tracking inventory",
    path: ["quantity"],
  },
);

// Schema for product responses from the API
export const ProductResponseSchema = BaseProductSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).refine(
  (data) => {
    // Only require quantity if trackQuantity is true and no variants are defined
    if (
      data.trackQuantity &&
      data.variantOptions.length === 0 &&
      data.quantity === undefined
    ) {
      return false;
    }
    return true;
  },
  {
    message: "Quantity is required when tracking inventory",
    path: ["quantity"],
  },
);
