import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { VariantOption } from '@/types/product';
import { useTranslation } from '@/lib/i18n/hooks';

interface GroupSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: VariantOption[];
}

export function GroupSelector({ value, onChange, options }: GroupSelectorProps) {
  const t = useTranslation();
  
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={t.products.products.form.sections.variations.grouping.selectAttribute} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ungrouped">{t.products.products.form.sections.variations.grouping.ungrouped}</SelectItem>
        {options.map((option) => (
          option.name && (
            <SelectItem key={option.id} value={option.name}>
              {option.name}
            </SelectItem>
          )
        ))}
      </SelectContent>
    </Select>
  );
}