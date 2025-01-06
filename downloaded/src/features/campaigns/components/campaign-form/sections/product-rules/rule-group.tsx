import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { ProductRuleCondition } from './rule-condition';
import { Campaign } from '@/types/campaign';
import { CampaignProductRule } from '@/features/campaigns/types/campaign-rules';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductRuleGroupProps {
  group: { id: string; operator: string };
  isLast: boolean;
  onRemove: () => void;
  form: UseFormReturn<Campaign>;
}

export function ProductRuleGroup({ group, isLast, onRemove, form }: ProductRuleGroupProps) {
  const [operator, setOperator] = useState(group.operator);
  const rules = form.watch('productRules') || [];
  const groupRules = rules.filter((rule: CampaignProductRule) => rule.groupId === group.id);

  const addRule = () => {
    const newRule: CampaignProductRule = {
      id: crypto.randomUUID(),
      groupId: group.id,
      type: 'product_purchased',
      operator: 'equal_to',
      value: '',
      enabled: true,
    };
    form.setValue('productRules', [...rules, newRule]);
  };

  const removeRule = (ruleId: string) => {
    form.setValue(
      'productRules',
      rules.filter((rule: CampaignProductRule) => rule.id !== ruleId)
    );
  };

  const updateRule = (ruleId: string, data: Partial<CampaignProductRule>) => {
    form.setValue(
      'productRules',
      rules.map((rule: CampaignProductRule) =>
        rule.id === ruleId ? { ...rule, ...data } : rule
      )
    );
  };

  return (
    <div className="relative">
      {/* Visual connection line */}
      {!isLast && (
        <>
          {/* Vertical line from current box to operator */}
          <div className="absolute left-1/2 -bottom-8 h-8 w-px bg-border" />
          
          {/* Connection dot */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4">
            <div className="absolute inset-0 rounded-full border-2 border-border bg-background" />
          </div>

          {/* Vertical line from operator to next box */}
          <div className="absolute left-1/2 -bottom-24 h-16 w-px bg-border" />
        </>
      )}

      <Card className="relative p-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute -right-2 -top-2"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Match</span>
            <Select value={operator} onValueChange={setOperator}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All conditions</SelectItem>
                <SelectItem value="any">Any condition</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {groupRules.map((rule) => (
              <ProductRuleCondition
                key={rule.id}
                rule={rule}
                onUpdate={(data) => updateRule(rule.id!, data)}
                onRemove={() => removeRule(rule.id!)}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={addRule}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add product rule
            </Button>
          </div>
        </div>
      </Card>

      {/* Operator */}
      {!isLast && (
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-10 bg-background">
          <Select value={operator} onValueChange={setOperator}>
            <SelectTrigger className="w-[180px] border-dashed shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="and">AND</SelectItem>
              <SelectItem value="or">OR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}