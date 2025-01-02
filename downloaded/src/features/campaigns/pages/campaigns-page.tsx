import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignList } from '../components/campaign-list';
import { useCampaigns } from '../hooks/use-campaigns';

export function CampaignsPage() {
  const { campaigns, isLoading } = useCampaigns();

  return <CampaignList campaigns={campaigns} isLoading={isLoading} />;
}