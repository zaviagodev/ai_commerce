import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DiscountTabsProps {
  type: "percentage" | "fixed";
  value: number;
  onTypeChange: (type: "percentage" | "fixed") => void;
  onValueChange: (value: number) => void;
  maxValue: number;
}

export function DiscountTabs({
  type,
  value,
  onTypeChange,
  onValueChange,
  maxValue,
}: DiscountTabsProps) {
  return (
    <Tabs
      value={type}
      onValueChange={(v) => onTypeChange(v as "percentage" | "fixed")}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="percentage">Percentage (%)</TabsTrigger>
        <TabsTrigger value="fixed">Fixed Amount ($)</TabsTrigger>
      </TabsList>
      <TabsContent value="percentage" className="space-y-2">
        <Label>Discount Percentage</Label>
        <div className="relative">
          <Input
            type="number"
            value={value || ""}
            onChange={(e) => {
              let val = e.target.value === "" ? 0 : parseFloat(e.target.value);
              // Round to 2 decimal places
              val = Math.round(val * 100) / 100;
              onValueChange(Number.isFinite(val) ? val : 0);
            }}
            className="pr-6"
            min="0"
            max="100"
            step="0.01"
            placeholder="0.00"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            %
          </span>
        </div>
        {value > 100 && (
          <p className="text-sm text-destructive">
            Percentage cannot exceed 100%
          </p>
        )}
      </TabsContent>
      <TabsContent value="fixed" className="space-y-2">
        <Label>Discount Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            $
          </span>
          <Input
            type="number"
            value={value || ""}
            onChange={(e) => {
              let val = e.target.value === "" ? 0 : parseFloat(e.target.value);
              // Round to 2 decimal places
              val = Math.round(val * 100) / 100;
              onValueChange(Number.isFinite(val) ? val : 0);
            }}
            className="pl-6"
            min="0"
            max={maxValue}
            step="0.01"
            placeholder="0.00"
          />
        </div>
        {value > maxValue && (
          <p className="text-sm text-destructive">
            Discount cannot exceed original price
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
}
