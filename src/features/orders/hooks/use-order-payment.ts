import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "../services/order-service";
import { toast } from "sonner";
import { Order } from "@/types/order";

export function useOrderPayment() {
  const queryClient = useQueryClient();

  const confirmPaymentMutation = useMutation({
    mutationFn: async ({
      orderId,
      order,
    }: {
      orderId: string;
      order: Order;
    }) => {
      return OrderService.confirmPayment(orderId, order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Payment confirmed successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to confirm payment");
    },
  });

  return {
    confirmPayment: confirmPaymentMutation.mutateAsync,
    isConfirming: confirmPaymentMutation.isPending,
  };
}
