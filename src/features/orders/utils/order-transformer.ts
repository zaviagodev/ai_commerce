import { Order } from "@/types/order";
import { transformCustomerAddress } from "./customer-address-transformer";

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
      name: item.product_variants?.name || "Product no longer available",
      variant: item.product_variants
        ? {
            name: item.product_variants.name,
            options: item.product_variants.options || [],
          }
        : undefined,
      price: Number(item.price),
      quantity: item.quantity,
      total: Number(item.total),
      pointsBasedPrice: Number(item.points_based_price),
    })),
    payment_details: order.payment_details,
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    pointsDiscount: Number(order.points_discount),
    appliedCoupons: order.applied_coupons || [],
    shipping: Number(order.shipping),
    shippingDetails: order.shipping_details,
    shippingAddress: transformCustomerAddress(order.shipping_address),
    billingAddress: transformCustomerAddress(order.billing_address),
    sameAsShipping: order.shipping_address?.id === order.billing_address?.id,
    tax: Number(order.tax),
    total: Number(order.total),
    loyalty_points_used: Number(order.loyalty_points_used),
    notes: order.notes,
    tags: order.tags || [],
    createdAt: new Date(order.created_at),
    updatedAt: new Date(order.updated_at),
  };
}
