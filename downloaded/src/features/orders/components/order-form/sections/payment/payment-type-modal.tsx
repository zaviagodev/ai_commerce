import { CreditCard, Link2, Receipt } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Order } from '@/types/order';
import { useState } from 'react';
import { ManualPaymentSection } from './manual-payment-section';

interface PaymentTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  onManualPaymentSelect: () => void;
  onCheckoutLinkSelect?: () => void;
}

export function PaymentTypeModal({ 
  open, 
  onOpenChange, 
  order,
  onManualPaymentSelect,
  onCheckoutLinkSelect
}: PaymentTypeModalProps) {
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);

  const handleManualPayment = () => {
    // Close modal and trigger manual payment section
    onManualPaymentSelect();
    setSelectedPaymentType('manual');
    onOpenChange(false);
  };

  const handleShareCheckout = () => {
    // Close modal and set payment type
    setSelectedPaymentType('checkout');
    if (onCheckoutLinkSelect) {
      onCheckoutLinkSelect();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Select Payment Type</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="flex items-start gap-4 h-auto p-4 justify-start"
            onClick={handleManualPayment}
            type="button"
          >
            <Receipt className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Manual Payment</div>
              <p className="text-sm text-muted-foreground">
                Record a manual payment for this order
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="flex items-start gap-4 h-auto p-4 justify-start"
            onClick={handleShareCheckout}
            type="button"
          >
            <Link2 className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Share Checkout Link</div>
              <p className="text-sm text-muted-foreground">
                Share a secure payment link with your customer
              </p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}