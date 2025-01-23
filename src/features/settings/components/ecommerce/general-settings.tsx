import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Store } from "lucide-react";
import { EcommerceSettings } from "../../schemas/ecommerce-settings-schema";
import { useTranslation } from "@/lib/i18n/hooks";

interface GeneralSettingsProps {
  form: UseFormReturn<EcommerceSettings>;
}

export function GeneralSettings({ form }: GeneralSettingsProps) {
  const t = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Store className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">
            {t.settings.ecommerce.general.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t.settings.ecommerce.general.subtitle}
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.settings.ecommerce.general.currency.label}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="THB">THB - Thai Baht</SelectItem>
                  <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {t.settings.ecommerce.general.currency.description}
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="weightUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t.settings.ecommerce.general.weightUnit.label}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weight unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kg">
                      {
                        t.products.products.form.sections.shipping.weightUnits
                          .kg
                      }
                    </SelectItem>
                    <SelectItem value="lb">
                      {
                        t.products.products.form.sections.shipping.weightUnits
                          .lb
                      }
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {t.settings.ecommerce.general.weightUnit.description}
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dimensionUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t.settings.ecommerce.general.dimensionUnit.label}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dimension unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cm">
                      {
                        t.products.products.form.sections.shipping
                          .dimensionUnits.cm
                      }
                    </SelectItem>
                    <SelectItem value="in">
                      {
                        t.products.products.form.sections.shipping
                          .dimensionUnits.in
                      }
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {t.settings.ecommerce.general.dimensionUnit.description}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="orderPrefix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.settings.ecommerce.general.orderPrefix.label}
              </FormLabel>
              <FormControl>
                <Input placeholder="#" {...field} />
              </FormControl>
              <FormDescription>
                {t.settings.ecommerce.general.orderPrefix.description}
              </FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
