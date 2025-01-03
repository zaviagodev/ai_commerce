import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Truck, Calculator } from 'lucide-react';

interface ShippingTypeDialogProps {
  children: React.ReactNode;
  currentType: 'dynamic' | 'manual';
  onSelect: (type: 'dynamic' | 'manual') => void;
}

export function ShippingTypeDialog({ children, currentType, onSelect }: ShippingTypeDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Shipping Type</DialogTitle>
        </DialogHeader>
        <RadioGroup
          value={currentType}
          className="grid gap-4"
          onValueChange={(value) => {
            onSelect(value as 'dynamic' | 'manual');
            setOpen(false);
          }}
        >
          <div className="relative">
            <RadioGroupItem value="dynamic" id="dynamic" className="peer sr-only" />
            <Label
              htmlFor="dynamic"
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Dynamic Shipping Cost</div>
                  <div className="text-sm text-muted-foreground">
                    Calculate shipping cost based on rules
                  </div>
                </div>
              </div>
            </Label>
          </div>
          <div className="relative">
            <RadioGroupItem value="manual" id="manual" className="peer sr-only" />
            <Label
              htmlFor="manual"
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Calculator className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Manual Shipping Cost</div>
                  <div className="text-sm text-muted-foreground">
                    Enter shipping cost manually
                  </div>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}