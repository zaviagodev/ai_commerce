import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Truck } from 'lucide-react';
import { EcommerceSettings } from '../../schemas/ecommerce-settings-schema';

interface ShippingSettingsProps {
  form: UseFormReturn<EcommerceSettings>;
}

export function ShippingSettings({ form }: ShippingSettingsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Truck className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Shipping Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure shipping methods and rates
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          Shipping settings will be available soon
        </div>
      </CardContent>
    </Card>
  );
}