import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Coupon } from '@/types/coupon';
import { useState } from 'react';
import { RuleGroup } from './rule-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RuleBuilderProps {
  form: UseFormReturn<Coupon>;
}

export function RuleBuilder({ form }: RuleBuilderProps) {
  const [groups, setGroups] = useState([{ id: '1', operator: 'and', rules: [] }]);

  const addGroup = () => {
    const newGroup = {
      id: crypto.randomUUID(),
      type: 'group',
      match: 'all',
      conditions: []
    };

    // If there are existing groups, add an operator
    if (form.getValues('conditions')?.length > 0) {
      const operator = {
        id: crypto.randomUUID(),
        type: 'group_operator',
        operator: 'AND'
      };
      form.setValue('conditions', [...form.getValues('conditions'), operator, newGroup]);
    } else {
      form.setValue('conditions', [newGroup]);
    }
  };

  const removeGroup = (groupId: string) => {
    const conditions = form.getValues('conditions');
    const index = conditions.findIndex(g => g.id === groupId);
    if (index === -1) return;

    const newConditions = [...conditions];
    
    // If this is not the first group, also remove the operator before it
    if (index > 0) {
      newConditions.splice(index - 1, 2);
    } else if (newConditions.length > 1) {
      // If this is the first group but not the only one, remove the operator after it
      newConditions.splice(0, 2);
    } else {
      // If this is the only group
      newConditions.splice(0, 1);
    }

    form.setValue('conditions', newConditions);
  };

  const updateGroup = (groupId: string, data: any) => {
    const conditions = form.getValues('conditions');
    form.setValue(
      'conditions',
      conditions.map(group => 
        group.id === groupId ? { ...group, ...data } : group
      )
    );
  };

  const updateOperator = (operatorId: string, newOperator: 'AND' | 'OR') => {
    const conditions = form.getValues('conditions');
    form.setValue(
      'conditions',
      conditions.map(element => 
        element.id === operatorId && element.type === 'group_operator'
          ? { ...element, operator: newOperator }
          : element
      )
    );
  };

  return (
    <div className="space-y-6">
      {form.getValues('conditions')?.map((element, index) => (
        <div key={element.id}>
          {element.type === 'group' ? (
            <RuleGroup
              group={element}
              isLast={index === form.getValues('conditions').length - 1}
              onRemove={() => removeGroup(element.id)}
              onUpdate={(data) => updateGroup(element.id, data)}
            />
          ) : (
            <Select 
              value={element.operator}
              onValueChange={(value) => updateOperator(element.id, value as 'AND' | 'OR')}
            >
              <SelectTrigger className="w-[150px] mx-auto border-dashed shadow-sm relative">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">AND</SelectItem>
                <SelectItem value="OR">OR</SelectItem>
              </SelectContent>
            </Select>
          )}
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