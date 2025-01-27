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
import { Package } from "lucide-react";
import { EcommerceSettings } from "../../schemas/ecommerce-settings-schema";
import { useTranslation } from "@/lib/i18n/hooks";

interface InventorySettingsProps {
  form: UseFormReturn<EcommerceSettings>;
}

export function InventorySettings({ form }: InventorySettingsProps) {
  const t = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Package className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            {t.settings.ecommerce.inventory.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t.settings.ecommerce.inventory.subtitle}
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="trackInventory"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>
                  {t.settings.ecommerce.inventory.trackInventory.label}
                </FormLabel>
                <FormDescription>
                  {t.settings.ecommerce.inventory.trackInventory.description}
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
          name="lowStockThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.settings.ecommerce.inventory.lowStockThreshold.label}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                {t.settings.ecommerce.inventory.lowStockThreshold.description}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="outOfStockBehavior"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.settings.ecommerce.inventory.outOfStockBehavior.label}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select behavior" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hide">
                    {
                      t.settings.ecommerce.inventory.outOfStockBehavior.options
                        .hide
                    }
                  </SelectItem>
                  <SelectItem value="show">
                    {
                      t.settings.ecommerce.inventory.outOfStockBehavior.options
                        .show
                    }
                  </SelectItem>
                  <SelectItem value="backorder">
                    {
                      t.settings.ecommerce.inventory.outOfStockBehavior.options
                        .backorder
                    }
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {t.settings.ecommerce.inventory.outOfStockBehavior.description}
              </FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
