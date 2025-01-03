export interface Campaign {
  id: string;
  name: string;
  description?: string;
  hasProductRules?: boolean;
  hasConditions?: boolean;
  type: 'points_multiplier' | 'bonus_points';
  multiplier?: number;
  bonusPoints?: number;
  startDate: Date;
  endDate: Date;
  targetType: 'all' | 'tier' | 'group';
  targetTiers?: string[];
  targetGroups?: string[];
  status: 'draft' | 'scheduled' | 'active' | 'ended';
  qrEnabled?: boolean;
  qrPointType?: 'fixed' | 'multiplier';
  qrPointValue?: number;
  qrScanLimit?: number;
  qrTotalScans?: number;
  clickLinkEnabled?: boolean;
  clickLinkUrl?: string;
  clickLinkLimit?: number;
  createdAt: Date;
  updatedAt: Date;
}