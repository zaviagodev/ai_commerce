import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Campaign } from "@/types/campaign";
import { RuleGroup } from "./rule-group";
import { useState, useEffect } from "react";
import {
  RuleElement,
  GroupOperator,
} from "@/features/campaigns/types/campaign-rules";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RuleBuilderProps {
  form: UseFormReturn<Campaign>;
}

export function RuleBuilder({ form }: RuleBuilderProps) {
  const [groups, setGroups] = useState<RuleElement[]>(
    form.getValues("productRules") || [],
  );

  useEffect(() => {
    form.setValue("productRules", groups);
  }, [groups, form]);

  const addGroup = () => {
    const newGroup: RuleElement = {
      id: crypto.randomUUID(),
      type: "group",
      match: "all",
      conditions: [],
    };

    // If there are existing groups, add an operator
    if (groups.length > 0) {
      const operator: GroupOperator = {
        id: crypto.randomUUID(),
        type: "group_operator",
        operator: "AND",
      };
      setGroups([...groups, operator, newGroup]);
    } else {
      setGroups([newGroup]);
    }
  };

  const removeGroup = (groupId: string) => {
    const index = groups.findIndex((g) => g.id === groupId);
    if (index === -1) return;

    const newGroups = [...groups];

    // If this is not the first group, also remove the operator before it
    if (index > 0) {
      newGroups.splice(index - 1, 2);
    } else if (newGroups.length > 1) {
      // If this is the first group but not the only one, remove the operator after it
      newGroups.splice(0, 2);
    } else {
      // If this is the only group
      newGroups.splice(0, 1);
    }

    setGroups(newGroups);
  };

  const updateGroup = (groupId: string, data: Partial<RuleElement>) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId ? { ...group, ...data } : group,
      ),
    );
  };

  const updateOperator = (operatorId: string, newOperator: "AND" | "OR") => {
    setGroups(
      groups.map((element) =>
        element.id === operatorId && element.type === "group_operator"
          ? { ...element, operator: newOperator }
          : element,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {groups.map((element, index) => (
        <div key={element.id}>
          {element.type === "group" ? (
            <RuleGroup
              group={element}
              isLast={index === groups.length - 1}
              onRemove={() => removeGroup(element.id)}
              onUpdate={(data) => updateGroup(element.id, data)}
            />
          ) : (
            <Select
              value={element.operator}
              onValueChange={(value) =>
                updateOperator(element.id, value as "AND" | "OR")
              }
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
