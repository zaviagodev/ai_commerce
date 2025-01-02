import { Link } from 'react-router-dom';
import { Plus, Gift, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface CampaignListProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

export function CampaignList({ campaigns, isLoading }: CampaignListProps) {
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
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Campaigns</h1>
          <p className="text-sm text-muted-foreground">
            Manage your points and rewards campaigns
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/points/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            Create campaign
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">No campaigns found</p>
                    <p className="text-sm text-muted-foreground">
                      Get started by creating your first campaign
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/points/campaigns/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Create campaign
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
                      {campaign.type === 'points_multiplier' ? 'Points Multiplier' : 'Bonus Points'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <div>{formatDate(campaign.startDate)}</div>
                        <div className="text-muted-foreground">
                          to {formatDate(campaign.endDate)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {campaign.targetType === 'all' 
                          ? 'All Customers'
                          : campaign.targetType === 'tier' 
                            ? 'Specific Tiers'
                            : 'Specific Groups'}
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
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {campaigns.length > 0 && (
          <div className="border-t p-4 bg-white rounded-b-lg">
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount(campaigns.length)}
              totalItems={campaigns.length}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>
    </div>
  );
}