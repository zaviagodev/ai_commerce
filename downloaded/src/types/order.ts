import { CustomerAddress } from './customer';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  product?: {
    images?: {
      url: string;
      alt: string;
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
  payment_details?: {
    type: 'bank_transfer' | 'credit_card' | 'promptpay';
    bank_name?: string;
    slip_image?: string;
    confirmed_at?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}