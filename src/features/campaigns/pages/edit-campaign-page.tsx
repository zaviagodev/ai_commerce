import { useParams, useNavigate } from 'react-router-dom';
import { CampaignForm } from '../components/campaign-form';
import { Campaign } from '@/types/campaign';
import { useCampaigns } from '../hooks/use-campaigns';

export function EditCampaignPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campaigns, updateCampaign } = useCampaigns();
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  const handleSubmit = async (data: Campaign) => {
    try {
      await updateCampaign.mutateAsync({ id, data });
      navigate('/dashboard/campaigns');
    } catch (error) {
      console.error('Failed to update campaign:', error);
    }
  };

  return <CampaignForm initialData={campaign} onSubmit={handleSubmit} />;
}