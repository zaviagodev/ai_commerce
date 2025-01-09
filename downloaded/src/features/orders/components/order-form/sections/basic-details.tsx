import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CustomerSelect } from '../../customer-select';
import { AddressSelect } from '../../address-select';
import { useCustomers } from '@/features/customers/hooks/use-customers';
import { Order } from '@/types/order';
import { User, Package } from 'lucide-react';

interface BasicDetailsProps {
  form: UseFormReturn<Order>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
  const { customers } = useCustomers();
  const selectedCustomerId = form.watch('customerId');
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);
  const selectedAddress = form.watch('shippingAddress');

  // Set default shipping address when customer is selected
  useEffect(() => {
    if (selectedCustomer && !selectedAddress) {
      const defaultAddress = selectedCustomer.addresses.find(
        addr => addr.isDefault && addr.type === 'shipping'
      );
      if (defaultAddress) {
        form.setValue('shippingAddress', defaultAddress);
      }
    }
  }, [selectedCustomer, selectedAddress, form]);

  return (
    <div className="space-y-6">
      {/* Customer Details */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium">Customer Details</h2>
            <p className="text-sm text-muted-foreground">
              Select customer and contact information
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <CustomerSelect form={form} />

          {selectedCustomer && selectedCustomer.addresses.length > 0 && (
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>
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
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      value={field.value || ''}
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="+1234567890"
                      value={field.value || ''}
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