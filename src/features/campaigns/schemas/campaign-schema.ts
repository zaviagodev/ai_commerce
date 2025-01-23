import { z } from "zod";

export const CampaignSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, "Campaign name is required"),
    description: z.string().optional(),
    hasProductRules: z.boolean().default(false),
    hasConditions: z.boolean().default(false),
    type: z.enum(["points_multiplier", "bonus_points"]),
    multiplier: z
      .number()
      .min(1, "Multiplier must be at least 1")
      .nullable()
      .optional(),
    bonusPoints: z
      .number()
      .min(1, "Bonus points must be at least 1")
      .nullable()
      .optional(),
    startDate: z.date(),
    endDate: z.date(),
    targetType: z.enum(["all", "tier", "group"]),
    targetTiers: z.array(z.string()).optional(),
    targetGroups: z.array(z.string()).optional(),
    status: z.enum(["draft", "scheduled", "active", "ended"]),
    qrEnabled: z.boolean().default(false),
    qrPointType: z.enum(["fixed", "multiplier"]).optional(),
    qrPointValue: z.number().min(1).optional(),
    qrScanLimit: z.number().min(1).optional(),
    qrTotalScans: z.number().min(1).optional(),
    clickLinkEnabled: z.boolean().default(false),
    clickLinkLimit: z.number().min(1, "Limit must be at least 1").optional(),
  })
  .refine(
    (data) => {
      if (data.type === "points_multiplier" && !data.multiplier) {
        return false;
      }
      if (data.type === "bonus_points" && !data.bonusPoints) {
        return false;
      }
      return true;
    },
    {
      message: "Multiplier or bonus points required based on campaign type",
      path: ["type"],
    },
  );
