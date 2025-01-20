import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Member } from '@/types/member';

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>Remove Member</DialogTitle>
              <DialogDescription>
                This action cannot be undone
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-800">
              Are you sure you want to remove {member.name}? This will:
            </p>
            <ul className="mt-2 text-sm text-red-800 space-y-1">
              <li>Revoke all access permissions</li>
              <li>Remove them from all teams and projects</li>
              <li>Delete their account settings</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              await onConfirm();
              onOpenChange(false);
            }}
          >
            Remove Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}