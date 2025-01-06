import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CampaignService } from '../services/campaign-service';
import { Campaign } from '@/types/campaign';

export function useCampaigns() {
  const queryClient = useQueryClient();

  const {
    data: campaigns = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['campaigns'],
    queryFn: CampaignService.getCampaigns,
  });

  const createCampaign = useMutation({
    mutationFn: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) =>
      CampaignService.createCampaign(campaign),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  const updateCampaign = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Campaign> }) =>
      CampaignService.updateCampaign(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  const deleteCampaign = useMutation({
    mutationFn: CampaignService.deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  return {
    campaigns,
    isLoading,
    error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  };
}