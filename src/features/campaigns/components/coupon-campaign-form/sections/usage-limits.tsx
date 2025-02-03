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
import { Users } from "lucide-react";
import { Coupon } from "@/types/coupon";
import { useTranslation } from "@/lib/i18n/hooks";

interface UsageLimitsProps {
  form: UseFormReturn<Coupon>;
}

export function UsageLimits({ form }: UsageLimitsProps) {
  const t = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
          <Users className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {t.campaigns.campaign.coupon.sections.usageLimits.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.campaigns.campaign.coupon.sections.usageLimits.description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="usageLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {
                  t.campaigns.campaign.coupon.sections.usageLimits.fields
                    .totalLimit.label
                }{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder={
                    t.campaigns.campaign.coupon.sections.usageLimits.fields
                      .totalLimit.placeholder
                  }
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
                {
                  t.campaigns.campaign.coupon.sections.usageLimits.fields
                    .totalLimit.description
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="perCustomerLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {
                  t.campaigns.campaign.coupon.sections.usageLimits.fields
                    .perCustomer.label
                }{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder={
                    t.campaigns.campaign.coupon.sections.usageLimits.fields
                      .perCustomer.placeholder
                  }
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
                {
                  t.campaigns.campaign.coupon.sections.usageLimits.fields
                    .perCustomer.description
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
