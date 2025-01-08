export type MemberRole = 'owner' | 'admin' | 'manager' | 'staff';

export interface Member {
  id: string;
  email: string;
  name: string;
  role: MemberRole;
  avatar?: string;
  status: 'active' | 'pending' | 'inactive';
  lastActive?: Date;
  joinedAt: Date;
  permissions: {
    manageProducts: boolean;
    manageOrders: boolean;
    manageCustomers: boolean;
    manageSettings: boolean;
    manageTeam: boolean;
  };
}

export interface InviteLink {
  id: string;
  code: string;
  role: MemberRole;
  expiresAt: Date;
  maxUses?: number;
  uses: number;
  createdBy: string;
  createdAt: Date;
}