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

export function CouponCampaignsPage() {
  const { coupons, isLoading } = useCoupons();
  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination();

  const paginatedCoupons = paginateItems(coupons);

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
          <h1 className="text-2xl font-semibold">Coupon Campaigns</h1>
          <p className="text-sm text-muted-foreground">
            Manage your store's coupon campaigns
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/coupons/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </Button>
      </motion.div>

      <motion.div
        className="rounded-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table className={paginatedCoupons.length > 0 ? 'rounded-b-none' : ''}>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCoupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">
                      No coupon campaigns found
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Get started by creating your first coupon campaign
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/coupons/campaigns/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Campaign
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
                      {coupon.type === 'percentage'
                        ? `${coupon.value}% off`
                        : coupon.type === 'fixed'
                        ? `$${coupon.value} off`
                        : coupon.type === 'shipping'
                        ? 'Free Shipping'
                        : `${coupon.value}x Points`}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{coupon.usageCount} used</p>
                      <p className="text-muted-foreground">
                        {coupon.usageLimit
                          ? `${coupon.usageLimit} ${
                              coupon.usageLimit === 1 ? 'limit' : 'limits'
                            }`
                          : 'Unlimited'}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{coupon.startDate.toLocaleDateString()}</p>
                      <p className="text-muted-foreground">
                        to {coupon.endDate.toLocaleDateString()}
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
                      {coupon.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {coupons.length > 0 && (
          <motion.div
            className="border-t p-4 bg-main rounded-b-lg"
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
        )}
      </motion.div>
    </div>
  );
}