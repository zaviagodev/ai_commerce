import { z } from "zod";

const thaiPhoneRegex = /^0\d{9}$/;

export const CustomerAddressSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["billing", "shipping"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z
    .string()
    .regex(
      thaiPhoneRegex,
      "Invalid phone number format. Must be a 10-digit Thai number starting with 0",
    )
    .optional(),
  isDefault: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CustomerSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(
      thaiPhoneRegex,
      "Invalid phone number format. Must be a 10-digit Thai number starting with 0",
    )
    .optional(),
  isVerified: z.boolean(),
  acceptsMarketing: z.boolean(),
  tags: z.array(z.string()),
  addresses: z.array(CustomerAddressSchema),
  tierId: z.string().optional(),
  loyaltyPoints: z
    .number()
    .min(0, "Loyalty points must be non-negative")
    .default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});
