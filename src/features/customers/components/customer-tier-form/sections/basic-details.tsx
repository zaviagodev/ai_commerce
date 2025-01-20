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

interface BasicDetailsProps {
  form: UseFormReturn<CustomerTier>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
  return (
    <div className="grid gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tier name <span className='text-destructive'>*</span></FormLabel>
            <FormControl>
              <Input placeholder="e.g., Gold, Platinum, Diamond" {...field} />
            </FormControl>
            <FormDescription>
              Choose a memorable name for this customer tier
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
                placeholder="Describe the benefits and requirements of this tier..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Explain what makes this tier special
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Control whether this tier is currently active
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}