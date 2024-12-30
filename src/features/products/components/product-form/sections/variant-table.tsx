import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product, ProductVariant, VariantGroup } from '@/types/product';
import { usePagination } from '@/hooks/use-pagination';
import { DataTablePagination } from '@/components/ui/data-table/pagination';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { GroupSelector } from './variant-table/group-selector';
import { VariantTableRow } from './variant-table/variant-row';
import { VariantGroupRow } from './variant-table/variant-group';
import React from 'react';

interface VariantTableProps {
  form: UseFormReturn<Product>;
}

export function VariantTable({ form }: VariantTableProps) {
  const variants = form.watch('variants') || [];
  const variantOptions = form.watch('variantOptions') || [];
  const trackQuantity = form.watch('trackQuantity');
  const [groupBy, setGroupBy] = useState<string>('ungrouped');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination({
    initialPageSize: 20,
  });

  // Group variants by selected attribute
  const groupedVariants = useMemo(() => {
    if (groupBy === 'ungrouped') return null;
    
    const groups = new Map<string, VariantGroup>();
    
    variants.forEach(variant => {
      const option = variant.options.find(opt => opt.name === groupBy);
      if (!option) return;
      
      const value = option.value;
      if (!groups.has(value)) {
        groups.set(value, {
          attribute: value,
          variants: [],
          totalStock: 0,
        });
      }
      
      const group = groups.get(value)!;
      group.variants.push(variant);
      if (variant.separateStockManagement && variant.quantity != null) {
        group.totalStock += variant.quantity;
      }
    });
    
    return Array.from(groups.values());
  }, [variants, groupBy]);

  const toggleGroup = (attribute: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(attribute)) {
      newExpanded.delete(attribute);
    } else {
      newExpanded.add(attribute);
    }
    setExpandedGroups(newExpanded);
  };

  const updateVariant = (id: string, data: Partial<ProductVariant>) => {
    form.setValue(
      'variants',
      variants.map((variant) =>
        variant.id === id ? { ...variant, ...data } : variant
      )
    );
  };

  const getStockStatus = (variant: ProductVariant): string => {
    if (!variant.separateStockManagement || variant.quantity == null) return '-';
    if (variant.quantity <= 0) return 'Out of stock';
    if (variant.quantity <= (variant.lowStockThreshold || 5)) return 'Low stock';
    return 'In stock';
  };

  const renderVariantRow = (variant: ProductVariant) => (
    <VariantTableRow
      key={variant.id}
      variant={variant}
      trackQuantity={trackQuantity}
      onUpdate={updateVariant}
    />
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Variant Grouping</h3>
          <p className="text-sm text-muted-foreground">
            Group variants by attribute for better organization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <GroupSelector
            value={groupBy}
            onChange={setGroupBy}
            options={variantOptions}
          />
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Variant</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              {trackQuantity && (
                <>
                  <TableHead>Track Stock</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Low Stock Alert</TableHead>
                  <TableHead>Stock Status</TableHead>
                </>
              )}
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupedVariants ? (
              groupedVariants.map((group) => (
                <VariantGroupRow
                  key={group.attribute}
                  group={group}
                  expanded={expandedGroups.has(group.attribute)}
                  trackQuantity={trackQuantity}
                  onToggle={() => toggleGroup(group.attribute)}
                  onUpdateVariant={updateVariant}
                />
              ))
            ) : (
              variants.map(renderVariantRow)
            )}
            {variants.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No variants created yet. Add variant options above to generate variants.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="border-t p-4 bg-white rounded-b-lg">
          <DataTablePagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={pageCount(variants.length)}
            totalItems={variants.length}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
    </div>
  );
}