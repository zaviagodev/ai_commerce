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

const CONDITION_TYPES = [
  {
    id: 'cart_attributes',
    label: 'Cart Attributes',
    options: [
      { value: 'cart_total', label: 'Cart Total' },
      { value: 'item_count', label: 'Item Count' },
      { value: 'shipping_country', label: 'Shipping Country' },
    ],
  },
  {
    id: 'customer_attributes',
    label: 'Customer Attributes',
    options: [
      { value: 'customer_group', label: 'Customer Group' },
      { value: 'first_purchase', label: 'First Purchase' },
      { value: 'total_spent', label: 'Total Spent' },
    ],
  },
  {
    id: 'product_attributes',
    label: 'Product Attributes',
    options: [
      { value: 'product_quantity', label: 'Product Quantity' },
      { value: 'category', label: 'Product Category' },
      { value: 'tag', label: 'Product Tag' },
    ],
  },
] as const;

interface RuleConditionBuilderProps {
  groupId: string;
  onRemove: () => void;
}

export function RuleConditionBuilder({ groupId, onRemove }: RuleConditionBuilderProps) {
  const [condition, setCondition] = useState({
    id: crypto.randomUUID(),
    type: '',
    operator: 'greater_than',
    value: '',
    enabled: true,
  });

  return (
    <div className="space-y-4 p-4 rounded-lg border bg-muted/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            checked={condition.enabled}
            onCheckedChange={(checked) =>
              setCondition({ ...condition, enabled: checked })
            }
          />
          <span className="text-sm font-medium">
            {condition.enabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
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
                value={condition.value}
                onChange={(e) =>
                  setCondition({ ...condition, value: e.target.value })
                }
                placeholder="Enter value"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}