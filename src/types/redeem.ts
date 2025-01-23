export interface RedeemItem {
  id: string;
  name: string;
  quantity: number;
  points: number;
  image?: string;
}

export interface Redeem {
  id: string;
  code: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  pickupLocation: string;
  pointsRedeemed: number;
  items: RedeemItem[];
  couponCode: string;
  status: "pending" | "completed" | "cancelled";
  redeemedAt: Date;
}
