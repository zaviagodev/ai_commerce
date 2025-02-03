import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { ItemActionsModal } from "@/features/products/components/product-form/modals/item-actions-modal";
import { toast } from "sonner";
import { ProductForm } from "@/features/products/components/product-form";
import {
  useProduct,
  useProducts,
} from "@/features/products/hooks/use-products";

export function EditRewardPage() {
  const { id } = useParams();
  const { product: rewardProduct, isLoading } = useProduct(id!);
  const { updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  if (isLoading) {
    return <div className="pt-14">Loading...</div>;
  }

  if (!rewardProduct) {
    return <div className="pt-14">Reward not found</div>;
  }

  const handleSubmit = async (data: Product) => {
    try {
      await updateProduct.mutateAsync({
        id: rewardProduct.id,
        data: {
          name: data.name,
          description: data.description,
          category: data.category,
          price: data.price,
          compareAtPrice: data.compareAtPrice,
          isReward: true,
          pointsBasedPrice: data.pointsBasedPrice,
          cost: data.cost,
          sku: data.sku,
          barcode: data.barcode,
          trackQuantity: data.trackQuantity,
          weight: data.weight,
          weightUnit: data.weightUnit,
          tags: data.tags,
          status: data.status,
          images: data.images,
          hasVariants: data.variants.length > 0,
          variantOptions: data.variantOptions,
          variants: data.variants?.map((variant) => ({
            ...variant,
            name: `${data.name}-${variant.options
              .map((opt) => opt.value)
              .join("-")}`,
          })),
        },
      });

      navigate("/dashboard/reward-items");
    } catch (error) {
      console.error("Failed to update reward:", error);
      toast.error("Failed to update reward");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct.mutateAsync(rewardProduct.id!);
      toast.success("Reward deleted successfully");
      navigate("/dashboard/reward-items");
    } catch (error) {
      console.error("Failed to delete reward:", error);
      toast.error("Failed to delete reward");
    }
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowActions(true)}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );

  return (
    <>
      <ProductForm
        initialData={rewardProduct}
        onSubmit={handleSubmit}
        // headerActions={headerActions}
      />

      <ItemActionsModal
        open={showActions}
        onOpenChange={setShowActions}
        product={rewardProduct}
        onDelete={handleDelete}
        isRewardProduct={true}
      />
    </>
  );
}
