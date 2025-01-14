import { Package } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { OrderItem } from '@/types/order';

interface ProductAvatarsProps {
  items: OrderItem[];
  maxVisible?: number;
}

export function ProductAvatars({ items, maxVisible = 4 }: ProductAvatarsProps) {
  const visibleItems = items.slice(0, maxVisible - 1);
  const remainingCount = Math.max(0, items.length - (maxVisible - 1));
  const hasMore = remainingCount > 0;

  return (
    <div className="flex -space-x-3">
      <TooltipProvider>
        {visibleItems.map((item, index) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <div 
                className={cn(
                  "relative h-10 w-10 rounded-lg border-2 border-background bg-muted",
                  "transition-transform hover:translate-y-[-2px]",
                  "hover:shadow-lg hover:z-10"
                )}
                style={{ zIndex: visibleItems.length - index }}
              >
                {/* Quantity Badge */}
                {item.quantity > 1 && (
                  <div 
                    className={cn(
                      "absolute -top-1.5 -right-1.5 z-20",
                      "flex items-center justify-center",
                      "min-w-[18px] h-[18px] px-1",
                      "text-[10px] font-medium leading-none",
                      "rounded-full bg-main/90 text-gray-700",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
                      "border border-gray-100/50",
                      "backdrop-blur-sm",
                      "transform scale-100 transition-transform",
                      "group-hover:scale-110",
                      "dark:bg-gray-800/90 dark:text-gray-200",
                      "dark:border-gray-700/50"
                    )}
                  >
                    {item.quantity}x
                  </div>
                )}
                {/* Product Image */}
                <div className="relative h-full w-full rounded-lg overflow-hidden">
                {item.product?.images?.[0] ? (
                  <img
                    src={item.product.images[0].url}
                    alt={item.name}
                    className="h-full w-full object-cover transition-all duration-200"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-secondary">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[200px]">
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        {hasMore && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center group",
                  "rounded-lg border-2 border-background bg-secondary",
                  "text-muted-foreground",
                  "transition-transform hover:translate-y-[-2px]",
                  "hover:shadow-lg hover:z-10"
                )}
                style={{ zIndex: 0 }}
              >
                <span className="text-xs font-medium transition-transform group-hover:scale-110 opacity-80">
                  +{remainingCount}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[200px]">
              <p className="font-medium">Additional Products:</p>
              <ul className="mt-1 space-y-1">
                {items.slice(maxVisible - 1).map((item) => (
                  <li key={item.id} className="text-sm">
                    {item.name} (×{item.quantity})
                  </li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
}