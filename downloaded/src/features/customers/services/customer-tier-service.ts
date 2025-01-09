import { supabase } from '@/lib/supabase';
import { CustomerTier } from '@/types/customer';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/auth/auth-store';

export class CustomerTierService {
  static async getTiers(): Promise<CustomerTier[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: tiers, error } = await supabase
        .from('customer_tiers')
        .select('*')
        .eq('store_name', user.storeName)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (tiers || []).map(tier => ({
        id: tier.id,
        name: tier.name,
        description: tier.description,
        color: tier.color,
        requirements: tier.requirements,
        rewardsMultiplier: tier.rewards_multiplier,
        discountPercentage: tier.discount_percentage,
        freeShipping: tier.free_shipping,
        prioritySupport: tier.priority_support,
        earlyAccess: tier.early_access,
        status: tier.status,
      }));
    } catch (error) {
      console.error('Failed to fetch tiers:', error);
      toast.error('Failed to load customer tiers');
      return [];
    }
  }

  static async createTier(tier: Omit<CustomerTier, 'id'>): Promise<CustomerTier> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: newTier, error } = await supabase
        .from('customer_tiers')
        .insert({
          store_name: user.storeName,
          name: tier.name,
          description: tier.description,
          color: tier.color,
          requirements: tier.requirements,
          rewards_multiplier: tier.rewardsMultiplier,
          discount_percentage: tier.discountPercentage,
          free_shipping: tier.freeShipping,
          priority_support: tier.prioritySupport,
          early_access: tier.earlyAccess,
          status: tier.status,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Customer tier created successfully');
      return {
        id: newTier.id,
        name: newTier.name,
        description: newTier.description,
        color: newTier.color,
        requirements: newTier.requirements,
        rewardsMultiplier: newTier.rewards_multiplier,
        discountPercentage: newTier.discount_percentage,
        freeShipping: newTier.free_shipping,
        prioritySupport: newTier.priority_support,
        earlyAccess: newTier.early_access,
        status: newTier.status,
      };
    } catch (error: any) {
      console.error('Failed to create tier:', error);
      toast.error(error.message || 'Failed to create tier');
      throw error;
    }
  }

  static async updateTier(id: string, tier: Partial<CustomerTier>): Promise<CustomerTier> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { data: updatedTier, error } = await supabase
        .from('customer_tiers')
        .update({
          name: tier.name,
          description: tier.description,
          color: tier.color,
          requirements: tier.requirements,
          rewards_multiplier: tier.rewardsMultiplier,
          discount_percentage: tier.discountPercentage,
          free_shipping: tier.freeShipping,
          priority_support: tier.prioritySupport,
          early_access: tier.earlyAccess,
          status: tier.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('store_name', user.storeName)
        .select()
        .single();

      if (error) throw error;

      toast.success('Customer tier updated successfully');
      return {
        id: updatedTier.id,
        name: updatedTier.name,
        description: updatedTier.description,
        color: updatedTier.color,
        requirements: updatedTier.requirements,
        rewardsMultiplier: updatedTier.rewards_multiplier,
        discountPercentage: updatedTier.discount_percentage,
        freeShipping: updatedTier.free_shipping,
        prioritySupport: updatedTier.priority_support,
        earlyAccess: updatedTier.early_access,
        status: updatedTier.status,
      };
    } catch (error: any) {
      console.error('Failed to update tier:', error);
      toast.error(error.message || 'Failed to update tier');
      throw error;
    }
  }

  static async deleteTier(id: string): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error('Store not found');

      const { error } = await supabase
        .from('customer_tiers')
        .delete()
        .eq('id', id)
        .eq('store_name', user.storeName);

      if (error) throw error;

      toast.success('Customer tier deleted successfully');
    } catch (error) {
      console.error('Failed to delete tier:', error);
      toast.error('Failed to delete tier');
      throw error;
    }
  }
}