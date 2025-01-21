import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Truck } from 'lucide-react';
import { EcommerceSettings } from '../../schemas/ecommerce-settings-schema';
import { useTranslation } from '@/lib/i18n/hooks';

interface ShippingSettingsProps {
  form: UseFormReturn<EcommerceSettings>;
}

export function ShippingSettings({ form }: ShippingSettingsProps) {
  const t = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Truck className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">{t.settings.ecommerce.shipping.title}</h3>
          <p className="text-sm text-muted-foreground">
            {t.settings.ecommerce.shipping.subtitle}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          {t.settings.ecommerce.shipping.comingSoon}
        </div>
      </CardContent>
    </Card>
  );
}
