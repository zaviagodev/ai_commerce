import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem } from "@/components/ui/form";
import { DynamicPricing } from "@/components/pricing/dynamic-pricing";
import { Product } from "@/types/product";
import { useTranslation } from "@/lib/i18n/hooks";

interface PricingProps {
  form: UseFormReturn<Product>;
  isEventProduct?: boolean;
}

export function Pricing({ form, isEventProduct }: PricingProps) {
  const t = useTranslation();
  const price = form.watch("variants.0.price") || 0;
  const compareAtPrice = form.watch("variants.0.compareAtPrice");

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
                form.setValue("variants.0.price", price);
                form.setValue("variants.0.compareAtPrice", compareAtPrice);
              }}
              isEventProduct={isEventProduct}
              labels={{
                price: t.products.products.form.price,
                compareAtPrice:
                  t.products.products.form.sections.pricing.compareAtPrice,
                cost: t.products.products.form.sections.pricing.cost,
              }}
            />
          </FormItem>
        )}
      />
    </div>
  );
}
