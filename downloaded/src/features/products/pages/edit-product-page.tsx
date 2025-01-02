import { useParams, useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/product-form';
import { Product } from '@/types/product';
import { useProducts } from '../hooks/use-products';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { ItemActionsModal } from '../components/product-form/modals/item-actions-modal';
import { toast } from 'sonner';

export function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct, deleteProduct } = useProducts();
  const [showActions, setShowActions] = useState(false);
  
  const product = products.find((p) => p.id === id);

  console.log("product =>", product)

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleSubmit = async (data: Product) => {
    try {
      await updateProduct.mutateAsync({ 
        id: product.id,
        data: {
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
          hasVariants: data.hasVariants,
          variantOptions: data.variantOptions,
          variants: data.variants?.map(variant => ({
            ...variant,
            name: `${data.name}-${variant.options.map(opt => opt.value).join('-')}`,
          })),
        }
      });
      navigate('/dashboard/products');
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct.mutateAsync(product.id);
      toast.success('Product deleted successfully');
      navigate('/dashboard/products');
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product');
    }
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowActions(true)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <>
      <ProductForm 
        initialData={product} 
        onSubmit={handleSubmit}
        headerActions={headerActions}
      />

      <ItemActionsModal
        open={showActions}
        onOpenChange={setShowActions}
        product={product}
        onDelete={handleDelete}
      />
    </>
  );
}