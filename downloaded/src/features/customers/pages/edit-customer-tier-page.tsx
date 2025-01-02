import { useParams, useNavigate } from 'react-router-dom';
import { CustomerTierForm } from '../components/customer-tier-form';
import { CustomerTier } from '@/types/customer';
import { useCustomerTiers } from '../hooks/use-customer-tiers';

export function EditCustomerTierPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tiers, updateTier } = useCustomerTiers();
  const tier = tiers.find((t) => t.id === id);

  if (!tier) {
    return <div>Tier not found</div>;
  }

  const handleSubmit = async (data: CustomerTier) => {
    try {
      await updateTier.mutateAsync({ id, data });
      navigate('/dashboard/customers/tiers');
    } catch (error) {
      console.error('Failed to update tier:', error);
    }
  };

  return <CustomerTierForm initialData={tier} onSubmit={handleSubmit} />;
}