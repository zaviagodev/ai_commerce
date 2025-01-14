import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { Users, Check, Clock, X } from 'lucide-react';
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
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import { TicketScanModal } from './ticket-scanning/ticket-scan-modal';

interface AttendeesProps {
  form: UseFormReturn<Product>;
}

// Mock data - replace with real data in production
const MOCK_ATTENDEES = Array.from({ length: 50 }, (_, i) => ({
  id: `ATT${String(i + 1).padStart(3, '0')}`,
  name: `Attendee ${i + 1}`,
  email: `attendee${i + 1}@example.com`,
  ticketType: i % 3 === 0 ? 'VIP' : 'Regular',
  price: i % 3 === 0 ? 199.99 : 99.99,
  purchaseDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
  status: i % 5 === 0 ? 'pending' : 'paid',
}));

export function Attendees({ form }: AttendeesProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showScanModal, setShowScanModal] = useState(false);

  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const currentAttendees = MOCK_ATTENDEES.slice(startIndex, endIndex);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
          <Users className="h-5 w-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">Attendees</h2>
          <p className="text-sm text-muted-foreground">
            Manage event attendees and ticket status
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {/* Ticket Scanning Section */}
        <div className="mb-6">
          <Card className="bg-blue-50/50 border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <QrCode className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium">Ticket Scanning</h3>
                  <p className="text-sm text-muted-foreground">
                    Scan QR codes or barcodes to validate tickets and track attendance
                  </p>
                  <Button
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700"
                    type="button"
                    onClick={() => setShowScanModal(true)}
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Scan Ticket
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attendee</TableHead>
                <TableHead>Ticket Type</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAttendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{attendee.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {attendee.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      // variant={attendee.ticketType === 'VIP' ? 'default' : 'secondary'}
                      className={cn("shadow-none !bg-gray-100 !text-gray-600", {
                        "!bg-yellow-500 !text-main": attendee.ticketType === 'VIP'
                      })}
                    >
                      {attendee.ticketType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {attendee.purchaseDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(attendee.price)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {attendee.status === 'paid' ? (
                        <Badge className="!bg-green-100 !text-green-700 dark:!bg-green-700 dark:!text-green-100 capitalize shadow-none">
                          <Check className="mr-1 h-3 w-3" />
                          Paid
                        </Badge>
                      ) : attendee.status === 'pending' ? (
                        <Badge className="!bg-yellow-100 !text-yellow-700 dark:!bg-yellow-700 dark:!text-yellow-100 capitalize shadow-none">
                          <Clock className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className='!bg-red-100 !text-red-700 dark:!bg-red-700 dark:!text-red-100 capitalize shadow-none'>
                          <X className="mr-1 h-3 w-3" />
                          Failed
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="border-t p-4 bg-main rounded-b-lg">
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={Math.ceil(MOCK_ATTENDEES.length / pageSize)}
              totalItems={MOCK_ATTENDEES.length}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      </CardContent>
      
      <TicketScanModal
        open={showScanModal}
        onOpenChange={setShowScanModal}
      />
    </Card>
  );
}