import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PriceInput } from "./price-input";
import { DiscountTabs } from "./discount-tabs";
import { PriceSummary } from "./price-summary";
import { useTranslation } from "@/lib/i18n/hooks";

interface DynamicPricingProps {
  value: number;
  onChange: (value: { price: number; compareAtPrice?: number }) => void;
}

export function DynamicPricing({ value, onChange }: DynamicPricingProps) {
  const t = useTranslation();
  const [price, setPrice] = useState(value || 0);
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState(0);
  const [finalPriceInput, setFinalPriceInput] = useState(price);

  // Ensure price is always a valid number
  const handlePriceChange = (newPrice: number) => {
    const validPrice = Number.isFinite(newPrice) ? Math.max(0, newPrice) : 0;
    // Round to 2 decimal places
    const roundedPrice = Math.round(validPrice * 100) / 100;
    setPrice(roundedPrice);
    setFinalPriceInput(roundedPrice);
  };

  // Ensure discount value is always a valid number
  const handleDiscountValueChange = (newValue: number) => {
    // Round to 2 decimal places and ensure valid range
    let validValue = Number.isFinite(newValue) ? Math.max(0, newValue) : 0;
    validValue = Math.round(validValue * 100) / 100;
    setDiscountValue(validValue);
    
    // Update final price when discount changes
    const newDiscountAmount = discountType === "percentage" 
      ? (price * validValue) / 100 
      : validValue;
    setFinalPriceInput(Math.max(0, price - newDiscountAmount));
  };

  // Handle direct final price input
  const handleFinalPriceChange = (newFinalPrice: number) => {
    // Round to 2 decimal places
    const roundedFinalPrice = Math.round(Math.min(Math.max(0, newFinalPrice), price) * 100) / 100;
    setFinalPriceInput(roundedFinalPrice);
    
    // Calculate and update discount values
    const newDiscountAmount = Math.round((price - roundedFinalPrice) * 100) / 100;
    if (discountType === "percentage") {
      const percentage = price > 0 ? (newDiscountAmount / price) * 100 : 0;
      setDiscountValue(Math.round(percentage * 100) / 100);
    } else {
      setDiscountValue(newDiscountAmount);
    }
  };

  // Calculate discount amount and final price
  const discountAmount = discountType === "percentage" 
    ? Math.round((price * discountValue) / 100 * 100) / 100
    : discountValue;
  const finalPrice = Math.round(Math.max(0, price - discountAmount) * 100) / 100;

  // Convert between percentage and fixed amount
  const handleDiscountTypeChange = (newType: "percentage" | "fixed") => {
    if (newType === "percentage") {
      const percentage = price > 0 ? (discountAmount / price) * 100 : 0;
      setDiscountValue(Math.round(percentage * 100) / 100);
    } else {
      setDiscountValue(Math.round(discountAmount * 100) / 100);
    }
    setDiscountType(newType);
  };

  // Update parent component
  useEffect(() => {
    onChange({
      price: finalPrice,
      compareAtPrice: isDiscountEnabled ? price : undefined,
    });
  }, [price, isDiscountEnabled, finalPrice, onChange]);

  return (
    <div className="space-y-6">
      <PriceInput
        label={t.products.products.form.sections.pricing.title}
        value={price}
        onChange={handlePriceChange}
      />

      <Card className="card-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="discount-toggle" className="cursor-pointer">
                {t.products.products.form.sections.pricing.title}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t.products.products.form.sections.pricing.description}
              </p>
            </div>
            <Switch
              id="discount-toggle"
              checked={isDiscountEnabled}
              onCheckedChange={setIsDiscountEnabled}
            />
          </div>

          <Collapsible open={isDiscountEnabled}>
            <CollapsibleContent className="mt-6 space-y-6">
              <DiscountTabs
                type={discountType}
                value={discountValue}
                onTypeChange={handleDiscountTypeChange}
                onValueChange={handleDiscountValueChange}
                maxValue={price}
              />

              <PriceInput
                label="Final Price"
                value={finalPriceInput}
                onChange={handleFinalPriceChange}
                error={finalPriceInput > price ? "Final price cannot exceed original price" : undefined}
              />

              <div className="rounded-lg bg-muted p-4">
                <PriceSummary
                  originalPrice={price}
                  discountAmount={discountAmount}
                  finalPrice={finalPrice}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}