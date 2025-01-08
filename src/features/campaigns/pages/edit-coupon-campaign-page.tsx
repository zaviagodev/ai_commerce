import { useParams, useNavigate } from 'react-router-dom';
import { CouponCampaignForm } from '../components/coupon-campaign-form';
import { Coupon } from '@/types/coupon';

export function EditCouponCampaignPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: Implement coupon fetching
  const coupon = {
    id,
    code: 'SUMMER2024',
    description: 'Summer Sale Discount',
    type: 'percentage' as const,
    value: 20,
    status: 'active' as const,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    advancedMode: false,
  };

  const handleSubmit = async (data: Coupon) => {
    try {
      // TODO: Implement coupon update
      console.log('Updating coupon:', data);
      navigate('/dashboard/coupons/campaigns');
    } catch (error) {
      console.error('Failed to update coupon:', error);
    }
  };

  return <CouponCampaignForm initialData={coupon} onSubmit={handleSubmit} />;
}