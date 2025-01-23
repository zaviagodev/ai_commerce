export interface Member {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Staff";
  status: "active" | "pending" | "inactive";
  avatar: string;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
  permissions?: {
    manageProducts: boolean;
    manageOrders: boolean;
    manageCustomers: boolean;
    manageTeam: boolean;
    manageSettings: boolean;
  };
  twoFactorEnabled?: boolean;
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    slack: boolean;
  };
  activityLog?: {
    id: string;
    action: string;
    timestamp: Date;
    ip: string;
    location: string;
  }[];
}
