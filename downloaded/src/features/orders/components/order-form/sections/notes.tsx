import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { StickyNote, X } from 'lucide-react';
import { Order } from '@/types/order';

interface NotesProps {
  form: UseFormReturn<Order>;
}

export function Notes({ form }: NotesProps) {
  const tags = form.watch('tags') || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
          <StickyNote className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">Order Notes</h2>
          <p className="text-sm text-muted-foreground">
            Add notes and tags to this order
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any notes about this order..."
                  className="min-h-[100px]"
                  value={field.value || ''}
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}