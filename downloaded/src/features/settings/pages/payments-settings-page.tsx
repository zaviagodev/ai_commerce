import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { PaymentSettingsSchema } from '../schemas/payment-settings-schema';
import { ThaiPaymentMethods } from '../components/payments/thai-payment-methods';
import { PaymentGateways } from '../components/payments/payment-gateways';
import { PaymentNotifications } from '../components/payments/payment-notifications';

export function PaymentSettingsPage() {
  const form = useForm({
    resolver: zodResolver(PaymentSettingsSchema),
    defaultValues: {
      promptpayEnabled: false,
      promptpayQrCode: '',
      promptpayId: '',
      promptpayName: '',
      bankTransferEnabled: false,
      bankAccounts: [],
      omiseEnabled: false,
      omisePublicKey: '',
      omiseSecretKey: '',
      notifyEmail: '',
      notifyLine: false,
      lineNotifyToken: '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log('Saving payment settings:', data);
    // TODO: Implement settings save
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Payment Settings</h2>
            <p className="text-sm text-muted-foreground">
              Configure your store's payment methods and gateways
            </p>
          </div>
          <Button type="submit">Save changes</Button>
        </div>

        <div className="grid gap-6">
          <ThaiPaymentMethods form={form} />
          <PaymentGateways form={form} />
          <PaymentNotifications form={form} />
        </div>
      </form>
    </Form>
  );
}