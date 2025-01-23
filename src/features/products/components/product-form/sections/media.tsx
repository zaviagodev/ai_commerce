import { UseFormReturn } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, ProductImage } from "@/types/product";
import { MediaService } from "@/lib/storage/media-service";
import { useState } from "react";
import { toast } from "sonner";
import { ProductImageService } from "@/features/products/services/product-image-service";
import { ImageGrid } from "./media/image-grid";
import { useTranslation } from "@/lib/i18n/hooks";

interface MediaProps {
  form: UseFormReturn<Product>;
  productId?: string;
}

export function Media({ form, productId }: MediaProps) {
  const t = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const images = form.watch("images") || [];

  const handleReorder = (reorderedImages: ProductImage[]) => {
    // Update positions based on new order
    const updatedImages = reorderedImages.map((image, index) => ({
      ...image,
      position: index,
    }));
    form.setValue("images", updatedImages);
  };

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
          position: images.length + 1, // Add to end, primary stays at start
        };

        form.setValue("images", [tempImage, ...images]); // Add new images after primary

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
          form.setValue(
            "images",
            form.getValues("images").map((img) =>
              img.id === tempImage.id
                ? {
                    ...img,
                    url,
                    path,
                  }
                : img,
            ),
          );
        } finally {
          // Clean up preview URL
          URL.revokeObjectURL(previewUrl);
        }
      });

      await Promise.all(uploadPromises);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = "";
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
      form.setValue("images", newImages);
    } catch (error) {
      console.error("Failed to remove image:", error);
      toast.error("Failed to remove image");
    }
  };

  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <ImageGrid
            images={images}
            onReorder={handleReorder}
            onRemove={(id) =>
              handleRemoveImage(images.findIndex((img) => img.id === id))
            }
          />
        </motion.div>
      )}

      {/* Upload area */}
      <motion.div
        className="relative h-[200px] rounded-lg border-2 border-dashed border-muted-foreground/25"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-medium">
            {t.products.products.form.sections.media.dropzone}
          </p>
          <p className="text-xs text-muted-foreground">
            {t.products.products.form.sections.media.maxFiles}
          </p>
          <Button size="sm" variant="secondary" disabled={isUploading}>
            <ImagePlus className="mr-2 h-4 w-4" />
            {isUploading
              ? t.products.products.form.sections.media.uploading
              : t.products.products.form.sections.media.chooseFiles}
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
      </motion.div>
    </div>
  );
}
