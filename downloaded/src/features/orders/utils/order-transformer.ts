import { Order } from '@/types/order';

export function transformOrder(order: any): Order {
  return {
    id: order.id,
    customerId: order.customer_id,
    customerName: order.customers
      ? `${order.customers.first_name} ${order.customers.last_name}`
      : undefined,
    customerEmail: order.customers?.email,
    customerPhone: order.customers?.phone,
    status: order.status,
    items: (order.order_items || []).map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      name: item.products?.status === 'active' 
        ? item.products.name 
        : 'Product no longer available',
      product: {
        images: item.products?.product_images || []
      },
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
    payment_details: order.payment_details,
    tags: order.tags || [],
    createdAt: new Date(order.created_at),
    updatedAt: new Date(order.updated_at),
  };
}