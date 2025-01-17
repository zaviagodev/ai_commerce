import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { useCategories } from '@/features/products/hooks/use-categories';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface OrganizationProps {
  form: UseFormReturn<Product>;
}

export function Organization({ form }: OrganizationProps) {
  const { categories, isLoading } = useCategories();
  const tags = form.watch('tags') || [];

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select
              value={field.value?.id}
              onValueChange={(value) => {
                const category = categories.find((c) => c.id === value);
                field.onChange(category);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select category">
                    {field.value?.name || "Select category"}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {isLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading categories...
                  </SelectItem>
                ) : categories.length === 0 ? (
                  <SelectItem value="empty" disabled>
                    No categories found
                  </SelectItem>
                ) : (
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <div className="flex items-center justify-between">
              <FormDescription>
                Choose a category for your products
              </FormDescription>
              <Button variant="link" className="px-0" asChild>
                <Link to="/dashboard/products/categories/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add category
                </Link>
              </Button>
            </div>
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
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
                      if (value) {
                        const newTag = {
                          id: crypto.randomUUID(),
                          name: value,
                        };
                        field.onChange([...tags, newTag]);
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="gap-1"
                    >
                      {tag.name}
                      <button
                        type="button"
                        className="ml-1 rounded-full"
                        onClick={() => {
                          field.onChange(
                            tags.filter((t) => t.id !== tag.id)
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
            <FormDescription>
              Tags can help customers find your products easily
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}