import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomerForm } from "./customer-form";
import { Customer } from "@/types/customer";
import { useCustomers } from "@/features/customers/hooks/use-customers";
import { toast } from "sonner";
import { useTranslation } from "@/lib/i18n/hooks";

interface NewCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (customer: Customer) => void;
}

export function NewCustomerDialog({
  open,
  onOpenChange,
  onSuccess,
}: NewCustomerDialogProps) {
  const t = useTranslation();
  const { createCustomer } = useCustomers();

  const handleSubmit = async (data: Customer) => {
    try {
      const customer = await createCustomer.mutateAsync(data);
      toast.success("Customer created successfully");
      onSuccess(customer);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create customer:", error);
      toast.error("Failed to create customer");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t.orders.orders.customer.new.title}</DialogTitle>
        </DialogHeader>
        <CustomerForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={createCustomer.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
