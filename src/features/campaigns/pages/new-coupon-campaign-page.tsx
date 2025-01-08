import { useNavigate } from 'react-router-dom';
import { CouponCampaignForm } from '../components/coupon-campaign-form';
import { Coupon } from '@/types/coupon';

export function NewCouponCampaignPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Coupon) => {
    try {
      // TODO: Implement coupon creation
      console.log('Creating coupon:', data);
      navigate('/dashboard/coupons/campaigns');
    } catch (error) {
      console.error('Failed to create coupon:', error);
    }
  };

  return <CouponCampaignForm onSubmit={handleSubmit} />;
}