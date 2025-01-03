import { format } from 'date-fns';
import { Redeem } from '@/types/redeem';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Ticket, Store } from 'lucide-react';

interface OverviewProps {
  redeem: Redeem;
}

export function Overview({ redeem }: OverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="overflow-hidden">
        {/* Header Section */}
        <div className="bg-green-50 border-b border-green-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Ticket className="h-5 w-5 text-green-600" />
                <h3 className="text-xl font-mono">REDEEM #{redeem.code}</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                {format(redeem.redeemedAt, 'MMM dd, yyyy HH:mm')}
              </div>
            </div>
            <Badge className={getStatusColor(redeem.status)}>
              {redeem.status}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="grid gap-6">
            {/* Customer Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="h-4 w-4" />
                Customer Information
              </div>
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="font-medium">{redeem.customerName}</div>
                    <div className="text-sm text-muted-foreground">
                      {redeem.customerEmail}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{redeem.customerPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{redeem.customerAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Store className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{redeem.pickupLocation}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Items Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">
                  Redeemed Items
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Points: {redeem.pointsRedeemed.toLocaleString()}
                </div>
              </div>
              <div className="space-y-4">
                {redeem.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30"
                  >
                    <div className="h-12 w-12 rounded-lg border bg-white overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted flex items-center justify-center">
                          <Ticket className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × {item.points} points
                      </div>
                    </div>
                    <div className="font-mono text-right">
                      {(item.points * item.quantity).toLocaleString()} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Coupon Section */}
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">
                Coupon Details
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="font-medium">Coupon Code</div>
                <code className="px-2 py-1 rounded bg-muted font-mono text-sm">
                  {redeem.couponCode}
                </code>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}