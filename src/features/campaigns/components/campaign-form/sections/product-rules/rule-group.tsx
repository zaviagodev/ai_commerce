import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import {
  RuleElement,
  RuleGroup as IRuleGroup,
} from "@/features/campaigns/types/campaign-rules";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductRuleCondition } from "./rule-condition";

interface RuleGroupProps {
  group: IRuleGroup;
  isLast: boolean;
  onRemove: () => void;
  onUpdate: (data: Partial<RuleElement>) => void;
}

export function RuleGroup({
  group,
  isLast,
  onRemove,
  onUpdate,
}: RuleGroupProps) {
  const addCondition = () => {
    const newCondition = {
      id: crypto.randomUUID(),
      type: "product_purchased",
      operator: "equal_to",
      value: "",
      enabled: true,
    };

    onUpdate({
      ...group,
      conditions: [...group.conditions, newCondition],
    });
  };

  const removeCondition = (conditionId: string) => {
    onUpdate({
      ...group,
      conditions: group.conditions.filter((c) => c.id !== conditionId),
    });
  };

  const updateCondition = (conditionId: string, data: any) => {
    onUpdate({
      ...group,
      conditions: group.conditions.map((c) =>
        c.id === conditionId ? { ...c, ...data } : c,
      ),
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Match</span>
              <Select
                value={group.match}
                onValueChange={(value) =>
                  onUpdate({ ...group, match: value as "all" | "any" })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All conditions</SelectItem>
                  <SelectItem value="any">Any condition</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {group.conditions.map((condition) => (
              <ProductRuleCondition
                key={condition.id}
                condition={condition}
                onUpdate={(data) => updateCondition(condition.id, data)}
                onRemove={() => removeCondition(condition.id)}
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
    </div>
  );
}
