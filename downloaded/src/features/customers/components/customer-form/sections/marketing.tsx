import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { Customer } from '@/types/customer';

interface MarketingProps {
  form: UseFormReturn<Customer>;
}

export function Marketing({ form }: MarketingProps) {
  const tags = form.watch('tags') || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
          <Mail className="h-5 w-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">Marketing</h2>
          <p className="text-sm text-muted-foreground">
            Configure marketing preferences and tags
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
      <FormField
        control={form.control}
        name="acceptsMarketing"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>Email marketing</FormLabel>
              <FormDescription>
                Customer will receive marketing emails
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

      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Input
                  placeholder="Press enter to add tags"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value && !tags.includes(value)) {
                        field.onChange([...tags, value]);
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 rounded-full"
                        onClick={() => {
                          field.onChange(
                            tags.filter((t) => t !== tag)
                          );
                        }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
      </CardContent>
    </Card>
  );
}