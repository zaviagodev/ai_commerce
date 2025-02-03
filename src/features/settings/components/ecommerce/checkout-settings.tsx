import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { EcommerceSettings } from "../../schemas/ecommerce-settings-schema";
import { useTranslation } from "@/lib/i18n/hooks";

interface CheckoutSettingsProps {
  form: UseFormReturn<EcommerceSettings>;
}

export function CheckoutSettings({ form }: CheckoutSettingsProps) {
  const t = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <CreditCard className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {t.settings.ecommerce.checkout.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.settings.ecommerce.checkout.subtitle}
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
                <FormLabel>
                  {t.settings.ecommerce.checkout.guestCheckout.label}
                </FormLabel>
                <FormDescription>
                  {t.settings.ecommerce.checkout.guestCheckout.description}
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
                <FormLabel>
                  {t.settings.ecommerce.checkout.requirePhone.label}
                </FormLabel>
                <FormDescription>
                  {t.settings.ecommerce.checkout.requirePhone.description}
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
                <FormLabel>
                  {t.settings.ecommerce.checkout.requireShipping.label}
                </FormLabel>
                <FormDescription>
                  {t.settings.ecommerce.checkout.requireShipping.description}
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
                <FormLabel>
                  {t.settings.ecommerce.checkout.requireBilling.label}
                </FormLabel>
                <FormDescription>
                  {t.settings.ecommerce.checkout.requireBilling.description}
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
