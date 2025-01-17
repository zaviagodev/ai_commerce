import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Crown, Shield, Users2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full h-auto p-3 flex items-center gap-3">
        {value && (
          <div className='flex items-center gap-3'>
            <div className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
              value === "Owner" && "bg-yellow-100",
              value === "Admin" && "bg-blue-100",
              value === "Staff" && "bg-green-100"
            )}>
              {value === "Owner" && <Crown className="h-4 w-4 text-yellow-600" />}
              {value === "Admin" && <Shield className="h-4 w-4 text-blue-600" />}
              {value === "Staff" && <Users2 className="h-4 w-4 text-green-600" />}
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium">{value}</span>
              <span className="text-xs text-muted-foreground">
                {value === "Owner" && "Full access with ownership rights"}
                {value === "Admin" && "Full access to all features"}
                {value === "Staff" && "Limited access to features"}
              </span>
            </div>
          </div>
        )}
        {!value && <SelectValue placeholder="Select role" />}
      </SelectTrigger>
      <SelectContent className="p-2">
        <SelectItem value="Owner" className="relative h-auto p-3 rounded-md focus:bg-accent [&_svg]:size-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
              <Crown className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="flex flex-col items-start">
              <p className="font-medium">Owner</p>
              <p className="text-sm text-muted-foreground">Full access with ownership rights</p>
            </div>
          </div>
        </SelectItem>
        <SelectItem value="Admin" className="relative h-auto p-3 rounded-md focus:bg-accent [&_svg]:size-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
              <Shield className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex flex-col items-start">
              <p className="font-medium">Admin</p>
              <p className="text-sm text-muted-foreground">Full access to all features</p>
            </div>
          </div>
        </SelectItem>
        <SelectItem value="Staff" className="relative h-auto p-3 rounded-md focus:bg-accent [&_svg]:size-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
              <Users2 className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex flex-col items-start">
              <p className="font-medium">Staff</p>
              <p className="text-sm text-muted-foreground">Limited access to features</p>
            </div>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}