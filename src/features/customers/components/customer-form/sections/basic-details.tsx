import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Customer } from '@/types/customer';
import { CustomerService } from '../../../services/customer-service';
import { useTranslation } from '@/lib/i18n/hooks';

interface BasicDetailsProps {
  form: UseFormReturn<Customer>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
  const t  = useTranslation();
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  // Remove metrics dashboard from new customer form
  const isNewCustomer = !form.getValues('id');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
          <UserCircle className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">{t.customers.customer.form.sections.basicDetails.title}</h2>
          <p className="text-sm text-muted-foreground">
            {t.customers.customer.form.sections.basicDetails.description}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.customers.customer.form.fields.firstName.label}</FormLabel>
                <FormControl>
                  <Input 
                    className="w-full" 
                    placeholder={t.customers.customer.form.fields.firstName.placeholder} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.customers.customer.form.fields.lastName.label}</FormLabel>
                <FormControl>
                  <Input 
                    className="w-full" 
                    placeholder={t.customers.customer.form.fields.lastName.placeholder} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.customers.customer.form.fields.email.label}</FormLabel>
              <FormControl>
                <Input 
                  className="w-full"
                  type="email" 
                  placeholder={t.customers.customer.form.fields.email.placeholder}
                  {...field}
                  onChange={async (e) => {
                    field.onChange(e);
                    const value = e.target.value;
                    
                    if (value && value.includes('@')) {
                      setIsCheckingEmail(true);
                      try {
                        const isAvailable = await CustomerService.checkEmailAvailability(value);
                        if (!isAvailable) {
                          form.setError('email', {
                            type: 'manual',
                            message: t.customers.customer.form.fields.email.errors.inUse,
                          });
                        } else {
                          form.clearErrors('email');
                        }
                      } finally {
                        setIsCheckingEmail(false);
                      }
                    }
                  }}
                />
              </FormControl>
              {isCheckingEmail && (
                <p className="text-sm text-muted-foreground">
                  {t.customers.customer.form.fields.email.checking}
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.customers.customer.form.fields.phone.label}</FormLabel>
              <FormControl>
                <Input 
                  className="w-full"
                  type="tel" 
                  placeholder={t.customers.customer.form.fields.phone.placeholder}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isVerified"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-blue-50/50">
              <div className="space-y-0.5">
                <FormLabel>{t.customers.customer.form.fields.verified.label}</FormLabel>
                <FormDescription>
                  {t.customers.customer.form.fields.verified.description}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-blue-500"
                />
              </FormControl>
            </FormItem>
          )}
        />
        </div>
      </CardContent>
    </Card>
  );
}