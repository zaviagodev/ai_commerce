import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event, Product } from "@/types/product";
import { useEvents } from "../hooks/use-events";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ItemActionsModal } from "@/features/products/components/product-form/modals/item-actions-modal";
import { toast } from "sonner";
import { ProductForm } from "@/features/products/components/product-form";

export function NewEventPage() {
  const navigate = useNavigate();
  const { createEvent } = useEvents();
  const [showActions, setShowActions] = useState(false);

  // Create a temporary product object for the actions modal
  const tempProduct: Product = {
    id: "new",
    name: "New Event",
    description: "",
    images: [],
    price: 0,
    status: "draft",
    weight: 0,
    weightUnit: "kg",
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
        status: data.status,
        variantOptions: data.variantOptions,
        tags: data.tags || [],
      };

      const eventData = {
        startDateTime: new Date(),
        endDateTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        venueName: "",
        venueAddress: "",
        organizerName: "",
        organizerContact: "",
      };

      await createEvent.mutateAsync({
        productData,
        eventData,
      });

      navigate("/dashboard/events");
    } catch (error) {
      console.error("Failed to create event:", error);
      toast.error("Failed to create event");
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
      <ProductForm onSubmit={handleSubmit} headerActions={headerActions} />

      <ItemActionsModal
        open={showActions}
        onOpenChange={setShowActions}
        product={tempProduct}
        onDelete={async () => {
          toast.error("Cannot delete an event that hasn't been created yet");
        }}
      />
    </>
  );
}
