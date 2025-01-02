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

interface BasicDetailsProps {
  form: UseFormReturn<Customer>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
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
          <h2 className="text-lg font-medium">Basic Details</h2>
          <p className="text-sm text-muted-foreground">
            Add the essential information about your customer
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
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="John" {...field} />
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
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="Doe" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  className="w-full"
                  type="email" 
                  placeholder="john@example.com"
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
                            message: 'This email is already in use',
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
                  Checking email availability...
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
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input 
                  className="w-full"
                  type="tel" 
                  placeholder="+1234567890" 
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
                <FormLabel>Verified Customer</FormLabel>
                <FormDescription>
                  Mark this customer as verified with a checkmark badge
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