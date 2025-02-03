import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";
import { DiscountTabs } from "@/components/pricing/discount-tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/types/order";

interface DiscountSettingsProps {
  form: UseFormReturn<Order>;
  subtotal: number;
  total: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
  discountBase: "subtotal" | "total";
  onDiscountTypeChange: (type: "percentage" | "fixed") => void;
  onDiscountValueChange: (value: number) => void;
  onDiscountBaseChange: (base: "subtotal" | "total") => void;
}

export function DiscountSettings({
  form,
  subtotal,
  total,
  discountType,
  discountValue,
  discountBase,
  onDiscountTypeChange,
  onDiscountValueChange,
  onDiscountBaseChange,
}: DiscountSettingsProps) {
  const baseAmount = discountBase === "subtotal" ? subtotal : total;

  return (
    <div className="space-y-4">
      {/* <div className="space-y-2">
        <Label>Apply Discount On</Label>
        <Select value={discountBase} onValueChange={onDiscountBaseChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="subtotal">Net Total (Before Tax)</SelectItem>
            <SelectItem value="total">Grand Total (After Tax)</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      <DiscountTabs
        type={discountType}
        value={discountValue}
        onTypeChange={onDiscountTypeChange}
        onValueChange={onDiscountValueChange}
        maxValue={baseAmount}
      />
    </div>
  );
}
