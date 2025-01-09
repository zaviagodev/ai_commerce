import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductAvatars } from './product-avatars';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types/order';
import { cn, formatCurrency } from '@/lib/utils';
import { DataTablePagination } from '@/components/ui/data-table/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { StatusTabs } from './status-tabs';
import { useState, useMemo } from 'react';
import Loading from '@/components/loading';
import { ProductSearch } from '@/features/products/components/product-search';

interface OrderListProps {
  orders: Order[];
  isLoading: boolean;
}

export function OrderList({ orders, isLoading }: OrderListProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
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
      selectedStatus === 'all'
        ? orders
        : orders.filter((order) => order.status === selectedStatus);

    let filtered = orderItems;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = orderItems.filter(
        (order) =>
          order.id?.toLowerCase().includes(query) ||
          order.customerName?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [orders, selectedStatus, searchQuery]);

  // Calculate counts for each status
  const statusCounts = useMemo(() => {
    return orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
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
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="text-sm text-muted-foreground">
            Manage your store's orders
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/orders/new">
            <Plus className="mr-2 h-4 w-4" />
            Create order
          </Link>
        </Button>
      </motion.div>

      <motion.div
        className="rounded-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex justify-between items-center gap-4 mb-4 w-full">
          <StatusTabs
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            counts={statusCounts}
          />
          <div className="flex justify-end">
            <ProductSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search orders..."
            />
          </div>
        </div>
        <Table className={filteredOrders.length > 0 ? 'rounded-b-none' : ''}>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">No orders found</p>
                    <p className="text-sm text-muted-foreground">
                      Get started by creating your first order
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/orders/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Create order
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link
                      to={`/dashboard/orders/${order.id}`}
                      className="font-medium hover:underline"
                    >
                      #{order.id.split('-')[0]}
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
                      <span className="text-muted-foreground">No customer</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="default"
                      /* variant={
                        order.status === 'delivered'
                          ? 'default'
                          : order.status === 'cancelled'
                          ? 'destructive'
                          : 'secondary'
                      } */
                      className={cn('capitalize shadow-none', {
                        '!bg-red-100 !text-red-600':
                          order.status === 'cancelled',
                        '!bg-yellow-100 !text-yellow-600':
                          order.status === 'pending',
                        '!bg-green-100 !text-green-400':
                          order.status === 'delivered',
                        '!bg-purple-100 !text-purple-600':
                          order.status === 'shipped',
                        '!bg-blue-100 !text-blue-600':
                          order.status === 'processing',
                      })}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.items.length}{' '}
                    {order.items.length === 1 ? 'item' : 'items'}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(order.total)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {filteredOrders.length > 0 && (
          <motion.div
            className="border-t p-4 bg-white rounded-b-lg"
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
        )}
      </motion.div>
    </div>
  );
}
