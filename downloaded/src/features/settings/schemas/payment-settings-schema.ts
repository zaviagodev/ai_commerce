import { z } from 'zod';

export const BankAccountSchema = z.object({
  id: z.string(),
  bankName: z.string().min(1, 'Bank name is required'),
  accountName: z.string().min(1, 'Account name is required'),
  accountNumber: z.string().min(10, 'Account number must be at least 10 digits'),
  branch: z.string().optional(),
  isDefault: z.boolean(),
});

export const PaymentSettingsSchema = z.object({
  // PromptPay Settings
  promptpayEnabled: z.boolean(),
  promptpayQrCode: z.string().optional(),
  promptpayId: z.string().optional(),
  promptpayName: z.string().optional(),

  // Bank Transfer Settings
  bankTransferEnabled: z.boolean(),
  bankAccounts: z.array(BankAccountSchema),

  // Omise Integration
  omiseEnabled: z.boolean(),
  omisePublicKey: z.string().optional(),
  omiseSecretKey: z.string().optional(),

  // Notifications
  notifyEmail: z.string().email().optional(),
  notifyLine: z.boolean(),
  lineNotifyToken: z.string().optional(),
});

export type PaymentSettings = z.infer<typeof PaymentSettingsSchema>;
export type BankAccount = z.infer<typeof BankAccountSchema>;