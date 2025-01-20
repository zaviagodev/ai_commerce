import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Package, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EventProduct, Product } from "@/types/product";
import { cn, formatCurrency } from "@/lib/utils";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { usePagination } from "@/hooks/use-pagination";
import Loading from "@/components/loading";
import { useTranslation } from "@/lib/i18n/hooks";
import { ProductSearch } from '@/features/products/components/product-search';
import { ProductSort } from '@/features/products/components/product-sort';
import { SORT_OPTIONS } from '@/features/products/types/sorting';

interface EventTicketListProps {
  events: EventProduct[];
  isLoading: boolean;
}

export function EventTicketList({ events, isLoading }: EventTicketListProps) {
  const [sortValue, setSortValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslation();
  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination();

  const paginatedEvents = paginateItems(events);

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
          <h1 className="text-2xl font-semibold">{t.events.event.ticketList.title}</h1>
          <p className="text-sm text-muted-foreground">
            {t.events.event.ticketList.description}
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/events/new">
            <Plus className="mr-2 h-4 w-4" />
            {t.events.event.ticketList.actions.addEvent}
          </Link>
        </Button>
      </motion.div>

      {/* Table Controls */}
      <motion.div 
        className="flex items-center justify-end gap-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <ProductSearch value={searchQuery} onChange={setSearchQuery} placeholder='Search events...'/>

        <div className="flex items-center gap-4">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <ProductSort value={sortValue} options={SORT_OPTIONS} onValueChange={setSortValue} />
        </div>
      </motion.div>

      <motion.div
        className="rounded-lg border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table className={events.length > 0 ? "rounded-b-none" : ""}>
          <TableHeader>
            <TableRow>
              <TableHead>{t.events.event.ticketList.table.headers.product}</TableHead>
              <TableHead>{t.events.event.ticketList.table.headers.status}</TableHead>
              <TableHead>{t.events.event.ticketList.table.headers.category}</TableHead>
              <TableHead className="text-right">{t.events.event.ticketList.table.headers.price}</TableHead>
              <TableHead className="text-right">{t.events.event.ticketList.table.headers.quantity}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">{t.events.event.ticketList.table.empty.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.events.event.ticketList.table.empty.description}
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/events/new">
                        <Plus className="mr-2 h-4 w-4" />
                        {t.events.event.ticketList.actions.addEvent}
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedEvents.map((event) => {
                const quantity = event.variants.reduce((acc, variant) => acc + variant.quantity, 0)
                return (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {event.images[0] ? (
                        <img
                          src={event.images[0].url}
                          alt={event.images[0].alt}
                          className="h-12 w-12 rounded-sm object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-sm bg-muted" />
                      )}
                      <div>
                        <Link
                          to={`/dashboard/events/${event.id}`}
                          className="font-medium hover:underline"
                        >
                          {event.name}
                        </Link>
                        {event.sku && (
                          <p className="text-sm text-muted-foreground">
                            {t.events.event.ticketList.table.cells.sku.replace('{value}', event.sku)}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn("capitalize shadow-none", {
                        "!bg-green-100 !text-green-700 dark:!bg-green-700 dark:!text-green-100": event.status === 'active',
                        "!bg-red-100 !text-red-700 dark:!bg-red-700 dark:!text-red-100": event.status === 'archived',
                        "!bg-gray-100 !text-gray-700 dark:!bg-gray-700 dark:!text-gray-100": event.status === 'draft',
                      })}
                    >
                      {t.events.event.ticketList.table.status[event.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {event.category?.name || t.events.ticketList.table.cells.uncategorized}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="space-y-1">
                      <div className="font-medium">
                        {formatCurrency(event.price)}
                      </div>
                      {event.compareAtPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {formatCurrency(event.compareAtPrice)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {event.trackQuantity ? (
                      <span
                        className={
                          (quantity || 0) > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {t.events.event.ticketList.table.cells.inStock.replace('{count}', String(quantity || 0))}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">{t.events.event.ticketList.table.cells.notTracked}</span>
                    )}
                  </TableCell>
                </TableRow>
              )})
            )}
          </TableBody>
        </Table>

        {events.length > 0 && (
          <motion.div
          className={cn("border-t p-4 bg-main rounded-b-lg", {"hidden": events.length === 0})}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount(events.length)}
              totalItems={events.length}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
