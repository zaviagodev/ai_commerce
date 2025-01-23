import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ItemActionsModal } from "@/features/products/components/product-form/modals/item-actions-modal";
import { toast } from "sonner";
import { ProductForm } from "@/features/products/components/product-form";
import { useProducts } from "@/features/products/hooks/use-products";

export function NewRewardPage() {
  const navigate = useNavigate();
  const { createProduct } = useProducts();
  const [showActions, setShowActions] = useState(false);

  // Create a temporary product object for the actions modal
  const tempProduct: Product = {
    id: "new",
    isReward: true,
    name: "New Reward",
    description: "",
    images: [],
    price: 0,
    status: "draft",
    weight: 0,
    weightUnit: "kg",
    dimensionUnit: "cm",
    width: 0,
    length: 0,
    height: 0,
    pointsBasedPrice: undefined,
    tags: [],
    variantOptions: [],
    variants: [],
    trackQuantity: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const handleSubmit = async (data: Product) => {
    try {
      // Create both product and event in a single transaction
      const productData = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        cost: data.cost,
        sku: data.sku,
        barcode: data.barcode,
        trackQuantity: data.trackQuantity,
        weight: data.weight,
        weightUnit: data.weightUnit,
        width: data.width,
        length: data.length,
        height: data.height,
        dimensionUnit: data.dimensionUnit,
        status: data.status,
        isReward: true,
        variantOptions: data.variantOptions,
        variants: data.variants,
        images: data.images,
        tags: data.tags || [],
      };

      await createProduct.mutateAsync(productData);

      navigate("/dashboard/rewards");
    } catch (error) {
      console.error("Failed to create reward:", error);
      toast.error("Failed to create reward");
    }
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.preventDefault(); // Prevent form submission
          setShowActions(true);
        }}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <>
      <ProductForm
        initialData={{
          isReward: true,
        }}
        onSubmit={handleSubmit}
        headerActions={headerActions}
      />

      <ItemActionsModal
        open={showActions}
        onOpenChange={setShowActions}
        product={tempProduct}
        onDelete={async () => {
          toast.error("Cannot delete a reward that hasn't been created yet");
        }}
        isRewardProduct={true}
      />
    </>
  );
}
