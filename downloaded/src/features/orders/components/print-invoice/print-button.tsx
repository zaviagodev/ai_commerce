import { useState } from 'react';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Order } from '@/types/order';
import { InvoiceModal } from './invoice-modal';
import { useCallback } from 'react';

interface PrintButtonProps {
  order: Order;
}

export function PrintButton({ order }: PrintButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();  // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    setIsOpen(true);
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={handleClick}
      >
        <Printer className="mr-2 h-4 w-4" />
        Print Invoice
      </Button>

      <InvoiceModal
        order={order}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}