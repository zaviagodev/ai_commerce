import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CustomerTierService } from '../services/customer-tier-service';
import { CustomerTier } from '@/types/customer';

export function useCustomerTiers() {
  const queryClient = useQueryClient();

  const {
    data: tiers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['customer-tiers'],
    queryFn: CustomerTierService.getTiers,
  });

  const createTier = useMutation({
    mutationFn: (tier: Omit<CustomerTier, 'id'>) =>
      CustomerTierService.createTier(tier),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-tiers'] });
    },
  });

  const updateTier = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CustomerTier> }) =>
      CustomerTierService.updateTier(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-tiers'] });
    },
  });

  const deleteTier = useMutation({
    mutationFn: CustomerTierService.deleteTier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-tiers'] });
    },
  });

  return {
    tiers,
    isLoading,
    error,
    createTier,
    updateTier,
    deleteTier,
  };
}