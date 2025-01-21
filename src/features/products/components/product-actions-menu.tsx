import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoreVertical, Pencil, Copy, Trash2 } from 'lucide-react';
import { Product } from '@/types/product';
import { DeleteConfirmModal } from './product-form/modals/delete-confirm-modal';
import { useTranslation } from '@/lib/i18n/hooks';

interface ProductActionsMenuProps {
  product: Product;
  onDelete: () => Promise<void>;
}

export function ProductActionsMenu({ product, onDelete }: ProductActionsMenuProps) {
  const t = useTranslation();
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDuplicate = () => {
    // Create a new product with copied data
    const duplicatedProduct = {
      ...product,
      name: `${product.name} (${t.products.products.form.modals.itemActions.duplicate.title})`,
      sku: `${product.sku}-copy`,
      status: 'draft' as const,
    };
    navigate('/dashboard/products/new', { state: { initialData: duplicatedProduct } });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowActions(true);
        }}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      <Dialog open={showActions} onOpenChange={setShowActions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.products.products.form.modals.itemActions.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2">
            <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={() => {
                navigate(`/dashboard/products/${product.id}`);
                setShowActions(false);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Pencil className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{t.products.products.form.modals.itemActions.edit.title}</div>
                  <p className="text-sm text-muted-foreground">
                    {t.products.products.form.modals.itemActions.edit.description}
                  </p>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={() => {
                handleDuplicate();
                setShowActions(false);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Copy className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{t.products.products.form.modals.itemActions.duplicate.title}</div>
                  <p className="text-sm text-muted-foreground">
                    {t.products.products.form.modals.itemActions.duplicate.description}
                  </p>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={() => {
                setShowDeleteConfirm(true);
                setShowActions(false);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{t.products.products.form.modals.itemActions.delete.title}</div>
                  <p className="text-sm text-muted-foreground">
                    {t.products.products.form.modals.itemActions.delete.description}
                  </p>
                </div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmModal
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={onDelete}
        itemName={product.name || t.products.products.form.untitled}
      />
    </>
  );
}