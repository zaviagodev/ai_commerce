import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/types/product";
import { useLocation } from "react-router-dom";
import { useTranslation } from "@/lib/i18n/hooks";

interface ShippingProps {
  form: UseFormReturn<Product>;
}

export function Shipping({ form }: ShippingProps) {
  const t = useTranslation();
  const location = useLocation();
  const isEventProduct = location.pathname.startsWith("/dashboard/events");
  const [showShipping, setShowShipping] = useState(false);

  return (
    <div className="space-y-4">
      {isEventProduct && (
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel>{t.products.products.form.sections.shipping.enableShipping}</FormLabel>
            <FormDescription>
              {t.products.products.form.sections.shipping.enableShippingDescription}
            </FormDescription>
          </div>
          <Switch checked={showShipping} onCheckedChange={setShowShipping} />
        </div>
      )}

      {(!isEventProduct || showShipping) && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.products.products.form.sections.shipping.weight}</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="0.0"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value}
                        className='pr-10'
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {form.getValues("weightUnit")}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weightUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.products.products.form.sections.shipping.weightUnit}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t.products.products.form.sections.shipping.selectUnit} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="kg">{t.products.products.form.sections.shipping.units.kg}</SelectItem>
                      <SelectItem value="lb">{t.products.products.form.sections.shipping.units.lb}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="0.0"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value}
                        className='pr-10'
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {form.getValues("dimensionUnit")}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="0.0"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value}
                        className='pr-10'
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {form.getValues("dimensionUnit")}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="0.0"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value}
                        className='pr-10'
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {form.getValues("dimensionUnit")}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dimensionUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dimension Unit</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cm">Centimeters (cm)</SelectItem>
                      <SelectItem value="in">Inches (in)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
}
