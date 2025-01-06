import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { VariantOption } from '@/types/product';

interface GroupSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: VariantOption[];
}

export function GroupSelector({ value, onChange, options }: GroupSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Group by attribute" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ungrouped">No grouping</SelectItem>
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