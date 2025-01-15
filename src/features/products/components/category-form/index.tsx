import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CategorySchema } from '../../schemas/category-schema';
import { ProductCategory } from '@/types/product';
import { BasicDetails } from './sections/basic-details';
import { SEO } from './sections/seo';
import { Folder, Search } from 'lucide-react';

interface CategoryFormProps {
  initialData?: ProductCategory;
  onSubmit: (data: ProductCategory) => Promise<void>;
}

export function CategoryForm({ initialData, onSubmit }: CategoryFormProps) {
  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      ...initialData,
    },
  });

  const handleSubmit = async (data: ProductCategory) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
            <div>
              <h1 className="text-2xl font-semibold">
                {initialData ? 'Edit category' : 'Create category'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {initialData
                  ? 'Update category details'
                  : 'Create a new product category'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline">
                Discard
              </Button>
              <Button type="submit">Save category</Button>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Basic Details Section */}
            <div className="rounded-lg border bg-main">
              <div className="flex items-center gap-4 p-6 border-b">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Folder className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Basic Details</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure the category's basic information
                  </p>
                </div>
              </div>
              <div className="p-6">
                <BasicDetails form={form} />
              </div>
            </div>

            {/* SEO Section */}
            {/* <div className="rounded-lg border bg-main">
              <div className="flex items-center gap-4 p-6 border-b">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Search className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">SEO</h2>
                  <p className="text-sm text-muted-foreground">
                    Optimize category for search engines
                  </p>
                </div>
              </div>
              <div className="p-6">
                <SEO form={form} />
              </div>
            </div> */}
          </div>
        </form>
      </Form>
    </div>
  );
}
