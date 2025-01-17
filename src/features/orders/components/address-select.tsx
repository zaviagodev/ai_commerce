import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CustomerAddress } from '@/types/customer';
import { Order } from '@/types/order';
import { useTranslation } from '@/lib/i18n/hooks';

interface AddressSelectProps {
  addresses: CustomerAddress[];
  selectedAddress?: CustomerAddress;
  onSelect: (address: CustomerAddress) => void;
}

export function AddressSelect({ addresses, selectedAddress, onSelect }: AddressSelectProps) {
  const t = useTranslation();
  const [open, setOpen] = useState(false);
  const defaultAddress = addresses.find(a => a.isDefault && a.type === 'shipping');

  const formatAddress = (address: CustomerAddress) => {
    const parts = [
      address.address1,
      address.address2,
      address.city,
      address.state,
      address.postalCode,
      address.country
    ].filter(Boolean);
    return parts.join(', ');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal h-auto py-3"
        >
          <div className="flex gap-3">
            <MapPin className="h-4 w-4 mt-1 shrink-0" />
            <div className="flex-1 space-y-1">
              <p className="font-medium">
                {selectedAddress ? 
                  `${selectedAddress.firstName} ${selectedAddress.lastName}` :
                  defaultAddress ?
                    `${defaultAddress.firstName} ${defaultAddress.lastName}` :
                    t.orders.orders.address.select.placeholder
                }
              </p>
              {(selectedAddress || defaultAddress) && (
                <p className="text-sm text-muted-foreground">
                  {formatAddress(selectedAddress || defaultAddress!)}
                </p>
              )}
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t.orders.orders.address.select.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 py-4">
            {addresses.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                {t.orders.orders.address.select.empty}
              </p>
            ) : (
              addresses.map((address) => (
                <Button
                  key={address.id}
                  variant="outline"
                  className="w-full justify-start h-auto py-3"
                  onClick={() => {
                    onSelect(address);
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {address.firstName} {address.lastName}
                      </span>
                      {address.isDefault && address.type === 'shipping' && (
                        <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                          {t.orders.orders.address.select.default}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatAddress(address)}
                    </p>
                  </div>
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}