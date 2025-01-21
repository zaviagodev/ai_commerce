import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ProductVariant, Product } from '@/types/product';
import { formatCurrency } from '@/lib/utils';
import { Package } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/hooks';

interface VariantSelectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  onSelect: (variant: ProductVariant) => void;
}

export function VariantSelectModal({ 
  open, 
  onOpenChange, 
  product, 
  onSelect 
}: VariantSelectModalProps) {
  const t = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t.orders.orders.product.variant.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {product.variants.map((variant) => (
            <Button
              key={variant.id}
              variant="ghost"
              className="w-full justify-start h-fit"
              onClick={() => {
                onSelect(variant);
                onOpenChange(false);
              }}
              disabled={product.trackQuantity && (variant.quantity || 0) < 1}
            >
              <div className="flex items-center gap-3 w-full">
                {product.images[0] ? (
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    className="h-12 w-12 rounded-lg border object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 text-left">
                  <div className="font-medium">{variant.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {variant.sku && <span>SKU: {variant.sku} · </span>}
                    {formatCurrency(variant.price)}
                    {product.trackQuantity && (
                      <span className="ml-2">
                        ({variant.quantity || 0} {t.orders.orders.product.variant.inStock})
                      </span>
                    )}
                  </div>
                  {variant.options.length > 0 && (
                    <div className="mt-1 text-sm text-muted-foreground">
                      {variant.options.map(opt => `${opt.name}: ${opt.value}`).join(' / ')}
                    </div>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
