import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductVariant } from '@/types/product';

interface VariantRowProps {
  variant: ProductVariant;
  trackQuantity: boolean;
  onUpdate: (id: string, data: Partial<ProductVariant>) => void;
}

export function VariantTableRow({ variant, trackQuantity, onUpdate }: VariantRowProps) {
  const getStockStatus = (): string => {
    if (!variant.separateStockManagement || variant.quantity == null) return '-';
    if (variant.quantity <= 0) return 'Out of stock';
    if (variant.quantity <= (variant.lowStockThreshold || 5)) return 'Low stock';
    return 'In stock';
  };

  return (
    <TableRow>
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
        <>
          <TableCell>
            <Switch
              checked={variant.separateStockManagement}
              onCheckedChange={(checked) =>
                onUpdate(variant.id, {
                  separateStockManagement: checked,
                  quantity: checked ? 0 : undefined,
                })
              }
            />
          </TableCell>
          <TableCell>
            {variant.separateStockManagement && (
              <Input
                type="number"
                min="0"
                value={variant.quantity ?? 0}
                onChange={(e) =>
                  onUpdate(variant.id, { quantity: Number(e.target.value) })
                }
              />
            )}
          </TableCell>
          <TableCell>
            {variant.separateStockManagement && (
              <Input
                type="number"
                min="0"
                placeholder="Low stock alert"
                value={variant.lowStockThreshold ?? 5}
                onChange={(e) =>
                  onUpdate(variant.id, {
                    lowStockThreshold: Number(e.target.value),
                  })
                }
              />
            )}
          </TableCell>
          <TableCell>
            <Badge
              variant={
                !variant.separateStockManagement
                  ? 'secondary'
                  : variant.quantity === 0
                  ? 'destructive'
                  : variant.quantity! <= (variant.lowStockThreshold || 5)
                  ? 'warning'
                  : 'success'
              }
            >
              {getStockStatus()}
            </Badge>
          </TableCell>
        </>
      )}
      <TableCell>
        <Select
          value={variant.status}
          onValueChange={(value) => onUpdate(variant.id, { status: value as 'active' | 'inactive' })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
}