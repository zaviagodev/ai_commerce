import { CustomerAddress } from "./customer";

export interface OrderCoupon {
  code: string;
  type: "percentage" | "fixed" | "shipping" | "points";
  value: number;
  discount: number;
}

export interface OrderItem {
  id: string;
  variantId: string;
  name: string;
  variant?: {
    name: string;
    options: {
      name: string;
      value: string;
    }[];
  };
  price: number;
  quantity: number;
  total: number;
  pointsBasedPrice: number;
}

export interface Order {
  id: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: CustomerAddress;
  billingAddress?: CustomerAddress;
  sameAsShipping: boolean;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  discount: number;
  pointsDiscount: number;
  shipping: number;
  shippingDetails?: {
    courier: string;
    tracking_number: string;
    shipped_at: string;
  };
  tax: number;
  total: number;
  notes?: string;
  tags: string[];
  appliedCoupons: OrderCoupon[];
  payment_details?: {
    type: "bank_transfer" | "credit_card" | "promptpay";
    bank_name?: string;
    slip_image?: string;
    confirmed_at?: string;
  };
  loyalty_points_used: number;
  createdAt: Date;
  updatedAt: Date;
}
