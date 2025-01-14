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
import { ProductCategory } from '@/types/product';

interface BasicDetailsProps {
  form: UseFormReturn<ProductCategory>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
  return (
    <div className="grid gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category name <span className='text-destructive'>*</span></FormLabel>
            <FormControl>
              <Input placeholder="e.g., Electronics, Clothing" {...field} />
            </FormControl>
            <FormDescription>
              Choose a descriptive name for this category
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe this category..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide a brief description of what products belong in this category
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}