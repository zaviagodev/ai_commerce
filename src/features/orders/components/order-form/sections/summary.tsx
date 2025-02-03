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
import { Calculator, Percent, DollarSign, Gift } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order, OrderItem } from "@/types/order";
import { cn, formatCurrency } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { DiscountSettings } from "./discount-settings";
import { useTranslation } from "@/lib/i18n/hooks";
import { Badge } from "@/components/ui/badge";
import { useEcommerceSettings } from "@/features/settings/hooks/use-ecommerce-settings";

interface SummaryProps {
  form: UseFormReturn<Order>;
  showTaxSection?: boolean;
}

export function Summary({ form }: SummaryProps) {
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [isTaxEnabled, setIsTaxEnabled] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);
  const [taxValue, setTaxValue] = useState(0);
  const [taxType, setTaxType] = useState<"value" | "percentage" | "thai-vat">(
    "value",
  );
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(
    "percentage",
  );
  const [discountBase, setDiscountBase] = useState<"subtotal" | "total">(
    "subtotal",
  );

  const items: OrderItem[] = form.watch("items") || [];
  const appliedCoupons: any[] = form.watch("appliedCoupons") || [];
  const loyaltyPointsUsed = form.watch("loyalty_points_used") || 0;
  const shipping = form.watch("shipping") || 0;
  const t = useTranslation();
  const { settings } = useEcommerceSettings();

  const summary = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Calculate points requirements
    let pointsRequired = 0;
    let standardPriceTotal = 0;
    let rewardItemMoneyRequired = 0;

    items.forEach((item) => {
      if (item.pointsBasedPrice) {
        pointsRequired += item.pointsBasedPrice * item.quantity;
        rewardItemMoneyRequired += item.price * item.quantity;
      } else {
        standardPriceTotal += item.price * item.quantity;
      }
    });

    // Calculate coupon discount
    const couponDiscount = appliedCoupons.reduce(
      (sum, coupon) => sum + (coupon.discount || 0),
      0,
    );

    // Calculate discount
    const calculatedDiscount =
      discountType === "percentage"
        ? (subtotal * discountValue) / 100
        : discountValue;

    // Calculate money required after regular discounts
    const afterDiscountTotal = Math.max(
      0,
      subtotal - calculatedDiscount - couponDiscount,
    );
    const afterDiscountStandardTotal = Math.max(
      0,
      standardPriceTotal * (afterDiscountTotal / subtotal),
    );

    // Calculate points discount and money required
    let moneyRequired = afterDiscountStandardTotal;
    let pointsDiscount = 0;

    if (loyaltyPointsUsed >= pointsRequired) {
      const remainingPoints = loyaltyPointsUsed - pointsRequired;
      const standardPointsDiscount = Math.min(
        afterDiscountStandardTotal,
        remainingPoints / (settings?.loyaltyPointsRate || 100),
      );
      // moneyRequired = afterDiscountStandardTotal - standardPointsDiscount;

      pointsDiscount = rewardItemMoneyRequired + standardPointsDiscount;
      moneyRequired = afterDiscountTotal - pointsDiscount;
    } else {
      moneyRequired = afterDiscountTotal;
    }

    // Calculate final totals
    const total = Number.isNaN(moneyRequired) ? 0 : moneyRequired + shipping;

    return {
      subtotal,
      pointsRequired,
      standardPriceTotal,
      rewardItemMoneyRequired,
      moneyRequired,
      pointsDiscount,
      total,
      couponDiscount,
      calculatedDiscount,
      totalDiscount: pointsDiscount + couponDiscount + calculatedDiscount,
      isValidPointsUsage:
        loyaltyPointsUsed >= pointsRequired || loyaltyPointsUsed === 0,
      maxPointsAllowed:
        pointsRequired +
        (standardPriceTotal - calculatedDiscount) *
          (settings?.loyaltyPointsRate || 100),
    };
  }, [
    items,
    loyaltyPointsUsed,
    shipping,
    appliedCoupons,
    discountType,
    discountValue,
    settings,
  ]);

  const handlePointsChange = (points: number) => {
    form.setValue("loyalty_points_used", points);
  };

  // Calculate tax
  const taxBase = summary.subtotal - summary.calculatedDiscount + shipping;
  const currentTax =
    taxType === "percentage"
      ? (taxBase * taxValue) / 100
      : taxType === "thai-vat"
        ? (taxBase * 7) / 100
        : taxValue;

  useEffect(() => {
    form.setValue("subtotal", summary.subtotal);
    form.setValue(
      "discount",
      summary.calculatedDiscount + summary.couponDiscount,
    );
    form.setValue("shipping", shipping);
    form.setValue("tax", currentTax);
    form.setValue("total", summary.total);
    form.setValue("pointsDiscount", summary.pointsDiscount);
  }, [
    form,
    summary.subtotal,
    summary.total,
    summary.calculatedDiscount,
    summary.couponDiscount,
    summary.pointsDiscount,
    shipping,
    currentTax,
  ]);

  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
          <Calculator className="h-5 w-5 text-orange-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">
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
                    subtotal={summary.subtotal}
                    total={summary.total}
                    discountType={discountType}
                    discountValue={discountValue}
                    discountBase={discountBase}
                    onDiscountTypeChange={setDiscountType}
                    onDiscountValueChange={setDiscountValue}
                    onDiscountBaseChange={setDiscountBase}
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
                    onValueChange={(
                      value: "value" | "percentage" | "thai-vat",
                    ) => {
                      setTaxType(value);
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
                          value={taxValue || ""}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            setTaxValue(value);
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
        <div className="space-y-4 rounded-lg border p-4 bg-muted/50">
          <h3 className="font-medium">Cost Summary</h3>

          {/* Loyalty Points Input */}
          <div className="space-y-2 pb-4 border-b">
            <Label>Loyalty Points</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                max={summary.maxPointsAllowed}
                placeholder="Enter points to use"
                value={loyaltyPointsUsed || ""}
                onChange={(e) => handlePointsChange(Number(e.target.value))}
              />
              {loyaltyPointsUsed > 0 && (
                <Badge
                  variant="outline"
                  className="border-green-600 text-green-600"
                >
                  <Gift className="h-3 w-3 mr-1" />
                  Using Points
                </Badge>
              )}
            </div>
            {!summary.isValidPointsUsage && (
              <div className="text-sm text-destructive">
                You need to use at least {summary.pointsRequired} points for
                reward items
              </div>
            )}
            {loyaltyPointsUsed > summary.maxPointsAllowed && (
              <div className="text-sm text-destructive">
                Maximum points allowed: {summary.maxPointsAllowed}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal ({items.length} items)
              </span>
              <span>{formatCurrency(summary.subtotal)}</span>
            </div>

            {shipping > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping Cost</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
            )}

            {summary.calculatedDiscount > 0 && (
              <div className="flex justify-between text-sm text-destructive">
                <span>Discount</span>
                <span>-{formatCurrency(summary.calculatedDiscount)}</span>
              </div>
            )}

            {summary.couponDiscount > 0 && (
              <div className="flex justify-between text-sm text-destructive">
                <span>Coupon Discount</span>
                <span>-{formatCurrency(summary.couponDiscount)}</span>
              </div>
            )}

            {loyaltyPointsUsed > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Points Discount</span>
                <div className="text-right">
                  <div>{loyaltyPointsUsed} points</div>
                  <div className="text-xs">
                    -{formatCurrency(summary.pointsDiscount)}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between text-base font-medium pt-2 border-t">
              <span>Total</span>
              <div className="text-right">
                <div>{formatCurrency(summary.total)}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
