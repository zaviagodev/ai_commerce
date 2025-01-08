import { supabase } from '@/lib/supabase';
import { Order } from '@/types/order';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/auth/auth-store';
import { transformOrder } from '../utils/order-transformer';

export class OrderService {
  static async getOrders(): Promise<Order[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          *,
          customers (
            first_name,
            last_name,
            email,
            phone
          ),
          order_items (
            id,
            product_id,
            quantity,
            price,
            total,
            products (
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
        `)
        .eq('store_name', user.storeName)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (orders || []).map(transformOrder);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');
      return [];
    }
  }

  static async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    try {
      // Validate required customer ID
      if (!order.customerId) {
        throw new Error('Customer is required');
      }

      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: newOrder, error } = await supabase.rpc('create_order', {
        p_store_name: user.storeName,
        p_customer_id: order.customerId,
        p_status: order.status,
        p_subtotal: order.subtotal,
        p_discount: order.discount,
        p_shipping: order.shipping,
        p_tax: order.tax,
        p_total: order.total,
        p_notes: order.notes,
        p_tags: order.tags,
        p_items: order.items.map(item => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
          total: item.total
        }))
      });

      if (error) throw error;
      if (!newOrder?.[0]) throw new Error('Failed to create order');

      toast.success('Order created successfully');
      return {
        ...order,
        id: newOrder[0].id,
        createdAt: new Date(newOrder[0].created_at),
        updatedAt: new Date(newOrder[0].updated_at),
      };
    } catch (error: any) {
      console.error('Failed to create order:', error);
      toast.error(error.message || 'Failed to create order');
      throw error;
    }
  }

  static async updateOrder(id: string, data: Partial<Order>): Promise<Order> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      // Start by updating the order details
      const { data: updatedOrder, error } = await supabase
        .from('orders')
        .update({
          customer_id: data.customerId,
          status: data.status,
          subtotal: data.subtotal,
          discount: data.discount,
          shipping: data.shipping,
          tax: data.tax,
          total: data.total,
          notes: data.notes,
          tags: data.tags,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('store_name', user.storeName)
        .select()
        .single();

      if (error) throw error;

      // If there are items to update
      if (data.items) {
        // First delete existing order items
        const { error: deleteError } = await supabase
          .from('order_items')
          .delete()
          .eq('order_id', id);

        if (deleteError) throw deleteError;

        // Then insert the new items
        if (data.items.length > 0) {
          const { error: insertError } = await supabase
            .from('order_items')
            .insert(
              data.items.map(item => ({
                order_id: id,
                product_id: item.productId,
                quantity: item.quantity,
                price: item.price,
                total: item.total
              }))
            );

          if (insertError) throw insertError;
        }
      }
      toast.success('Order updated successfully');
      return {
        ...data,
        id,
        createdAt: new Date(updatedOrder.created_at),
        updatedAt: new Date(updatedOrder.updated_at),
      } as Order;
    } catch (error: any) {
      console.error('Failed to update order:', error);
      toast.error(error.message || 'Failed to update order');
      throw error;
    }
  }

  static async deleteOrder(id: string): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id)
        .eq('store_name', user.storeName);

      if (error) throw error;

      toast.success('Order deleted successfully');
    } catch (error) {
      console.error('Failed to delete order:', error);
      toast.error('Failed to delete order');
      throw error;
    }
  }
}