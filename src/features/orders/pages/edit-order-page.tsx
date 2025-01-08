import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button'; 
import { toast } from 'sonner';
import { OrderForm } from '../components/order-form';
import { Order } from '@/types/order';
import { useOrders } from '../hooks/use-orders';
import { PrintButton } from '../components/print-invoice/print-button';
import { motion } from 'framer-motion';
import { Pencil, Printer } from 'lucide-react';

export function EditOrderPage() {
  const { id } = useParams();
  const { orders, updateOrder } = useOrders();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return <div>Order not found</div>;
  }

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('Are you sure? Any unsaved changes will be lost.')) {
        setIsEditing(false);
        setHasChanges(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PrintButton order={order} />
      </motion.div>
      {!isEditing ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button 
            onClick={() => setIsEditing(true)} 
            variant="default"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Order
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={!hasChanges}
            className="bg-green-600 hover:bg-green-700"
          >
            Save Changes
          </Button>
        </motion.div>
      )}
    </div>
  );

  const handleSubmit = async (data: Order) => {
    try {
      await updateOrder.mutateAsync({
        id: order.id,
        data: {
          customerId: data.customerId,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          shippingAddress: data.shippingAddress,
          status: data.status,
          items: data.items,
          subtotal: data.subtotal,
          discount: data.discount,
          shipping: data.shipping,
          tax: data.tax,
          total: data.total,
          notes: data.notes,
          tags: data.tags,
        }
      });
      setIsEditing(false);
      setHasChanges(false);
      toast.success('Order updated successfully');
    } catch (error) {
      console.error('Failed to update order:', error);
      toast.error('Failed to update order');
    }
  };

  return (
    <OrderForm
      initialData={order}
      onSubmit={handleSubmit}
      isEditing={isEditing}
      headerActions={headerActions}
      onFieldChange={() => setHasChanges(true)}
    />
  );
}