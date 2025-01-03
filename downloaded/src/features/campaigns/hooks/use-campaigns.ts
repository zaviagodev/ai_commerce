import { useState } from 'react';
import { Campaign } from '@/types/campaign';

// Mock data for development
const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Summer Double Points',
    description: 'Earn double points on all purchases',
    type: 'points_multiplier',
    multiplier: 2,
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-31'),
    targetType: 'all',
    status: 'scheduled',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Welcome Bonus',
    description: 'Get 500 bonus points on your first purchase',
    type: 'bonus_points',
    bonusPoints: 500,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    targetType: 'group',
    targetGroups: ['new-customers'],
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useCampaigns() {
  const [campaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [isLoading] = useState(false);

  const createCampaign = {
    mutateAsync: async (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => {
      console.log('Creating campaign:', campaign);
      // Implementation will be added later
    },
  };

  const updateCampaign = {
    mutateAsync: async ({ id, data }: { id: string; data: Partial<Campaign> }) => {
      console.log('Updating campaign:', { id, data });
      // Implementation will be added later
    },
  };

  return {
    campaigns,
    isLoading,
    error: null,
    createCampaign,
    updateCampaign,
  };
}