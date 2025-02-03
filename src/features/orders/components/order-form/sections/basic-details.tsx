import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomerSelect } from "../../customer-select";
import { AddressSelect } from "../../address-select";
import { useCustomers } from "@/features/customers/hooks/use-customers";
import { Order } from "@/types/order";
import { User, Package } from "lucide-react";
import { useTranslation } from "@/lib/i18n/hooks";
import { Checkbox } from "@/components/ui/checkbox";

interface BasicDetailsProps {
  form: UseFormReturn<Order>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
  const t = useTranslation();
  const { customers } = useCustomers();
  const selectedCustomerId = form.watch("customerId");
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);
  const selectedAddress = form.watch("shippingAddress");
  const selectedBillingAddress = form.watch("billingAddress");
  const sameAsShipping = form.watch("sameAsShipping");

  // Set default shipping address when customer is selected
  useEffect(() => {
    if (selectedCustomer && !selectedAddress) {
      const defaultAddress = selectedCustomer.addresses.find(
        (addr) => addr.isDefault && addr.type === "shipping",
      );
      if (defaultAddress) {
        form.setValue("shippingAddress", defaultAddress);
      }
    }
  }, [selectedCustomer, selectedAddress, form]);

  useEffect(() => {
    if (sameAsShipping) {
      form.setValue("billingAddress", selectedAddress);
    }
  }, [sameAsShipping, selectedAddress, form]);

  return (
    <div className="space-y-6">
      {/* Customer Details */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {t.orders.orders.form.sections.basicDetails.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t.orders.orders.form.sections.basicDetails.description}
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <CustomerSelect form={form} />

          {selectedCustomer && selectedCustomer.addresses.length > 0 && (
            <>
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        t.orders.orders.form.sections.basicDetails
                          .shippingAddress
                      }
                    </FormLabel>
                    <FormControl>
                      <AddressSelect
                        addresses={selectedCustomer.addresses}
                        selectedAddress={selectedAddress}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!sameAsShipping && (
                <FormField
                  control={form.control}
                  name="billingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Address</FormLabel>
                      <FormControl>
                        <AddressSelect
                          addresses={selectedCustomer.addresses}
                          selectedAddress={selectedBillingAddress}
                          onSelect={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="sameAsShipping"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl className="mt-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>
                      Billing Address Same as Shipping Address
                    </FormLabel>
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t.orders.orders.form.sections.basicDetails.email.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={
                        t.orders.orders.form.sections.basicDetails.email
                          .placeholder
                      }
                      value={field.value || ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t.orders.orders.form.sections.basicDetails.phone.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder={
                        t.orders.orders.form.sections.basicDetails.phone
                          .placeholder
                      }
                      value={field.value || ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
