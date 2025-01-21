import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { Plus, X } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/hooks';

interface ProductTypeConfigProps {
  type: string;
  product: Product;
}

export function ProductTypeConfig({ type, product }: ProductTypeConfigProps) {
  const t = useTranslation();
  const [ticketTypes, setTicketTypes] = useState([
    { name: t.products.products.form.modals.productType.tickets.defaultType, price: 0 },
  ]);
  const [timeSlots, setTimeSlots] = useState([
    { time: '', capacity: 0 },
  ]);

  const renderConfig = () => {
    switch (type) {
      case 'tickets':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>{t.products.products.form.modals.productType.tickets.eventDetails}</Label>
              <Input type="datetime-local" className="w-full" />
            </div>

            <div className="space-y-4">
              <Label>{t.products.products.form.modals.productType.tickets.types}</Label>
              {ticketTypes.map((ticket, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={t.products.products.form.modals.productType.tickets.namePlaceholder}
                    value={ticket.name}
                    onChange={(e) => {
                      const newTypes = [...ticketTypes];
                      newTypes[index].name = e.target.value;
                      setTicketTypes(newTypes);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder={t.products.products.form.modals.productType.tickets.pricePlaceholder}
                    value={ticket.price}
                    onChange={(e) => {
                      const newTypes = [...ticketTypes];
                      newTypes[index].price = Number(e.target.value);
                      setTicketTypes(newTypes);
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setTicketTypes(ticketTypes.filter((_, i) => i !== index));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setTicketTypes([...ticketTypes, { name: '', price: 0 }])}
              >
                <Plus className="mr-2 h-4 w-4" />
                {t.products.products.form.modals.productType.tickets.addType}
              </Button>
            </div>
          </div>
        );

      case 'booking':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>{t.products.products.form.modals.productType.booking.duration}</Label>
              <Input type="number" min="15" step="15" />
            </div>

            <div className="space-y-4">
              <Label>{t.products.products.form.modals.productType.booking.timeSlots}</Label>
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="time"
                    value={slot.time}
                    onChange={(e) => {
                      const newSlots = [...timeSlots];
                      newSlots[index].time = e.target.value;
                      setTimeSlots(newSlots);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder={t.products.products.form.modals.productType.booking.capacityPlaceholder}
                    value={slot.capacity}
                    onChange={(e) => {
                      const newSlots = [...timeSlots];
                      newSlots[index].capacity = Number(e.target.value);
                      setTimeSlots(newSlots);
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setTimeSlots(timeSlots.filter((_, i) => i !== index));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setTimeSlots([...timeSlots, { time: '', capacity: 0 }])}
              >
                <Plus className="mr-2 h-4 w-4" />
                {t.products.products.form.modals.productType.booking.addSlot}
              </Button>
            </div>
          </div>
        );

      case 'subscription':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>{t.products.products.form.modals.productType.subscription.billingCycle}</Label>
              <div className="grid gap-4">
                <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
                  <Label>{t.products.products.form.modals.productType.subscription.weekly}</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
                  <Label>{t.products.products.form.modals.productType.subscription.monthly}</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
                  <Label>{t.products.products.form.modals.productType.subscription.annually}</Label>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t.products.products.form.modals.productType.subscription.trialPeriod}</Label>
              <Input type="number" min="0" />
            </div>
          </div>
        );

      case 'digital':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>{t.products.products.form.modals.productType.digital.downloadSettings}</Label>
              <div className="grid gap-4">
                <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
                  <Label>{t.products.products.form.modals.productType.digital.limitDownloads}</Label>
                  <Switch />
                </div>
                <Input type="number" placeholder={t.products.products.form.modals.productType.digital.maxDownloads} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t.products.products.form.modals.productType.digital.linkExpiration}</Label>
              <Input type="number" min="1" />
            </div>
          </div>
        );

      case 'bundle':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>{t.products.products.form.modals.productType.bundle.settings}</Label>
              <div className="grid gap-4">
                <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
                  <Label>{t.products.products.form.modals.productType.bundle.allowIndividual}</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
                  <Label>{t.products.products.form.modals.productType.bundle.dynamicPricing}</Label>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t.products.products.form.modals.productType.bundle.discount}</Label>
              <Input type="number" min="0" max="100" />
            </div>
          </div>
        );

      case 'customizable':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>{t.products.products.form.modals.productType.customizable.options}</Label>
              <div className="grid gap-4">
                <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
                  <Label>{t.products.products.form.modals.productType.customizable.textEngraving}</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
                  <Label>{t.products.products.form.modals.productType.customizable.colorSelection}</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
                  <Label>{t.products.products.form.modals.productType.customizable.sizeOptions}</Label>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t.products.products.form.modals.productType.customizable.additionalFee}</Label>
              <Input type="number" min="0" placeholder={t.products.products.form.modals.productType.customizable.feePlaceholder} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{t.products.products.form.modals.productType.configuration}</h3>
      {renderConfig()}
    </div>
  );
}