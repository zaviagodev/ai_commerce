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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CustomerTier } from '@/types/customer';
import { useTranslation } from '@/lib/i18n/hooks';
import { Badge } from '@/components/ui/badge';

interface BasicDetailsProps {
  form: UseFormReturn<CustomerTier>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
  const t = useTranslation();

  return (
    <div className="grid gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.customers.customer.tier.sections.basicDetails.fields.name.label} <span className='text-destructive'>*</span></FormLabel>
            <FormControl>
              <Input 
                placeholder={t.customers.customer.tier.sections.basicDetails.fields.name.placeholder} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.customers.customer.tier.sections.basicDetails.fields.description.label}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t.customers.customer.tier.sections.basicDetails.fields.description.placeholder}
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.customers.customer.tier.sections.basicDetails.fields.status.label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t.customers.customer.tier.sections.basicDetails.fields.status.label} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="active">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="!bg-green-100 text-green-700">
                      {t.customers.customer.tier.sections.basicDetails.fields.status.active}
                    </Badge>
                  </div>
                </SelectItem>
                <SelectItem value="inactive">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="!bg-red-100 text-red-700">
                      {t.customers.customer.tier.sections.basicDetails.fields.status.inactive}
                    </Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}