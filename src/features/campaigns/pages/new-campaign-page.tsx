import { useNavigate } from "react-router-dom";
import { CampaignForm } from "../components/campaign-form";
import { Campaign } from "@/types/campaign";
import { useCampaigns } from "../hooks/use-campaigns";

export function NewCampaignPage() {
  const navigate = useNavigate();
  const { createCampaign } = useCampaigns();

  const handleSubmit = async (data: Campaign) => {
    try {
      await createCampaign.mutateAsync(data);
      navigate("/dashboard/campaigns");
    } catch (error) {
      console.error("Failed to create campaign:", error);
    }
  };

  return <CampaignForm onSubmit={handleSubmit} />;
}
