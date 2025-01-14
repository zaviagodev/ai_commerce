import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Order } from '@/types/order';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Package, ChevronRight } from 'lucide-react';

export function CustomerOrders() {
  const { storeName } = useParams<{ storeName: string }>();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['customer-orders', storeName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            variant_id,
            quantity,
            price,
            total,
            product_variants (
              name,
              options,
              product:products (
                name,
                status,
                product_images (
                  id,
                  url,
                  alt,
                  position
                )
              )
            )
          )
        `)
        .eq('store_name', storeName)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No orders yet</h3>
        <p className="text-sm text-muted-foreground mt-1">
          When you place orders, they will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="rounded-lg border bg-card">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Order #{order.id.split('-')[0].toUpperCase()}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge
                className={cn('capitalize shadow-none', {
                  'bg-yellow-100 text-yellow-800': order.status === 'pending',
                  'bg-blue-100 text-blue-800': order.status === 'processing',
                  'bg-purple-100 text-purple-800': order.status === 'shipped',
                  'bg-green-100 text-green-800': order.status === 'delivered',
                  'bg-red-100 text-red-800': order.status === 'cancelled',
                })}
              >
                {order.status}
              </Badge>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Order Items */}
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-16 w-16 rounded-lg border bg-muted overflow-hidden">
                    {item.variant?.product?.images?.[0] ? (
                      <img
                        src={item.variant.product.images[0].url}
                        alt={item.variant.product.images[0].alt}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Package className="h-6 w-6 m-auto text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(item.total)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-destructive">
                  <span>Discount</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}
              {order.shipping > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{formatCurrency(order.shipping)}</span>
                </div>
              )}
              {order.tax > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>

            {/* View Details Button */}
            <Button variant="outline" className="w-full mt-4">
              View Details
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}