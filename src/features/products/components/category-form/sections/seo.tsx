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
import { ProductCategory } from "@/types/product";
import { useTranslation } from "@/lib/i18n/hooks";

interface SEOProps {
  form: UseFormReturn<ProductCategory>;
}

export function SEO({ form }: SEOProps) {
  const t = useTranslation();

  return (
    <div className="grid gap-6">
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t.products.categories.form.slug}{" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t.products.categories.form.slugPlaceholder}
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t.products.categories.form.slugHelp}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
