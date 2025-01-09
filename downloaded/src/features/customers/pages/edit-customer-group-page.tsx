import { useParams, useNavigate } from 'react-router-dom';
import { CustomerGroupForm } from '../components/customer-group-form';
import { CustomerGroup } from '@/types/customer';
import { useCustomerGroups } from '../hooks/use-customer-groups';

export function EditCustomerGroupPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { groups, updateGroup } = useCustomerGroups();
  const group = groups.find((g) => g.id === id);

  if (!group) {
    return <div>Group not found</div>;
  }

  const handleSubmit = async (data: CustomerGroup) => {
    try {
      await updateGroup.mutateAsync({ id, data });
      navigate('/dashboard/customers/groups');
    } catch (error) {
      console.error('Failed to update group:', error);
    }
  };

  return <CustomerGroupForm initialData={group} onSubmit={handleSubmit} />;
}