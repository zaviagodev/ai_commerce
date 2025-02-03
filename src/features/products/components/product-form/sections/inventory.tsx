import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/types/product";
import { useTranslation } from "@/lib/i18n/hooks";

interface InventoryProps {
  form: UseFormReturn<Product>;
}

export function Inventory({ form }: InventoryProps) {
  const t = useTranslation();
  const trackQuantity = form.watch("trackQuantity");
  const variantOptions = form.watch("variantOptions") || [];
  const hasVariants = variantOptions.length > 0;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="sku"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.products.products.form.sku}</FormLabel>{" "}
            <span className="text-destructive">*</span>
            <FormControl>
              <Input
                placeholder={
                  t.products.products.form.sections.inventory.skuPlaceholder
                }
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t.products.products.form.sections.inventory.skuDescription}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="barcode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t.products.products.form.sections.inventory.barcode}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={
                  t.products.products.form.sections.inventory.barcodePlaceholder
                }
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t.products.products.form.sections.inventory.barcodeDescription}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="trackQuantity"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>
                {t.products.products.form.sections.inventory.trackQuantity}
              </FormLabel>
              <FormDescription>
                {
                  t.products.products.form.sections.inventory
                    .trackQuantityDescription
                }
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {trackQuantity && !hasVariants && (
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.products.products.form.sections.inventory.quantity}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                {
                  t.products.products.form.sections.inventory
                    .quantityDescription
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
