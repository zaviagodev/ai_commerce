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
import { useTranslation } from '@/lib/i18n/hooks';

interface BenefitsProps {
  form: UseFormReturn<CustomerTier>;
}

export function Benefits({ form }: BenefitsProps) {
  const t = useTranslation();

  return (
    <div className="grid gap-6">
      <FormField
        control={form.control}
        name="rewardsMultiplier"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{ t.customers.customer.tier.sections.benefits.fields.rewardsMultiplier.label}</FormLabel>
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
              { t.customers.customer.tier.sections.benefits.fields.rewardsMultiplier.description}
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
            <FormLabel>{ t.customers.customer.tier.sections.benefits.fields.discountPercentage.label}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="number"
                  placeholder={ t.customers.customer.tier.sections.benefits.fields.discountPercentage.placeholder}
                  className="pr-8"
                  {...field}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
            </FormControl>
            <FormDescription>
              { t.customers.customer.tier.sections.benefits.fields.discountPercentage.description}
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
              <FormLabel>{ t.customers.customer.tier.sections.benefits.fields.freeShipping.label}</FormLabel>
              <FormDescription>
                { t.customers.customer.tier.sections.benefits.fields.freeShipping.description}
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
              <FormLabel>{ t.customers.customer.tier.sections.benefits.fields.prioritySupport.label}</FormLabel>
              <FormDescription>
                { t.customers.customer.tier.sections.benefits.fields.prioritySupport.description}
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
              <FormLabel>{ t.customers.customer.tier.sections.benefits.fields.earlyAccess.label}</FormLabel>
              <FormDescription>
                { t.customers.customer.tier.sections.benefits.fields.earlyAccess.description}
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