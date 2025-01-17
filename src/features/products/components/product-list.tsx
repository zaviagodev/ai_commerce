import { Link } from 'react-router-dom';
import {
  Plus,
  Package,
  ExternalLink,
  ArrowUpDown,
  Check,
  MoreHorizontal,
} from 'lucide-react';
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
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { formatCurrency } from '@/lib/utils';
import { useAuth } from '@/lib/auth/auth-hooks';
import { DataTablePagination } from '@/components/ui/data-table/pagination';
import { ProductActionsMenu } from './product-actions-menu';
import { usePagination } from '@/hooks/use-pagination';
import { ProductSort } from './product-sort';
import { sortProducts } from '../utils/sorting';
import { SORT_OPTIONS } from '../types/sorting';
import { useBulkSelection } from '../hooks/use-bulk-selection';
import { BulkActionsMenu } from './bulk-actions/bulk-actions-menu';
import { BulkDeleteDialog } from './bulk-actions/bulk-delete-dialog';
import { BulkCategoryDialog } from './bulk-actions/bulk-category-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductSearch } from './product-search';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import Loading from '@/components/loading';
import { useTranslation } from '@/lib/i18n/hooks';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onDelete: (id: string) => Promise<void>;
}

export function ProductList({
  products,
  isLoading,
  onDelete,
}: ProductListProps) {
  const t = useTranslation();
  const [sortValue, setSortValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useAuth();
  const {
    selectedIds,
    isBulkMode,
    toggleBulkMode,
    toggleSelection,
    toggleAll,
    isSelected,
    clearSelection,
  } = useBulkSelection();

  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination();

  // Sort products
  const sortedProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.sku?.toLowerCase().includes(query) ||
          product.category?.name.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (!sortValue) return filtered;

    const [field, direction] = sortValue.split('-');
    const option = SORT_OPTIONS.find(
      (opt) => opt.field === field && opt.direction === direction
    );

    if (!option) return filtered;
    return sortProducts(filtered, option.field, option.direction);
  }, [products, sortValue, searchQuery]);

  const paginatedProducts = paginateItems(sortedProducts);
  const selectedCount = selectedIds.size;

  const handleBulkDelete = async () => {
    setIsDeleting(true);
    try {
      await Promise.all(Array.from(selectedIds).map((id) => onDelete(id)));
      setShowDeleteDialog(false);
      clearSelection();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkArchive = async () => {
    // TODO: Implement bulk archive
  };

  const handleBulkCategoryChange = async (categoryId: string) => {
    // TODO: Implement bulk category change
    setIsUpdating(true);
    try {
      setShowCategoryDialog(false);
    } finally {
      setIsUpdating(false)
    }
  };

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
          <h1 className="text-2xl font-semibold">{t.products.products.title}</h1>
          <p className="text-sm text-muted-foreground">
            {t.products.products.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to={`/store/${user?.storeName}`}>
              <ExternalLink className="mr-2 h-4 w-4" />
              {t.products.products.actions.store}
            </Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard/products/new">
              <Plus className="mr-2 h-4 w-4" />
              {t.products.products.actions.add}
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="rounded-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {/* Table Controls */}
        <div className="flex items-center justify-end gap-4 mb-4">
          <ProductSearch value={searchQuery} onChange={setSearchQuery} />

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBulkMode}
              className={cn('transition-colors', isBulkMode && 'text-primary')}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>

            {isBulkMode && selectedCount > 0 && (
              <BulkActionsMenu
                selectedCount={selectedCount}
                onArchive={handleBulkArchive}
                onDelete={() => setShowDeleteDialog(true)}
                onChangeCategory={() => setShowCategoryDialog(true)}
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <ProductSort value={sortValue} onValueChange={setSortValue} />
          </div>
        </div>
        <Table className={products.length > 0 ? 'rounded-b-none' : ''}>
          <TableHeader>
            <TableRow>
              {(isBulkMode && paginatedProducts.length > 0) && (
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedCount === paginatedProducts.length}
                    onCheckedChange={() => toggleAll(paginatedProducts)}
                  />
                </TableHead>
              )}
              <TableHead>{t.products.products.list.columns.product}</TableHead>
              <TableHead>{t.products.products.list.columns.status}</TableHead>
              <TableHead>{t.products.products.list.columns.category}</TableHead>
              <TableHead className="text-right">{t.products.products.list.columns.price}</TableHead>
              <TableHead className="text-right">{t.products.products.list.columns.quantity}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 || paginatedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isBulkMode ? 6 : 5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">{t.products.products.list.empty.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.products.products.list.empty.description}
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/products/new">
                        <Plus className="mr-2 h-4 w-4" />
                        {t.products.products.actions.add}
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedProducts.map((product) => {
                const quantity = product.variants.reduce((acc, variant) => acc + variant.quantity, 0)
                return (
                  <TableRow key={product.id}>
                    {isBulkMode && (
                      <TableCell>
                        <Checkbox
                          checked={isSelected(product.id)}
                          onCheckedChange={() => toggleSelection(product.id)}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <Link
                            to={`/dashboard/products/${product.id}`}
                            className="font-medium hover:underline"
                          >
                            {product.name || t.products.products.form.untitled}
                          </Link>
                          {product.sku && (
                            <div className="text-sm text-muted-foreground">
                              {product.sku}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                        {t.products.products.status[product.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.category?.name || t.products.products.list.uncategorized}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(product.price)}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.trackQuantity ? (
                        <span>
                          {quantity} {t.products.products.list.inStock}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          {t.products.products.list.notTracked}
                        </span>
                      )}
                    </TableCell>
                    {!isBulkMode && (
                      <TableCell>
                        <ProductActionsMenu product={product} onDelete={() => onDelete(product.id)} />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {products.length > 0 && (
          <motion.div
            className="border-t p-4 bg-white rounded-b-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount(sortedProducts.length)}
              totalItems={sortedProducts.length}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
            />
          </motion.div>
        )}
      </motion.div>

      <BulkDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        selectedCount={selectedCount}
        isDeleting={isDeleting}
        onConfirm={handleBulkDelete}
      />

      <BulkCategoryDialog
        open={showCategoryDialog}
        onOpenChange={setShowCategoryDialog}
        selectedCount={selectedCount}
        isUpdating={isUpdating}
        onConfirm={handleBulkCategoryChange}
      />
    </div>
  );
}
