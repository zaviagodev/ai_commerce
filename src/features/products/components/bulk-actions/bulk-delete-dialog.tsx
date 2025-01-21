import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/hooks';

interface BulkDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export function BulkDeleteDialog({
  open,
  onOpenChange,
  selectedCount,
  onConfirm,
  isDeleting,
}: BulkDeleteDialogProps) {
  const t = useTranslation();
  const handleCloseModal = () => onOpenChange(false);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>{t.products.products.bulk.delete.title}</DialogTitle>
              <DialogDescription>
                {t.products.products.bulk.delete.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-800">
              {t.products.products.bulk.delete.warning.replace('{count}', selectedCount.toString())}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCloseModal}
            disabled={isDeleting}
          >
            {t.products.products.bulk.delete.cancel}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? t.products.products.bulk.delete.deleting : t.products.products.bulk.actions.delete}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}