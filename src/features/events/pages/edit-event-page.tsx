import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { EventProduct } from "@/types/product";
import { useEvent, useEvents } from "../hooks/use-events";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { ItemActionsModal } from "@/features/products/components/product-form/modals/item-actions-modal";
import { toast } from "sonner";
import { ProductForm } from "@/features/products/components/product-form";
import Loading from "@/components/loading";

export function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { eventProduct, isLoading } = useEvent(id);
  const { updateEvent, deleteEvent } = useEvents();
  const [showActions, setShowActions] = useState(false);

  if (isLoading) {
    return (
      <div className="pt-14">
        <Loading />
      </div>
    );
  }

  if (!eventProduct) {
    return <div className="pt-14">Event not found</div>;
  }

  const handleSubmit = async (data: EventProduct) => {
    try {
      await updateEvent.mutateAsync({
        productId: data.id,
        eventData: {
          eventId: data.eventId,
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
          startDateTime: data.startDateTime,
          endDateTime: data.endDateTime,
          gateOpeningDateTime: data.gateOpeningDateTime,
          gateClosingDateTime: data.gateClosingDateTime,
          venueName: data.venueName,
          venueAddress: data.venueAddress,
          googleMapsLink: data.googleMapsLink,
          organizerName: data.organizerName,
          organizerContact: data.organizerContact,
        },
      });

      navigate("/dashboard/events");
    } catch (error) {
      console.error("Failed to update event:", error);
      toast.error("Failed to update event");
    }
  };

  const handleDelete = async () => {
    try {
      if (eventProduct.event) {
        await deleteEvent.mutateAsync(eventProduct.event.id);
      }
      toast.success("Event deleted successfully");
      navigate("/dashboard/events");
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.error("Failed to delete event");
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
        initialData={eventProduct}
        onSubmit={handleSubmit}
        // headerActions={headerActions}
      />

      <ItemActionsModal
        open={showActions}
        onOpenChange={setShowActions}
        product={eventProduct}
        onDelete={handleDelete}
      />
    </>
  );
}
