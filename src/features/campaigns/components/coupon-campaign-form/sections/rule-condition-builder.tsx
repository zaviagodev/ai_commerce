import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/hooks';

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
  condition: {
    id: string;
    type: string;
    operator: string;
    value: string;
  };
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function RuleConditionBuilder({ condition, onUpdate, onRemove }: RuleConditionBuilderProps) {
  const t = useTranslation();

  return (
    <div className="p-4 rounded-lg border bg-muted/50 relative">
      <div className="absolute right-0 top-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className='!bg-transparent'
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">{t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.type.label}</label>
          <Select 
            value={condition.type} 
            onValueChange={(value) => onUpdate({ type: value })}
          >
            <SelectTrigger className='bg-white'>
              <SelectValue placeholder={t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.type.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {CONDITION_TYPES.map((group) => (
                <div key={group.id}>
                  <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                    {t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.type.groups[group.id]}
                  </div>
                  {group.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.type.options[option.value]}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>

        {condition.type && condition.type !== 'first_purchase' && (
          <>
            <div className="grid gap-2">
              <label className="text-sm font-medium">{t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.operator.label}</label>
              <Select
                value={condition.operator}
                onValueChange={(value) => onUpdate({ operator: value })}
              >
                <SelectTrigger className='bg-white'>
                  <SelectValue placeholder={t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.operator.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greater_than">{t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.operator.options.greaterThan}</SelectItem>
                  <SelectItem value="less_than">{t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.operator.options.lessThan}</SelectItem>
                  <SelectItem value="equal_to">{t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.operator.options.equalTo}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">{t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.value.label}</label>
              {condition.type === 'cart_total' ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    className="pl-8 bg-white"
                    value={condition.value}
                    onChange={(e) => onUpdate({ value: e.target.value })}
                  />
                </div>
              ) : condition.type === 'product_quantity' ? (
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={condition.value}
                  onChange={(e) => onUpdate({ value: e.target.value })}
                />
              ) : condition.type === 'customer_group' ? (
                <Select
                  value={condition.value}
                  onValueChange={(value) => onUpdate({ value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vip">{t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.value.customerGroups.vip}</SelectItem>
                    <SelectItem value="wholesale">{t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.value.customerGroups.wholesale}</SelectItem>
                    <SelectItem value="new">{t.campaigns.campaign.coupon.sections.advancedConditions.fields.ruleConditionBuilder.value.customerGroups.new}</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={condition.value}
                  onChange={(e) => onUpdate({ value: e.target.value })}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}