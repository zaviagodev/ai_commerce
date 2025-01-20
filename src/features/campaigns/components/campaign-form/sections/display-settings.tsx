import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Campaign } from '@/types/campaign';
import { Layout } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/hooks';

interface DisplaySettingsProps {
  form: UseFormReturn<Campaign>;
}

export function DisplaySettings({ form }: DisplaySettingsProps) {
  const t = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
          <Layout className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">{ t.customers.customer.campaignForm.sections.displaySettings.title}</h2>
          <p className="text-sm text-muted-foreground">
            { t.customers.customer.campaignForm.sections.displaySettings.description}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {/* Display settings content will be added in future updates */}
        <div className="text-sm text-muted-foreground">
          { t.customers.customer.campaignForm.sections.displaySettings.fields.showProgress.description}
        </div>
      </CardContent>
    </Card>
  );
}