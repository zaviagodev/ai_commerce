import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from '@/lib/i18n/hooks';

interface ShippingTrackingProps {
  onCancel: () => void;
  onConfirm: (data: { courier: string; trackingNumber: string }) => void;
}

const COURIERS = [
  'DHL Express',
  'FedEx',
  'UPS',
  'USPS',
  'Kerry Express',
  'Thailand Post',
  'Flash Express',
  'J&T Express',
  'Ninja Van',
] as const;

export function ShippingTrackingSection({
  onCancel,
  onConfirm,
}: ShippingTrackingProps) {
  const t = useTranslation();
  const [courier, setCourier] = useState<string>('');
  const [trackingNumber, setTrackingNumber] = useState<string>('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 p-4 m-6 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700"
    >
      <div className="space-y-2">
        <label className="text-sm text-gray-300">{t.orders.orders.form.sections.payment.shipping.courier}</label>
        <Select value={courier} onValueChange={setCourier}>
          <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-main">
            <SelectValue placeholder={t.orders.orders.form.sections.payment.shipping.courierPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {COURIERS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-300">{t.orders.orders.form.sections.payment.shipping.trackingNumber}</label>
        <Input
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder={t.orders.orders.form.sections.payment.shipping.trackingNumberPlaceholder}
          className="bg-gray-800 border-gray-700 text-main"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="text-gray-300 hover:text-main hover:bg-gray-700"
        >
          {t.orders.orders.actions.cancel}
        </Button>
        <Button
          type="button"
          onClick={() => onConfirm({ courier, trackingNumber })}
          disabled={!courier || !trackingNumber}
          className="bg-green-600 hover:bg-green-700"
        >
          {t.orders.orders.form.sections.payment.shipping.confirm}
        </Button>
      </div>
    </motion.div>
  );
}
