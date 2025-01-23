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
import { Campaign } from "@/types/campaign";
import { Filter } from "lucide-react";
import { EarningRules } from "./earning-rules";
import { useTranslation } from "@/lib/i18n/hooks";

interface ConditionsProps {
  form: UseFormReturn<Campaign>;
}

export function Conditions({ form }: ConditionsProps) {
  const hasConditions = form.watch("hasConditions");
  const t = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
          <Filter className="h-5 w-5 text-teal-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">
            {t.customers.customer.campaignForm.sections.conditions.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.customers.customer.campaignForm.sections.conditions.description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="hasConditions"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>
                  {
                    t.customers.customer.campaignForm.sections.conditions.fields
                      .minimumPurchase.label
                  }
                </FormLabel>
                <FormDescription>
                  {
                    t.customers.customer.campaignForm.sections.conditions.fields
                      .minimumPurchase.description
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

        {hasConditions && (
          <div className="space-y-4">
            <EarningRules form={form} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
