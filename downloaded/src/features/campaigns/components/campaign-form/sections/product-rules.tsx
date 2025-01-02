import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Campaign } from '@/types/campaign';
import { Package } from 'lucide-react';
import { ProductRuleBuilder } from './product-rules/rule-builder';
import { Switch } from '@/components/ui/switch';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';

interface ProductRulesProps {
  form: UseFormReturn<Campaign>;
}

export function ProductRules({ form }: ProductRulesProps) {
  const hasProductRules = form.watch('hasProductRules');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
          <Package className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">Product Rules</h2>
          <p className="text-sm text-muted-foreground">
            Define rules based on products and categories
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="hasProductRules"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Enable Product Rules</FormLabel>
                <FormDescription>
                  Add rules based on specific products or categories
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

        {hasProductRules && (
          <div className="space-y-4">
            <ProductRuleBuilder form={form} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}