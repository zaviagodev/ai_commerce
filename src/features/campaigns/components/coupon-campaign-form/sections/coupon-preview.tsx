import { UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Coupon } from "@/types/coupon";
import { Ticket, Calendar, Users, ShoppingCart, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/hooks";

interface CouponPreviewProps {
  form: UseFormReturn<Coupon>;
}

export function CouponPreview({ form }: CouponPreviewProps) {
  const t = useTranslation();
  const coupon = form.watch();
  const isValid =
    coupon.startDate <= new Date() && coupon.endDate >= new Date();

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
                  {isValid
                    ? t.campaigns.campaign.coupon.sections.preview.fields.status
                        .valid
                    : t.campaigns.campaign.coupon.sections.preview.fields.status
                        .invalid}
                </Badge>
                <h2 className="text-3xl font-mono font-bold tracking-tight">
                  {coupon.code ||
                    t.campaigns.campaign.coupon.sections.preview.fields.code
                      .placeholder}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {coupon.description ||
                    t.campaigns.campaign.coupon.sections.preview.fields
                      .description.placeholder}
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
                  <p className="text-sm font-medium">
                    {
                      t.campaigns.campaign.coupon.sections.preview.fields
                        .discount.label
                    }
                  </p>
                  <p className="text-2xl font-semibold">
                    {coupon.type === "percentage"
                      ? `${coupon.value}% ${t.campaigns.campaign.coupon.sections.preview.fields.discount.off}`
                      : coupon.type === "fixed"
                        ? formatCurrency(coupon.value)
                        : coupon.type === "shipping"
                          ? t.campaigns.campaign.coupon.sections.preview.fields
                              .discount.freeShipping
                          : `${coupon.value}x ${t.campaigns.campaign.coupon.sections.preview.fields.discount.points}`}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-lg border p-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {
                        t.campaigns.campaign.coupon.sections.preview.fields
                          .validity.label
                      }
                    </p>
                    <p className="text-sm font-medium">
                      {coupon.endDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border p-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {
                        t.campaigns.campaign.coupon.sections.preview.fields
                          .usage.label
                      }
                    </p>
                    <p className="text-sm font-medium">
                      {coupon.usageCount || 0}
                      {coupon.usageLimit
                        ? `/${coupon.usageLimit}`
                        : ` ${t.campaigns.campaign.coupon.sections.preview.fields.usage.uses}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border p-4">
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {
                        t.campaigns.campaign.coupon.sections.preview.fields
                          .minPurchase.label
                      }
                    </p>
                    <p className="text-sm font-medium">
                      {coupon.minPurchaseAmount
                        ? formatCurrency(coupon.minPurchaseAmount)
                        : t.campaigns.campaign.coupon.sections.preview.fields
                            .minPurchase.noMinimum}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Conditions */}
            {coupon.advancedMode &&
              coupon.conditions &&
              coupon.conditions.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">
                    {
                      t.campaigns.campaign.coupon.sections.preview.fields
                        .conditions.label
                    }
                  </h4>
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
                          {condition.type === "cart_total" && (
                            <>
                              {
                                t.campaigns.campaign.coupon.sections.preview
                                  .fields.conditions.cartTotal
                              }{" "}
                              {condition.operator.replace("_", " ")}{" "}
                              {formatCurrency(Number(condition.value))}
                            </>
                          )}
                          {condition.type === "product_quantity" && (
                            <>
                              {
                                t.campaigns.campaign.coupon.sections.preview
                                  .fields.conditions.productQuantity
                              }{" "}
                              {condition.operator.replace("_", " ")}{" "}
                              {condition.value}
                            </>
                          )}
                          {condition.type === "customer_group" && (
                            <>
                              {
                                t.campaigns.campaign.coupon.sections.preview
                                  .fields.conditions.customerGroup
                              }{" "}
                              {condition.value}
                            </>
                          )}
                          {condition.type === "first_purchase" && (
                            <>
                              {
                                t.campaigns.campaign.coupon.sections.preview
                                  .fields.conditions.firstPurchase
                              }
                            </>
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
      {/* <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">
                {
                  t.campaigns.campaign.coupon.sections.preview.fields.stats
                    .totalCollected.label
                }
              </h3>
            </div>
            <p className="mt-2 text-2xl font-bold">{coupon.usageCount || 0}</p>
            <p className="text-xs text-muted-foreground">
              {coupon.usageLimit
                ? `${coupon.usageLimit - (coupon.usageCount || 0)} ${t.campaigns.campaign.coupon.sections.preview.fields.stats.totalCollected.available}`
                : t.campaigns.campaign.coupon.sections.preview.fields.stats
                    .totalCollected.unlimited}
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">
                {
                  t.campaigns.campaign.coupon.sections.preview.fields.stats
                    .totalOrders.label
                }
              </h3>
            </div>
            <p className="mt-2 text-2xl font-bold">142</p>
            <p className="text-xs text-muted-foreground">
              {
                t.campaigns.campaign.coupon.sections.preview.fields.stats
                  .totalOrders.description
              }
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">
                {
                  t.campaigns.campaign.coupon.sections.preview.fields.stats
                    .totalSaved.label
                }
              </h3>
            </div>
            <p className="mt-2 text-2xl font-bold">{formatCurrency(1234.56)}</p>
            <p className="text-xs text-muted-foreground">
              {
                t.campaigns.campaign.coupon.sections.preview.fields.stats
                  .totalSaved.description
              }
            </p>
          </div>
        </Card>
      </div> */}
    </div>
  );
}
