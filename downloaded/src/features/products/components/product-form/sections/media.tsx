import { UseFormReturn } from 'react-hook-form';
import { ImagePlus, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { MediaService } from '@/lib/storage/media-service';
import { useState } from 'react';
import { toast } from 'sonner';
import { ProductImageService } from '@/features/products/services/product-image-service';

interface MediaProps {
  form: UseFormReturn<Product>;
  productId?: string; // Add productId prop
}

export function Media({ form, productId }: MediaProps) {
  const [isUploading, setIsUploading] = useState(false);
  const images = form.watch('images') || [];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file, index) => {
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        
        // Add temporary preview
        const tempImage = {
          id: crypto.randomUUID(),
          url: previewUrl,
          alt: file.name,
          position: images.length + index,
        };
        
        form.setValue('images', [...images, tempImage]);

        try {
          // Upload the actual file
          const { url, path } = await MediaService.uploadProductImage(file);
          
          // If we have a productId, create the product_image record
          if (productId) {
            await ProductImageService.createProductImage({
              productId,
              url,
              alt: file.name,
              path,
              position: images.length + index,
            });
          }
          
          // Update form with real URL
          form.setValue('images', form.getValues('images').map(img => 
            img.id === tempImage.id ? { 
              ...img, 
              url, 
              path 
            } : img
          ));
        } finally {
          // Clean up preview URL
          URL.revokeObjectURL(previewUrl);
        }
      });

      await Promise.all(uploadPromises);
      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleRemoveImage = async (index: number) => {
    const image = images[index];
    if (!image) return;

    try {
      if (image.path) {
        await MediaService.deleteProductImage(image.path);
        
        // If we have a productId, delete the product_image record
        if (productId) {
          await ProductImageService.deleteProductImage(productId, image.id);
        }
      }
      const newImages = [...images];
      newImages.splice(index, 1);
      form.setValue('images', newImages);
    } catch (error) {
      console.error('Failed to remove image:', error);
      toast.error('Failed to remove image');
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {/* Image previews */}
        {images.map((image, index) => (
          <div key={image.id} className="relative aspect-square rounded-lg border bg-muted">
            <img
              src={image.url}
              alt={image.alt}
              className="absolute inset-0 h-full w-full rounded-lg object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -right-2 -top-2 h-6 w-6"
              onClick={() => handleRemoveImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {/* Upload area */}
        <div className="relative aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium">Drop your images here</p>
            <p className="text-xs text-muted-foreground">
              or click to browse files
            </p>
            <Button size="sm" variant="secondary" disabled={isUploading}>
              <ImagePlus className="mr-2 h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Choose files'}
            </Button>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  );
}