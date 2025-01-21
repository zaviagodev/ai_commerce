import { useParams, useNavigate } from 'react-router-dom';
import { CustomerForm } from '../components/customer-form';
import { Customer } from '@/types/customer';
import { useCustomers } from '../hooks/use-customers';
import { useTranslation } from '@/lib/i18n/hooks';

export function EditCustomerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, updateCustomer } = useCustomers();
  const t = useTranslation();
  
  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return <div>{t.customers.customer.form.errors.notFound}</div>;
  }

  const handleSubmit = async (data: Customer) => {
    try {
      await updateCustomer.mutateAsync({ id, data });
      navigate('/dashboard/customers');
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  return <CustomerForm initialData={customer} onSubmit={handleSubmit} />;
}