import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import { EcommerceSettings } from '../../schemas/ecommerce-settings-schema';

interface TaxSettingsProps {
  form: UseFormReturn<EcommerceSettings>;
}

export function TaxSettings({ form }: TaxSettingsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Tax Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure tax calculation settings
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="taxCalculation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Calculation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select calculation method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="line_items">Per Line Item</SelectItem>
                  <SelectItem value="total">On Order Total</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                How tax should be calculated for orders
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxInclusive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Tax Inclusive Pricing</FormLabel>
                <FormDescription>
                  Display prices with tax included
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
          name="defaultTaxRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Tax Rate (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Default tax rate to apply when no specific rate is set
              </FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}