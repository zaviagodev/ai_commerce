import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EcommerceSettingsService } from '../services/ecommerce-settings-service';
import { EcommerceSettings } from '../schemas/ecommerce-settings-schema';

export function useEcommerceSettings() {
  const queryClient = useQueryClient();

  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ecommerce-settings'],
    queryFn: EcommerceSettingsService.getSettings,
  });

  const updateSettings = useMutation({
    mutationFn: EcommerceSettingsService.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ecommerce-settings'] });
    },
  });

  return {
    settings,
    isLoading,
    error,
    updateSettings,
  };
}