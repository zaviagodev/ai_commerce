import { useState } from 'react';
import { Redeem } from '@/types/redeem';

// Mock data for development
const MOCK_REDEEMS: Redeem[] = [
  {
    id: 'RDM001',
    code: 'REDEEM123',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+66891234567',
    customerAddress: '123 Main St, Bangkok, Thailand',
    pickupLocation: 'Central World Branch',
    pointsRedeemed: 1000,
    items: [
      {
        id: 'ITEM001',
        name: 'Premium Coffee',
        quantity: 2,
        points: 500,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'
      }
    ],
    couponCode: 'COFFEE2024',
    status: 'completed',
    redeemedAt: new Date('2024-01-15'),
  },
  {
    id: 'RDM002',
    code: 'REDEEM456',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+66891234568',
    customerAddress: '456 Second St, Bangkok, Thailand',
    pickupLocation: 'Online Delivery',
    pointsRedeemed: 500,
    items: [
      {
        id: 'ITEM002',
        name: 'Loyalty T-Shirt',
        quantity: 1,
        points: 500,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
      }
    ],
    couponCode: 'SHIRT2024',
    status: 'pending',
    redeemedAt: new Date('2024-01-16'),
  },
];

export function useRedeems() {
  const [redeems] = useState<Redeem[]>(MOCK_REDEEMS);
  const [isLoading] = useState(false);

  return {
    redeems,
    isLoading,
    error: null,
  };
}