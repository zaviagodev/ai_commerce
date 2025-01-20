import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Layers, Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { VariantBuilder } from './variant-builder';

interface VariationsProps {
  form: UseFormReturn<Product>;
  isEventProduct?: boolean
}

export function Variations({ form, isEventProduct }: VariationsProps) {
  const variantOptions = form.watch('variantOptions') || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
          <Layers className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">{isEventProduct ? 'Time Slots' : 'Product Variations'}</h2>
          <p className="text-sm text-muted-foreground">
            Configure {isEventProduct ? 'time slots' : 'product variants'} and options
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="variantOptions"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Enable {isEventProduct ? 'Time Slots' : 'Product Variations'}</FormLabel>
                <FormDescription>
                  Create multiple {isEventProduct ? 'slots' : 'variants'} of this {isEventProduct ? 'event' : 'product'} with different options
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value?.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      // Initialize with empty variant options array
                      field.onChange([{
                        id: crypto.randomUUID(),
                        name: '',
                        values: [],
                        position: 0,
                      }]);
                    } else {
                      // Clear variant options
                      field.onChange([]);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {variantOptions.length > 0 && (
          <div className="space-y-4">
            <VariantBuilder form={form} isEventProduct={isEventProduct}/>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
