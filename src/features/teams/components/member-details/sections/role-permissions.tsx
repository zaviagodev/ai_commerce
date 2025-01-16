import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Key, Package, ShoppingCart, Users2, Ticket, Calendar, Gift } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Member } from '@/types/member';
import { RoleSelector } from '../role-selector';

interface RolePermissionsProps {
  member: Member;
  onRoleChange: (role: string) => void;
}

export function RolePermissions({ member, onRoleChange }: RolePermissionsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
          <Key className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">Role & Permissions</h2>
          <p className="text-sm text-muted-foreground">
            Configure member role and access permissions
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Role Assignment</h3>
          <RoleSelector value={member.role} onChange={onRoleChange} />
        </div>

        {/* Permission Groups */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Permission Groups</h3>
          <div className="grid gap-3">
            <PermissionItem
              icon={Package}
              title="Products"
              description="Manage products and inventory"
              checked={member.permissions?.manageProducts}
              color="pink"
            />
            <PermissionItem
              icon={ShoppingCart}
              title="Orders"
              description="Manage orders and fulfillment"
              checked={member.permissions?.manageOrders}
              color="orange"
            />
            <PermissionItem
              icon={Users2}
              title="Customers"
              description="Manage customer data and groups"
              checked={member.permissions?.manageCustomers}
              color="blue"
            />
            <PermissionItem
              icon={Ticket}
              title="Coupons"
              description="Manage discounts and promotions"
              checked={member.permissions?.manageCoupons}
              color="purple"
            />
            <PermissionItem
              icon={Calendar}
              title="Events & Tickets"
              description="Manage events and ticket sales"
              checked={member.permissions?.manageEvents}
              color="indigo"
            />
            <PermissionItem
              icon={Gift}
              title="Points & Rewards"
              description="Manage loyalty program and rewards"
              checked={member.permissions?.manageRewards}
              color="yellow"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface PermissionItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  checked?: boolean;
  color: string;
}

function PermissionItem({ icon: Icon, title, description, checked, color }: PermissionItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${color}-100`}>
          <Icon className={`h-4 w-4 text-${color}-600`} />
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch checked={checked} />
    </div>
  );
}