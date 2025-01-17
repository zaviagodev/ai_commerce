import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Users2 } from 'lucide-react';
import { Member } from '@/types/member';

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
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div>
            <p className="text-sm font-medium mb-1">Email</p>
            <p className="text-muted-foreground">{member.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Member Since</p>
            <p className="text-muted-foreground">{member.createdAt.toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}