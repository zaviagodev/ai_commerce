import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Users2 } from 'lucide-react';
import { Member } from '@/types/member';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BasicInfoProps {
  member: Member;
}

export function BasicInfo({ member }: BasicInfoProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          <Users2 className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">Basic Information</h2>
          <p className="text-sm text-muted-foreground">
            Member profile and contact details
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Name Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter first name"
                defaultValue={member.firstName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter last name"
                defaultValue={member.lastName}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              defaultValue={member.email}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={member.phone || '-'}
                className="bg-muted"
                disabled
              />
              <p className="text-xs text-muted-foreground">
                Contact support to update phone number
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lineId">Line ID</Label>
              <Input
                id="lineId"
                value={member.lineId || '-'}
                className="bg-muted"
                disabled
              />
              <p className="text-xs text-muted-foreground">
                Contact support to update Line ID
              </p>
            </div>
          </div>

          {/* Member Since */}
          <div className="space-y-2">
            <Label>Member Since</Label>
            <p className="text-sm text-muted-foreground">
              {member.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}