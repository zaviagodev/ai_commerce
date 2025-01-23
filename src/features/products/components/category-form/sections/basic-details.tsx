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
import { Textarea } from "@/components/ui/textarea";
import { ProductCategory } from "@/types/product";
import { useTranslation } from "@/lib/i18n/hooks";

interface BasicDetailsProps {
  form: UseFormReturn<ProductCategory>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
  const t = useTranslation();

  return (
    <div className="grid gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t.products.categories.form.name}{" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t.products.categories.form.namePlaceholder}
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t.products.categories.form.nameHelp}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.products.categories.form.description}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t.products.categories.form.descriptionPlaceholder}
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t.products.categories.form.descriptionHelp}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
