import { Order } from '@/types/order';

export function transformOrder(order: any): Order {
  return {
    id: order.id,
    customerId: order.customer_id,
    customerName: order.customers
      ? `${order.customers.first_name} ${order.customers.last_name}`
      : undefined,
    customerEmail: order.customers?.email,
    status: order.status,
    items: (order.order_items || []).map((item: any) => ({
      id: item.id,
      variantId: item.variant_id,
      name: item.product_variants?.name || 'Product no longer available',
      variant: item.product_variants ? {
        name: item.product_variants.name,
        options: item.product_variants.options || []
      } : undefined,
      price: Number(item.price),
      quantity: item.quantity,
      total: Number(item.total),
    })),
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    shipping: Number(order.shipping),
    tax: Number(order.tax),
    total: Number(order.total),
    notes: order.notes,
    tags: order.tags || [],
    createdAt: new Date(order.created_at),
    updatedAt: new Date(order.updated_at),
  };
}
