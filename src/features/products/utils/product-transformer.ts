import { Product } from "@/types/product";

export function transformProduct(product: any): Product {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    variantOptions: product.variant_options || [],
    variants: (product.product_variants || []).map((variant: any) => ({
      id: variant.id,
      name: variant.name,
      sku: variant.sku || "",
      price: Number(variant.price),
      compareAtPrice: variant.compare_at_price
        ? Number(variant.compare_at_price)
        : undefined,
      quantity: variant.quantity || 0,
      options: variant.options || [],
      status: variant.status || "active",
      position: variant.position || 0,
    })),
    images: (product.product_images || [])
      .sort((a: any, b: any) => a.position - b.position)
      .map((image: any) => ({
        id: image.id,
        url: image.url,
        alt: image.alt || "",
        position: image.position,
      })),
    category: product.product_categories
      ? {
          id: product.product_categories.id,
          name: product.product_categories.name,
          slug: product.product_categories.slug,
        }
      : undefined,
    price: Number(product.price),
    compareAtPrice: product.compare_at_price
      ? Number(product.compare_at_price)
      : undefined,
    cost: product.cost ? Number(product.cost) : undefined,
    sku: product.sku,
    barcode: product.barcode,
    trackQuantity: product.track_quantity,
    weight: Number(product.weight),
    weightUnit: product.weight_unit,
    tags: (product.product_tags || []).map((tag: any) => ({
      id: tag.id,
      name: tag.name,
    })),
    status: product.status,
    createdAt: new Date(product.created_at),
    updatedAt: new Date(product.updated_at),
  };
}
