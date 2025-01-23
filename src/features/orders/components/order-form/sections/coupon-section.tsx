import { UseFormReturn } from "react-hook-form";
import { Plus, X, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Order, OrderCoupon } from "@/types/order";
import { CouponSelect } from "../../coupon-select";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Coupon } from "@/types/coupon";
import { useEffect } from "react";
import { useTranslation } from "@/lib/i18n/hooks";

interface CouponSectionProps {
  form: UseFormReturn<Order>;
}

export function CouponSection({ form }: CouponSectionProps) {
  const t = useTranslation();
  const appliedCoupons = form.watch("appliedCoupons") || [];
  const subtotal = form.watch("subtotal");

  const calculateDiscount = (subtotal: number, coupon: Coupon) => {
    let discount = 0;
    if (coupon.type === "percentage") {
      discount = (subtotal * coupon.value) / 100;
      if (coupon.maxDiscountAmount) {
        discount = Math.min(discount, coupon.maxDiscountAmount);
      }
    } else if (coupon.type === "fixed") {
      discount = coupon.value;
    }
    return discount;
  };

  useEffect(() => {
    // recalculate discount when subtotal changes
    const newAppliedCoupons = appliedCoupons.map((coupon) => ({
      ...coupon,
      discount: calculateDiscount(subtotal, coupon),
    }));

    form.setValue("appliedCoupons", newAppliedCoupons);
    form.setValue(
      "discount",
      newAppliedCoupons.reduce((sum, c) => sum + c.discount, 0),
    );
  }, [subtotal]);

  const handleAddCoupon = (coupon: Coupon) => {
    try {
      // Calculate discount
      let discount = calculateDiscount(subtotal, coupon);

      // Add coupon to order
      const newCoupon: OrderCoupon = {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount,
      };

      form.setValue("appliedCoupons", [...appliedCoupons, newCoupon]);
      form.setValue(
        "discount",
        appliedCoupons.reduce((sum, c) => sum + c.discount, 0) + discount,
      );
      if (newCoupon.type === "shipping") {
        form.setValue("shipping", 0);
      }
      toast.success(t.orders.orders.form.sections.coupon.applySuccess);
    } catch (error: any) {
      toast.error(
        error.message || t.orders.orders.form.sections.coupon.applyError,
      );
    }
  };

  const handleRemoveCoupon = (code: string) => {
    const coupon = appliedCoupons.find((c) => c.code === code);
    if (!coupon) return;

    const newCoupons = appliedCoupons.filter((c) => c.code !== code);
    form.setValue("appliedCoupons", newCoupons);
    form.setValue(
      "discount",
      newCoupons.reduce((sum, c) => sum + c.discount, 0),
    );
    toast.success(t.orders.orders.form.sections.coupon.removeSuccess);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Tag className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium">
            {t.orders.orders.form.sections.coupon.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t.orders.orders.form.sections.coupon.description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CouponSelect
          onSelect={handleAddCoupon}
          appliedCoupons={appliedCoupons.map((c) => c.code)}
          subtotal={subtotal}
        >
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            {t.orders.orders.form.sections.coupon.add}
          </Button>
        </CouponSelect>

        {appliedCoupons.length > 0 && (
          <div className="space-y-2">
            {appliedCoupons.map((coupon) => (
              <div
                key={coupon.code}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{coupon.code}</span>
                    <Badge variant="secondary">
                      {coupon.type === "percentage"
                        ? t.orders.orders.form.sections.coupon.discount.percentage.replace(
                            "{value}",
                            coupon.value.toString(),
                          )
                        : coupon.type === "fixed"
                          ? formatCurrency(coupon.value)
                          : coupon.type === "shipping"
                            ? t.orders.orders.form.sections.coupon.discount
                                .shipping
                            : t.orders.orders.form.sections.coupon.discount.points.replace(
                                "{value}",
                                coupon.value.toString(),
                              )}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t.orders.orders.form.sections.coupon.discount.amount}:{" "}
                    {formatCurrency(coupon.discount)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveCoupon(coupon.code)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
