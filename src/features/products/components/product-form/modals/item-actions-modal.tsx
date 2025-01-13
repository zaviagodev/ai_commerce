import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Copy, 
  Trash2, 
  AlertTriangle,
  Sparkles,
  PencilRuler,
} from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types/product';
import { AdvancedTypesModal } from './advanced-types-modal';
import { DeleteConfirmModal } from './delete-confirm-modal';

interface ItemActionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  onDelete: () => Promise<void>;
}

export function ItemActionsModal({ 
  open, 
  onOpenChange,
  product,
  onDelete,
}: ItemActionsModalProps) {
  const navigate = useNavigate();
  const [showAdvancedTypes, setShowAdvancedTypes] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDuplicate = async () => {
    try {
      // Logic for duplicating product will be implemented later
      toast.success('Product duplicated successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to duplicate product');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Item Actions</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2">
            <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={() => {
                navigate(`/dashboard/products/${product.id}`);
                onOpenChange(false);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <PencilRuler className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Edit Product</div>
                  <p className="text-sm text-muted-foreground">
                    Modify product details and settings
                  </p>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={handleDuplicate}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Copy className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Duplicate Product</div>
                  <p className="text-sm text-muted-foreground">
                    Create a copy with all settings
                  </p>
                </div>
              </div>
            </Button>

            {/* <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={() => {
                setShowAdvancedTypes(true);
                onOpenChange(false);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Sparkles className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Advanced Types</div>
                  <p className="text-sm text-muted-foreground">
                    Configure special product features
                  </p>
                </div>
              </div>
            </Button> */}

            <Button
              variant="ghost"
              className="justify-start h-auto py-4"
              onClick={() => {
                setShowDeleteConfirm(true);
                onOpenChange(false);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Delete Product</div>
                  <p className="text-sm text-muted-foreground">
                    Permanently remove this product
                  </p>
                </div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AdvancedTypesModal
        open={showAdvancedTypes}
        onOpenChange={setShowAdvancedTypes}
        product={product}
      />

      <DeleteConfirmModal
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={onDelete}
        itemName={product.name}
      />
    </>
  );
}