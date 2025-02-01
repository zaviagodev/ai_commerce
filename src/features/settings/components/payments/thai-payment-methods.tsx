import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { QrCode, Plus, X, Wallet, Loader2 } from "lucide-react";
import {
  PaymentSettings,
  BankAccount,
} from "../../schemas/payment-settings-schema";
import { BankAccountDialog } from "./bank-account-dialog";
import { useTranslation } from "@/lib/i18n/hooks";
import { useBanks } from "../../hooks/use-banks";
import { StorageService } from "../../services/storage-service";
import { useAuthStore } from "@/lib/auth/auth-store";
import { useToast } from "@/hooks/use-toast";

interface ThaiPaymentMethodsProps {
  form: UseFormReturn<PaymentSettings>;
}

export function ThaiPaymentMethods({ form }: ThaiPaymentMethodsProps) {
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [isUploadingQr, setIsUploadingQr] = useState(false);
  const t = useTranslation();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { data: banks } = useBanks();
  const promptpayEnabled = form.watch("promptpayEnabled");
  const bankTransferEnabled = form.watch("bankTransferEnabled");
  const bankAccounts = form.watch("bankAccounts") || [];
  const qrCodeUrl = form.watch("promptpayQrCode") || "";

  const handleAddBank = (account: BankAccount) => {
    form.setValue("bankAccounts", [...bankAccounts, account]);
    setIsAddingBank(false);
  };

  const handleRemoveBank = (id: string) => {
    form.setValue(
      "bankAccounts",
      bankAccounts.filter((account) => account.id !== id),
    );
  };

  const handleQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.storeName) return;

    try {
      setIsUploadingQr(true);
      // Delete existing QR code if there is one
      if (qrCodeUrl) {
        await StorageService.deleteQrCode(qrCodeUrl);
      }

      const publicUrl = await StorageService.uploadQrCode(file, user.storeName);
      form.setValue("promptpayQrCode", publicUrl);
      toast({
        title: t.settings.payments.promptpay.qrCode.uploadSuccess,
        description:
          t.settings.payments.promptpay.qrCode.uploadSuccessDescription,
      });
    } catch (error) {
      console.error("Error uploading QR code:", error);
      toast({
        title: t.settings.payments.promptpay.qrCode.uploadError,
        description:
          t.settings.payments.promptpay.qrCode.uploadErrorDescription,
        variant: "destructive",
      });
    } finally {
      setIsUploadingQr(false);
    }
  };

  const handleRemoveQr = async () => {
    if (!qrCodeUrl) return;

    try {
      setIsUploadingQr(true);
      await StorageService.deleteQrCode(qrCodeUrl);
      form.setValue("promptpayQrCode", "");
      toast({
        title: t.settings.payments.promptpay.qrCode.deleteSuccess,
        description:
          t.settings.payments.promptpay.qrCode.deleteSuccessDescription,
      });
    } catch (error) {
      console.error("Error deleting QR code:", error);
      toast({
        title: t.settings.payments.promptpay.qrCode.deleteError,
        description:
          t.settings.payments.promptpay.qrCode.deleteErrorDescription,
        variant: "destructive",
      });
    } finally {
      setIsUploadingQr(false);
    }
  };

  return (
    <>
      {/* PromptPay Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <QrCode className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium">
              {t.settings.payments.promptpay.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.settings.payments.promptpay.subtitle}
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <FormField
            control={form.control}
            name="promptpayEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>
                    {t.settings.payments.promptpay.enable.label}
                  </FormLabel>
                  <FormDescription>
                    {t.settings.payments.promptpay.enable.description}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {promptpayEnabled && (
            <>
              <FormField
                control={form.control}
                name="promptpayId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t.settings.payments.promptpay.id.label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          t.settings.payments.promptpay.id.placeholder
                        }
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      {t.settings.payments.promptpay.id.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="promptpayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t.settings.payments.promptpay.accountName.label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          t.settings.payments.promptpay.accountName.placeholder
                        }
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="promptpayQrCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t.settings.payments.promptpay.qrCode.label}
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {field.value ? (
                          <div className="relative w-48">
                            <img
                              src={field.value}
                              alt="PromptPay QR Code"
                              className="rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-2"
                              onClick={handleRemoveQr}
                              disabled={isUploadingQr}
                            >
                              {isUploadingQr ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <X className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleQrUpload}
                              className="w-auto"
                              disabled={isUploadingQr}
                            />
                            {isUploadingQr && (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      {t.settings.payments.promptpay.qrCode.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Bank Transfer Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
            <Wallet className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium">
              {t.settings.payments.bankTransfer.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.settings.payments.bankTransfer.subtitle}
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <FormField
            control={form.control}
            name="bankTransferEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>
                    {t.settings.payments.bankTransfer.enable.label}
                  </FormLabel>
                  <FormDescription>
                    {t.settings.payments.bankTransfer.enable.description}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {bankTransferEnabled && (
            <div className="space-y-4">
              {bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{account.bankName}</p>
                    <p className="text-sm text-muted-foreground">
                      {account.accountNumber} • {account.accountName}
                    </p>
                    {account.branch && (
                      <p className="text-sm text-muted-foreground">
                        {t.settings.payments.bankTransfer.accountDetails.branch}
                        : {account.branch}
                      </p>
                    )}
                    {account.isDefault && (
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        {
                          t.settings.payments.bankTransfer.accountDetails
                            .defaultAccount
                        }
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveBank(account.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setIsAddingBank(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                {t.settings.payments.bankTransfer.addAccount}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <BankAccountDialog
        open={isAddingBank}
        onOpenChange={setIsAddingBank}
        onSubmit={handleAddBank}
        banks={banks || []}
      />
    </>
  );
}
