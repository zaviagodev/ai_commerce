import { formatCurrency } from "@/lib/utils";

interface PriceSummaryProps {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
}

export function PriceSummary({
  originalPrice,
  discountAmount,
  finalPrice,
}: PriceSummaryProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Original price</span>
        <span>{formatCurrency(originalPrice)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Discount</span>
        <span className="text-destructive">-{formatCurrency(discountAmount)}</span>
      </div>
      <div className="flex justify-between font-medium">
        <span>Final price</span>
        <span>{formatCurrency(finalPrice)}</span>
      </div>
    </div>
  );
}