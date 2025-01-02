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
import { useEffect } from 'react';

interface VariationsProps {
  form: UseFormReturn<Product>;
}

export function Variations({ form }: VariationsProps) {
  const variantOptions = form.watch('variantOptions') || [];
  const variants = form.watch('variants') || [];

  // Derive hasVariants from whether there are variant options
  const hasVariants = variantOptions.length > 0;

  // Update form value when hasVariants changes
  useEffect(() => {
    form.setValue('hasVariants', hasVariants);
  }, [hasVariants, form]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
          <Layers className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">Product Variations</h2>
          <p className="text-sm text-muted-foreground">
            Configure product variants and options
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="hasVariants"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Enable Product Variations</FormLabel>
                <FormDescription>
                  Create multiple variants of this product with different options
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={hasVariants}
                  onCheckedChange={(checked) => {
                    if (!checked) {
                      form.setValue('variantOptions', []);
                      form.setValue('variants', []);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {hasVariants && (
          <div className="space-y-4">
            {variantOptions.length === 0 ? (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  form.setValue('variantOptions', [
                    {
                      id: crypto.randomUUID(),
                      name: '',
                      values: [],
                      position: 0,
                    },
                  ]);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add variant options
              </Button>
            ) : (
              <VariantBuilder form={form} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
