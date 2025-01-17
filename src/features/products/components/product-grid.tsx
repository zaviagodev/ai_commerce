import { Link, useParams } from 'react-router-dom';
import { Product } from '@/types/product';
import { formatCurrency } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import Loading from '@/components/loading';
import { useTranslation } from '@/lib/i18n/hooks';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  const t = useTranslation();
  const { storeName } = useParams<{ storeName: string }>();

  if (isLoading) {
    return (
      <div className="pt-14">
        <Loading />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold">{t.products.products.list.empty.title}</h2>
        <p className="text-muted-foreground">
          {t.products.products.list.empty.description}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/store/${storeName}/products/${product.id}`}
          className="group"
        >
          <div className="aspect-square rounded-lg border bg-muted overflow-hidden">
            {product.images?.[0]?.url ? (
              <img
                src={product.images[0].url}
                alt={product.images[0].alt || product.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback to placeholder on image load error
                  e.currentTarget.src = `https://placehold.co/600x600?text=${encodeURIComponent(
                    product.name || t.products.products.form.untitled
                  )}`;
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-secondary">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="font-medium group-hover:underline">
              {product.name || t.products.products.form.untitled}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
