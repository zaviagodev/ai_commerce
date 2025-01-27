import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Key,
  Package,
  ShoppingCart,
  Users2,
  Ticket,
  Calendar,
  Gift,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Member } from "@/types/member";
import { RoleSelector } from "../role-selector";
import { useTranslation } from "@/lib/i18n/hooks";

interface RolePermissionsProps {
  member: Member;
  onRoleChange: (role: string) => void;
}

export function RolePermissions({
  member,
  onRoleChange,
}: RolePermissionsProps) {
  const t = useTranslation();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
          <Key className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            {t.teams.members.rolePermissions.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.teams.members.rolePermissions.subtitle}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">
            {t.teams.members.rolePermissions.roleAssignment.label}
          </h3>
          <RoleSelector value={member.role} onChange={onRoleChange} />
        </div>

        {/* Permission Groups */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">
            {t.teams.members.rolePermissions.permissionGroups.label}
          </h3>
          <div className="grid gap-3">
            <PermissionItem
              icon={Package}
              title={
                t.teams.members.rolePermissions.permissionGroups.products.title
              }
              description={
                t.teams.members.rolePermissions.permissionGroups.products
                  .subtitle
              }
              checked={member.permissions?.manageProducts}
              color="pink"
            />
            <PermissionItem
              icon={ShoppingCart}
              title={
                t.teams.members.rolePermissions.permissionGroups.orders.title
              }
              description={
                t.teams.members.rolePermissions.permissionGroups.orders.subtitle
              }
              checked={member.permissions?.manageOrders}
              color="orange"
            />
            <PermissionItem
              icon={Users2}
              title={
                t.teams.members.rolePermissions.permissionGroups.customers.title
              }
              description={
                t.teams.members.rolePermissions.permissionGroups.customers
                  .subtitle
              }
              checked={member.permissions?.manageCustomers}
              color="blue"
            />
            <PermissionItem
              icon={Ticket}
              title={
                t.teams.members.rolePermissions.permissionGroups.coupons.title
              }
              description={
                t.teams.members.rolePermissions.permissionGroups.coupons
                  .subtitle
              }
              checked={member.permissions?.manageCoupons}
              color="purple"
            />
            <PermissionItem
              icon={Calendar}
              title={
                t.teams.members.rolePermissions.permissionGroups.events.title
              }
              description={
                t.teams.members.rolePermissions.permissionGroups.events.subtitle
              }
              checked={member.permissions?.manageEvents}
              color="indigo"
            />
            <PermissionItem
              icon={Gift}
              title={
                t.teams.members.rolePermissions.permissionGroups.points.title
              }
              description={
                t.teams.members.rolePermissions.permissionGroups.points.subtitle
              }
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

function PermissionItem({
  icon: Icon,
  title,
  description,
  checked,
  color,
}: PermissionItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${color}-100`}
        >
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
