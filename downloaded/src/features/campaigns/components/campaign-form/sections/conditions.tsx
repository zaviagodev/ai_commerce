import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Campaign } from '@/types/campaign';
import { Filter } from 'lucide-react';
import { EarningRules } from './earning-rules';

interface ConditionsProps {
  form: UseFormReturn<Campaign>;
}

export function Conditions({ form }: ConditionsProps) {
  const hasConditions = form.watch('hasConditions');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
          <Filter className="h-5 w-5 text-teal-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">Campaign Conditions</h2>
          <p className="text-sm text-muted-foreground">
            Add conditions to customize when points are awarded
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="hasConditions"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Enable Conditions</FormLabel>
                <FormDescription>
                  Add custom rules for when points are awarded
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {hasConditions && (
          <div className="space-y-4">
            <EarningRules form={form} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}