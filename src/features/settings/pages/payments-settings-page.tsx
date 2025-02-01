import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PaymentSettingsSchema } from "../schemas/payment-settings-schema";
import { ThaiPaymentMethods } from "../components/payments/thai-payment-methods";
import { PaymentGateways } from "../components/payments/payment-gateways";
import { PaymentNotifications } from "../components/payments/payment-notifications";
import { useTranslation } from "@/lib/i18n/hooks";
import { usePaymentSettings } from "../hooks/use-payment-settings";
import { useToast } from "@/hooks/use-toast";

export function PaymentSettingsPage() {
  const t = useTranslation();
  const { toast } = useToast();
  const { paymentSettings, isLoading, updatePaymentSettings, isUpdating } =
    usePaymentSettings();

  const form = useForm({
    resolver: zodResolver(PaymentSettingsSchema),
    defaultValues: {
      promptpayEnabled: paymentSettings?.promptpayEnabled || false,
      promptpayQrCode: paymentSettings?.promptpayQrCode || "",
      promptpayId: paymentSettings?.promptpayId || "",
      promptpayName: paymentSettings?.promptpayName || "",
      bankTransferEnabled: paymentSettings?.bankTransferEnabled || false,
      bankAccounts: paymentSettings?.bankAccounts || [],
      notifyEmail: paymentSettings?.notifyEmail || false,
    },
    values: paymentSettings || undefined,
  });

  const onSubmit = async (data: any) => {
    try {
      await updatePaymentSettings(data);
      toast({
        title: t.settings.settings.saveSuccess,
        description: t.settings.settings.saveSuccessDescription,
      });
    } catch (error) {
      console.error("Error saving payment settings:", error);
      toast({
        title: t.settings.settings.saveError,
        description: t.settings.settings.saveErrorDescription,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">{t.settings.payments.title}</h2>
            <p className="text-sm text-muted-foreground">
              {t.settings.payments.subtitle}
            </p>
          </div>
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? t.settings.settings.saving : t.settings.settings.save}
          </Button>
        </div>

        <div className="grid gap-6">
          <ThaiPaymentMethods form={form} />
          {/* <PaymentGateways form={form} /> */}
          <PaymentNotifications form={form} />
        </div>
      </form>
    </Form>
  );
}
