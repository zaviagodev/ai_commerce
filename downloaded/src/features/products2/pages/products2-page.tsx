import { EventTicketList } from '../components/event-ticket-list';
import { useProducts } from '@/features/products/hooks/use-products';

export function Products2Page() {
  const { products, isLoading } = useProducts();

  return <EventTicketList products={products} isLoading={isLoading} />;
}