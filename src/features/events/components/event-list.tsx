import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
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
import { Product } from "@/types/product";
import { cn, formatCurrency } from "@/lib/utils";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { usePagination } from "@/hooks/use-pagination";
import Loading from "@/components/loading";
import { useTranslation } from "@/lib/i18n/hooks";

interface EventListProps {
  products: Product[];
  isLoading: boolean;
}

export function EventList({ products, isLoading }: EventListProps) {
  const t = useTranslation();
  const navigate = useNavigate();
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
          <h1 className="text-2xl font-semibold">{t.events.list.title}</h1>
          <p className="text-sm text-muted-foreground">
            {t.events.list.description}
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/events/new">
            <Plus className="mr-2 h-4 w-4" />
            {t.events.list.actions.addEvent}
          </Link>
        </Button>
      </motion.div>

      <motion.div
        className="rounded-lg border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table className={products.length > 0 ? "rounded-b-none" : ""}>
          <TableHeader>
            <TableRow>
              <TableHead>{t.events.list.table.headers.product}</TableHead>
              <TableHead>{t.events.list.table.headers.status}</TableHead>
              <TableHead>{t.events.list.table.headers.category}</TableHead>
              <TableHead className="text-right">
                {t.events.list.table.headers.price}
              </TableHead>
              <TableHead className="text-right">
                {t.events.list.table.headers.quantity}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">
                      {t.events.list.table.empty.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.events.list.table.empty.description}
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/events/new">
                        <Plus className="mr-2 h-4 w-4" />
                        {t.events.list.actions.addProduct}
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
                  onClick={() => navigate(`/dashboard/events/${product.id}`)}
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
                        <Link
                          to={`/dashboard/events/${product.id}`}
                          className="font-medium hover:underline"
                        >
                          {product.name}
                        </Link>
                        {product.sku && (
                          <p className="text-sm text-muted-foreground">
                            {t.events.list.table.cells.sku.replace(
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
                      {t.events.list.table.status[product.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.category?.name ||
                      t.events.list.table.cells.uncategorized}
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
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {t.events.list.table.cells.inStock.replace(
                          "{count}",
                          String(product.quantity || 0),
                        )}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        {t.events.list.table.cells.notTracked}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {paginatedProducts.length > 0 && (
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
