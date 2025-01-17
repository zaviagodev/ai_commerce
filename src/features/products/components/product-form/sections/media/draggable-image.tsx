import { motion, Reorder, useMotionValue } from 'framer-motion';
import { GripVertical, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductImage } from '@/types/product';
import { cn } from '@/lib/utils';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/hooks';

interface DraggableImageProps {
  image: ProductImage;
  isPrimary: boolean;
  onRemove: () => void;
}

export function DraggableImage({ image, isPrimary, onRemove }: DraggableImageProps) {
  const t = useTranslation();
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <Reorder.Item 
      value={image} 
      id={image.id}
      style={{ y }}
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-square"
    >
      <motion.div
        className={cn(
          "group relative h-full w-full rounded-lg border bg-muted overflow-hidden",
          "hover:shadow-lg transition-all duration-200",
          isPrimary && "ring-2 ring-primary border-primary"
        )}
        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      >
        <img
          src={image.url}
          alt={image.alt}
          className="absolute inset-0 h-full w-full rounded-lg object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 flex items-center justify-center">
            <GripVertical className="h-6 w-6 text-white cursor-grab active:cursor-grabbing" />
          </div>
        </div>

        {/* Primary Badge */}
        {isPrimary && (
          <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-md backdrop-blur-sm">
            {t.products.products.form.sections.media.primary}
          </div>
        )}

        {/* Remove Button */}
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute right-2 top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </motion.div>
    </Reorder.Item>
  );
}