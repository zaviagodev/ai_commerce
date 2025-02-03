import { useParams, useNavigate } from "react-router-dom";
import { CouponCampaignForm } from "../components/coupon-campaign-form";
import { Coupon } from "@/types/coupon";
import { useCoupons } from "../hooks/use-coupons";

export function EditCouponCampaignPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { coupons, updateCoupon } = useCoupons();
  const coupon = coupons.find((c) => c.id === id);

  const handleSubmit = async (data: Coupon) => {
    try {
      await updateCoupon.mutateAsync({ id, data });
      navigate("/dashboard/coupons");
    } catch (error) {
      console.error("Failed to update coupon:", error);
    }
  };

  return <CouponCampaignForm initialData={coupon} onSubmit={handleSubmit} />;
}
