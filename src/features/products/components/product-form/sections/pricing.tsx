import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem } from "@/components/ui/form";
import { DynamicPricing } from "@/components/pricing/dynamic-pricing";
import { Product } from '@/types/product';
import { useTranslation } from '@/lib/i18n/hooks';

interface PricingProps {
  form: UseFormReturn<Product>;
}

export function Pricing({ form }: PricingProps) {
  const  t  = useTranslation();
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
              labels={{
                price: t.products.products.form.price,
                compareAtPrice: t.products.products.form.sections.pricing.compareAtPrice,
                cost: t.products.products.form.sections.pricing.cost
              }}
            />
          </FormItem>
        )}
      />
    </div>
  );
}