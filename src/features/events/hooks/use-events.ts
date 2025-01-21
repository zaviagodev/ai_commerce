import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Event, EventProduct, Product } from "@/types/product";
import { EventService } from "../services/event-service";

export function useEvents() {
  const queryClient = useQueryClient();

  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: EventService.getEvents,
  });

  const createEvent = useMutation({
    mutationFn: (params: {
      productData: Omit<Product, "id" | "createdAt" | "updatedAt">;
      eventData: Omit<
        Event,
        "id" | "productId" | "storeName" | "createdAt" | "updatedAt"
      >;
    }) => EventService.createEvent(params.productData, params.eventData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const updateEvent = useMutation({
    mutationFn: (params: {
      productId: string;
      eventData: Partial<
        Omit<
          EventProduct,
          "id" | "productId" | "storeName" | "createdAt" | "updatedAt"
        >
      >;
    }) => EventService.updateEvent(params.productId, params.eventData),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["eventProduct", productId] });
    },
  });

  const deleteEvent = useMutation({
    mutationFn: EventService.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return {
    events,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}

// Separate hook for single event/event product
export function useEvent(productId?: string) {
  const eventProduct = useQuery({
    queryKey: ["eventProduct", productId],
    queryFn: () => EventService.getEventProduct(productId!),
    enabled: !!productId,
  });

  return {
    eventProduct: eventProduct.data,
    isLoading: eventProduct.isLoading,
    refetch: async () => {
      await Promise.all([eventProduct.refetch()]);
    },
  };
}
