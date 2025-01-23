import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService, ProductFilters } from "../services/product-service";
import { Product } from "@/types/product";

export function useProducts(filters?: ProductFilters) {
  const queryClient = useQueryClient();

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", JSON.stringify(filters)],
    queryFn: () => ProductService.getProducts(filters),
  });

  const createProduct = useMutation({
    mutationFn: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) =>
      ProductService.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      ProductService.updateProduct(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", data.id] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: ProductService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}

export function useProduct(id: string) {
  const product = useQuery({
    queryKey: ["product", id],
    queryFn: () => ProductService.getProduct(id!),
    enabled: !!id,
  });

  return {
    product: product.data,
    isLoading: product.isLoading,
    refetch: async () => {
      await Promise.all([product.refetch()]);
    },
  };
}
