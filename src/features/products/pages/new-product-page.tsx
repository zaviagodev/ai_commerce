import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductForm } from "../components/product-form";
import { Product } from "@/types/product";
import { useProducts } from "../hooks/use-products";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Ticket } from "lucide-react";
import { ItemActionsModal } from "../components/product-form/modals/item-actions-modal";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export function NewProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isEventProduct = location.pathname.startsWith("/dashboard/events");
  const isRewardProduct = location.pathname.startsWith('/dashboard/reward-items');
  const { createProduct } = useProducts();
  const [showActions, setShowActions] = useState(false);

  // Create a temporary product object for the actions modal
  const tempProduct: Product = {
    id: "new",
    name: "New Product",
    description: "",
    images: [],
    price: 0,
    status: "draft",
    weight: 0,
    weightUnit: "kg",
    tags: [],
    hasVariants: false,
    variantOptions: [],
    variants: [],
    trackQuantity: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const handleSubmit = async (data: Product) => {
    try {
      await createProduct.mutateAsync(data);
      navigate(isEventProduct ? "/dashboard/events" : isRewardProduct ? "/dashboard/reward-items" : "/dashboard/products");
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      {isEventProduct && (
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-700 flex items-center gap-1.5"
        >
          <Ticket className="h-3.5 w-3.5" />
          Event Product
        </Badge>
      )}
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
      <ProductForm onSubmit={handleSubmit} headerActions={headerActions} />

      <ItemActionsModal
        open={showActions}
        onOpenChange={setShowActions}
        product={tempProduct}
        onDelete={async () => {
          toast.error("Cannot delete a product that hasn't been created yet");
        }}
        isEventProduct={isEventProduct}
        isRewardProduct={isRewardProduct}
      />
    </>
  );
}
