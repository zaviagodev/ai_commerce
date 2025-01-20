import { Link } from 'react-router-dom';
import { Plus, Gift, Calendar, Users } from 'lucide-react';
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
import { Campaign } from '@/types/campaign';
import { DataTablePagination } from '@/components/ui/data-table/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { formatDate } from '@/lib/utils';
import Loading from '@/components/loading';
import { useTranslation } from '@/lib/i18n/hooks';

interface CampaignListProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

export function CampaignList({ campaigns, isLoading }: CampaignListProps) {
  const t = useTranslation();
  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination();

  const paginatedCampaigns = paginateItems(campaigns);

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
          <h1 className="text-2xl font-semibold">{ t.customers.customer.campaign.title}</h1>
          <p className="text-sm text-muted-foreground">
            { t.customers.customer.campaign.description}
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/points/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            { t.customers.customer.campaign.actions.create}
          </Link>
        </Button>
      </motion.div>

      <motion.div
        className="rounded-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table className={campaigns.length > 0 ? 'rounded-b-none' : ''}>
          <TableHeader>
            <TableRow>
              <TableHead>{ t.customers.customer.campaign.list.columns.campaign}</TableHead>
              <TableHead>{ t.customers.customer.campaign.list.columns.type}</TableHead>
              <TableHead>{ t.customers.customer.campaign.list.columns.duration}</TableHead>
              <TableHead>{ t.customers.customer.campaign.list.columns.target}</TableHead>
              <TableHead>{ t.customers.customer.campaign.list.columns.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">{ t.customers.customer.campaign.list.empty.title}</p>
                    <p className="text-sm text-muted-foreground">
                      { t.customers.customer.campaign.list.empty.description}
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/points/campaigns/new">
                        <Plus className="mr-2 h-4 w-4" />
                        { t.customers.customer.campaign.actions.create}
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                        <Gift className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <Link
                          to={`/dashboard/points/campaigns/${campaign.id}`}
                          className="font-medium hover:underline"
                        >
                          {campaign.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {campaign.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      { t.customers.customer.campaign.list.types[campaign.type]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <div>{formatDate(campaign.startDate)}</div>
                        <div className="text-muted-foreground">
                          { t.customers.customer.campaign.list.duration.to} {formatDate(campaign.endDate)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        { t.customers.customer.campaign.list.target[campaign.targetType]}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        campaign.status === 'active'
                          ? 'default'
                          : campaign.status === 'scheduled'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className="capitalize"
                    >
                      { t.customers.customer.campaign.list.status[campaign.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {campaigns.length > 0 && (
          <motion.div
            className="border-t p-4 bg-white rounded-b-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount(campaigns.length)}
              totalItems={campaigns.length}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
