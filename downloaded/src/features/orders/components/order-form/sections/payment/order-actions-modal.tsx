import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useOrders } from '@/features/orders/hooks/use-orders';
import { toast } from 'sonner';
import { 
  RefreshCw, 
  Ban, 
  AlertTriangle, 
  CheckCircle2, 
  Wallet, 
  Flag,
  AlertCircle,
} from 'lucide-react';

interface OrderActionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  onStatusChange: (status: string) => Promise<void>;
  onSavingChange: (saving: boolean) => void;
}

type ActionStep = 'list' | 'refund' | 'cancel' | 'dispute' | 'fulfill' | 'credit' | 'flag';

export function OrderActionsModal({ 
  open, 
  onOpenChange,
  order,
  onStatusChange,
  onSavingChange
}: OrderActionsModalProps) {
  const [step, setStep] = useState<ActionStep>('list');
  const [refundAmount, setRefundAmount] = useState('');
  const [reason, setReason] = useState('');
  const { updateOrder } = useOrders();
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    setStep('list');
    setRefundAmount('');
    setReason('');
  };

  const handleCancel = async () => {
    setIsLoading(true);
    onSavingChange(true);
    try {
      await updateOrder.mutateAsync({
        id: order.id,
        data: {
          status: 'cancelled',
          notes: reason
        }
      });
      toast.success('Order cancelled successfully');
      onOpenChange(false);
      await onStatusChange('cancelled');
    } catch (error) {
      console.error('Failed to cancel order:', error);
      toast.error('Failed to cancel order');
      setIsLoading(false);
      onSavingChange(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'refund':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label>Refund Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  className="pl-6"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Reason for Refund</Label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for refund..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleBack}>Back</Button>
              <Button 
                onClick={() => {
                  onAction('refund', { amount: refundAmount, reason });
                  onOpenChange(false);
                }}
                disabled={!refundAmount || !reason}
              >
                Process Refund
              </Button>
            </div>
          </motion.div>
        );

      case 'cancel':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="rounded-lg bg-red-50 p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <h4 className="font-medium text-red-800">Cancel Order</h4>
                  <p className="text-sm text-red-600">
                    This action cannot be undone. The order will be marked as cancelled.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cancellation Reason</Label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for cancellation..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleBack}>Back</Button>
              <Button 
                variant="destructive"
                onClick={handleCancel}
                disabled={!reason || isLoading}
              >
                {isLoading ? 'Cancelling...' : 'Cancel Order'}
              </Button>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-2"
          >
            <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={() => setStep('refund')}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Issue Refund</div>
                  <p className="text-sm text-muted-foreground">
                    Process full or partial refund
                  </p>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={() => setStep('cancel')}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  <Ban className="h-5 w-5 text-red-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Cancel Order</div>
                  <p className="text-sm text-muted-foreground">
                    Cancel this order and notify customer
                  </p>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={() => setStep('dispute')}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Mark as Disputed</div>
                  <p className="text-sm text-muted-foreground">
                    Flag order for payment dispute
                  </p>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={() => setStep('fulfill')}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Mark as Fulfilled</div>
                  <p className="text-sm text-muted-foreground">
                    Mark order as fulfilled and shipped
                  </p>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={() => setStep('credit')}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Wallet className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Apply Store Credit</div>
                  <p className="text-sm text-muted-foreground">
                    Add store credit to customer account
                  </p>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={() => setStep('flag')}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                  <Flag className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Flag for Review</div>
                  <p className="text-sm text-muted-foreground">
                    Mark order for internal review
                  </p>
                </div>
              </div>
            </Button>
          </motion.div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order Actions</DialogTitle>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}