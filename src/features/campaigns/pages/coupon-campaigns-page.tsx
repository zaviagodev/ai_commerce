import { Link } from 'react-router-dom';
import { Plus, Tags } from 'lucide-react';
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
import { DataTablePagination } from '@/components/ui/data-table/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { useCoupons } from '../hooks/use-coupons';
import Loading from '@/components/loading';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/hooks';
import { useMemo, useState } from 'react';
import { ProductSearch } from '@/features/products/components/product-search';

export function CouponCampaignsPage() {
  const { coupons, isLoading } = useCoupons();
  const t = useTranslation();
  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination();

  const [searchQuery, setSearchQuery] = useState('');
  const filteredCoupons = useMemo(() => {
    let filtered = coupons;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = coupons.filter(
        (coupon) =>
          coupon.code.toLowerCase().includes(query) ||
          coupon.description?.toLowerCase().includes(query)
      );
    }

    return filtered
  }, [coupons, searchQuery])
  const paginatedCoupons = paginateItems(filteredCoupons);

  if (isLoading) {
    return (
      <div className="pt-14">
        <Loading />
      </div>
    );
  }

  const getDiscountText = (coupon: any) => {
    if (coupon.type === 'percentage') {
      return  t.customers.customer.coupon.list.discount.percentage.replace('{value}', coupon.value);
    } else if (coupon.type === 'fixed') {
      return  t.customers.customer.coupon.list.discount.fixed.replace('{value}', coupon.value);
    } else if (coupon.type === 'shipping') {
      return  t.customers.customer.coupon.list.discount.shipping;
    } else {
      return  t.customers.customer.coupon.list.discount.points.replace('{value}', coupon.value);
    }
  };

  const getUsageText = (coupon: any) => {
    const countText =  t.customers.customer.coupon.list.usage.count.replace('{count}', coupon.usageCount);
    if (!coupon.usageLimit) {
      return `${countText} (${ t.customers.customer.coupon.list.usage.limit.unlimited})`;
    }
    const limitText = coupon.usageLimit === 1 
      ?  t.customers.customer.coupon.list.usage.limit.one 
      :  t.customers.customer.coupon.list.usage.limit.many;
    return `${countText} (${limitText.replace('{count}', coupon.usageLimit)})`;
  };

  return (
    <div className="space-y-4">
      <motion.div
        className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-2xl font-semibold">{ t.customers.customer.coupon.title}</h1>
          <p className="text-sm text-muted-foreground">
            { t.customers.customer.coupon.description}
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/coupons/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            { t.customers.customer.coupon.actions.create}
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
          placeholder="Search coupon campaigns..."
        />
      </motion.div>

      <motion.div
        className="rounded-lg border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table className={paginatedCoupons.length > 0 ? 'rounded-b-none' : ''}>
          <TableHeader>
            <TableRow>
              <TableHead>{ t.customers.customer.coupon.list.columns.campaign}</TableHead>
              <TableHead>{ t.customers.customer.coupon.list.columns.discount}</TableHead>
              <TableHead>{ t.customers.customer.coupon.list.columns.usage}</TableHead>
              <TableHead>{ t.customers.customer.coupon.list.columns.duration}</TableHead>
              <TableHead>{ t.customers.customer.coupon.list.columns.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCoupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">
                      { t.customers.customer.coupon.list.empty.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      { t.customers.customer.coupon.list.empty.description}
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/coupons/campaigns/new">
                        <Plus className="mr-2 h-4 w-4" />
                        { t.customers.customer.coupon.actions.create}
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                        <Tags className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <Link
                          to={`/dashboard/coupons/campaigns/${coupon.id}`}
                          className="font-medium hover:underline"
                        >
                          {coupon.code}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {coupon.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {getDiscountText(coupon)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {getUsageText(coupon)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{coupon.startDate.toLocaleDateString()}</p>
                      <p className="text-muted-foreground">
                        { t.customers.customer.coupon.list.duration.to} {coupon.endDate.toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        coupon.status === 'active'
                          ? 'default'
                          : coupon.status === 'scheduled'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className={cn("capitalize shadow-none", {
                        '!bg-red-100 !text-red-700 dark:!bg-red-700 dark:!text-red-100': coupon.status === "expired",
                        '!bg-yellow-100 !text-yellow-700 dark:!bg-yellow-700 dark:!text-yellow-100': coupon.status === "scheduled",
                        '!bg-green-100 !text-green-700 dark:!bg-green-700 dark:!text-green-100': coupon.status === "active",
                        '!bg-gray-100 !text-gray-700 dark:!bg-gray-700 dark:!text-gray-100': coupon.status === "draft"
                      })}
                    >
                      { t.customers.customer.coupon.list.status[coupon.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <motion.div
          className={cn("border-t p-4 bg-main rounded-b-lg", {"hidden": paginatedCoupons.length === 0})}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <DataTablePagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={pageCount(coupons.length)}
            totalItems={coupons.length}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}