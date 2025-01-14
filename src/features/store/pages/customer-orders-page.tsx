import { StoreLayout } from '../components/store-layout';
import { CustomerOrders } from '../components/customer-orders';

export function CustomerOrdersPage() {
  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">My Orders</h1>
        <CustomerOrders />
      </div>
    </StoreLayout>
  );
}