import { useState } from 'react';
import { Search, Tag, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useCoupons } from '@/features/campaigns/hooks/use-coupons';
import { formatCurrency } from '@/lib/utils';
import { Coupon } from '@/types/coupon';

interface CouponSelectProps {
  children: React.ReactNode;
  onSelect: (coupon: Coupon) => void;
  appliedCoupons?: string[];
  subtotal: number;
}

export function CouponSelect({ children, onSelect, appliedCoupons = [], subtotal }: CouponSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { coupons, isLoading } = useCoupons();

  // Filter active and applicable coupons
  const availableCoupons = coupons.filter(coupon => {
    // Check if already applied
    if (appliedCoupons.includes(coupon.code)) return false;

    // Check if active
    if (coupon.status !== 'active') return false;

    // Check dates
    const now = new Date();
    if (now < coupon.startDate || now > coupon.endDate) return false;

    // Check usage limit
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) return false;

    // Check minimum purchase amount
    if (coupon.minPurchaseAmount && subtotal < coupon.minPurchaseAmount) return false;

    // Match search term
    return (
      coupon.code.toLowerCase().includes(search.toLowerCase()) ||
      coupon.description?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getCouponValue = (coupon: Coupon) => {
    switch (coupon.type) {
      case 'percentage':
        return `${coupon.value}% off`;
      case 'fixed':
        return formatCurrency(coupon.value);
      case 'shipping':
        return 'Free Shipping';
      case 'points':
        return `${coupon.value}x Points`;
    }
  };

  const getEstimatedDiscount = (coupon: Coupon) => {
    if (coupon.type === 'percentage') {
      const discount = (subtotal * coupon.value) / 100;
      return coupon.maxDiscountAmount 
        ? Math.min(discount, coupon.maxDiscountAmount)
        : discount;
    }
    if (coupon.type === 'fixed') {
      return coupon.value;
    }
    return 0;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent 
        className="sm:max-w-[600px]" 
        aria-labelledby="coupon-select-title"
      >
        <DialogHeader>
          <DialogTitle id="coupon-select-title">Select Coupon</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search coupons..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                Loading coupons...
              </div>
            ) : availableCoupons.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No applicable coupons found
              </div>
            ) : (
              <div className="space-y-2">
                {availableCoupons.map((coupon) => {
                  const estimatedDiscount = getEstimatedDiscount(coupon);
                  return (
                    <Button
                      key={coupon.id}
                      variant="outline"
                      className="w-full justify-start h-auto py-4"
                      onClick={() => {
                        onSelect(coupon);
                        setOpen(false);
                        setSearch('');
                      }}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Tag className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{coupon.code}</span>
                            <Badge variant="secondary">
                              {getCouponValue(coupon)}
                            </Badge>
                          </div>
                          {coupon.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {coupon.description}
                            </p>
                          )}
                          {estimatedDiscount > 0 && (
                            <p className="text-sm text-green-600 mt-1">
                              Estimated savings: {formatCurrency(estimatedDiscount)}
                            </p>
                          )}
                          {coupon.minPurchaseAmount && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Minimum purchase: {formatCurrency(coupon.minPurchaseAmount)}
                            </p>
                          )}
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex justify-end px-6 py-4 border-t bg-gray-50/50">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}