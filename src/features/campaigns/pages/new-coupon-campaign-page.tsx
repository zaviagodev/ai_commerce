import { useNavigate } from "react-router-dom";
import { CouponCampaignForm } from "../components/coupon-campaign-form";
import { Coupon } from "@/types/coupon";
import { useCoupons } from "../hooks/use-coupons";

export function NewCouponCampaignPage() {
  const navigate = useNavigate();
  const { createCoupon } = useCoupons();

  const handleSubmit = async (data: Coupon) => {
    try {
      await createCoupon.mutateAsync(data);
      navigate("/dashboard/coupon-campaigns");
    } catch (error) {
      console.error("Failed to create coupon:", error);
    }
  };

  return <CouponCampaignForm onSubmit={handleSubmit} />;
}
