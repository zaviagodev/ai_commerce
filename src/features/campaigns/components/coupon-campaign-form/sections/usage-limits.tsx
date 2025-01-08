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
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Coupon } from '@/types/coupon';

interface UsageLimitsProps {
  form: UseFormReturn<Coupon>;
}

export function UsageLimits({ form }: UsageLimitsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
          <Users className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">Usage Limits</h2>
          <p className="text-sm text-muted-foreground">
            Set limits on how this coupon can be used
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="usageLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Usage Limit</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormDescription>
                Maximum number of times this coupon can be used (leave empty for unlimited)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}