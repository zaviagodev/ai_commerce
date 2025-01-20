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
import { useTranslation } from '@/lib/i18n/hooks';

interface BasicDetailsProps {
  form: UseFormReturn<Product>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
  const t  = useTranslation();

  return (
    <div className="grid gap-6 w-full">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{t.products.products.form.name} <span className='text-destructive'>*</span></FormLabel>
            <FormControl>
              <Input 
                placeholder={t.products.products.form.name}
                className="w-full"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              {t.products.products.form.sections.basicDetails.nameDescription}
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
            <FormLabel>{t.products.products.form.description}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t.products.products.form.sections.basicDetails.descriptionPlaceholder}
                className="min-h-[120px] w-full"
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t.products.products.form.sections.basicDetails.descriptionHelp}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}