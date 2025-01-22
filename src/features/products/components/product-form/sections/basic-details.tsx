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
  isEventProduct?: boolean
  isRewardProduct?: boolean
}

export function BasicDetails({ form, isEventProduct, isRewardProduct }: BasicDetailsProps) {
  const t  = useTranslation();

  const checkTypeofItem: string = 
    isEventProduct ? 'event' : 
    isRewardProduct ? 'rewardItem' : 
    'product'

  return (
    <div className="grid gap-6 w-full">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{t.products.products.form.name[checkTypeofItem]} <span className='text-destructive'>*</span></FormLabel>
            <FormControl>
              <Input 
                placeholder={t.products.products.form.name[checkTypeofItem]}
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
                placeholder={`${t.products.products.form.sections.basicDetails.descriptionPlaceholder[checkTypeofItem]}`}
                className="min-h-[120px] w-full"
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t.products.products.form.sections.basicDetails.descriptionHelp[checkTypeofItem]}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}