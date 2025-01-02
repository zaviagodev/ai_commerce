import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { PaymentSettings } from '../../schemas/payment-settings-schema';

interface PaymentGatewaysProps {
  form: UseFormReturn<PaymentSettings>;
}

export function PaymentGateways({ form }: PaymentGatewaysProps) {
  const omiseEnabled = form.watch('omiseEnabled');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
          <CreditCard className="h-5 w-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium">Payment Gateways</h3>
          <p className="text-sm text-muted-foreground">
            Configure payment gateway integrations
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="omiseEnabled"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Enable Omise</FormLabel>
                <FormDescription>
                  Accept credit card payments via Omise
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

        {omiseEnabled && (
          <>
            <FormField
              control={form.control}
              name="omisePublicKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Public Key</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your Omise public key (starts with pkey_)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="omiseSecretKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secret Key</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your Omise secret key (starts with skey_)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}