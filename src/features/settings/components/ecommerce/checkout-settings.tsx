import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { EcommerceSettings } from '../../schemas/ecommerce-settings-schema';

interface CheckoutSettingsProps {
  form: UseFormReturn<EcommerceSettings>;
}

export function CheckoutSettings({ form }: CheckoutSettingsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <CreditCard className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Checkout Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure checkout process settings
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="guestCheckout"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Guest Checkout</FormLabel>
                <FormDescription>
                  Allow customers to check out without creating an account
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

        <FormField
          control={form.control}
          name="requirePhone"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Require Phone Number</FormLabel>
                <FormDescription>
                  Make phone number mandatory during checkout
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

        <FormField
          control={form.control}
          name="requireShipping"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Require Shipping Address</FormLabel>
                <FormDescription>
                  Make shipping address mandatory for all orders
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

        <FormField
          control={form.control}
          name="requireBilling"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Require Billing Address</FormLabel>
                <FormDescription>
                  Make billing address mandatory for all orders
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
      </CardContent>
    </Card>
  );
}