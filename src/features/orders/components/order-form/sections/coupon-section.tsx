import { UseFormReturn } from 'react-hook-form';
import { Plus, X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Order, OrderCoupon } from '@/types/order';
import { CouponSelect } from '../../coupon-select';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';
import { Coupon } from '@/types/coupon';

interface CouponSectionProps {
  form: UseFormReturn<Order>;
  storeName: string;
}

export function CouponSection({ form, storeName }: CouponSectionProps) {
  const appliedCoupons = form.watch('appliedCoupons') || [];
  const subtotal = form.watch('subtotal');

  const handleAddCoupon = (coupon: Coupon) => {
    try {
      // Calculate discount
      let discount = 0;
      if (coupon.type === 'percentage') {
        discount = (subtotal * coupon.value) / 100;
        if (coupon.maxDiscountAmount) {
          discount = Math.min(discount, coupon.maxDiscountAmount);
        }
      } else if (coupon.type === 'fixed') {
        discount = coupon.value;
      }

      // Add coupon to order
      const newCoupon: OrderCoupon = {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount,
      };

      form.setValue('appliedCoupons', [...appliedCoupons, newCoupon]);
      form.setValue('discount', appliedCoupons.reduce((sum, c) => sum + c.discount, 0) + discount);
      if(newCoupon.type === 'shipping') {
        form.setValue('shipping', 0);
      }
      toast.success('Coupon applied successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to apply coupon');
    }
  };

  const handleRemoveCoupon = (code: string) => {
    const coupon = appliedCoupons.find(c => c.code === code);
    if (!coupon) return;

    const newCoupons = appliedCoupons.filter(c => c.code !== code);
    form.setValue('appliedCoupons', newCoupons);
    form.setValue('discount', newCoupons.reduce((sum, c) => sum + c.discount, 0));
    toast.success('Coupon removed successfully');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Tag className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium">Coupons</h3>
          <p className="text-sm text-muted-foreground">
            Apply discount coupons to this order
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CouponSelect 
          onSelect={handleAddCoupon}
          appliedCoupons={appliedCoupons.map(c => c.code)}
          subtotal={subtotal}
        >
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Coupon
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
                      {coupon.type === 'percentage' 
                        ? `${coupon.value}% off`
                        : coupon.type === 'fixed'
                        ? formatCurrency(coupon.value)
                        : coupon.type === 'shipping'
                        ? 'Free Shipping'
                        : `${coupon.value}x Points`
                      }
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Discount: {formatCurrency(coupon.discount)}
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