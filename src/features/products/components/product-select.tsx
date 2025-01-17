import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProducts } from '../hooks/use-products';
import { Product } from '@/types/product';
import { formatCurrency } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/hooks';

interface ProductSelectProps {
  children: React.ReactNode;
  onSelect: (product: Product) => void;
}

export function ProductSelect({ children, onSelect }: ProductSelectProps) {
  const t = useTranslation();
  const [open, setOpen] = useState(false);
  const [variantSelectOpen, setVariantSelectOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const { products, isLoading } = useProducts();

  // Filter active products only and match search term
  const filteredProducts = products.filter(
    (product) =>
      product.status === 'active' &&
      (product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleProductSelect = (product: Product) => {
    if (product.variants.length === 1) {
      // If only one variant (default), select it directly
      onSelect(product, product.variants[0]);
      setOpen(false);
    } else {
      // Show variant selection modal
      setSelectedProduct(product);
      setVariantSelectOpen(true);
    }
  };

  return (
    <>  
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent 
          className="sm:max-w-[600px] top-[10%] translate-y-0" 
          aria-labelledby="product-select-title"
        >
          <DialogHeader>
            <DialogTitle id="product-select-title">{t.products.products.form.variants.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t.products.products.list.search}
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              {isLoading ? (
                <div className="py-8 text-center text-muted-foreground">
                  {t.products.products.list.loading}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  {t.products.products.list.empty.title}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <Button
                      key={product.id}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        handleProductSelect(product);
                        setSearch(''); // Clear search after selection
                      }}
                      disabled={product.trackQuantity && (product.quantity || 0) < 1}
                    >
                      <div className="flex items-center gap-3 w-full">
                        {product.images[0] ? (
                          <img
                            src={product.images[0].url}
                            alt={product.images[0].alt || product.name}
                            className="h-12 w-12 rounded-lg border object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg border bg-muted" />
                        )}
                        <div className="flex-1 text-left">
                          <div className="font-medium">{product.name || t.products.products.form.untitled}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.sku && <span>SKU: {product.sku} · </span>}
                            {formatCurrency(product.price)}
                            {product.trackQuantity && (
                              <span className="ml-2">
                                ({product.quantity || 0} {t.products.products.list.inStock})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="flex justify-end px-6 py-4 border-t bg-gray-50/50">
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t.products.products.actions.cancel}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {selectedProduct && (
        <VariantSelectModal
          open={variantSelectOpen}
          onOpenChange={setVariantSelectOpen}
          product={selectedProduct}
          onSelect={(variant) => {
            onSelect(selectedProduct, variant);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
