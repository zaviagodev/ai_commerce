export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ProductTag {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  variantOptions: VariantOption[];
  variants: ProductVariant[];
  images: ProductImage[];
  category?: ProductCategory;
  price: number;
  compareAtPrice?: number;
  cost?: number;
  sku?: string;
  barcode?: string;
  trackQuantity: boolean;
  weight: number;
  weightUnit: 'kg' | 'lb';
  tags: ProductTag[];
  status: 'draft' | 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface VariantOption {
  id: string;
  name: string;
  values: string[];
  position: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  options: {
    name: string;
    value: string;
  }[];
  status: 'active' | 'inactive';
  position: number;
}

export interface VariantGroup {
  attribute: string;
  variants: ProductVariant[];
  totalStock: number;
}