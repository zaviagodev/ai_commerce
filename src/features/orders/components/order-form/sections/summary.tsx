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
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calculator, Percent, DollarSign } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/types/order";
import { cn, formatCurrency } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { DiscountSettings } from "./discount-settings";
import { useTranslation } from "@/lib/i18n/hooks";

interface SummaryProps {
  form: UseFormReturn<Order>;
}

export function Summary({ form }: SummaryProps) {
  const t = useTranslation();
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [isTaxEnabled, setIsTaxEnabled] = useState(false);
  const [taxType, setTaxType] = useState<"percentage" | "value">("percentage");
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [taxValue, setTaxValue] = useState(0);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(
    "percentage",
  );
  const [discountBase, setDiscountBase] = useState<"subtotal" | "total">(
    "subtotal",
  );
  const [discountValue, setDiscountValue] = useState(0);
  const [calculatedDiscount, setCalculatedDiscount] = useState(0);

  const items = form.watch("items") || [];
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const appliedCoupons = form.watch("appliedCoupons") || [];
  const couponDiscount = appliedCoupons.reduce(
    (sum, coupon) => sum + coupon.discount,
    0,
  );
  const shipping = form.watch("shipping") || 0;
  const currentTax = form.watch("tax") || 0;
  const currentTotal = form.watch("total") || 0;
  const getDiscountBaseAmount = () => {
    return discountBase === "subtotal"
      ? subtotal
      : subtotal + shipping + currentTax;
  };

  const handleDiscountChange = (value: number) => {
    const baseAmount = getDiscountBaseAmount();
    const discountAmount =
      discountType === "percentage" ? (baseAmount * value) / 100 : value;
    setDiscountValue(value);
    setCalculatedDiscount(discountAmount);
  };

  const handleDiscountBaseChange = (base: "subtotal" | "total") => {
    setDiscountBase(base);
    // Recalculate discount based on new base amount
    const newBaseAmount =
      base === "subtotal" ? subtotal : subtotal + shipping + currentTax;
    if (discountType === "percentage") {
      const discountAmount = (newBaseAmount * discountValue) / 100;
      setCalculatedDiscount(discountAmount);
    } else {
      // For fixed amount, keep the same value but ensure it doesn't exceed the new base
      setCalculatedDiscount(Math.min(discountValue, newBaseAmount));
    }
  };

  // Update discount value when type changes
  const handleDiscountTypeChange = (type: "percentage" | "fixed") => {
    setDiscountType(type);
    const baseAmount = getDiscountBaseAmount();
    // Convert current discount to new type
    if (type === "percentage") {
      const percentage = (calculatedDiscount / baseAmount) * 100;
      setDiscountValue(percentage);
    } else {
      // For fixed amount, just use the current discount amount
      setDiscountValue(calculatedDiscount);
    }
  };

  // Update form values when dependencies change
  useEffect(() => {
    // Calculate tax
    const calculatedTax = isTaxEnabled
      ? taxType === "thai-vat"
        ? (subtotal * 7) / 100
        : taxType === "percentage"
          ? (subtotal * taxPercentage) / 100
          : taxValue
      : 0;

    // Calculate total
    const calculatedTotal =
      subtotal + shipping + calculatedTax - calculatedDiscount;

    // Update form values
    form.setValue("subtotal", subtotal);
    form.setValue("tax", calculatedTax);
    form.setValue("discount", calculatedDiscount);
    form.setValue("total", calculatedTotal);
  }, [
    form,
    subtotal,
    shipping,
    calculatedDiscount,
    isTaxEnabled,
    taxType,
    taxPercentage,
    taxValue,
  ]);

  // Reset tax values when tax is disabled
  useEffect(() => {
    if (!isTaxEnabled) {
      setTaxPercentage(0);
      setTaxValue(0);
    }
  }, [isTaxEnabled, form]);

  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
          <Calculator className="h-5 w-5 text-orange-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">
            {t.orders.orders.form.sections.summary.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.orders.orders.form.sections.summary.description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* Discount Section */}
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <div className="rounded-lg border">
                <div className="flex items-center justify-between p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="font-medium">
                      {t.orders.orders.form.sections.summary.discount.title}
                    </FormLabel>
                    <FormDescription className="text-sm">
                      {
                        t.orders.orders.form.sections.summary.discount
                          .description
                      }
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={isDiscountEnabled}
                      onCheckedChange={setIsDiscountEnabled}
                    />
                  </FormControl>
                </div>

                <div
                  className={cn(
                    "border-t space-y-4 overflow-hidden",
                    isDiscountEnabled ? "p-4" : "h-0 p-0 border-t-0",
                  )}
                >
                  <DiscountSettings
                    form={form}
                    subtotal={subtotal}
                    total={currentTotal}
                    discountType={discountType}
                    discountValue={discountValue}
                    discountBase={discountBase}
                    onDiscountTypeChange={handleDiscountTypeChange}
                    onDiscountValueChange={handleDiscountChange}
                    onDiscountBaseChange={handleDiscountBaseChange}
                  />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Tax/VAT Section */}
        <FormField
          control={form.control}
          name="tax"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <div className="rounded-lg border">
                <div className="flex items-center justify-between p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="font-medium">
                      {t.orders.orders.form.sections.summary.tax.title}
                    </FormLabel>
                    <FormDescription className="text-sm">
                      {t.orders.orders.form.sections.summary.tax.description}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={isTaxEnabled}
                      onCheckedChange={setIsTaxEnabled}
                    />
                  </FormControl>
                </div>

                <div
                  className={cn(
                    "border-t space-y-4 overflow-hidden",
                    isTaxEnabled ? "p-4" : "h-0 p-0 border-t-0",
                  )}
                >
                  <Select
                    value={taxType}
                    onValueChange={(value: "percentage" | "value") => {
                      setTaxType(value);
                      setTaxPercentage(0);
                      setTaxValue(0);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">
                        <div className="flex items-center">
                          <Percent className="mr-2 h-4 w-4" />
                          {
                            t.orders.orders.form.sections.summary.tax.types
                              .percentage
                          }
                        </div>
                      </SelectItem>
                      <SelectItem value="thai-vat">
                        <div className="flex items-center">
                          <Percent className="mr-2 h-4 w-4" />
                          {
                            t.orders.orders.form.sections.summary.tax.types
                              .thaiVat
                          }
                        </div>
                      </SelectItem>
                      <SelectItem value="value">
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4" />
                          {
                            t.orders.orders.form.sections.summary.tax.types
                              .fixed
                          }
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {taxType === "percentage" ? (
                    <div className="space-y-2">
                      <Label>
                        {t.orders.orders.form.sections.summary.tax.percentage}
                      </Label>
                      <div className="relative">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          placeholder="0.00"
                          className="pr-8"
                          value={taxPercentage || ""}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            setTaxPercentage(value);
                          }}
                        />
                        <span className="absolute right-3 top-1/2">%</span>
                      </div>
                    </div>
                  ) : taxType === "value" ? (
                    <div className="space-y-2">
                      <Label>
                        {t.orders.orders.form.sections.summary.tax.amount}
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={taxValue || ""}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setTaxValue(value);
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Final Cost Breakdown */}
        <div className="space-y-2 rounded-lg border p-4 bg-muted/50">
          <h3 className="font-medium mb-2">Cost Summary</h3>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Subtotal ({items.length} items)
            </span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          {calculatedDiscount > 0 ||
            (couponDiscount > 0 && (
              <div className="flex justify-between text-sm text-destructive">
                <span>
                  Discount
                  {discountType === "percentage" &&
                    ` (${discountValue.toFixed(1)}% of ${discountBase === "subtotal" ? "Net Total" : "Grand Total"})`}
                </span>
                <span>
                  -{formatCurrency(calculatedDiscount + couponDiscount)}
                </span>
              </div>
            ))}

          {shipping > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping Cost</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
          )}

          {currentTax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Tax</span>
              <span>{formatCurrency(currentTax)}</span>
            </div>
          )}

          <div className="h-px bg-border my-2" />

          <div className="flex justify-between">
            <div>
              <span className="text-lg font-semibold">Total</span>
              {(calculatedDiscount > 0 ||
                couponDiscount > 0 ||
                shipping > 0 ||
                currentTax > 0) && (
                <p className="text-xs text-muted-foreground">
                  Includes tax, shipping & discounts
                </p>
              )}
            </div>
            <span className="text-lg font-semibold">
              {formatCurrency(currentTotal - couponDiscount)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
