import {
  FormField,
  FormItem,
  FormControl,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UseFormReturn } from 'react-hook-form';
import { Order } from '@/types/order';

interface StatusSelectProps {
  form: UseFormReturn<Order>;
}

export function StatusSelect({ form }: StatusSelectProps) {
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem className="w-[180px] animate-fade-up">
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending" className="transition-colors">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Pending</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="processing" className="transition-colors">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">Processing</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="shipped" className="transition-colors">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">Shipped</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="delivered" className="transition-colors">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">Delivered</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="cancelled" className="transition-colors">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-red-100 text-red-700">Cancelled</Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}