import { Link } from 'react-router-dom';
import { Plus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { cn, formatCurrency } from '@/lib/utils';
import { DataTablePagination } from '@/components/ui/data-table/pagination';
import { usePagination } from '@/hooks/use-pagination';
import Loading from '@/components/loading';

interface EventTicketListProps {
  products: Product[];
  isLoading: boolean;
}

export function EventTicketList({ products, isLoading }: EventTicketListProps) {
  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination();

  const paginatedProducts = paginateItems(products);

  if (isLoading) {
    return (
      <div className="pt-14">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <motion.div
        className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-2xl font-semibold">Event & Ticket</h1>
          <p className="text-sm text-muted-foreground">
            Manage your events and tickets
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/products2/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Link>
        </Button>
      </motion.div>

      <motion.div
        className="rounded-lg border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table className={products.length > 0 ? 'rounded-b-none' : ''}>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">No events found</p>
                    <p className="text-sm text-muted-foreground">
                      Get started by adding your first event
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/products2/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Event
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {product.images[0] ? (
                        <img
                          src={product.images[0].url}
                          alt={product.images[0].alt}
                          className="h-12 w-12 rounded-sm object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-sm bg-muted" />
                      )}
                      <div>
                        <Link
                          to={`/dashboard/products2/${product.id}`}
                          className="font-medium hover:underline"
                        >
                          {product.name}
                        </Link>
                        {product.sku && (
                          <p className="text-sm text-muted-foreground">
                            SKU: {product.sku}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn("capitalize shadow-none", {
                        "!bg-green-100 !text-green-700 dark:!bg-green-700 dark:!text-green-100": product.status === 'active',
                        "!bg-red-100 !text-red-700 dark:!bg-red-700 dark:!text-red-100": product.status === 'archived',
                        "!bg-gray-100 !text-gray-700 dark:!bg-gray-700 dark:!text-gray-100": product.status === 'draft',
                      })}
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.category?.name || 'Uncategorized'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="space-y-1">
                      <div className="font-medium">
                        {formatCurrency(product.price)}
                      </div>
                      {product.compareAtPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {formatCurrency(product.compareAtPrice)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {product.trackQuantity ? (
                      <span
                        className={
                          (product.quantity || 0) > 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {product.quantity || 0} in stock
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Not tracked</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {products.length > 0 && (
          <motion.div
            className="border-t p-4 bg-main rounded-b-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount(products.length)}
              totalItems={products.length}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
