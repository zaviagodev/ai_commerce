import { UseFormReturn } from 'react-hook-form';
import { Campaign } from '@/types/campaign';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProductRuleGroup } from './rule-group';
import { useState } from 'react';
import { CampaignProductRule } from '@/features/campaigns/types/campaign-rules';

interface ProductRuleBuilderProps {
  form: UseFormReturn<Campaign>;
}

export function ProductRuleBuilder({ form }: ProductRuleBuilderProps) {
  const [groups, setGroups] = useState<{ id: string; operator: string }[]>([
    { id: '1', operator: 'and' }
  ]);

  const addGroup = () => {
    setGroups([...groups, { id: crypto.randomUUID(), operator: 'and' }]);
  };

  const removeGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId));
    // Remove associated rules
    const currentRules = form.getValues('productRules') || [];
    form.setValue(
      'productRules',
      currentRules.filter((rule: CampaignProductRule) => rule.groupId !== groupId)
    );
  };

  return (
    <div className="space-y-6">
      {/* Visual connection to conditions */}
      <div className="relative">
        <div className="absolute -top-8 left-1/2 h-8 w-px bg-border" />
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-border bg-background" />
      </div>

      {groups.map((group, index) => (
        <div key={group.id} className="relative">
          <ProductRuleGroup
            group={group}
            isLast={index === groups.length - 1}
            onRemove={() => removeGroup(group.id)}
            form={form}
          />
          {index < groups.length - 1 && <div className="h-16" />}
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addGroup}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add rule group
      </Button>
    </div>
  );
}