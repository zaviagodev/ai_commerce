import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Search, Plus } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCustomers } from "@/features/customers/hooks/use-customers";
import { Order } from "@/types/order";
import { NewCustomerDialog } from "./new-customer-dialog";
import { Customer } from "@/types/customer";
import { useTranslation } from "@/lib/i18n/hooks";

interface CustomerSelectProps {
  form: UseFormReturn<Order>;
}

export function CustomerSelect({ form }: CustomerSelectProps) {
  const t = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const { customers } = useCustomers();

  const filteredCustomers = customers.filter((customer) =>
    `${customer.firstName} ${customer.lastName} ${customer.email}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const selectedCustomerId = form.watch("customerId");
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);

  // Initialize form values to empty strings instead of undefined
  useEffect(() => {
    if (!form.getValues("customerName")) {
      form.setValue("customerName", "");
    }
    if (!form.getValues("customerEmail")) {
      form.setValue("customerEmail", "");
    }
    if (!form.getValues("customerPhone")) {
      form.setValue("customerPhone", "");
    }
  }, [form]);

  const handleCustomerCreated = (customer: Customer) => {
    form.setValue("customerId", customer.id);
    form.setValue("customerName", `${customer.firstName} ${customer.lastName}`);
    form.setValue("customerEmail", customer.email);
    form.setValue("customerPhone", customer.phone || "");
    setOpen(false);
  };

  return (
    <FormField
      control={form.control}
      name="customerId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {t.orders.orders.customer.title}{" "}
            <span className="text-destructive">*</span>
          </FormLabel>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Search className="mr-2 h-4 w-4" />
                  {selectedCustomer
                    ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}`
                    : t.orders.orders.customer.select.placeholder}
                </Button>
              </FormControl>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {t.orders.orders.customer.select.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder={t.orders.orders.customer.select.placeholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {filteredCustomers.length > 0 ? (
                  <div className="max-h-[300px] space-y-2 overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <Button
                        key={customer.id}
                        variant="ghost"
                        className="w-full justify-start h-fit"
                        onClick={() => {
                          field.onChange(customer.id);
                          form.setValue(
                            "customerName",
                            `${customer.firstName} ${customer.lastName}`,
                          );
                          form.setValue("customerEmail", customer.email);
                          form.setValue("customerPhone", customer.phone || "");
                          setOpen(false);
                        }}
                      >
                        <div className="text-left">
                          <div>
                            {customer.firstName} {customer.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {customer.email}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {customer.loyaltyPoints || 0} points
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    {t.orders.orders.customer.select.empty}
                  </div>
                )}
                <div className="pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowNewCustomer(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {t.orders.orders.customer.select.create}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <NewCustomerDialog
            open={showNewCustomer}
            onOpenChange={setShowNewCustomer}
            onSuccess={handleCustomerCreated}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
