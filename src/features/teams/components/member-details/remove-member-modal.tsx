import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Member } from "@/types/member";
import { useTranslation } from "@/lib/i18n/hooks";

interface RemoveMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member;
  onConfirm: () => Promise<void>;
}

export function RemoveMemberModal({
  open,
  onOpenChange,
  member,
  onConfirm,
}: RemoveMemberModalProps) {
  const t = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>{t.teams.members.actions.removeMember}</DialogTitle>
              <DialogDescription>
                {t.teams.members.remove.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-800">
              {t.teams.members.remove.warning.replace("{name}", member.name)}
            </p>
            <ul className="mt-2 text-sm text-red-800 space-y-1">
              {t.teams.members.remove.consequences.map((consequence) => (
                <li>{consequence}</li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.teams.members.actions.cancel}
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              await onConfirm();
              onOpenChange(false);
            }}
          >
            {t.teams.members.actions.removeMember}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
