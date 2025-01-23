import { useNavigate } from "react-router-dom";
import { CustomerTierForm } from "../components/customer-tier-form";
import { CustomerTier } from "@/types/customer";
import { useCustomerTiers } from "../hooks/use-customer-tiers";

export function NewCustomerTierPage() {
  const navigate = useNavigate();
  const { createTier } = useCustomerTiers();

  const handleSubmit = async (data: CustomerTier) => {
    try {
      await createTier.mutateAsync(data);
      navigate("/dashboard/customer-tiers");
    } catch (error) {
      console.error("Failed to create tier:", error);
    }
  };

  return <CustomerTierForm onSubmit={handleSubmit} />;
}
