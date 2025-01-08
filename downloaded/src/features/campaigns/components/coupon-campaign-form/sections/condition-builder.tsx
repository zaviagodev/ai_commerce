import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
import { useState } from 'react';

interface Condition {
  id: string;
  type: 'cart_total' | 'product_quantity' | 'customer_group' | 'first_purchase';
  operator: 'greater_than' | 'less_than' | 'equal_to';
  value: string;
  enabled: boolean;
  logicGate?: 'and' | 'or';
}

interface ConditionBuilderProps {
  condition: Condition;
  isFirst: boolean;
  onUpdate: (data: Partial<Condition>) => void;
  onRemove: () => void;
}

export function ConditionBuilder({ condition, isFirst, onUpdate, onRemove }: ConditionBuilderProps) {
  // Initialize local state with empty string if value is undefined
  const [inputValue, setInputValue] = useState(condition.value || '');

  return (
    <div className="space-y-4 p-4 rounded-lg border bg-muted/50">
      {/* Logic Gate */}
      {!isFirst && (
        <div className="flex items-center gap-2 -mt-8 -mx-4 mb-4 py-2 px-4 bg-muted border-b">
          <Select
            value={condition.logicGate}
            onValueChange={(value) => onUpdate({ logicGate: value as 'and' | 'or' })}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="and">AND</SelectItem>
              <SelectItem value="or">OR</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">the following condition:</span>
        </div>
      )}

      {/* Condition Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            checked={condition.enabled}
            onCheckedChange={(enabled) => onUpdate({ enabled })}
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

      {/* Condition Type */}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Condition Type</label>
          <Select
            value={condition.type}
            onValueChange={(value) => onUpdate({ 
              type: value as Condition['type'],
              value: '' // Reset value when type changes
            })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cart_total">Cart Total</SelectItem>
              <SelectItem value="product_quantity">Product Quantity</SelectItem>
              <SelectItem value="customer_group">Customer Group</SelectItem>
              <SelectItem value="first_purchase">First Purchase</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {condition.type !== 'first_purchase' && (
          <>
            {/* Operator */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Operator</label>
              <Select
                value={condition.operator}
                onValueChange={(value) => onUpdate({ operator: value as Condition['operator'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greater_than">Greater than</SelectItem>
                  <SelectItem value="less_than">Less than</SelectItem>
                  <SelectItem value="equal_to">Equal to</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Value */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Value</label>
              {condition.type === 'cart_total' ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    className="pl-8"
                    value={inputValue || ''}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      onUpdate({ value: e.target.value });
                    }}
                  />
                </div>
              ) : condition.type === 'product_quantity' ? (
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    onUpdate({ value: e.target.value });
                  }}
                />
              ) : condition.type === 'customer_group' ? (
                <Select
                  value={inputValue}
                  onValueChange={(value) => {
                    setInputValue(value);
                    onUpdate({ value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vip">VIP Customers</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="new">New Customers</SelectItem>
                  </SelectContent>
                </Select>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}