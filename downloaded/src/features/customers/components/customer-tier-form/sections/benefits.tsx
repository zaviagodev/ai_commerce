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
import { CustomerTier } from '@/types/customer';

interface BenefitsProps {
  form: UseFormReturn<CustomerTier>;
}

export function Benefits({ form }: BenefitsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="rewardsMultiplier"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rewards multiplier</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  step="0.1"
                  placeholder="1.5"
                  className="pr-8"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  x
                </span>
              </div>
            </FormControl>
            <FormDescription>
              Multiply points earned from purchases (e.g., 1.5x, 2x)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="discountPercentage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount percentage</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  placeholder="0"
                  className="pr-8"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
            </FormControl>
            <FormDescription>
              Percentage discount on all purchases
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="freeShipping"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>Free shipping</FormLabel>
              <FormDescription>
                Offer free shipping on all orders
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
        name="prioritySupport"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>Priority support</FormLabel>
              <FormDescription>
                Access to priority customer support
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
        name="earlyAccess"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>Early access</FormLabel>
              <FormDescription>
                Early access to new products and sales
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
    </div>
  );
}