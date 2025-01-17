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
import { useTranslation } from '@/lib/i18n/hooks';

interface OrganizationProps {
  form: UseFormReturn<Product>;
}

export function Organization({ form }: OrganizationProps) {
  const t = useTranslation();
  const { categories, isLoading } = useCategories();
  const tags = form.watch('tags') || [];

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.products.products.form.sections.organization.category}</FormLabel>
            <Select
              value={field.value?.id}
              onValueChange={(value) => {
                const category = categories.find((c) => c.id === value);
                field.onChange(category);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t.products.products.form.sections.organization.selectCategory}>
                    {field.value?.name || t.products.products.form.sections.organization.selectCategory}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {isLoading ? (
                  <SelectItem value="loading" disabled>
                    {t.products.products.form.sections.organization.loadingCategories}
                  </SelectItem>
                ) : categories.length === 0 ? (
                  <SelectItem value="empty" disabled>
                    {t.products.products.form.sections.organization.noCategories}
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
                {t.products.products.form.sections.organization.categoryDescription}
              </FormDescription>
              <Button variant="link" className="px-0" asChild>
                <Link to="/dashboard/products/categories/new">
                  <Plus className="mr-2 h-4 w-4" />
                  {t.products.products.form.sections.organization.addCategory}
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
            <FormLabel>{t.products.products.form.sections.organization.status}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t.products.products.form.sections.organization.selectStatus} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="draft">{t.products.products.status.draft}</SelectItem>
                <SelectItem value="active">{t.products.products.status.active}</SelectItem>
                <SelectItem value="archived">{t.products.products.status.archived}</SelectItem>
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
            <FormLabel>{t.products.products.form.sections.organization.tags}</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Input
                  placeholder={t.products.products.form.sections.organization.tagsPlaceholder}
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
              {t.products.products.form.sections.organization.tagsDescription}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}