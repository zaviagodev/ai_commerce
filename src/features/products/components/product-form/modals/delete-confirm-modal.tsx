import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n/hooks';

interface DeleteConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  itemName: string;
}

export function DeleteConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  itemName,
}: DeleteConfirmModalProps) {
  const t = useTranslation();
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>{t.products.products.form.modals.delete.title}</DialogTitle>
              <DialogDescription>
                {t.products.products.form.modals.delete.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-800">
              {t.products.products.form.modals.delete.warning.replace('{name}', itemName)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">
              {t.products.products.form.modals.delete.confirmText.replace('{text}', 'delete')}
            </Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="delete"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            {t.products.products.form.modals.delete.cancel}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={confirmText !== 'delete' || isDeleting}
          >
            {isDeleting ? t.products.products.form.modals.delete.deleting : t.products.products.form.modals.delete.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}