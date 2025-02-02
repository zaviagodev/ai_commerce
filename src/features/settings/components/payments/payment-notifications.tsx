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
import { Bell } from "lucide-react";
import { PaymentSettings } from "../../schemas/payment-settings-schema";
import { useTranslation } from "@/lib/i18n/hooks";

interface PaymentNotificationsProps {
  form: UseFormReturn<PaymentSettings>;
}

export function PaymentNotifications({ form }: PaymentNotificationsProps) {
  const t = useTranslation();
  const notifyLine = form.watch("notifyLine");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
          <Bell className="h-5 w-5 text-orange-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {t.settings.payments.notifications.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t.settings.payments.notifications.subtitle}
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="notifyEmail"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>
                  {t.settings.payments.notifications.email.label}
                </FormLabel>
                <FormDescription>
                  {t.settings.payments.notifications.email.description}
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                {/* This field was firstly set as string input */}
                {/* <Input 
                  type="email" 
                  placeholder={t.settings.payments.notifications.email.placeholder}
                  {...field} 
                /> */}
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="notifyLine"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>{t.settings.payments.notifications.line.label}</FormLabel>
                <FormDescription>
                  {t.settings.payments.notifications.line.description}
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

        {notifyLine && (
          <FormField
            control={form.control}
            name="lineNotifyToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.settings.payments.notifications.line.token.label}</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>
                  {t.settings.payments.notifications.line.token.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )} */}
      </CardContent>
    </Card>
  );
}
