import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Campaign } from '@/types/campaign';
import { Layout } from 'lucide-react';

interface DisplaySettingsProps {
  form: UseFormReturn<Campaign>;
}

export function DisplaySettings({ form }: DisplaySettingsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
          <Layout className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">Display Settings</h2>
          <p className="text-sm text-muted-foreground">
            Configure how the campaign appears to customers
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {/* Display settings content will be added in future updates */}
        <div className="text-sm text-muted-foreground">
          Display settings will be available soon
        </div>
      </CardContent>
    </Card>
  );
}