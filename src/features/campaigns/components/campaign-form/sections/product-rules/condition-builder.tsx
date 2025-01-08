import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { ProductSelect } from '@/features/orders/components/product-select';
import { Product } from '@/types/product';

interface ProductCondition {
  id: string;
  type: string;
  operator: string;
  value: string;
  enabled: boolean;
  productId?: string;
  categoryId?: string;
}

interface ProductConditionBuilderProps {
  groupId: string;
  onRemove: () => void;
}

const CONDITION_TYPES = [
  {
    id: 'product_specific',
    label: 'Specific Product',
    options: [
      { value: 'product_purchased', label: 'Product Purchased' },
      { value: 'product_quantity', label: 'Product Quantity' },
      { value: 'product_amount', label: 'Product Amount' },
    ],
  },
  {
    id: 'category',
    label: 'Product Category',
    options: [
      { value: 'category_purchased', label: 'Category Purchased' },
      { value: 'category_quantity', label: 'Category Quantity' },
      { value: 'category_amount', label: 'Category Amount' },
    ],
  },
];

export function ProductConditionBuilder({ groupId, onRemove }: ProductConditionBuilderProps) {
  const [condition, setCondition] = useState<ProductCondition>({
    id: crypto.randomUUID(),
    type: 'product_purchased',
    operator: 'equal_to',
    value: '',
    enabled: true,
  });

  const handleProductSelect = (product: Product) => {
    setCondition(prev => ({
      ...prev,
      productId: product.id,
      value: product.name
    }));
  };

  return (
    <div className="space-y-4 p-4 rounded-lg border bg-muted/50">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Condition Type</label>
          <Select 
            value={condition.type} 
            onValueChange={(value) => setCondition({ ...condition, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select condition type" />
            </SelectTrigger>
            <SelectContent>
              {CONDITION_TYPES.map((group) => (
                <div key={group.id}>
                  <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                    {group.label}
                  </div>
                  {group.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>

        {condition.type && (
          <>
            {condition.type.startsWith('product_') ? (
              <div className="grid gap-2">
                <label className="text-sm font-medium">Select Product</label>
                <ProductSelect onSelect={handleProductSelect}>
                  <Button variant="outline" className="w-full justify-start">
                    {condition.value || 'Choose a product...'}
                  </Button>
                </ProductSelect>
              </div>
            ) : (
              <div className="grid gap-2">
                <label className="text-sm font-medium">Select Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {condition.type.includes('quantity') || condition.type.includes('amount') ? (
              <>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Operator</label>
                  <Select
                    value={condition.operator}
                    onValueChange={(value) =>
                      setCondition({ ...condition, operator: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="greater_than">Greater than</SelectItem>
                      <SelectItem value="less_than">Less than</SelectItem>
                      <SelectItem value="equal_to">Equal to</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Value</label>
                  <Input
                    type="number"
                    min="0"
                    step={condition.type.includes('amount') ? '0.01' : '1'}
                    value={condition.value}
                    onChange={(e) =>
                      setCondition({ ...condition, value: e.target.value })
                    }
                    placeholder={condition.type.includes('amount') ? '0.00' : '0'}
                  />
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}