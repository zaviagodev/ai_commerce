import { Link } from 'react-router-dom';
import { Plus, Folder, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductCategory } from '@/types/product';
import { DataTablePagination } from '@/components/ui/data-table/pagination';
import { usePagination } from '@/hooks/use-pagination';

interface CategoryListProps {
  categories: ProductCategory[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function CategoryList({ categories, isLoading, onDelete }: CategoryListProps) {
  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination();

  const paginatedCategories = paginateItems(categories);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage your product categories
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/products/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Add category
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">No categories found</p>
                    <p className="text-sm text-muted-foreground">
                      Get started by adding your first category
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/products/categories/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add category
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <Folder className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <Link
                          to={`/dashboard/products/categories/${category.id}`}
                          className="font-medium hover:underline"
                        >
                          {category.name}
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {category.description}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/dashboard/products/categories/${category.id}`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => onDelete(category.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {categories.length > 0 && (
          <div className="border-t p-4 bg-white rounded-b-lg">
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount(categories.length)}
              totalItems={categories.length}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>
    </div>
  );
}