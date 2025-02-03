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
import { Campaign } from "@/types/campaign";
import { Coins } from "lucide-react";
import { useTranslation } from "@/lib/i18n/hooks";

interface PointsConfigProps {
  form: UseFormReturn<Campaign>;
}

export function PointsConfig({ form }: PointsConfigProps) {
  const type = form.watch("type");
  const t = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
          <Coins className="h-5 w-5 text-yellow-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {t.customers.customer.campaignForm.sections.pointsConfig.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {
              t.customers.customer.campaignForm.sections.pointsConfig
                .description
            }
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {type === "points_multiplier" ? (
          <FormField
            control={form.control}
            name="multiplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    t.customers.customer.campaignForm.sections.pointsConfig
                      .fields.multiplier.label
                  }
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      min="1"
                      value={field.value || ""}
                      step="0.1"
                      placeholder={
                        t.customers.customer.campaignForm.sections.pointsConfig
                          .fields.multiplier.placeholder
                      }
                      className="pr-8"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      x
                    </span>
                  </div>
                </FormControl>
                <FormDescription>
                  {
                    t.customers.customer.campaignForm.sections.pointsConfig
                      .fields.multiplier.description
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="bonusPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    t.customers.customer.campaignForm.sections.pointsConfig
                      .fields.bonusPoints.label
                  }
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder={
                      t.customers.customer.campaignForm.sections.pointsConfig
                        .fields.bonusPoints.placeholder
                    }
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  {
                    t.customers.customer.campaignForm.sections.pointsConfig
                      .fields.bonusPoints.description
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
