import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { EcommerceSettings } from "../../schemas/ecommerce-settings-schema";
import { useTranslation } from "@/lib/i18n/hooks";

interface TaxSettingsProps {
  form: UseFormReturn<EcommerceSettings>;
}

export function TaxSettings({ form }: TaxSettingsProps) {
  const t = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">
            {t.settings.ecommerce.tax.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t.settings.ecommerce.tax.subtitle}
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="taxCalculation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.settings.ecommerce.tax.taxCalculation.label}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select calculation method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="line_items">
                    {t.settings.ecommerce.tax.taxCalculation.options.lineItems}
                  </SelectItem>
                  <SelectItem value="total">
                    {t.settings.ecommerce.tax.taxCalculation.options.total}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {t.settings.ecommerce.tax.taxCalculation.description}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxInclusive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>
                  {t.settings.ecommerce.tax.taxInclusive.label}
                </FormLabel>
                <FormDescription>
                  {t.settings.ecommerce.tax.taxInclusive.description}
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
          name="defaultTaxRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.settings.ecommerce.tax.defaultTaxRate.label}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                {t.settings.ecommerce.tax.defaultTaxRate.description}
              </FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
