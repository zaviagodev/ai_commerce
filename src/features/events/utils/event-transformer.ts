import {
  Event,
  EventProduct,
  ProductImage,
  ProductTag,
  ProductVariant,
  VariantOption,
} from "@/types/product";

interface RawProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compare_at_price: number | null;
  points_based_price: number | null;
  quantity: number | null;
  options: {
    name: string;
    value: string;
  }[];
  status: "active" | "inactive";
  position: number;
}

interface RawProductImage {
  id: string;
  url: string;
  alt: string | null;
  position: number;
}

interface RawProductCategory {
  id: string;
  name: string;
  slug: string;
}

interface RawProductTag {
  id: string;
  name: string;
}

interface RawProduct {
  id: string;
  is_reward: boolean;
  name: string;
  description: string;
  sku: string | null;
  barcode: string | null;
  price: number;
  compare_at_price: number | null;
  cost: number | null;
  track_quantity: boolean;
  weight: number;
  weight_unit: "kg" | "lb";
  status: "draft" | "active" | "archived";
  variant_options: VariantOption[];
  product_variants: RawProductVariant[];
  product_images: RawProductImage[];
  product_categories: RawProductCategory | null;
  product_tags: RawProductTag[];
  created_at: string;
  updated_at: string;
}

interface RawEvent {
  id: string;
  product_id: string;
  store_name: string;
  product: RawProduct;
  start_datetime: string;
  end_datetime: string;
  venue_name: string;
  venue_address: string;
  google_maps_link: string | null;
  organizer_name: string;
  organizer_contact: string;
  attendance_points: number;
  created_at: string;
  updated_at: string;
}

export function transformEvent(rawEvent: RawEvent): Event {
  return {
    eventId: rawEvent.id,
    storeName: rawEvent.store_name,
    startDateTime: new Date(rawEvent.start_datetime),
    endDateTime: new Date(rawEvent.end_datetime),
    venueName: rawEvent.venue_name,
    venueAddress: rawEvent.venue_address,
    googleMapsLink: rawEvent.google_maps_link || undefined,
    organizerName: rawEvent.organizer_name,
    organizerContact: rawEvent.organizer_contact,
    attendancePoints: rawEvent.attendance_points,
    createdAt: new Date(rawEvent.created_at),
    updatedAt: new Date(rawEvent.updated_at),
  };
}

export function transformEventProduct(rawEvent: RawEvent): EventProduct {
  return {
    ...transformEvent(rawEvent),
    id: rawEvent.product_id,
    isReward: rawEvent.product.is_reward,
    name: rawEvent.product.name,
    description: rawEvent.product.description,
    variantOptions: rawEvent.product.variant_options || [],
    variants: (rawEvent.product.product_variants || []).map(
      (variant): ProductVariant => ({
        id: variant.id,
        name: variant.name,
        sku: variant.sku,
        price: Number(variant.price),
        pointsBasedPrice: variant.points_based_price
          ? Number(variant.points_based_price)
          : undefined,
        compareAtPrice: variant.compare_at_price
          ? Number(variant.compare_at_price)
          : undefined,
        quantity: variant.quantity ?? 0,
        options: variant.options || [],
        status: variant.status,
        position: variant.position,
      }),
    ),
    images: (rawEvent.product.product_images || [])
      .sort((a, b) => a.position - b.position)
      .map(
        (image): ProductImage => ({
          id: image.id,
          url: image.url,
          alt: image.alt || "",
          position: image.position,
        }),
      ),
    category: rawEvent.product.product_categories
      ? {
          id: rawEvent.product.product_categories.id,
          name: rawEvent.product.product_categories.name,
          slug: rawEvent.product.product_categories.slug,
        }
      : undefined,
    price: Number(rawEvent.product.price),
    compareAtPrice: rawEvent.product.compare_at_price
      ? Number(rawEvent.product.compare_at_price)
      : undefined,
    cost: rawEvent.product.cost ? Number(rawEvent.product.cost) : undefined,
    sku: rawEvent.product.sku || undefined,
    barcode: rawEvent.product.barcode || undefined,
    trackQuantity: rawEvent.product.track_quantity,
    weight: Number(rawEvent.product.weight),
    weightUnit: rawEvent.product.weight_unit,
    tags: (rawEvent.product.product_tags || []).map(
      (tag): ProductTag => ({
        id: tag.id,
        name: tag.name,
      }),
    ),
    status: rawEvent.product.status,
    createdAt: new Date(rawEvent.product.created_at),
    updatedAt: new Date(rawEvent.product.updated_at),
  };
}
