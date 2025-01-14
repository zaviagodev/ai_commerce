export interface OrderCoupon {
  code: string;
  type: 'percentage' | 'fixed' | 'shipping' | 'points';
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
}

export interface Order {
  id: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: CustomerAddress;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  notes?: string;
  tags: string[];
  appliedCoupons: OrderCoupon[];
  payment_details?: {
    type: 'bank_transfer' | 'credit_card' | 'promptpay';
    bank_name?: string;
    slip_image?: string;
    confirmed_at?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}