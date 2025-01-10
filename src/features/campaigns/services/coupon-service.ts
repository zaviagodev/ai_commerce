import { supabase } from '@/lib/supabase';
import { Coupon } from '@/types/coupon';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/auth/auth-store';

export class CouponService {
  static async getCoupons(): Promise<Coupon[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: coupons, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('store_name', user.storeName)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (coupons || []).map(coupon => ({
        id: coupon.id,
        code: coupon.code,
        description: coupon.description,
        type: coupon.type,
        value: Number(coupon.value),
        minPurchaseAmount: coupon.min_purchase_amount ? Number(coupon.min_purchase_amount) : undefined,
        maxDiscountAmount: coupon.max_discount_amount ? Number(coupon.max_discount_amount) : undefined,
        maxPointsEarned: coupon.max_points_earned,
        pointsValidity: coupon.points_validity,
        usageLimit: coupon.usage_limit,
        usageCount: coupon.usage_count,
        startDate: new Date(coupon.start_date),
        endDate: new Date(coupon.end_date),
        status: coupon.status,
        advancedMode: coupon.advanced_mode,
        conditions: coupon.conditions || [],
      }));
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
      toast.error('Failed to load coupons');
      return [];
    }
  }

  static async getCouponByCode(storeName: string, code: string): Promise<Coupon | null> {
    try {
      const { data: coupon, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('store_name', storeName)
        .eq('code', code)
        .eq('status', 'active')
        .lte('start_date', new Date().toISOString())
        .gt('end_date', new Date().toISOString())
        .single();

      if (error) throw error;
      if (!coupon) return null;

      return {
        id: coupon.id,
        code: coupon.code,
        description: coupon.description,
        type: coupon.type,
        value: Number(coupon.value),
        minPurchaseAmount: coupon.min_purchase_amount ? Number(coupon.min_purchase_amount) : undefined,
        maxDiscountAmount: coupon.max_discount_amount ? Number(coupon.max_discount_amount) : undefined,
        maxPointsEarned: coupon.max_points_earned,
        pointsValidity: coupon.points_validity,
        usageLimit: coupon.usage_limit,
        usageCount: coupon.usage_count,
        startDate: new Date(coupon.start_date),
        endDate: new Date(coupon.end_date),
        status: coupon.status,
        advancedMode: coupon.advanced_mode,
        conditions: coupon.conditions || [],
      };
    } catch (error) {
      console.error('Failed to fetch coupon:', error);
      return null;
    }
  }

  static async createCoupon(coupon: Omit<Coupon, 'id'>): Promise<Coupon> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: newCoupon, error } = await supabase
        .from('coupons')
        .insert({
          store_name: user.storeName,
          code: coupon.code,
          description: coupon.description,
          type: coupon.type,
          value: coupon.value,
          min_purchase_amount: coupon.minPurchaseAmount,
          max_discount_amount: coupon.maxDiscountAmount,
          max_points_earned: coupon.maxPointsEarned,
          points_validity: coupon.pointsValidity,
          usage_limit: coupon.usageLimit,
          start_date: coupon.startDate.toISOString(),
          end_date: coupon.endDate.toISOString(),
          status: coupon.status,
          advanced_mode: coupon.advancedMode,
          conditions: coupon.conditions,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Coupon created successfully');
      return {
        ...coupon,
        id: newCoupon.id,
      };
    } catch (error: any) {
      console.error('Failed to create coupon:', error);
      toast.error(error.message || 'Failed to create coupon');
      throw error;
    }
  }

  static async updateCoupon(id: string, coupon: Partial<Coupon>): Promise<Coupon> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: updatedCoupon, error } = await supabase
        .from('coupons')
        .update({
          code: coupon.code,
          description: coupon.description,
          type: coupon.type,
          value: coupon.value,
          min_purchase_amount: coupon.minPurchaseAmount,
          max_discount_amount: coupon.maxDiscountAmount,
          max_points_earned: coupon.maxPointsEarned,
          points_validity: coupon.pointsValidity,
          usage_limit: coupon.usageLimit,
          start_date: coupon.startDate?.toISOString(),
          end_date: coupon.endDate?.toISOString(),
          status: coupon.status,
          advanced_mode: coupon.advancedMode,
          conditions: coupon.conditions,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('store_name', user.storeName)
        .select()
        .single();

      if (error) throw error;

      toast.success('Coupon updated successfully');
      return {
        ...coupon,
        id: updatedCoupon.id,
      } as Coupon;
    } catch (error: any) {
      console.error('Failed to update coupon:', error);
      toast.error(error.message || 'Failed to update coupon');
      throw error;
    }
  }

  static async deleteCoupon(id: string): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', id)
        .eq('store_name', user.storeName);

      if (error) throw error;

      toast.success('Coupon deleted successfully');
    } catch (error) {
      console.error('Failed to delete coupon:', error);
      toast.error('Failed to delete coupon');
      throw error;
    }
  }
}