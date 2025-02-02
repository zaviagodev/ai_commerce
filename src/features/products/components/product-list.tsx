import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Package,
  ExternalLink,
  ArrowUpDown,
  Check,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Product, ProductVariant } from "@/types/product";
import { formatCurrency, getVaraintsPriceRange } from "@/lib/utils";
import { useAuth } from "@/lib/auth/auth-hooks";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { ProductActionsMenu } from "./product-actions-menu";
import { usePagination } from "@/hooks/use-pagination";
import { ProductSort } from "./product-sort";
import { sortProducts } from "../utils/sorting";
import { SORT_OPTIONS, SortOption } from "../types/sorting";
import { useBulkSelection } from "../hooks/use-bulk-selection";
import { BulkActionsMenu } from "./bulk-actions/bulk-actions-menu";
import { BulkDeleteDialog } from "./bulk-actions/bulk-delete-dialog";
import { BulkCategoryDialog } from "./bulk-actions/bulk-category-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductSearch } from "./product-search";
import { useState, useMemo, Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import Loading from "@/components/loading";
import { useTranslation } from "@/lib/i18n/hooks";
import { render } from "react-dom";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onDelete: (id: string) => Promise<void>;
}

interface Row {
  original: Product;
  getValue: (key: string) => any;
}

interface CellProps {
  row: Row;
}

export function ProductList({
  products,
  isLoading,
  onDelete,
}: ProductListProps) {
  const navigate = useNavigate();
  const t = useTranslation();
  const [sortValue, setSortValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
          product.category?.name.toLowerCase().includes(query),
      );
    }

    // Apply sorting
    if (!sortValue) return filtered;

    const [field, direction] = sortValue.split("-");
    const option = SORT_OPTIONS.find(
      (opt) => opt.field === field && opt.direction === direction,
    );

    if (!option) return filtered;
    return sortProducts(filtered, option.field, option.direction);
  }, [products, sortValue, searchQuery]);

  const paginatedProducts = paginateItems(sortedProducts);
  const selectedCount = selectedIds.size;

  console.log("paginatedProducts => ", paginatedProducts);

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
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-14">
        <Loading />
      </div>
    );
  }

  const columns = [
    {
      accessorKey: "product",
      header: "Product",
      cell: ({ row }: CellProps) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-3">
            {product.images[0] ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="h-12 w-12 rounded-sm overflow-hidden"
              >
                <img
                  src={product.images[0].url}
                  alt={product.images[0].alt}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ) : (
              <div className="h-12 w-12 rounded-sm bg-muted" />
            )}
            <div>
              <Link
                to={`/dashboard/products/${product.id}`}
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
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: CellProps) => {
        const status = row.getValue("status");
        return (
          <Badge
            className={cn("capitalize shadow-none", {
              "!bg-green-100 !text-green-700 dark:!bg-green-700 dark:!text-green-100":
                status === "active",
              "!bg-red-100 !text-red-700 dark:!bg-red-700 dark:!text-red-100":
                status === "archived",
              "!bg-gray-100 !text-gray-700 dark:!bg-gray-700 dark:!text-gray-100":
                status === "draft",
            })}
          >
            {
              t.products.products.status[
                status as keyof typeof t.products.products.status
              ]
            }
          </Badge>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }: CellProps) => {
        const category = row.getValue("category");
        return category ? category.name : "Uncategorized";
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }: CellProps) => {
        const price = parseFloat(row.getValue("price"));
        const product = row.original;
        const loyaltyPrice = product.variants[0]?.pointsBasedPrice;

        return (
          <div className="flex flex-col">
            <span>{formatCurrency(price)}</span>
            {loyaltyPrice && (
              <span className="text-sm text-green-600">{loyaltyPrice} pts</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }: CellProps) => {
        const quantity = row.original.variants.reduce(
          (acc: number, variant: ProductVariant) => acc + variant.quantity,
          0,
        );
        return <span>{quantity || 0} in stock</span>;
      },
    },
  ];

  return (
    <div className="space-y-4">
      <motion.div
        className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div>
          <h1 className="text-2xl font-semibold">
            {t.products.products.title}
          </h1>
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

      {/* Table Controls */}
      {/* <motion.div
        className="flex items-center justify-end gap-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <ProductSearch value={searchQuery} onChange={setSearchQuery} />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleBulkMode}
            className={cn({
              "bg-primary text-primary-foreground hover:bg-primary/90":
                isBulkMode,
            })}
          >
            {isBulkMode ? (
              <>
                {selectedCount > 0
                  ? `${selectedCount} selected`
                  : "Select items"}
              </>
            ) : (
              "Select"
            )}
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
          <ProductSort value={sortValue} onValueChange={setSortValue} />
          <Button onClick={() => navigate("/dashboard/products/new")} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            {t.products.products.actions.add}
          </Button>
        </div>
      </motion.div> */}

      <motion.div
        className="rounded-lg border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table className={paginatedProducts.length > 0 ? "rounded-b-none" : ""}>
          <TableHeader>
            <TableRow>
              {isBulkMode && (
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selectedCount > 0 &&
                      selectedCount === paginatedProducts.length
                    }
                    onCheckedChange={() => toggleAll(paginatedProducts)}
                  />
                </TableHead>
              )}
              <TableHead>{t.products.products.list.columns.product}</TableHead>
              <TableHead>{t.products.products.list.columns.status}</TableHead>
              <TableHead>{t.products.products.list.columns.category}</TableHead>
              <TableHead className="text-right">
                {t.products.products.list.columns.price}
              </TableHead>
              <TableHead className="text-right">
                {t.products.products.list.columns.quantity}
              </TableHead>
              {/* {!isBulkMode && <TableHead className="w-8"></TableHead>} */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-semibold">
                      {t.products.products.list.empty.title}
                    </p>
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
                const quantity = product.variants.reduce(
                  (acc, variant) => acc + variant.quantity,
                  0,
                );
                return (
                  <TableRow
                    key={product.id}
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(`/dashboard/products/${product.id}`)
                    }
                  >
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
                        {product.images[0] ? (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            className="h-12 w-12 rounded-sm overflow-hidden"
                          >
                            <img
                              src={product.images[0].url}
                              alt={product.images[0].alt}
                              className="h-full w-full object-cover"
                            />
                          </motion.div>
                        ) : (
                          <div className="h-12 w-12 rounded-sm bg-muted" />
                        )}
                        <div>
                          <Link
                            to={`/dashboard/products/${product.id}`}
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
                          "!bg-green-100 !text-green-700 dark:!bg-green-700 dark:!text-green-100":
                            product.status === "active",
                          "!bg-red-100 !text-red-700 dark:!bg-red-700 dark:!text-red-100":
                            product.status === "archived",
                          "!bg-gray-100 !text-gray-700 dark:!bg-gray-700 dark:!text-gray-100":
                            product.status === "draft",
                        })}
                      >
                        {
                          t.products.products.status[
                            product.status as keyof typeof t.products.products.status
                          ]
                        }
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.category?.name ||
                        t.products.products.list.uncategorized}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.variants.length > 0 ? (
                        <div className="space-y-1">
                          {getVaraintsPriceRange(product.variants)}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="font-medium">
                            <span>{formatCurrency(product.price)}</span>
                            {product.isReward &&
                              product.variants[0]?.pointsBasedPrice && (
                                <span className="text-sm text-green-600">
                                  {product.variants[0].pointsBasedPrice} pts
                                </span>
                              )}
                          </div>
                          {product.compareAtPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              {formatCurrency(product.compareAtPrice)}
                            </div>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.trackQuantity ? (
                        <span
                          className={
                            (quantity || 0) > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {quantity || 0} {t.products.products.list.inStock}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          {t.products.products.list.notTracked}
                        </span>
                      )}
                    </TableCell>
                    {/* {!isBulkMode && (
                      <TableCell
                        className="text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ProductActionsMenu
                          product={product}
                          onDelete={() => onDelete(product.id)}
                        />
                      </TableCell>
                    )} */}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <motion.div
          className={cn("border-t p-4 bg-main rounded-b-lg", {
            hidden: paginatedProducts.length === 0,
          })}
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
      </motion.div>

      <BulkDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        selectedCount={selectedCount}
        onConfirm={handleBulkDelete}
        isDeleting={isDeleting}
      />

      <BulkCategoryDialog
        open={showCategoryDialog}
        onOpenChange={setShowCategoryDialog}
        selectedCount={selectedCount}
        onConfirm={handleBulkCategoryChange}
        isUpdating={isUpdating}
      />
    </div>
  );
}
