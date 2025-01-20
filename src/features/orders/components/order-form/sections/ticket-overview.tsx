import { format } from 'date-fns';
import { Order, CustomerAddress } from '@/types/order';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn, formatCurrency } from '@/lib/utils';
import {
  ShoppingBag,
  MapPin,
  User,
  Package,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface TicketOverviewProps {
  order: Order;
  shippingAddress?: CustomerAddress;
}

const ORDER_STATUSES = [
  { id: 'pending', label: 'Pending' },
  { id: 'processing', label: 'Processing' },
  { id: 'shipped', label: 'Shipped' },
  { id: 'delivered', label: 'Delivered' },
] as const;

export function TicketOverview({
  order,
  shippingAddress,
}: TicketOverviewProps) {
  const displayAddress = shippingAddress || order.shippingAddress;
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const orderNumber = order.id.split('-')[0].toUpperCase();
  const currentIndex = ORDER_STATUSES.findIndex(
    (status) => status.id === order.status
  );
  const nextStatus =
    order.status !== 'cancelled' ? ORDER_STATUSES[currentIndex + 1] : null;

  const StatusBadge = ({ status } : { status: string | null }) => {
    const badgeClassName = 
      status === 'pending' ? '!bg-yellow-100 !text-yellow-800 border-yellow-500/50' :
      status === 'processing' ? '!bg-blue-100 !text-blue-800 border-blue-500/50' :
      status === 'shipped' ? '!bg-purple-100 !text-purple-800 border-purple-500/50' :
      status === 'delivered' ? '!bg-green-600 !text-green-100' :
      status === 'cancelled' ? '!bg-red-600 !text-red-100' :
      '!bg-gray-100 !text-gray-800 border-gray-500/50'

    const innerBadgeClassName = 
      status === 'pending' ? 'bg-yellow-400' :
      status === 'processing' ? 'bg-blue-400' :
      status === 'shipped' ? 'bg-purple-400' :
      status === 'delivered' ? 'bg-green-300' :
      status === 'cancelled' ? 'bg-red-300' :
      'bg-gray-400'

    const animateInnerBadgeClassName = 
      status === 'pending' ? 'bg-yellow-500' :
      status === 'processing' ? 'bg-blue-500' :
      status === 'shipped' ? 'bg-purple-500' :
      status === 'delivered' ? 'bg-green-400' :
      status === 'cancelled' ? 'bg-red-400' :
      'bg-gray-500'
    return (
      <Badge className={cn("flex items-center gap-1.5 shadow-none", badgeClassName)}>
        <span className="relative flex h-2 w-2">
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",  animateInnerBadgeClassName)} />
          <span className={cn("relative inline-flex h-2 w-2 rounded-full", innerBadgeClassName)} />
        </span>
        <span className='capitalize'>{status}</span>
      </Badge>
    )
  }

  return (
    <div className="bg-main rounded-sm shadow-md overflow-hidden print:shadow-none">
      {/* Header Section */}
      <div className="bg-primary/5 p-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-mono">ORDER #{orderNumber}</h3>
            </div>
          </div>
          <div>
            <div className={`relative flex items-center ${order.status === 'cancelled' || order.status === 'delivered' ? 'justify-end' : 'justify-between'} w-[240px] h-8`}>
              {/* Current Status */}
              <div className="relative z-10">
                <StatusBadge status={order.status} />
              </div>

              {nextStatus && (
                <>
                  {/* Connecting Line */}
                  <div className="absolute left-[calc(25%+24px)] right-[calc(25%+24px)] top-1/2 h-[2px] -translate-y-1/2">
                    <div className="relative h-full">
                      {/* Background line */}
                      <div className="absolute inset-0 bg-blue-100" />

                      {/* Animated progress line */}
                      <div className="absolute h-full w-full bg-blue-50">
                        <div
                          className="absolute h-full w-8 animate-[shimmer_2s_infinite]"
                          style={{
                            background:
                              'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)',
                          }}
                        />
                      </div>
                    </div>

                    {/* Chevron Icon */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-full border p-1 border-blue-200">
                      <ChevronRight className="h-2.5 w-2.5 text-blue-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Next Status */}
                  <div className="relative z-10">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1.5 bg-gray-100/50 text-gray-400"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-gray-300/50" />
                      </span>
                      {nextStatus.label}
                    </Badge>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          <Clock className="h-4 w-4 inline-block mr-1" />
          {format(order.createdAt, 'MMM dd, yyyy HH:mm')}
        </div>
      </div>

      {/* Perforation Line */}
      <div className="relative">
        <div className="absolute left-0 right-0 h-4 flex items-center justify-between px-2">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-muted" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 pt-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Passenger Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-primary" />
              <h4 className="font-medium">Customer Details</h4>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-lg">
                {order.customerName || 'Guest Customer'}
              </div>
              {order.customerEmail && (
                <div className="text-sm text-muted-foreground">
                  {order.customerEmail}
                </div>
              )}
              {order.customerPhone && (
                <div className="text-sm text-muted-foreground">
                  {order.customerPhone}
                </div>
              )}
            </div>
          </div>

          {/* Destination Section */}
          {displayAddress && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Shipping Address</h4>
              </div>
              <div className="space-y-1">
                <div className="font-mono">
                  {displayAddress.firstName} {displayAddress.lastName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {displayAddress.address1}
                  {displayAddress.address2 && <br />}
                  {displayAddress.address2}
                  <br />
                  {displayAddress.city}, {displayAddress.state}{' '}
                  {displayAddress.postalCode}
                  <br />
                  {displayAddress.country}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cargo Section */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-4 w-4 text-primary" />
            <h4 className="font-medium">Order Items</h4>
          </div>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/30"
              >
                <div className="h-12 w-12 rounded-sm bg-main overflow-hidden flex-shrink-0">
                  {item.product?.images?.[0] ? (
                    <img
                      src={item.product.images[0].url}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.name}</div>
                  <div className="text-sm">
                    Qty: {item.quantity} × {formatCurrency(item.price)}
                  </div>
                </div>
                <div className="font-mono text-right">
                  {formatCurrency(item.total)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fare Summary */}
        <div className="mt-8 rounded-sm p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Items ({totalItems})
              </span>
              <span className="font-mono">
                {formatCurrency(order.subtotal)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-destructive">Discount</span>
                <span className="font-mono text-destructive">
                  -{formatCurrency(order.discount)}
                </span>
              </div>
            )}
            {order.shipping > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-mono">
                  {formatCurrency(order.shipping)}
                </span>
              </div>
            )}
            {order.tax > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-mono">{formatCurrency(order.tax)}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="font-mono text-lg">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <div className="font-mono mb-1">*{order.id}*</div>
          <div>Thank you for your business!</div>
        </div>
      </div>
    </div>
  );
}
