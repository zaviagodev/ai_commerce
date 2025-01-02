import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Store } from 'lucide-react';
import { EcommerceSettings } from '../../schemas/ecommerce-settings-schema';

interface GeneralSettingsProps {
  form: UseFormReturn<EcommerceSettings>;
}

export function GeneralSettings({ form }: GeneralSettingsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Store className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">General Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure basic store settings
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="weightUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight Unit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weight unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="lb">Pounds (lb)</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dimensionUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dimension Unit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dimension unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cm">Centimeters (cm)</SelectItem>
                    <SelectItem value="in">Inches (in)</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="orderPrefix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Number Prefix</FormLabel>
              <FormControl>
                <Input placeholder="#" {...field} />
              </FormControl>
              <FormDescription>
                This prefix will be added to all order numbers
              </FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}