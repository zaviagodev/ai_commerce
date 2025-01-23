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
import { Order } from "@/types/order";

interface ManualShippingProps {
  form: UseFormReturn<Order>;
  currentShipping: number;
}

export function ManualShipping({ form, currentShipping }: ManualShippingProps) {
  const appliedCoupons = form.watch("appliedCoupons") || [];
  const hasFreeShippingCoupon = appliedCoupons.find(
    (coupon) => coupon.type === "shipping",
  );
  return (
    <FormField
      control={form.control}
      name="shipping"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Shipping Cost</FormLabel>
          <FormControl>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                disabled={hasFreeShippingCoupon}
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="pl-6"
                onChange={(e) => field.onChange(Number(e.target.value))}
                value={currentShipping || ""}
              />
            </div>
          </FormControl>
          <FormDescription>
            Enter the shipping cost for this order
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
