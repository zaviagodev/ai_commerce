import { z } from "zod";

// Condition operator validation
const ConditionOperatorSchema = z.enum([
  "greater_than",
  "less_than",
  "equal_to",
]);

// Condition type validation
const ConditionTypeSchema = z.enum([
  "total_spent",
  "order_count",
  "last_order",
  "location",
]);

// Base condition schema
const BaseConditionSchema = z.object({
  id: z.string(),
  type: ConditionTypeSchema,
  operator: ConditionOperatorSchema,
  enabled: z.boolean(),
});

// Type-specific condition schemas
const TotalSpentConditionSchema = BaseConditionSchema.extend({
  type: z.literal("total_spent"),
  value: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: "Total spent must be a non-negative number",
    }),
});

const OrderCountConditionSchema = BaseConditionSchema.extend({
  type: z.literal("order_count"),
  value: z
    .string()
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
      message: "Order count must be a non-negative integer",
    }),
});

const LastOrderConditionSchema = BaseConditionSchema.extend({
  type: z.literal("last_order"),
  operator: z.enum(["greater_than", "less_than"]),
  value: z
    .string()
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
      message: "Last order days must be a non-negative integer",
    }),
});

const LocationConditionSchema = BaseConditionSchema.extend({
  type: z.literal("location"),
  operator: z.literal("equal_to"),
  value: z.string().min(1, "Location cannot be empty"),
});

// Combined condition schema
const ConditionSchema = z.discriminatedUnion("type", [
  TotalSpentConditionSchema,
  OrderCountConditionSchema,
  LastOrderConditionSchema,
  LocationConditionSchema,
]);

// Customer group schema
export const CustomerGroupSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
  autoAssign: z.boolean(),
  conditions: z.array(ConditionSchema),
  members: z.array(z.string()),
  status: z.enum(["active", "inactive"]),
});

export type CustomerGroupCondition = z.infer<typeof ConditionSchema>;
export type CustomerGroup = z.infer<typeof CustomerGroupSchema>;
