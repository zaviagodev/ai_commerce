import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Coupon } from '@/types/coupon';
import { Ticket, Calendar, Users, ShoppingCart, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CouponPreviewProps {
  form: UseFormReturn<Coupon>;
}

export function CouponPreview({ form }: CouponPreviewProps) {
  const coupon = form.watch();
  const isValid = coupon.startDate <= new Date() && coupon.endDate >= new Date();

  return (
    <div className="space-y-6">
      {/* Coupon Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="relative overflow-hidden shadow-md">
          {/* Perforated edges */}
          <div className="absolute left-0 right-0 h-4 flex items-center justify-between px-2">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-muted" />
            ))}
          </div>

          {/* Content */}
          <div className="p-8 pt-12">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Badge 
                  variant={isValid ? "default" : "secondary"}
                  className="mb-4"
                >
                  {isValid ? 'Valid' : 'Invalid'}
                </Badge>
                <h2 className="text-3xl font-mono font-bold tracking-tight">
                  {coupon.code || 'COUPON'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {coupon.description || 'No description'}
                </p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Ticket className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Discount Details */}
            <div className="mt-6 grid gap-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Discount</p>
                  <p className="text-2xl font-semibold">
                    {coupon.type === 'percentage' 
                      ? `${coupon.value}% OFF`
                      : coupon.type === 'fixed'
                      ? formatCurrency(coupon.value)
                      : coupon.type === 'shipping'
                      ? 'FREE SHIPPING'
                      : `${coupon.value}x POINTS`
                    }
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-lg border p-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Valid Until</p>
                    <p className="text-sm font-medium">
                      {coupon.endDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border p-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Usage</p>
                    <p className="text-sm font-medium">
                      {coupon.usageCount || 0}
                      {coupon.usageLimit ? `/${coupon.usageLimit}` : ' uses'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border p-4">
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Min. Purchase</p>
                    <p className="text-sm font-medium">
                      {coupon.minPurchaseAmount 
                        ? formatCurrency(coupon.minPurchaseAmount)
                        : 'No minimum'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Conditions */}
            {coupon.advancedMode && coupon.conditions && coupon.conditions.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Conditions</h4>
                <div className="space-y-2">
                  {coupon.conditions.map((condition, index) => (
                    <div 
                      key={condition.id}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      {index > 0 && (
                        <Badge variant="secondary" className="uppercase">
                          {condition.logicGate}
                        </Badge>
                      )}
                      <span>
                        {condition.type === 'cart_total' && (
                          <>Cart total is {condition.operator.replace('_', ' ')} {formatCurrency(Number(condition.value))}</>
                        )}
                        {condition.type === 'product_quantity' && (
                          <>Product quantity is {condition.operator.replace('_', ' ')} {condition.value}</>
                        )}
                        {condition.type === 'customer_group' && (
                          <>Customer belongs to {condition.value} group</>
                        )}
                        {condition.type === 'first_purchase' && (
                          <>Customer's first purchase</>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom border */}
          {/* <div className="h-1.5 w-full bg-primary/10">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ 
                width: `${Math.min(
                  ((coupon.usageCount || 0) / (coupon.usageLimit || 1)) * 100,
                  100
                )}%` 
              }}
            />
          </div> */}
        </Card>
      </motion.div>

      {/* Usage Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Total Collected</h3>
            </div>
            <p className="mt-2 text-2xl font-bold">{coupon.usageCount || 0}</p>
            <p className="text-xs text-muted-foreground">
              {coupon.usageLimit 
                ? `${coupon.usageLimit - (coupon.usageCount || 0)} available`
                : 'Unlimited'
              }
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Total Orders</h3>
            </div>
            <p className="mt-2 text-2xl font-bold">142</p>
            <p className="text-xs text-muted-foreground">
              Using this coupon
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Total Saved</h3>
            </div>
            <p className="mt-2 text-2xl font-bold">{formatCurrency(1234.56)}</p>
            <p className="text-xs text-muted-foreground">
              By customers
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}