import { Product } from '@/types/product';
import { SortField, SortDirection } from '../types/sorting';

export function sortProducts(
  products: Product[],
  field: SortField,
  direction: SortDirection
): Product[] {
  return [...products].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'name':
        comparison = (a.name || '').localeCompare(b.name || '');
        break;
      case 'price':
        comparison = (a.price || 0) - (b.price || 0);
        break;
      case 'quantity':
        // Handle cases where quantity tracking is disabled
        const aQty = a.trackQuantity ? (a.quantity || 0) : Infinity;
        const bQty = b.trackQuantity ? (b.quantity || 0) : Infinity;
        comparison = aQty - bQty;
        break;
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}