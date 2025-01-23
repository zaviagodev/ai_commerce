import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { CampaignCondition } from "@/features/campaigns/types/campaign-rules";

interface Condition {
  id: string;
  type: string;
  operator: string;
  value: string;
  enabled: boolean;
}

interface ConditionBuilderProps {
  condition: CampaignCondition;
  onUpdate: (data: Partial<CampaignCondition>) => void;
  onRemove: () => void;
}

const CONDITION_TYPES = [
  {
    id: "customer_attributes",
    label: "Customer Attributes",
    options: [
      { value: "lifetime_value", label: "Customer Lifetime Value" },
      { value: "account_age", label: "Account Age (days)" },
    ],
  },
  {
    id: "order_metrics",
    label: "Order Metrics",
    options: [
      { value: "order_count", label: "Total Order Count" },
      { value: "order_value", label: "Order Value Range" },
      {
        value: "recent_purchase_within_days",
        label: "Recent Purchase Within Days",
      },
    ],
  },
  {
    id: "purchase_behavior",
    label: "Purchase Behavior",
    options: [
      { value: "first_purchase", label: "First-time Purchase" },
      { value: "days_since_order", label: "Days Since Last Order" },
      { value: "avg_order_value", label: "Average Order Value" },
    ],
  },
];

export function ConditionBuilder({
  condition,
  onUpdate,
  onRemove,
}: ConditionBuilderProps) {
  return (
    <div className="p-4 rounded-lg border bg-muted/50 relative">
      <div className="flex items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="absolute right-0 top-0 !bg-transparent"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Condition Type</label>
          <Select
            value={condition.type}
            onValueChange={(value) =>
              onUpdate({ type: value as CampaignCondition["type"] })
            }
          >
            <SelectTrigger className="bg-white">
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
                  onUpdate({
                    operator: value as CampaignProductRule["operator"],
                  })
                }
              >
                <SelectTrigger className="bg-white">
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
                onChange={(e) => onUpdate({ value: e.target.value })}
                placeholder="Enter value"
                className="bg-white"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
