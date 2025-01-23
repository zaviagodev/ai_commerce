import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CouponService } from "../services/coupon-service";
import { Coupon } from "@/types/coupon";

export function useCoupons() {
  const queryClient = useQueryClient();

  const {
    data: coupons = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: CouponService.getCoupons,
  });

  const createCoupon = useMutation({
    mutationFn: (coupon: Omit<Coupon, "id">) =>
      CouponService.createCoupon(coupon),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  const updateCoupon = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Coupon> }) =>
      CouponService.updateCoupon(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  const deleteCoupon = useMutation({
    mutationFn: CouponService.deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  return {
    coupons,
    isLoading,
    error,
    createCoupon,
    updateCoupon,
    deleteCoupon,
  };
}

export function useCouponByCode(storeName: string, code: string) {
  return useQuery({
    queryKey: ["coupons", storeName, code],
    queryFn: () => CouponService.getCouponByCode(storeName, code),
    enabled: !!storeName && !!code,
  });
}
