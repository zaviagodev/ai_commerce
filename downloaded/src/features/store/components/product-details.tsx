import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { cn, formatCurrency } from '@/lib/utils';
import { useCart } from '../context/cart-context';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsItemAdded(true);
    setTimeout(() => {
      setIsItemAdded(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product images */}
        <div className="space-y-4">
          {product.images[0] ? (
            <div className="aspect-square rounded-lg border bg-muted overflow-hidden">
              <img
                src={product.images[imgIndex].url}
                alt={product.images[imgIndex].alt}
                className={cn('h-full w-full object-cover transition-all')}
              />
              {/* <Carousel>
                <CarouselContent className="w-full ml-0 h-full">
                  {product.images.map((image, index) => (
                    <CarouselItem key={index} className="pl-0">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="min-h-[480px] h-full w-full object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel> */}
            </div>
          ) : (
            <div className="aspect-square rounded-lg border bg-secondary" />
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.images.map((image, index) => {
              const handleChangeImg = () => setImgIndex(index);
              return (
                <div
                  key={image.id}
                  className={`aspect-square rounded-lg border bg-muted overflow-hidden cursor-pointer hover:opacity-100 transition duration-200 ${
                    imgIndex === index
                      ? 'opacity-100 border-gray-400'
                      : 'opacity-50'
                  }`}
                  onClick={handleChangeImg}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-2xl font-semibold">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="prose prose-sm">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-6 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleAddToCart}
              disabled={
                (product.trackQuantity && (product.quantity || 0) < 1) ||
                isItemAdded
              }
            >
              {product.trackQuantity && (product.quantity || 0) < 1
                ? 'Out of stock'
                : isItemAdded
                ? 'Item added to cart'
                : 'Add to cart'}
            </Button>
          </div>

          {/* Additional details */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Category</span>
              <span>{product.category?.name || 'Uncategorized'}</span>
            </div>
            {product.sku && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">SKU</span>
                <span>{product.sku}</span>
              </div>
            )}
            {product.tags.length > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tags</span>
                <span>{product.tags.map((tag) => tag.name).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
