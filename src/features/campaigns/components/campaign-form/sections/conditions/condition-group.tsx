import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { ConditionBuilder } from './condition-builder';
import { CampaignCondition } from '@/features/campaigns/types/campaign-rules';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ConditionGroupProps {
  group: { id: string; operator: string };
  isLast: boolean;
  onRemove: () => void;
  conditions: CampaignCondition[];
  onAddCondition: (condition: CampaignCondition) => void;
  onUpdateCondition: (id: string, data: Partial<CampaignCondition>) => void;
  onRemoveCondition: (id: string) => void;
}

export function ConditionGroup({
  group,
  isLast,
  onRemove,
  conditions,
  onAddCondition,
  onUpdateCondition,
  onRemoveCondition,
}: ConditionGroupProps) {
  const [operator, setOperator] = useState(group.operator);
  const groupConditions = conditions.filter(c => c.groupId === group.id);

  const addCondition = () => {
    onAddCondition({
      id: crypto.randomUUID(),
      groupId: group.id,
      type: 'total_spent',
      operator: 'greater_than',
      value: '',
      enabled: true,
    });
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
            {groupConditions.map((condition) => (
              <ConditionBuilder
                key={condition.id}
                condition={condition}
                onUpdate={(data) => onUpdateCondition(condition.id!, data)}
                onRemove={() => onRemoveCondition(condition.id!)}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={addCondition}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add condition
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