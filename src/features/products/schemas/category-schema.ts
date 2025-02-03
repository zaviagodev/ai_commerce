import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  slug: z
    .string()
    // .min(1, "URL slug is required")
    // .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid URL slug format"),
});
