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
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import { TicketScanModal } from './ticket-scanning/ticket-scan-modal';
import { useTranslation } from '@/lib/i18n/hooks';

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
  const t = useTranslation();
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
          <h2 className="text-lg font-medium">{t.products.products.form.sections.attendees.title}</h2>
          <p className="text-sm text-muted-foreground">
            {t.products.products.form.sections.attendees.description}
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
                  <h3 className="font-medium">{t.products.products.form.sections.attendees.ticketScanning.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.products.products.form.sections.attendees.ticketScanning.description}
                  </p>
                  <Button
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700"
                    type="button"
                    onClick={() => setShowScanModal(true)}
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    {t.products.products.form.sections.attendees.ticketScanning.scanButton}
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
                <TableHead>{t.products.products.form.sections.attendees.table.attendee}</TableHead>
                <TableHead>{t.products.products.form.sections.attendees.table.ticketType}</TableHead>
                <TableHead>{t.products.products.form.sections.attendees.table.purchaseDate}</TableHead>
                <TableHead>{t.products.products.form.sections.attendees.table.price}</TableHead>
                <TableHead>{t.products.products.form.sections.attendees.table.status}</TableHead>
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
                    <Badge variant={attendee.ticketType === 'VIP' ? 'default' : 'secondary'}>
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
                        <Badge className="bg-green-100 text-green-700 capitalize">
                          <Check className="mr-1 h-3 w-3" />
                          {t.products.products.form.sections.attendees.status.paid}
                        </Badge>
                      ) : attendee.status === 'pending' ? (
                        <Badge className="bg-yellow-100 text-yellow-700 capitalize">
                          <Clock className="mr-1 h-3 w-3" />
                          {t.products.products.form.sections.attendees.status.pending}
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className='capitalize'>
                          <X className="mr-1 h-3 w-3" />
                          {t.products.products.form.sections.attendees.status.failed}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="border-t p-4 bg-white rounded-b-lg">
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