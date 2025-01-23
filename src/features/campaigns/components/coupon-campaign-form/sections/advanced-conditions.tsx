import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { Coupon } from "@/types/coupon";
import { RuleBuilder } from "./rule-builder";
import { useTranslation } from "@/lib/i18n/hooks";

interface AdvancedConditionsProps {
  form: UseFormReturn<Coupon>;
}

export function AdvancedConditions({ form }: AdvancedConditionsProps) {
  const t = useTranslation();
  const advancedMode = form.watch("advancedMode");
  const conditions = form.watch("conditions") || [];

  const addCondition = () => {
    const newCondition = {
      id: crypto.randomUUID(),
      type: "cart_total",
      operator: "greater_than",
      value: "",
      enabled: true,
      logicGate: conditions.length > 0 ? "and" : undefined,
    };
    form.setValue("conditions", [...conditions, newCondition]);
  };

  const removeCondition = (id: string) => {
    form.setValue(
      "conditions",
      conditions.filter((c) => c.id !== id),
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
          <Filter className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">
            {t.campaigns.campaign.coupon.sections.advancedConditions.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {
              t.campaigns.campaign.coupon.sections.advancedConditions
                .description
            }
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="advancedMode"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>
                  {
                    t.campaigns.campaign.coupon.sections.advancedConditions
                      .fields.advancedMode.label
                  }
                </FormLabel>
                <FormDescription>
                  {
                    t.campaigns.campaign.coupon.sections.advancedConditions
                      .fields.advancedMode.description
                  }
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {advancedMode && <RuleBuilder form={form} />}
      </CardContent>
    </Card>
  );
}
