export type SortField = "name" | "price" | "quantity";
export type SortDirection = "asc" | "desc";

export interface SortOption {
  label: string;
  field: SortField;
  direction: SortDirection;
}

export const SORT_OPTIONS: SortOption[] = [
  { label: "Name (A-Z)", field: "name", direction: "asc" },
  { label: "Name (Z-A)", field: "name", direction: "desc" },
  { label: "Price (Low to High)", field: "price", direction: "asc" },
  { label: "Price (High to Low)", field: "price", direction: "desc" },
  { label: "Stock (Low to High)", field: "quantity", direction: "asc" },
  { label: "Stock (High to Low)", field: "quantity", direction: "desc" },
];
