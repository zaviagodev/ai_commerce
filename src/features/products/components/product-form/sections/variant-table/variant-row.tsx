import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ProductVariant } from '@/types/product';

interface VariantRowProps {
  variant: ProductVariant;
  trackQuantity: boolean;
  onUpdate: (id: string, data: Partial<ProductVariant>) => void;
}

export function VariantTableRow({ variant, trackQuantity, onUpdate }: VariantRowProps) {
  return (
    <TableRow className='!bg-transparent'>
      <TableCell>{variant.name}</TableCell>
      <TableCell>
        <Input
          value={variant.sku}
          onChange={(e) => onUpdate(variant.id, { sku: e.target.value })}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={variant.price}
          onChange={(e) => onUpdate(variant.id, { price: Number(e.target.value) })}
        />
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
          />
        </TableCell>
      )}
    </TableRow>
  );
}