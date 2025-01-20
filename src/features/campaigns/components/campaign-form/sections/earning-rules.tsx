import { UseFormReturn } from "react-hook-form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Campaign } from "@/types/campaign";
import { Target } from "lucide-react";
import { RuleBuilder } from "./earning-rules/rule-builder";
import { useTranslation } from "@/lib/i18n/hooks";

interface EarningRulesProps {
  form: UseFormReturn<Campaign>;
}

export function EarningRules({ form }: EarningRulesProps) {
  const t = useTranslation();
  const qrEnabled = form.watch("qrEnabled");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          <Target className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">
            {t.campaigns.campaign.sections.earningRules.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {qrEnabled
              ? t.campaigns.campaign.sections.earningRules.description.qr
              : t.campaigns.campaign.sections.earningRules.description.default}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <RuleBuilder form={form} />
      </CardContent>
    </Card>
  );
}
