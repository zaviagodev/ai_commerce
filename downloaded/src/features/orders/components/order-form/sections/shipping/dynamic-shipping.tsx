import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Order } from '@/types/order';

// Static shipping methods for demonstration
const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Shipping', price: 5.00 },
  { id: 'express', name: 'Express Shipping', price: 15.00 },
  { id: 'overnight', name: 'Overnight Shipping', price: 25.00 },
];

interface DynamicShippingProps {
  form: UseFormReturn<Order>;
  currentShipping: number;
}

export function DynamicShipping({ form, currentShipping }: DynamicShippingProps) {
  // Find the matching shipping method or default to standard
  const currentMethod = SHIPPING_METHODS.find(m => m.price === currentShipping) || SHIPPING_METHODS[0];

  return (
    <FormField
      control={form.control}
      name="shipping"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Shipping Method</FormLabel>
          <Select
            onValueChange={(value) => {
              const method = SHIPPING_METHODS.find(m => m.id === value);
              field.onChange(method?.price || 0);
            }}
            defaultValue={currentMethod.id}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select shipping method" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {SHIPPING_METHODS.map((method) => (
                <SelectItem key={method.id} value={method.id}>
                  {method.name} - ${method.price.toFixed(2)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}