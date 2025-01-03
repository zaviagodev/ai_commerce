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
import { Package } from 'lucide-react';
import { EcommerceSettings } from '../../schemas/ecommerce-settings-schema';

interface InventorySettingsProps {
  form: UseFormReturn<EcommerceSettings>;
}

export function InventorySettings({ form }: InventorySettingsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Package className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Inventory Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure inventory management settings
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="trackInventory"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Track Inventory</FormLabel>
                <FormDescription>
                  Enable inventory tracking for products
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
          name="lowStockThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Low Stock Threshold</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Get notified when product stock falls below this number
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="outOfStockBehavior"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Out of Stock Behavior</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select behavior" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hide">Hide product</SelectItem>
                  <SelectItem value="show">Show as out of stock</SelectItem>
                  <SelectItem value="backorder">Allow backorders</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                How to handle products when they are out of stock
              </FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}