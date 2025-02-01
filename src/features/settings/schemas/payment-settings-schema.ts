import { z } from "zod";

export const BankAccountSchema = z.object({
  id: z.string(),
  bankName: z.string().min(1, "Bank name is required"),
  accountName: z.string().min(1, "Account name is required"),
  accountNumber: z
    .string()
    .min(10, "Account number must be at least 10 digits"),
  branch: z.string().optional(),
  isDefault: z.boolean(),
});

export const PaymentSettingsSchema = z
  .object({
    // PromptPay Settings
    promptpayEnabled: z.boolean(),
    promptpayQrCode: z.string().nullable(),
    promptpayId: z.string().nullable(),
    promptpayName: z.string().nullable(),

    // Bank Transfer Settings
    bankTransferEnabled: z.boolean(),
    bankAccounts: z.array(BankAccountSchema),

    // Notifications
    notifyEmail: z.boolean(),
  })
  .refine(
    (data) => {
      if (
        data.promptpayEnabled &&
        (!data.promptpayId || data.promptpayId == "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "PromptPay ID is required when PromptPay is enabled",
      path: ["promptpayId"],
    },
  )
  .refine(
    (data) => {
      if (
        data.promptpayEnabled &&
        (!data.promptpayName || data.promptpayName == "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "PromptPay name is required when PromptPay is enabled",
      path: ["promptpayName"],
    },
  )
  .refine(
    (data) => {
      if (data.bankTransferEnabled && data.bankAccounts.length === 0) {
        return false;
      }
      return true;
    },
    {
      message:
        "At least one bank account is required when bank transfer is enabled",
      path: ["bankAccounts"],
    },
  );

export type PaymentSettings = z.infer<typeof PaymentSettingsSchema>;
export type BankAccount = z.infer<typeof BankAccountSchema>;
