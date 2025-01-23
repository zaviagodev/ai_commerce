import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "../../hooks/use-categories";
import { useTranslation } from "@/lib/i18n/hooks";

interface BulkCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onConfirm: (categoryId: string) => void;
  isUpdating?: boolean;
}

export function BulkCategoryDialog({
  open,
  onOpenChange,
  selectedCount,
  onConfirm,
  isUpdating,
}: BulkCategoryDialogProps) {
  const t = useTranslation();
  const { categories } = useCategories();
  const handleCloseModal = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.products.categories.title}</DialogTitle>
          <DialogDescription>
            {t.products.categories.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Select onValueChange={(value) => onConfirm(value)}>
            <SelectTrigger>
              <SelectValue
                placeholder={t.products.categories.form.selectCategory}
              />
            </SelectTrigger>
            <SelectContent>
              {categories.length === 0 ? (
                <SelectItem value="empty" disabled>
                  No categories found
                </SelectItem>
              ) : (
                categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCloseModal}
            disabled={isUpdating}
          >
            {t.products.products.actions.cancel}
          </Button>
          {isUpdating && (
            <Button disabled>
              {t.products.categories.messages.updateSuccess}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
