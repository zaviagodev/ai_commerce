import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ProductAvatars } from "./product-avatars";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/order";
import { cn, formatCurrency } from "@/lib/utils";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { StatusTabs } from "./status-tabs";
import { useState, useMemo } from "react";
import Loading from "@/components/loading";
import { ProductSearch } from "@/features/products/components/product-search";
import { useTranslation } from "@/lib/i18n/hooks";

interface OrderListProps {
  orders: Order[];
  isLoading: boolean;
  title?: string;
  description?: string;
  addButtonText?: string;
  path?: string;
}

export function OrderList({
  orders,
  isLoading,
  title,
  description,
  addButtonText,
  path = "/dashboard/orders",
}: OrderListProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filter orders by status
  const filteredOrders = useMemo(() => {
    let orderItems =
      selectedStatus === "all"
        ? orders
        : orders.filter((order) => order.status === selectedStatus);

    let filtered = orderItems;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = orderItems.filter(
        (order) =>
          order.id?.toLowerCase().includes(query) ||
          order.customerName?.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [orders, selectedStatus, searchQuery]);

  // Calculate counts for each status
  const statusCounts = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [orders]);

  const paginatedOrders = paginateItems(filteredOrders);

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
            {title || t.orders.orders.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {description || t.orders.orders.description}
          </p>
        </div>
        <Button asChild>
          <Link to={`${path}/new`}>
            <Plus className="mr-2 h-4 w-4" />
            {addButtonText || t.orders.orders.actions.create}
          </Link>
        </Button>
      </motion.div>

      <motion.div
        className="flex flex-col-reverse lg:flex-row justify-between items-end lg:items-center gap-y-2 gap-x-4 mb-4 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <StatusTabs
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          counts={statusCounts}
        />
        {/* <ProductSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t.orders.orders.list.search}
        /> */}
      </motion.div>

      <motion.div
        className="rounded-lg border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table className={filteredOrders.length > 0 ? "rounded-b-none" : ""}>
          <TableHeader>
            <TableRow>
              <TableHead>{t.orders.orders.list.columns.order}</TableHead>
              <TableHead>{t.orders.orders.list.columns.products}</TableHead>
              <TableHead>{t.orders.orders.list.columns.customer}</TableHead>
              <TableHead>{t.orders.orders.list.columns.status}</TableHead>
              <TableHead>{t.orders.orders.list.columns.items}</TableHead>
              <TableHead className="text-right">
                {t.orders.orders.list.columns.total}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-semibold">
                      {t.orders.orders.list.empty.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.orders.orders.list.empty.description}
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to={`${path}/new`}>
                        <Plus className="mr-2 h-4 w-4" />
                        {addButtonText || t.orders.orders.actions.create}
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`${path}/${order.id}`)}
                >
                  <TableCell>
                    <Link
                      to={`${path}/${order.id}`}
                      className="font-medium hover:underline"
                    >
                      #{order.id.split("-")[0]}
                    </Link>
                    <div className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <ProductAvatars items={order.items} />
                  </TableCell>
                  <TableCell>
                    {order.customerName ? (
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.customerEmail}
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        {t.orders.orders.list.noCustomer}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn("capitalize shadow-none", {
                        "!bg-red-100 !text-red-700 dark:!bg-red-700 dark:!text-red-100":
                          order.status === "cancelled",
                        "!bg-yellow-100 !text-yellow-700 dark:!bg-yellow-700 dark:!text-yellow-100":
                          order.status === "pending",
                        "!bg-green-100 !text-green-700 dark:!bg-green-700 dark:!text-green-100":
                          order.status === "delivered",
                        "!bg-purple-100 !text-purple-700 dark:!bg-purple-700 dark:!text-purple-100":
                          order.status === "shipped",
                        "!bg-blue-100 !text-blue-700 dark:!bg-blue-700 dark:!text-blue-100":
                          order.status === "processing",
                      })}
                    >
                      {
                        t.orders.orders.status[
                          order.status as keyof typeof t.orders.orders.status
                        ]
                      }
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.items.length}{" "}
                    {order.items.length === 1
                      ? t.orders.orders.list.itemCount.singular
                      : t.orders.orders.list.itemCount.plural}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(order.total)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <motion.div
          className={cn("border-t p-4 bg-main rounded-b-lg", {
            hidden: filteredOrders.length === 0,
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <DataTablePagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={pageCount(filteredOrders.length)}
            totalItems={filteredOrders.length}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
