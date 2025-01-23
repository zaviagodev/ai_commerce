import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption, SORT_OPTIONS } from "../types/sorting";
import { useTranslation } from "@/lib/i18n/hooks";

interface ProductSortProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ProductSort({ value, onValueChange }: ProductSortProps) {
  const t = useTranslation();

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t.products.products.sort.title} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name-asc">
          {t.products.products.sort.options.nameAsc}
        </SelectItem>
        <SelectItem value="name-desc">
          {t.products.products.sort.options.nameDesc}
        </SelectItem>
        <SelectItem value="price-asc">
          {t.products.products.sort.options.priceAsc}
        </SelectItem>
        <SelectItem value="price-desc">
          {t.products.products.sort.options.priceDesc}
        </SelectItem>
        <SelectItem value="date-asc">
          {t.products.products.sort.options.dateAsc}
        </SelectItem>
        <SelectItem value="date-desc">
          {t.products.products.sort.options.dateDesc}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
