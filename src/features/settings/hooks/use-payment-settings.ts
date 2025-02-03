import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PaymentSettingsService } from "../services/payment-settings-service";
import { PaymentSettings } from "../schemas/payment-settings-schema";
import { useAuthStore } from "@/lib/auth/auth-store";

export function usePaymentSettings() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const {
    data: paymentSettings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment-settings", user?.storeName],
    queryFn: () => PaymentSettingsService.getPaymentSettings(user?.storeName!),
    enabled: !!user?.storeName,
  });

  const { mutateAsync: updatePaymentSettings, isPending: isUpdating } =
    useMutation({
      mutationFn: (settings: PaymentSettings) =>
        PaymentSettingsService.updatePaymentSettings(
          user?.storeName!,
          settings,
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["payment-settings", user?.storeName],
        });
      },
    });

  return {
    paymentSettings,
    isLoading,
    error,
    updatePaymentSettings,
    isUpdating,
  };
}
