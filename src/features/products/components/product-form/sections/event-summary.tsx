import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { Calendar, MapPin, Users, Clock, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface EventSummaryProps {
  form: UseFormReturn<Product>;
}

export function EventSummary({ form }: EventSummaryProps) {
  const eventStartDate = form.watch('eventStartDate');
  const eventEndDate = form.watch('eventEndDate');
  const eventVenue = form.watch('eventVenue');
  const eventAddress = form.watch('eventAddress');
  const price = form.watch('price');

  // Mock data - replace with real data in production
  const totalTicketsSold = 156;
  const totalRevenue = totalTicketsSold * (price || 0);
  const capacity = 200;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          <Calendar className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">Event Summary</h2>
          <p className="text-sm text-muted-foreground">
            Overview of event details and performance
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Event Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <Users className="h-4 w-4" />
                Tickets Sold
              </div>
              <div className="text-2xl font-bold">
                {totalTicketsSold} <span className="text-sm text-muted-foreground font-normal">/ {capacity}</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {Math.round((totalTicketsSold / capacity) * 100)}% of capacity
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <DollarSign className="h-4 w-4" />
                Total Revenue
              </div>
              <div className="text-2xl font-bold">
                {formatCurrency(totalRevenue)}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Average price: {formatCurrency(price || 0)}
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                Time Until Event
              </div>
              <div className="text-2xl font-bold">
                {eventStartDate ? Math.max(0, Math.ceil((new Date(eventStartDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 0} days
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {eventStartDate ? new Date(eventStartDate).toLocaleDateString() : 'Not set'}
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Calendar className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <div className="font-medium">Date & Time</div>
                  <div className="text-sm text-muted-foreground">
                    {eventStartDate ? (
                      <>
                        {new Date(eventStartDate).toLocaleDateString()} at{' '}
                        {new Date(eventStartDate).toLocaleTimeString()}
                        {eventEndDate && (
                          <>
                            {' '}
                            - {new Date(eventEndDate).toLocaleDateString()} at{' '}
                            {new Date(eventEndDate).toLocaleTimeString()}
                          </>
                        )}
                      </>
                    ) : (
                      'Not set'
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">
                    {eventVenue || 'Venue not set'}
                    {eventAddress && (
                      <div className="mt-1">{eventAddress}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}