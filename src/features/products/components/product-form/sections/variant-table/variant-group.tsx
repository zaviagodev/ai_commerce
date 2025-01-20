import { TableCell, TableRow, Table, TableBody } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VariantGroup as IVariantGroup, ProductVariant } from '@/types/product';
import { VariantTableRow } from './variant-row';
import { useTranslation } from '@/lib/i18n/hooks';

interface VariantGroupRowProps {
  group: IVariantGroup;
  expanded: boolean;
  trackQuantity: boolean;
  onToggle: () => void;
  onUpdateVariant: (id: string, data: Partial<ProductVariant>) => void;
}

export function VariantGroupRow({
  group,
  expanded,
  trackQuantity,
  onToggle,
  onUpdateVariant,
}: VariantGroupRowProps) {
  const t = useTranslation();
  
  return (
    <>
      <TableRow
        className="bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <TableCell colSpan={trackQuantity ? 4 : 3}>
          <div className="flex items-center gap-2">
            {expanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="font-medium">{group.attribute}</span>
            {trackQuantity && (
              <Badge variant="outline" className="ml-2">
                {t.products.products.form.sections.variations.totalStock}: {group.totalStock}
              </Badge>
            )}
          </div>
        </TableCell>
      </TableRow>
      <TableRow className={cn('transition-all', !expanded && 'hidden')}>
        <TableCell colSpan={trackQuantity ? 4 : 3} className="p-0">
          <Table>
            <TableBody>
              {group.variants.map((variant) => (
                <VariantTableRow
                  key={variant.id}
                  variant={variant}
                  trackQuantity={trackQuantity}
                  onUpdate={onUpdateVariant}
                />
              ))}
            </TableBody>
          </Table>
        </TableCell>
      </TableRow>
    </>
  );
}