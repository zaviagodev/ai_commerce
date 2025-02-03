import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event, EventProduct, Product } from "@/types/product";
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
    width: 0,
    length: 0,
    height: 0,
    dimensionUnit: "cm",
  };

  const handleSubmit = async (data: EventProduct) => {
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
        variants: data.variants,
        tags: data.tags || [],
        isReward: data.isReward,
      };

      const eventData = {
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
        venueName: data.venueName,
        venueAddress: data.venueAddress,
        organizerName: data.organizerName,
        organizerContact: data.organizerContact,
        attendancePoints: data.attendancePoints,
        googleMapsLink: data.googleMapsLink,
      };

      await createEvent.mutateAsync({
        productData: productData as Product,
        eventData: eventData as EventProduct,
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
