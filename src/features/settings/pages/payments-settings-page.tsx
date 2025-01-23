import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PaymentSettingsSchema } from "../schemas/payment-settings-schema";
import { ThaiPaymentMethods } from "../components/payments/thai-payment-methods";
import { PaymentGateways } from "../components/payments/payment-gateways";
import { PaymentNotifications } from "../components/payments/payment-notifications";
import { useTranslation } from "@/lib/i18n/hooks";

export function PaymentSettingsPage() {
  const t = useTranslation();
  const form = useForm({
    resolver: zodResolver(PaymentSettingsSchema),
    defaultValues: {
      promptpayEnabled: false,
      promptpayQrCode: "",
      promptpayId: "",
      promptpayName: "",
      bankTransferEnabled: false,
      bankAccounts: [],
      omiseEnabled: false,
      omisePublicKey: "",
      omiseSecretKey: "",
      notifyEmail: "",
      notifyLine: false,
      lineNotifyToken: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Saving payment settings:", data);
    // TODO: Implement settings save
  };

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
          <Button type="submit">{t.settings.settings.save}</Button>
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
