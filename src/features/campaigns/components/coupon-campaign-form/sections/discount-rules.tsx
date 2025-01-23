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
import { motion } from "framer-motion";
import { Percent, Truck, Coins, Gift, Sparkles } from "lucide-react";
import { Coupon } from "@/types/coupon";
import { cn } from "@/lib/utils";
import { TemplateModal } from "./template-modal";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/hooks";

interface DiscountRulesProps {
  form: UseFormReturn<Coupon>;
}

const DISCOUNT_TYPES = [
  {
    id: "percentage",
    name: "Percentage Discount",
    description: "Offer a percentage off the order total",
    icon: Percent,
    gradient: "from-blue-500/10 to-purple-500/10",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "fixed",
    name: "Fixed Amount",
    description: "Offer a fixed amount off the order total",
    icon: Coins,
    gradient: "from-green-500/10 to-emerald-500/10",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "shipping",
    name: "Free Shipping",
    description: "Offer free shipping on qualifying orders",
    icon: Truck,
    gradient: "from-orange-500/10 to-yellow-500/10",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  // {
  //   id: 'points',
  //   name: 'Cashback Points',
  //   description: 'Award bonus points on purchases',
  //   icon: Gift,
  //   gradient: 'from-purple-500/10 to-pink-500/10',
  //   iconBg: 'bg-purple-100',
  //   iconColor: 'text-purple-600',
  // },
] as const;

export function DiscountRules({ form }: DiscountRulesProps) {
  const discountType = form.watch("type");
  const t = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
          <Percent className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">
              {t.campaigns.campaign.coupon.sections.discountRules.title}
            </h2>
            {/* <TemplateModal
              onSelect={(template) => {
                form.setValue('type', template.defaults.type);
                form.setValue('value', template.defaults.value);
                form.setValue('description', template.defaults.description);
                if (template.defaults.minPurchaseAmount !== undefined) {
                  form.setValue('minPurchaseAmount', template.defaults.minPurchaseAmount);
                }
              }}
            >
              <Button variant="outline" size="sm">
                <Sparkles className="mr-2 h-4 w-4" />
                Templates
              </Button>
            </TemplateModal> */}
          </div>
          <p className="text-sm text-muted-foreground">
            {t.campaigns.campaign.coupon.sections.discountRules.description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* Discount Type Selection */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {
                  t.campaigns.campaign.coupon.sections.discountRules.fields.type
                    .label
                }
              </FormLabel>
              <FormControl>
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {DISCOUNT_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isSelected = field.value === type.id;

                    return (
                      <motion.div key={type.id} variants={item}>
                        <button
                          type="button"
                          className={cn(
                            "w-full text-left relative overflow-hidden rounded-lg p-4 transition-all",
                            "hover:scale-[1.02] active:scale-[0.98]",
                            "border-2",
                            isSelected
                              ? "border-primary"
                              : "border-transparent hover:border-primary/50",
                          )}
                          onClick={() => field.onChange(type.id)}
                        >
                          {/* Background gradient */}
                          <div
                            className={cn(
                              "absolute inset-0 bg-gradient-to-br",
                              type.gradient,
                            )}
                            style={{
                              maskImage:
                                "radial-gradient(circle at 70% 30%, black, transparent)",
                              WebkitMaskImage:
                                "radial-gradient(circle at 70% 30%, black, transparent)",
                            }}
                          />

                          <div className="relative space-y-3">
                            <div
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-lg",
                                type.iconBg,
                              )}
                            >
                              <Icon className={cn("h-5 w-5", type.iconColor)} />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {
                                  t.campaigns.campaign.coupon.sections
                                    .discountRules.fields.type.options[type.id]
                                }
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {type.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </FormControl>
              <FormDescription>
                {
                  t.campaigns.campaign.coupon.sections.discountRules.fields.type
                    .description
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Discount Value */}
        {(discountType === "percentage" || discountType === "fixed") && (
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    t.campaigns.campaign.coupon.sections.discountRules.fields
                      .value.label
                  }
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      min="0"
                      step={discountType === "percentage" ? "1" : "0.01"}
                      max={discountType === "percentage" ? "100" : undefined}
                      className="pr-8"
                      placeholder={
                        t.campaigns.campaign.coupon.sections.discountRules
                          .fields.value.placeholder
                      }
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {discountType === "percentage" ? "%" : "$"}
                    </span>
                  </div>
                </FormControl>
                <FormDescription>
                  {
                    t.campaigns.campaign.coupon.sections.discountRules.fields
                      .value.description
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Points Settings */}
        {discountType === "points" && (
          <>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Points Multiplier</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        min="1"
                        step="0.1"
                        className="pr-8"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        x
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Multiply base points earned from purchase
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxPointsEarned"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Points Cap</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum points that can be earned (leave empty for no limit)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pointsValidity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Points Validity (days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Number of days before earned points expire
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Minimum Purchase Amount */}
        <FormField
          control={form.control}
          name="minPurchaseAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {
                  t.campaigns.campaign.coupon.sections.discountRules.fields
                    .minPurchase.label
                }
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    className="pr-8"
                    placeholder={
                      t.campaigns.campaign.coupon.sections.discountRules.fields
                        .minPurchase.placeholder
                    }
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                </div>
              </FormControl>
              <FormDescription>
                {
                  t.campaigns.campaign.coupon.sections.discountRules.fields
                    .minPurchase.description
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Maximum Discount Amount (for percentage discounts) */}
        {discountType === "percentage" && (
          <FormField
            control={form.control}
            name="maxDiscountAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    t.campaigns.campaign.coupon.sections.discountRules.fields
                      .maxDiscount.label
                  }
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      className="pr-8"
                      placeholder={
                        t.campaigns.campaign.coupon.sections.discountRules
                          .fields.maxDiscount.placeholder
                      }
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                  </div>
                </FormControl>
                <FormDescription>
                  {
                    t.campaigns.campaign.coupon.sections.discountRules.fields
                      .maxDiscount.description
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}
