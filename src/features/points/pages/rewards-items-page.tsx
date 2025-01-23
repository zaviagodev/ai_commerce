import { Link, useNavigate } from "react-router-dom";
import { ArrowUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/features/products/hooks/use-products";
import { cn, formatCurrency } from "@/lib/utils";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { usePagination } from "@/hooks/use-pagination";
import Loading from "@/components/loading";
import { ProductSearch } from "@/features/products/components/product-search";
import { useMemo, useState } from "react";
import { SORT_OPTIONS } from "@/features/products/types/sorting";
import { sortProducts } from "@/features/products/utils/sorting";
import { ProductSort } from "@/features/products/components/product-sort";
import { useTranslation } from "@/lib/i18n/hooks";

export function RewardsItemsPage() {
  const t = useTranslation();
  const navigate = useNavigate();
  const { products, isLoading } = useProducts();
  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination();

  const [sortValue, setSortValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
          <h1 className="text-2xl font-semibold">
            {t.rewardItems.rewardItems.list.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t.rewardItems.rewardItems.list.description}
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/reward-items/new">
            <Plus className="mr-2 h-4 w-4" />
            {t.rewardItems.rewardItems.list.actions.addRewardItem}
          </Link>
        </Button>
      </motion.div>

      <motion.div
        className="flex items-center justify-end gap-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <ProductSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t.rewardItems.rewardItems.list.search}
        />
        <div className="flex items-center gap-4">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <ProductSort
            value={sortValue}
            options={SORT_OPTIONS}
            onValueChange={setSortValue}
          />
        </div>
      </motion.div>

      <motion.div
        className="rounded-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table className={paginatedProducts.length > 0 ? "rounded-b-none" : ""}>
          <TableHeader>
            <TableRow>
              <TableHead>
                {t.rewardItems.rewardItems.list.table.headers.item}
              </TableHead>
              <TableHead>
                {t.rewardItems.rewardItems.list.table.headers.status}
              </TableHead>
              <TableHead>
                {t.rewardItems.rewardItems.list.table.headers.category}
              </TableHead>
              <TableHead className="text-right">
                {t.rewardItems.rewardItems.list.table.headers.pointsRequired}
              </TableHead>
              <TableHead className="text-right">
                {t.rewardItems.rewardItems.list.table.headers.quantity}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">
                      {t.rewardItems.rewardItems.list.table.empty.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.rewardItems.rewardItems.list.table.empty.description}
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/reward-items/new">
                        <Plus className="mr-2 h-4 w-4" />
                        {t.rewardItems.rewardItems.list.actions.addRewardItem}
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/reward-items/${product.id}`)
                  }
                >
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
                        <span className="font-medium hover:underline">
                          {product.name}
                        </span>
                        {product.sku && (
                          <p className="text-sm text-muted-foreground">
                            {t.rewardItems.rewardItems.list.table.cells.sku.replace(
                              "{value}",
                              product.sku,
                            )}
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
                      t.rewardItems.rewardItems.list.table.cells.uncategorized}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="space-y-1">
                      <div className="font-medium">
                        {product.pointsRequired || 0}{" "}
                        {
                          t.rewardItems.rewardItems.list.table.cells[
                            product.pointsRequired === 1 ? "point" : "points"
                          ]
                        }
                      </div>
                      {product.pointsValue && (
                        <div className="text-sm text-muted-foreground">
                          {
                            t.rewardItems.rewardItems.list.table.cells
                              .pointsValue
                          }{" "}
                          {formatCurrency(product.pointsValue)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {product.trackQuantity ? (
                      <span
                        className={
                          (product.quantity || 0) > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {product.quantity || 0}{" "}
                        {t.rewardItems.rewardItems.list.table.cells.inStock}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        {t.rewardItems.rewardItems.list.table.cells.notTracked}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
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
    </div>
  );
}
