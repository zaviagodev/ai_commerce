import { useState, useCallback } from 'react';
import { Product } from '@/types/product';

export function useBulkSelection() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkMode, setIsBulkMode] = useState(false);

  const toggleBulkMode = useCallback(() => {
    setIsBulkMode(prev => !prev);
    setSelectedIds(new Set());
  }, []);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleAll = useCallback((products: Product[]) => {
    setSelectedIds(prev => 
      prev.size === products.length 
        ? new Set() 
        : new Set(products.map(p => p.id))
    );
  }, []);

  const isSelected = useCallback((id: string) => {
    return selectedIds.has(id);
  }, [selectedIds]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return {
    selectedIds,
    isBulkMode,
    toggleBulkMode,
    toggleSelection,
    toggleAll,
    isSelected,
    clearSelection,
  };
}