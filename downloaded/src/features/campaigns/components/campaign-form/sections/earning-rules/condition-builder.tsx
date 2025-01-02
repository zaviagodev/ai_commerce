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

interface Condition {
  id: string;
  type: string;
  operator: string;
  value: string;
  enabled: boolean;
}

interface ConditionBuilderProps {
  groupId: string;
  onRemove: () => void;
}

const CONDITION_TYPES = [
  {
    id: 'customer_attributes',
    label: 'Customer Attributes',
    options: [
      { value: 'lifetime_value', label: 'Customer Lifetime Value' },
      { value: 'account_age', label: 'Account Creation Date' },
      { value: 'email_domain', label: 'Email Domain' },
      { value: 'location', label: 'Location/Country' },
    ],
  },
  {
    id: 'order_metrics',
    label: 'Order Metrics',
    options: [
      { value: 'order_count', label: 'Total Order Count' },
      { value: 'order_value', label: 'Order Value Range' },
      { value: 'recent_purchase', label: 'Recent Purchase Within Days' },
      { value: 'payment_method', label: 'Payment Method Used' },
    ],
  },
  {
    id: 'purchase_behavior',
    label: 'Purchase Behavior',
    options: [
      { value: 'first_purchase', label: 'First-time Purchase' },
      { value: 'days_since_order', label: 'Days Since Last Order' },
      { value: 'avg_order_value', label: 'Average Order Value' },
      { value: 'purchase_frequency', label: 'Purchase Frequency' },
    ],
  },
  {
    id: 'engagement',
    label: 'Engagement Actions',
    options: [
      { value: 'newsletter', label: 'Newsletter Subscription' },
      { value: 'social_share', label: 'Social Media Share' },
      { value: 'product_review', label: 'Product Review' },
      { value: 'referral', label: 'Account Referral' },
    ],
  },
];

export function ConditionBuilder({ groupId, onRemove }: ConditionBuilderProps) {
  const [condition, setCondition] = useState<Condition>({
    id: crypto.randomUUID(),
    type: 'lifetime_value',
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
                  setCondition({ ...condition, value: e.target.value || '' })
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