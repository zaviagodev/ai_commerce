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
import { Bell } from 'lucide-react';
import { PaymentSettings } from '../../schemas/payment-settings-schema';

interface PaymentNotificationsProps {
  form: UseFormReturn<PaymentSettings>;
}

export function PaymentNotifications({ form }: PaymentNotificationsProps) {
  const notifyLine = form.watch('notifyLine');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
          <Bell className="h-5 w-5 text-orange-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium">Payment Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Configure payment notification settings
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
                <FormLabel>Email Notifications</FormLabel>
                <FormDescription>
                  Receive payment notifications via email
                </FormDescription>
              </div>
              <FormControl>
                {/* This field was firstly set as string input */}
                {/* <Input 
                  type="email" 
                  placeholder="notifications@example.com" 
                  {...field} 
                /> */}
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notifyLine"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>LINE Notifications</FormLabel>
                <FormDescription>
                  Receive payment notifications via LINE
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
                <FormLabel>LINE Notify Token</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>
                  Your LINE Notify access token
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}