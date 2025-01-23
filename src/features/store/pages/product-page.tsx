import { useParams } from "react-router-dom";
import { StoreLayout } from "../components/store-layout";
import { ProductDetails } from "../components/product-details";
import { useProduct } from "../hooks/use-store";
import Loading from "@/components/loading";

export function ProductPage() {
  const { storeName, productId } = useParams<{
    storeName: string;
    productId: string;
  }>();
  const { data: product, isLoading } = useProduct(storeName!, productId!);

  if (isLoading) {
    return (
      <StoreLayout>
        <div className="pt-14">
          <Loading />
        </div>
      </StoreLayout>
    );
  }

  if (!product) {
    return (
      <StoreLayout>
        <div className="pt-14">Product not found</div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <ProductDetails product={product} />
    </StoreLayout>
  );
}
