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

interface ProductSelectProps {
  children: React.ReactNode;
  onSelect: (product: Product) => void;
}

export function ProductSelect({ children, onSelect }: ProductSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { products, isLoading } = useProducts();

  // Filter active products only and match search term
  const filteredProducts = products.filter((product) => 
    product.status === 'active' && 
    (product.name.toLowerCase().includes(search.toLowerCase()) ||
     product.sku?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent 
        className="sm:max-w-[600px] top-[10%] translate-y-0" 
        aria-labelledby="product-select-title"
      >
        <DialogHeader>
          <DialogTitle id="product-select-title">Select product</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by product name or SKU..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                Loading products...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No products found
              </div>
            ) : (
              <div className="space-y-2">
                {filteredProducts.map((product) => (
                  <Button
                    key={product.id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      onSelect(product);
                      setOpen(false);
                      setSearch(''); // Clear search after selection
                    }}
                    disabled={product.trackQuantity && (product.quantity || 0) < 1}
                  >
                    <div className="flex items-center gap-3 w-full">
                      {product.images[0] ? (
                        <img
                          src={product.images[0].url}
                          alt={product.images[0].alt}
                          className="h-12 w-12 rounded-lg border object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg border bg-muted" />
                      )}
                      <div className="flex-1 text-left">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.sku && <span>SKU: {product.sku} · </span>}
                          {formatCurrency(product.price)}
                          {product.trackQuantity && (
                            <span className="ml-2">
                              ({product.quantity || 0} in stock)
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
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}