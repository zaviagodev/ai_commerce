import { Campaign } from '@/types/campaign';

export class CampaignService {
  // Placeholder service methods - will be implemented later
  static async getCampaigns(): Promise<Campaign[]> {
    return [];
  }

  static async createCampaign(campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<Campaign> {
    throw new Error('Not implemented');
  }

  static async updateCampaign(id: string, campaign: Partial<Campaign>): Promise<Campaign> {
    throw new Error('Not implemented');
  }
}