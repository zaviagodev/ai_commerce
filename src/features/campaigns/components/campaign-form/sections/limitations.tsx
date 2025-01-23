import { UseFormReturn } from "react-hook-form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Campaign } from "@/types/campaign";
import { Shield } from "lucide-react";
import { useTranslation } from "@/lib/i18n/hooks";

interface LimitationsProps {
  form: UseFormReturn<Campaign>;
}

export function Limitations({ form }: LimitationsProps) {
  const t = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
          <Shield className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">
            {t.customers.customer.campaignForm.sections.limitations.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.customers.customer.campaignForm.sections.limitations.description}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {/* Limitations content will be added in future updates */}
        <div className="text-sm text-muted-foreground">
          {
            t.customers.customer.campaignForm.sections.limitations.fields
              .usageLimit.description
          }
        </div>
      </CardContent>
    </Card>
  );
}
