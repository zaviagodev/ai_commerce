import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product, ProductVariant, VariantGroup } from "@/types/product";
import { usePagination } from "@/hooks/use-pagination";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { GroupSelector } from "./variant-table/group-selector";
import { VariantTableRow } from "./variant-table/variant-row";
import { VariantGroupRow } from "./variant-table/variant-group";
import React from "react";
import { useTranslation } from "@/lib/i18n/hooks";

interface VariantTableProps {
  form: UseFormReturn<Product>;
}

export function VariantTable({ form }: VariantTableProps) {
  const t = useTranslation();
  const variants = form.watch("variants") || [];
  const variantOptions = form.watch("variantOptions") || [];
  const trackQuantity = form.watch("trackQuantity");
  const [groupBy, setGroupBy] = useState<string>("ungrouped");
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
    if (groupBy === "ungrouped") return null;

    const groups = new Map<string, VariantGroup>();

    variants.forEach((variant) => {
      const option = variant.options.find((opt) => opt.name === groupBy);
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
      if (variant.quantity != null) {
        group.totalStock += variant.quantity;
      }
    });

    return Array.from(groups.values());
  }, [variants, groupBy]);

  // Get paginated variants or groups
  const paginatedItems = useMemo(() => {
    if (groupedVariants) {
      return paginateItems(groupedVariants);
    }
    return paginateItems(variants);
  }, [groupedVariants, variants, paginateItems]);

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
      "variants",
      variants.map((variant) =>
        variant.id === id ? { ...variant, ...data } : variant,
      ),
    );
  };

  const renderVariantRow = (variant: ProductVariant, index: number) => (
    <VariantTableRow
      key={`${variant.id}-${index}`}
      variant={variant}
      trackQuantity={trackQuantity}
      onUpdate={updateVariant}
      isReward={form.watch("isReward") || false}
    />
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">
            {t.products.products.form.sections.variations.title}
          </h3>
          <p className="text-[0.8rem] text-muted-foreground">
            {t.products.products.form.sections.variations.description}
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
        <Table className={variants.length > 0 ? "rounded-b-none" : ""}>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>
                {t.products.products.form.sections.variations.variantName}
              </TableHead>
              <TableHead>
                {t.products.products.form.sections.variations.sku}
              </TableHead>
              {trackQuantity && (
                <TableHead>
                  {t.products.products.form.sections.variations.quantity}
                </TableHead>
              )}
              <TableHead>
                {t.products.products.form.sections.variations.price}
              </TableHead>
              {form.watch("isReward") && (
                <TableHead>
                  {
                    t.products.products.form.sections.variations
                      .pointsBasedPrice
                  }
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupedVariants
              ? paginatedItems.map((group, groupIndex) => (
                  <VariantGroupRow
                    key={`${group.attribute}-${groupIndex}`}
                    group={group}
                    expanded={expandedGroups.has(group.attribute)}
                    trackQuantity={trackQuantity}
                    onToggle={() => toggleGroup(group.attribute)}
                    onUpdateVariant={updateVariant}
                  />
                ))
              : paginatedItems.map((variant, index) =>
                  renderVariantRow(variant, index),
                )}
            {variants.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={
                    3 +
                    (trackQuantity ? 1 : 0) +
                    (form.watch("isReward") ? 1 : 0)
                  }
                  className="text-center py-8 text-muted-foreground"
                >
                  {t.products.products.form.sections.variations.noVariants}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {variants.length > 0 && (
          <div className="border-t p-4 bg-main rounded-b-lg">
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount(variants.length)}
              totalItems={variants.length}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>
    </div>
  );
}
