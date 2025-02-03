import { Link, useNavigate } from "react-router-dom";
import { BadgeCheck, Plus } from "lucide-react";
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
import { Customer } from "@/types/customer";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { usePagination } from "@/hooks/use-pagination";
import Loading from "@/components/loading";
import { useTranslation } from "@/lib/i18n/hooks";
import { useMemo, useState } from "react";
import { ProductSearch } from "@/features/products/components/product-search";
import { cn } from "@/lib/utils";

interface CustomerListProps {
  customers: Customer[];
  isLoading: boolean;
}

export function CustomerList({ customers, isLoading }: CustomerListProps) {
  const navigate = useNavigate();
  const t = useTranslation();
  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredCustomers = useMemo(() => {
    let filtered = customers;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(query) ||
          customer.lastName.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [customers, searchQuery]);

  const paginatedCustomers = paginateItems(filteredCustomers);

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
            {t.customers.customer.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t.customers.customer.description}
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/customers/new">
            <Plus className="mr-2 h-4 w-4" />
            {t.customers.customer.actions.create}
          </Link>
        </Button>
      </motion.div>

      {/* <motion.div
        className="flex items-center justify-end gap-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <ProductSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t.customers.customer.list.search}
        />
      </motion.div> */}

      <motion.div
        className="rounded-lg border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table
          className={paginatedCustomers.length > 0 ? "rounded-b-none" : ""}
        >
          <TableHeader>
            <TableRow>
              <TableHead>{t.customers.customer.list.columns.name}</TableHead>
              <TableHead>{t.customers.customer.list.columns.email}</TableHead>
              <TableHead>{t.customers.customer.list.columns.phone}</TableHead>
              <TableHead>
                {t.customers.customer.list.columns.loyaltyPoints}
              </TableHead>
              {/* <TableHead>{t.customers.customer.list.columns.tags}</TableHead> */}
              <TableHead>{t.customers.customer.list.columns.orders}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-semibold">
                      {t.customers.customer.list.empty.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.customers.customer.list.empty.description}
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/customers/new">
                        <Plus className="mr-2 h-4 w-4" />
                        {t.customers.customer.actions.create}
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/customers/${customer.id}`)
                  }
                >
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-medium hover:underline">
                        {customer.firstName} {customer.lastName}{" "}
                      </span>
                      {customer.isVerified && (
                        <BadgeCheck className="h-4 w-4 text-blue-500 shrink-0" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone || "-"}</TableCell>
                  <TableCell>
                    <span>{customer.loyaltyPoints}</span>
                  </TableCell>
                  {/* <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell> */}
                  <TableCell>
                    {customer.orders?.length || 0}{" "}
                    {t.customers.customer.list.orders}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <motion.div
          className={cn("border-t p-4 bg-main rounded-b-lg", {
            hidden: paginatedCustomers.length === 0,
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <DataTablePagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={pageCount(customers.length)}
            totalItems={customers.length}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
