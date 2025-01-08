import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Coupon } from '@/types/coupon';
import { useState } from 'react';
import { RuleGroup } from './rule-group';

interface RuleBuilderProps {
  form: UseFormReturn<Coupon>;
}

export function RuleBuilder({ form }: RuleBuilderProps) {
  const [groups, setGroups] = useState([{ id: '1', operator: 'and', rules: [] }]);

  const addGroup = () => {
    setGroups([...groups, { id: crypto.randomUUID(), operator: 'and', rules: [] }]);
  };

  const removeGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId));
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
          <RuleGroup
            group={group}
            isLast={index === groups.length - 1}
            onRemove={() => removeGroup(group.id)}
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