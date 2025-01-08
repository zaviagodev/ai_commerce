import { Reorder } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { ProductImage } from '@/types/product';
import { DraggableImage } from './draggable-image';
import { AnimatedContainer } from './animated-container';

interface ImageGridProps {
  images: ProductImage[];
  onReorder: (images: ProductImage[]) => void;
  onRemove: (id: string) => void;
}

export function ImageGrid({ images, onReorder, onRemove }: ImageGridProps) {
  return (
    <AnimatePresence mode="wait">
      <Reorder.Group
        axis="x"
        values={images}
        onReorder={onReorder}
        className="grid auto-rows-fr grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {images.map((image, index) => (
          <AnimatedContainer key={image.id} delay={index * 0.2}>
            <DraggableImage
              image={image}
              isPrimary={index === 0}
              onRemove={() => onRemove(image.id)}
            />
          </AnimatedContainer>
        ))}
      </Reorder.Group>
    </AnimatePresence>
  );
}
