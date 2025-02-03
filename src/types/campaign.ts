import {
  CampaignCondition,
  CampaignProductRule,
} from "@/features/campaigns/types/campaign-rules";

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  hasProductRules?: boolean;
  hasConditions?: boolean;
  type: "points_multiplier" | "bonus_points";
  multiplier?: number;
  bonusPoints?: number;
  startDate: Date;
  endDate: Date;
  targetType: "all" | "tier" | "group";
  status: "draft" | "scheduled" | "active" | "ended";
  qrEnabled?: boolean;
  qrPointType?: "fixed" | "multiplier";
  qrPointValue?: number;
  qrScanLimit?: number;
  qrTotalScans?: number;
  clickLinkEnabled?: boolean;
  clickLinkUrl?: string;
  clickPoints?: number;
  clickLimit?: number;
  totalClicks?: number;
  conditions?: CampaignCondition[];
  productRules?: CampaignProductRule[];
  createdAt: Date;
  updatedAt: Date;
}
