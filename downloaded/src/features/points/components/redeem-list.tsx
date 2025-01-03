import { Link, useNavigate } from 'react-router-dom';
import { Plus, QrCode, Barcode } from 'lucide-react';
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
import { Redeem } from '@/types/redeem';
import { DataTablePagination } from '@/components/ui/data-table/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { formatDate } from '@/lib/utils';
import { RedeemCodeModal } from './redeem-code-modal';
import { useState } from 'react';

interface RedeemListProps {
  redeems: Redeem[];
  isLoading: boolean;
}

export function RedeemList({ redeems, isLoading }: RedeemListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination();

  const paginatedRedeems = paginateItems(redeems);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Redeem List</h1>
          <p className="text-sm text-muted-foreground">
            Manage point redemption orders
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Redeem
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Redeem Code</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Points Redeemed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Redeemed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {redeems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">No redeems found</p>
                    <p className="text-sm text-muted-foreground">
                      Start by processing a new redeem order
                    </p>
                    <Button 
                      onClick={() => setIsModalOpen(true)} 
                      className="mt-4" 
                      variant="outline"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      New Redeem
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedRedeems.map((redeem) => (
                <TableRow 
                  key={redeem.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/dashboard/points/redeem/${redeem.id}`)}
                >
                  <TableCell>
                    <div className="font-mono">{redeem.code}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{redeem.customerName}</div>
                    <div className="text-sm text-muted-foreground">
                      {redeem.customerEmail}
                    </div>
                  </TableCell>
                  <TableCell>{redeem.pointsRedeemed.toLocaleString()} points</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        redeem.status === 'completed'
                          ? 'default'
                          : redeem.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {redeem.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(redeem.redeemedAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {redeems.length > 0 && (
          <div className="border-t p-4 bg-white rounded-b-lg">
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount(redeems.length)}
              totalItems={redeems.length}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>

      <RedeemCodeModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}