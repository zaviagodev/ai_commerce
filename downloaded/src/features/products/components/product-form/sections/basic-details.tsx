import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/types/product';

interface BasicDetailsProps {
  form: UseFormReturn<Product>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
  return (
    <div className="grid gap-6 w-full">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Product name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter product name" 
                className="w-full"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Customers will see this name in your store
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your product..."
                className="min-h-[120px] w-full"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Write a detailed description of your product
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}