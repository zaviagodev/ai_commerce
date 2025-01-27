import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EcommerceSettingsSchema } from "../schemas/ecommerce-settings-schema";
import { GeneralSettings } from "../components/ecommerce/general-settings";
import { CheckoutSettings } from "../components/ecommerce/checkout-settings";
import { ShippingSettings } from "../components/ecommerce/shipping-settings";
import { TaxSettings } from "../components/ecommerce/tax-settings";
import { InventorySettings } from "../components/ecommerce/inventory-settings";
import { useEcommerceSettings } from "../hooks/use-ecommerce-settings";
import { useEffect } from "react";
import Loading from "@/components/loading";
import { useTranslation } from "@/lib/i18n/hooks";

export function EcommerceSettingsPage() {
  const t = useTranslation();
  const { settings, isLoading, updateSettings } = useEcommerceSettings();

  const form = useForm({
    resolver: zodResolver(EcommerceSettingsSchema),
    defaultValues: {
      currency: "USD",
      weightUnit: "kg",
      dimensionUnit: "cm",
      orderPrefix: "#",
      guestCheckout: true,
      requirePhone: false,
      requireShipping: true,
      requireBilling: true,
      trackInventory: true,
      lowStockThreshold: 5,
      outOfStockBehavior: "hide",
      taxCalculation: "line_items",
      taxInclusive: false,
      defaultTaxRate: 0,
    },
  });

  // Update form when settings are loaded
  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  const onSubmit = async (data: any) => {
    try {
      await updateSettings.mutateAsync(data);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-14">
        <Loading />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {t.settings.ecommerce.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t.settings.ecommerce.subtitle}
            </p>
          </div>
          <Button type="submit" disabled={updateSettings.isPending}>
            {updateSettings.isPending
              ? t.settings.settings.saving
              : t.settings.settings.save}
          </Button>
        </div>

        <div className="grid gap-6">
          <GeneralSettings form={form} />
          {/* <CheckoutSettings form={form} /> */}
          <ShippingSettings form={form} />
          <TaxSettings form={form} />
          {/* <InventorySettings form={form} /> */}
        </div>
      </form>
    </Form>
  );
}
