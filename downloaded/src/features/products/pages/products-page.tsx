import { ProductList } from '../components/product-list';
import { useProducts } from '../hooks/use-products';

export function ProductsPage() {
  const { products, isLoading, deleteProduct } = useProducts();

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return <ProductList products={products} isLoading={isLoading} onDelete={handleDelete} />;
}