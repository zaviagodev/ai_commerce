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
import { ProductCategory } from '@/types/product';

interface SEOProps {
  form: UseFormReturn<ProductCategory>;
}

export function SEO({ form }: SEOProps) {
  return (
    <div className="grid gap-6">
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL Slug</FormLabel>
            <FormControl>
              <Input placeholder="e.g., electronics, clothing" {...field} />
            </FormControl>
            <FormDescription>
              The URL-friendly version of the category name
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}