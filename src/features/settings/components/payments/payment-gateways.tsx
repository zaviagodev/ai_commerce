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
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { PaymentSettings } from "../../schemas/payment-settings-schema";
import { useTranslation } from "@/lib/i18n/hooks";

interface PaymentGatewaysProps {
  form: UseFormReturn<PaymentSettings>;
}

export function PaymentGateways({ form }: PaymentGatewaysProps) {
  const t = useTranslation();
  const omiseEnabled = form.watch("omiseEnabled");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
          <CreditCard className="h-5 w-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {t.settings.payments.gateways.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t.settings.payments.gateways.subtitle}
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
                <FormLabel>
                  {t.settings.payments.gateways.omise.enable.label}
                </FormLabel>
                <FormDescription>
                  {t.settings.payments.gateways.omise.enable.description}
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
                  <FormLabel>
                    {t.settings.payments.gateways.omise.publicKey.label}
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    {t.settings.payments.gateways.omise.publicKey.description}
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
                  <FormLabel>
                    {t.settings.payments.gateways.omise.secretKey.label}
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    {t.settings.payments.gateways.omise.secretKey.description}
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
