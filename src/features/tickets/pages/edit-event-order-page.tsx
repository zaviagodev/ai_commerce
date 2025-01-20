import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "../../orders/services/order-service";
import { OrderForm } from "../../orders/components/order-form";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderTickets } from "../../tickets/components/order-tickets";
import { PrintButton } from "../../orders/components/print-invoice/print-button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Pencil, Printer } from "lucide-react";

export function EditEventOrderPage() {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data: order, isLoading } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => OrderService.getOrder(id!),
  });

  const updateOrderMutation = useMutation({
    mutationFn: (data: Order) => OrderService.updateOrder(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
      toast.success("Order updated successfully");
    },
  });

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm("Are you sure? Any unsaved changes will be lost.")) {
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
          <Button type="button" variant="outline" onClick={handleCancel}>
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

  if (isLoading) {
    return <Skeleton className="w-full h-[200px]" />;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="space-y-6">
      <OrderForm
        initialData={order}
        onSubmit={updateOrderMutation.mutateAsync}
        headerActions={headerActions}
        isEditing={isEditing}
        onFieldChange={() => setHasChanges(true)}
        extraTabs={[
          {
            label: "Tickets",
            value: "tickets",
            component: <OrderTickets orderId={id!} />,
          },
        ]}
      />
    </div>
  );
}
