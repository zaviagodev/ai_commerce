import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Users2 } from "lucide-react";
import { Member } from "@/types/member";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/i18n/hooks";

interface BasicInfoProps {
  member: Member;
}

export function BasicInfo({ member }: BasicInfoProps) {
  const t = useTranslation();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          <Users2 className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">
            {t.teams.members.basicInfo.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.teams.members.basicInfo.subtitle}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Name Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                {t.teams.members.basicInfo.firstName.label}
              </Label>
              <Input
                id="firstName"
                placeholder={t.teams.members.basicInfo.firstName.placeholder}
                defaultValue={member.firstName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                {t.teams.members.basicInfo.lastName.label}
              </Label>
              <Input
                id="lastName"
                placeholder={t.teams.members.basicInfo.lastName.placeholder}
                defaultValue={member.lastName}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <Label htmlFor="email">
              {t.teams.members.basicInfo.email.label}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t.teams.members.basicInfo.email.placeholder}
              defaultValue={member.email}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">
                {t.teams.members.basicInfo.phoneNumber.label}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={member.phone || "-"}
                className="bg-muted"
                disabled
              />
              <p className="text-xs text-muted-foreground">
                {t.teams.members.basicInfo.phoneNumber.description}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lineId">
                {t.teams.members.basicInfo.lineID.label}
              </Label>
              <Input
                id="lineId"
                value={member.lineId || "-"}
                className="bg-muted"
                disabled
              />
              <p className="text-xs text-muted-foreground">
                {t.teams.members.basicInfo.lineID.description}
              </p>
            </div>
          </div>

          {/* Member Since */}
          <div className="space-y-2">
            <Label>{t.teams.members.basicInfo.memberSince}</Label>
            <p className="text-sm text-muted-foreground">
              {member.createdAt.toLocaleDateString(
                t.teams.members.basicInfo.dateFormat,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
