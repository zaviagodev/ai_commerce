import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ProductVariant } from "@/types/product";

interface VariantRowProps {
  variant: ProductVariant;
  trackQuantity: boolean;
  isReward: boolean;
  onUpdate: (id: string, data: Partial<ProductVariant>) => void;
}

export function VariantTableRow({
  variant,
  trackQuantity,
  isReward,
  onUpdate,
}: VariantRowProps) {
  return (
    <TableRow className="!bg-transparent">
      <TableCell>{variant.name}</TableCell>
      <TableCell>
        {/* <Input
          value={variant.sku}
          onChange={(e) => onUpdate(variant.id, { sku: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        /> */}
        {variant.sku}
      </TableCell>
      {trackQuantity && (
        <TableCell>
          <Input
            type="number"
            min="0"
            value={variant.quantity ?? 0}
            onChange={(e) =>
              onUpdate(variant.id, { quantity: Number(e.target.value) })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
        </TableCell>
      )}
      <TableCell>
        <Input
          type="number"
          min="0"
          value={(variant.price.toString().replace(/^0+(?!$)/, ''))}
          onChange={(e) =>
            onUpdate(variant.id, { price: Number(e.target.value) })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        />
      </TableCell>
      {isReward && (
        <TableCell>
          <Input
            type="number"
            min="0"
            value={variant.pointsBasedPrice}
            onChange={(e) =>
              onUpdate(variant.id, { pointsBasedPrice: Number(e.target.value) })
            }
          />
        </TableCell>
      )}
    </TableRow>
  );
}
