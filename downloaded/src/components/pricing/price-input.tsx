import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  error?: string;
}

export function PriceInput({ value, onChange, label, error }: PriceInputProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          $
        </span>
        <Input
          type="number"
          value={value || ''}
          onChange={(e) => {
            const val = e.target.value === '' ? 0 : parseFloat(e.target.value);
            onChange(Number.isFinite(val) ? val : 0);
          }}
          className="pl-6"
          step="0.01"
          min="0"
          placeholder="0.00"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}