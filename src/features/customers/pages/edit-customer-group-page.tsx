import { useParams, useNavigate } from 'react-router-dom';
import { CustomerGroupForm } from '../components/customer-group-form';
import { CustomerGroup } from '@/types/customer';
import { useCustomerGroups } from '../hooks/use-customer-groups';
import { useTranslation } from '@/lib/i18n/hooks';

export function EditCustomerGroupPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { groups, updateGroup } = useCustomerGroups();
  const group = groups.find((g) => g.id === id);
  const t = useTranslation();

  if (!group) {
    return <div>{ t.customers.customer.group.errors.notFound}</div>;
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