import { Product } from '@/types/product';

export function transformProduct(product: any): Product {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    images: (product.product_images || []).sort((a, b) => a.position - b.position),
    category: product.product_categories ? {
      id: product.product_categories.id,
      name: product.product_categories.name,
      slug: product.product_categories.slug,
    } : undefined,
    price: Number(product.price),
    compareAtPrice: product.compare_at_price ? Number(product.compare_at_price) : undefined,
    cost: product.cost ? Number(product.cost) : undefined,
    sku: product.sku,
    barcode: product.barcode,
    trackQuantity: product.track_quantity,
    quantity: product.quantity,
    weight: Number(product.weight),
    weightUnit: product.weight_unit,
    tags: product.product_tags || [],
    status: product.status,
    createdAt: new Date(product.created_at),
    updatedAt: new Date(product.updated_at),
  };
}