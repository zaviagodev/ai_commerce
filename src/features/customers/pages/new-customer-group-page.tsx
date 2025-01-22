import { useNavigate } from 'react-router-dom';
import { CustomerGroupForm } from '../components/customer-group-form';
import { CustomerGroup } from '@/types/customer';
import { useCustomerGroups } from '../hooks/use-customer-groups';

export function NewCustomerGroupPage() {
  const navigate = useNavigate();
  const { createGroup } = useCustomerGroups();

  const handleSubmit = async (data: CustomerGroup) => {
    try {
      await createGroup.mutateAsync(data);
      navigate('/dashboard/customer-groups');
    } catch (error) {
      console.error('Failed to create group:', error);
    }
  };

  return <CustomerGroupForm onSubmit={handleSubmit} />;
}