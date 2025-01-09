import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Settings } from 'lucide-react';
import { Order } from '@/types/order';
import { ShippingTypeDialog } from './shipping/shipping-type-dialog';
import { DynamicShipping } from './shipping/dynamic-shipping';
import { ManualShipping } from './shipping/manual-shipping'; 

interface ShippingProps {
  form: UseFormReturn<Order>;
}

export function Shipping({ form }: ShippingProps) {
  const [shippingType, setShippingType] = useState<'dynamic' | 'manual'>('manual'); 
  const currentShipping = form.watch('shipping') || 0;

  const handleShippingTypeChange = (type: 'dynamic' | 'manual') => {
    // Preserve current shipping cost when switching types
    const prevType = shippingType;
    setShippingType(type);

    // If switching to dynamic, set to default standard shipping
    if (type === 'dynamic' && prevType === 'manual') {
      form.setValue('shipping', 5.00); // Standard shipping cost
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
          <Truck className="h-5 w-5 text-emerald-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">Shipping</h2>
          <p className="text-sm text-muted-foreground">
            Configure shipping details and costs
          </p>
        </div>
        <ShippingTypeDialog 
          currentType={shippingType}
          onSelect={handleShippingTypeChange}
        >
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            {shippingType === 'dynamic' ? 'Dynamic Shipping' : 'Manual Shipping'}
          </Button>
        </ShippingTypeDialog>
      </CardHeader>
      <CardContent>
        {shippingType === 'dynamic' ? (
          <DynamicShipping 
            form={form}
            currentShipping={currentShipping}
          />
        ) : (
          <ManualShipping 
            form={form}
            currentShipping={currentShipping}
          />
        )}
      </CardContent>
    </Card>
  );
}