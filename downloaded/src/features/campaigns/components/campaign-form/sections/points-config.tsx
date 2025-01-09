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
import { Campaign } from '@/types/campaign';
import { Coins } from 'lucide-react';

interface PointsConfigProps {
  form: UseFormReturn<Campaign>;
}

export function PointsConfig({ form }: PointsConfigProps) {
  const type = form.watch('type');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
          <Coins className="h-5 w-5 text-yellow-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">Points Configuration</h2>
          <p className="text-sm text-muted-foreground">
            Configure how points are awarded
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {type === 'points_multiplier' ? (
          <FormField
            control={form.control}
            name="multiplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Points multiplier</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      min="1"
                      value={field.value || ''}
                      step="0.1"
                      placeholder="1.5"
                      className="pr-8"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      x
                    </span>
                  </div>
                </FormControl>
                <FormDescription>
                  Multiply points earned from purchases (e.g., 1.5x, 2x)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="bonusPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bonus points</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="100"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Fixed number of bonus points to award
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}