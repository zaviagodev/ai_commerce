import { z } from "zod";

// Schema for condition operators
const ConditionOperatorSchema = z.enum([
  "greater_than",
  "less_than",
  "equal_to",
]);

// Schema for condition types
const ConditionTypeSchema = z.enum([
  "cart_total",
  "item_count",
  "shipping_country",
  "customer_group",
  "first_purchase",
  "total_spent",
  "product_quantity",
  "category",
  "tag",
]);

// Schema for individual conditions
const ConditionSchema = z.object({
  id: z.string(),
  type: ConditionTypeSchema,
  operator: ConditionOperatorSchema,
  value: z.string(),
  enabled: z.boolean(),
});

// Schema for group operators
const GroupOperatorSchema = z.object({
  id: z.string(),
  type: z.literal("group_operator"),
  operator: z.enum(["AND", "OR"]),
});

// Schema for condition groups
const GroupSchema = z.object({
  id: z.string(),
  type: z.literal("group"),
  match: z.enum(["all", "any"]),
  conditions: z.array(ConditionSchema),
});

// Combined schema for rule elements (groups or operators)
const RuleElementSchema = z.discriminatedUnion("type", [
  GroupSchema,
  GroupOperatorSchema,
]);

// Main coupon schema
export const CouponSchema = z
  .object({
    id: z.string().optional(),
    code: z
      .string()
      .min(1, "Coupon code is required")
      .max(50, "Coupon code cannot exceed 50 characters")
      .regex(
        /^[A-Z0-9_-]+$/,
        "Coupon code can only contain uppercase letters, numbers, underscores, and hyphens",
      ),
    description: z.string().optional(),
    type: z.enum(["percentage", "fixed", "shipping", "points"]),
    value: z
      .number()
      .min(0, "Value must be greater than or equal to 0")
      .refine(
        (val) => {
          return true;
        },
        {
          message: "Invalid value for selected type",
          path: ["value"],
        },
      ),
    minPurchaseAmount: z.number().min(0).optional(),
    maxDiscountAmount: z.number().min(0).optional(),
    maxPointsEarned: z.number().min(0).optional(),
    pointsValidity: z.number().min(1).optional(),
    usageLimit: z.number().min(1).optional(),
    usageCount: z.number().min(0).optional(),
    startDate: z.date(),
    endDate: z.date(),
    status: z.enum(["draft", "scheduled", "active", "expired"]),
    advancedMode: z.boolean(),
    conditions: z.array(RuleElementSchema).optional(),
  })
  .refine(
    (data) => {
      // Validate percentage value is between 0 and 100
      if (data.type === "percentage" && (data.value < 0 || data.value > 100)) {
        return false;
      }
      // Validate dates
      if (data.endDate <= data.startDate) {
        return false;
      }
      // Validate max discount for percentage type
      if (
        data.type === "percentage" &&
        data.maxDiscountAmount !== undefined &&
        data.maxDiscountAmount <= 0
      ) {
        return false;
      }
      // Validate points fields
      if (data.type === "points") {
        if (data.maxPointsEarned !== undefined && data.maxPointsEarned <= 0) {
          return false;
        }
        if (data.pointsValidity !== undefined && data.pointsValidity <= 0) {
          return false;
        }
      }
      return true;
    },
    {
      message: "Invalid coupon configuration",
      path: ["value"],
    },
  );

export type Coupon = z.infer<typeof CouponSchema>;
