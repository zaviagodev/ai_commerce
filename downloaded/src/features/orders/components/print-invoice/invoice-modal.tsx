import { useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Order } from '@/types/order';
import { useAuth } from '@/lib/auth/auth-hooks';
import { useReactToPrint } from '@/hooks/use-react-to-print';
import { formatCurrency } from '@/lib/utils';
import { Printer, X } from 'lucide-react';

interface InvoiceModalProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceModal({ order, open, onOpenChange }: InvoiceModalProps) {
  const { user } = useAuth();
  const date = new Date(order.createdAt).toLocaleDateString();
  const invoiceNumber = `INV-${order.id.split('-')[0].toUpperCase()}`;
  
  const handlePrint = useReactToPrint({
    content: () => document.getElementById('invoice-content'),
    onAfterPrint: () => {
      // Optional: Close modal after printing is complete
      // onOpenChange(false);
    }
  });
  
  const handlePrintClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();  // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    handlePrint();
  }, [handlePrint]); 
  
  const handleCloseClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();  // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    onOpenChange(false);
  }, [onOpenChange]);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl print:shadow-none">
        <DialogHeader className="flex flex-row items-center justify-between print:hidden">
          <DialogTitle>Invoice Preview</DialogTitle>
          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              onClick={handlePrintClick}
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button 
              type="button"
              variant="outline" 
              onClick={handleCloseClick}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-8" id="invoice-content">
          {/* Header */}
          <div className="flex justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
              <p className="text-muted-foreground">{invoiceNumber}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold mb-2">{user?.storeName}</h2>
              <p className="text-muted-foreground">Date: {date}</p>
            </div>
          </div>

          {/* Customer Info */}
          {order.customerName && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Bill To:</h3>
              <div className="space-y-1">
                <p className="font-medium">{order.customerName}</p>
                {order.customerEmail && <p>{order.customerEmail}</p>}
                {order.customerPhone && <p>{order.customerPhone}</p>}
                {/* Show billing address if available, otherwise show shipping address */}
                {(order.billingAddress || order.shippingAddress) && (
                  <>
                    <div className="mt-2">
                      <p>{(order.billingAddress || order.shippingAddress).address1}</p>
                      {(order.billingAddress || order.shippingAddress).address2 && (
                        <p>{(order.billingAddress || order.shippingAddress).address2}</p>
                      )}
                      <p>
                        {(order.billingAddress || order.shippingAddress).city},{' '}
                        {(order.billingAddress || order.shippingAddress).state}{' '}
                        {(order.billingAddress || order.shippingAddress).postalCode}
                      </p>
                      <p>{(order.billingAddress || order.shippingAddress).country}</p>
                    </div>
                  </>
                )}
                {/* Show shipping address separately if different from billing */}
                {order.billingAddress && order.shippingAddress && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Ship To:</h4>
                    <p>{order.shippingAddress.address1}</p>
                    {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Item</th>
                  <th className="py-2 text-right">Quantity</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2 text-right">{item.quantity}</td>
                    <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                    <td className="py-2 text-right">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between py-2 text-destructive">
                  <span>Discount:</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}
              {order.shipping > 0 && (
                <div className="flex justify-between py-2">
                  <span>Shipping:</span>
                  <span>{formatCurrency(order.shipping)}</span>
                </div>
              )}
              {order.tax > 0 && (
                <div className="flex justify-between py-2">
                  <span>Tax:</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-t font-semibold">
                <span>Total:</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Notes:</h3>
              <p className="text-muted-foreground">{order.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-muted-foreground">
            <p>Thank you for your business!</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}