import { useState, ReactNode } from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VariantSelectModal } from "./variant-select-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/features/products/hooks/use-products";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/hooks";

interface ProductSelectProps {
  children: ReactNode;
  onSelect: (product: Product) => void;
}

export function ProductSelect({ children, onSelect }: ProductSelectProps) {
  const t = useTranslation();
  const [open, setOpen] = useState(false);
  const [variantSelectOpen, setVariantSelectOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const { products, isLoading } = useProducts();

  const filteredProducts = products.filter(
    (product) =>
      product.status === "active" &&
      (product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku?.toLowerCase().includes(search.toLowerCase())),
  );

  const handleProductSelect = (product: Product, variant: ProductVariant) => {
    if (product.variants.length === 1) {
      // If only one variant, select it directly
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t.orders.orders.product.select.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t.orders.orders.product.select.placeholder}
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                {t.orders.orders.product.select.loading}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                {t.orders.orders.product.select.empty}
              </div>
            ) : (
              <div className="max-h-[300px] space-y-2 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <Button
                    key={product.id}
                    variant="ghost"
                    className="w-full justify-start h-fit"
                    onClick={() => handleProductSelect(product)}
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
                          {product.variants.length > 1 && (
                            <span className="ml-2">
                              ({product.variants.length}{" "}
                              {t.orders.orders.product.variant.select})
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
            setVariantSelectOpen(false);
          }}
        />
      )}
    </>
  );
}
