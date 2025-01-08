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
  hasVariants: boolean;
  variantOptions: VariantOption[];
  variants: ProductVariant[];
  images: ProductImage[];
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  cost?: number;
  sku: string;
  barcode?: string;
  trackQuantity: boolean;
  quantity?: number;
  weight: number;
  weightUnit: 'kg' | 'lb';
  tags: ProductTag[];
  status: 'draft' | 'active' | 'archived';
  pointsEnabled?: boolean;
  pointsEarned?: number;
  customerTiers?: {
    id: string;
    name: string;
    multiplier: number;
  }[];
  pointsRequired?: number;
  pointsValue?: number;
  eventStartDate?: Date;
  eventEndDate?: Date;
  eventVenue?: string;
  eventAddress?: string;
  eventGoogleMapsLink?: string;
  eventOrganizerName?: string;
  eventOrganizerContact?: string;
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
  separateStockManagement: boolean;
  price: number;
  compareAtPrice?: number;
  quantity?: number;
  stockStatus?: 'in_stock' | 'out_of_stock' | 'low_stock';
  lowStockThreshold?: number;
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