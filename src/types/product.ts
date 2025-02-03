export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position: number;
  path?: string;
}

export interface ProductCategory {
  id?: string;
  name: string;
  slug: string;
  description?: string;
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
  pointsBasedPrice?: number;
  compareAtPrice?: number;
  cost?: number;
  sku?: string;
  barcode?: string;
  trackQuantity: boolean;
  weight: number;
  weightUnit: "kg" | "lb";
  width: number;
  length: number;
  height: number;
  dimensionUnit: "cm" | "in";
  tags: ProductTag[];
  status: "draft" | "active" | "archived";
  isReward?: boolean;
  isGiftCard?: boolean;
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
  pointsBasedPrice?: number;
  quantity: number;
  options: {
    name: string;
    value: string;
  }[];
  status: "active" | "inactive";
  position: number;
}

export interface VariantGroup {
  attribute: string;
  variants: ProductVariant[];
  totalStock: number;
}

export interface Event {
  id: string;
  eventId: string;
  productId: string;
  storeName: string;
  startDateTime: Date;
  endDateTime: Date;
  gateOpeningDateTime?: Date;
  gateClosingDateTime?: Date;
  venueName: string;
  venueAddress: string;
  googleMapsLink?: string;
  organizerName: string;
  organizerContact: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventProduct extends Product {
  eventId: string;
  startDateTime: Date;
  endDateTime: Date;
  gateOpeningDateTime?: Date;
  gateClosingDateTime?: Date;
  venueName: string;
  venueAddress: string;
  googleMapsLink?: string;
  organizerName: string;
  organizerContact: string;
}
