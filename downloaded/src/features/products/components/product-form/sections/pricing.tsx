import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem } from "@/components/ui/form";
import { DynamicPricing } from "@/components/pricing/dynamic-pricing";
import { Product } from '@/types/product';

interface PricingProps {
  form: UseFormReturn<Product>;
}

export function Pricing({ form }: PricingProps) {
  const price = form.watch('price') || 0;
  const compareAtPrice = form.watch('compareAtPrice');

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="pricing"
        render={() => (
          <FormItem>
            <DynamicPricing
              value={price}
              onChange={({ price, compareAtPrice }) => {
                form.setValue('price', price);
                form.setValue('compareAtPrice', compareAtPrice);
              }}
            />
          </FormItem>
        )}
      />
    </div>
  );
}