import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CustomerTier } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, MinusCircle, Plus, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GroupSelector } from "./group-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/lib/i18n/hooks";
import { useRef } from "react";
import InputCounter from "@/components/input-counter";

interface RequirementsProps {
  form: UseFormReturn<CustomerTier>;
}

const DEMO_GROUPS = [
  { id: "1", name: "VIP Customers" },
  { id: "2", name: "New Customers" },
  { id: "3", name: "Wholesale" },
];

export function Requirements({ form }: RequirementsProps) {
  const t = useTranslation();
  const requirements = form.watch("requirements") || [];
  const numRef = useRef(null);

  const REQUIREMENT_TYPES = [
    {
      id: "points",
      name: t.customers.customer.tier.sections.requirements.fields.points.title,
      description:
        t.customers.customer.tier.sections.requirements.fields.points
          .description,
    },
    {
      id: "spending",
      name: t.customers.customer.tier.sections.requirements.fields.totalSpending
        .title,
      description:
        t.customers.customer.tier.sections.requirements.fields.totalSpending
          .description,
    },
    {
      id: "orders",
      name: t.customers.customer.tier.sections.requirements.fields.orderCount
        .title,
      description:
        t.customers.customer.tier.sections.requirements.fields.orderCount
          .description,
    },
    {
      id: "group",
      name: t.customers.customer.tier.sections.requirements.fields.customerGroup
        .title,
      description:
        t.customers.customer.tier.sections.requirements.fields.customerGroup
          .description,
    },
    {
      id: "duration",
      name: t.customers.customer.tier.sections.requirements.fields
        .membershipDuration.title,
      description:
        t.customers.customer.tier.sections.requirements.fields
          .membershipDuration.description,
    },
  ] as const;

  const addRequirement = (type: string) => {
    const newRequirement = {
      id: crypto.randomUUID(),
      type,
      value: type === "group" ? 1 : 0,
      enabled: true,
      groups: type === "group" ? [] : undefined,
    };
    form.setValue("requirements", [...requirements, newRequirement]);
  };

  const removeRequirement = (id: string) => {
    form.setValue(
      "requirements",
      requirements.filter((req) => req.id !== id),
    );
  };

  const updateRequirement = (
    id: string,
    data: Partial<(typeof requirements)[0]>,
  ) => {
    form.setValue(
      "requirements",
      requirements.map((req) => (req.id === id ? { ...req, ...data } : req)),
    );
  };

  return (
    <div className="space-y-6">
      {/* Active Requirements */}
      {requirements.length === 0 && (
        <p className="text-center text-[0.8rem] text-muted-foreground py-4">
          {t.customers.customer.tier.sections.requirements.noRequirements}
        </p>
      )}
      <div className="space-y-4">
        {requirements.map((requirement) => (
          <Card key={requirement.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                {/* Requirement Type */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {
                        REQUIREMENT_TYPES.find((t) => t.id === requirement.type)
                          ?.name
                      }
                    </Badge>
                    <Switch
                      checked={requirement.enabled}
                      onCheckedChange={(enabled) =>
                        updateRequirement(requirement.id, { enabled })
                      }
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRequirement(requirement.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Requirement Value */}
                {requirement.type !== "group" && (
                  <div className="flex items-center gap-3">
                    <div className="relative w-full">
                      <Input
                        type="number"
                        min="0"
                        value={requirement.value}
                        onChange={(e) =>
                          updateRequirement(requirement.id, {
                            value:
                              e.target.value === ""
                                ? 0
                                : Number(e.target.value),
                          })
                        }
                        className="pr-12"
                        disabled={!requirement.enabled}
                      />
                      <div className="flex items-center absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        {getUnitLabel(requirement.type)}
                      </div>
                    </div>
                    {/* <InputCounter 
                      onChange={(type) => {
                        updateRequirement(requirement.id, {
                          value: type === "increase" ? requirement.value + 1 : requirement.value - 1,
                        })
                      }}
                    /> */}
                  </div>
                )}

                {/* Group Selection */}
                {requirement.type === "group" && requirement.enabled && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <GroupSelector
                        selectedGroups={requirement.groups || []}
                        onSelect={(groups) =>
                          updateRequirement(requirement.id, { groups })
                        }
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <span className="flex-1 text-left">
                            {requirement.groups?.length
                              ? t.customers.customer.tier.sections.requirements.fields.customerGroup[
                                  requirement.groups.length === 1
                                    ? "selectedGroup"
                                    : "selectedGroups"
                                ].replace("{count}", requirement.groups.length)
                              : t.customers.customer.tier.sections.requirements
                                  .fields.customerGroup.placeholder}
                          </span>
                        </Button>
                      </GroupSelector>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {
                        t.customers.customer.tier.sections.requirements.fields
                          .customerGroup.note
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Requirement */}
      <div className="space-y-4">
        {REQUIREMENT_TYPES.filter(
          (type) => !requirements.find((req) => req.type === type.id),
        )?.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">
              {t.customers.customer.tier.sections.requirements.addRequirement}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
        )}
        <RadioGroup
          onValueChange={(value) => addRequirement(value)}
          className="grid gap-2"
        >
          {REQUIREMENT_TYPES.filter(
            (type) => !requirements.find((req) => req.type === type.id),
          ).map((type) => (
            <div key={type.id} className="relative">
              <RadioGroupItem
                value={type.id}
                id={type.id}
                className="peer sr-only"
              />
              <label
                htmlFor={type.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{type.name}</span>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <FormField
        control={form.control}
        name="spendingAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {
                t.customers.customer.tier.sections.requirements.fields
                  .spendingAmount.label
              }
            </FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  placeholder={
                    t.customers.customer.tier.sections.requirements.fields
                      .spendingAmount.placeholder
                  }
                  className="pl-6"
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription>
              {
                t.customers.customer.tier.sections.requirements.fields
                  .spendingAmount.description
              }
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="orderCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {
                t.customers.customer.tier.sections.requirements.fields
                  .orderCount.title
              }
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder={
                  t.customers.customer.tier.sections.requirements.fields
                    .orderCount.placeholder
                }
                {...field}
              />
            </FormControl>
            <FormDescription>
              {
                t.customers.customer.tier.sections.requirements.fields
                  .orderCount.description
              }
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="timeframe"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {
                t.customers.customer.tier.sections.requirements.fields.timeframe
                  .label
              }
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      t.customers.customer.tier.sections.requirements.fields
                        .timeframe.label
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="lifetime">
                  {
                    t.customers.customer.tier.sections.requirements.fields
                      .timeframe.options.lifetime
                  }
                </SelectItem>
                <SelectItem value="yearly">
                  {
                    t.customers.customer.tier.sections.requirements.fields
                      .timeframe.options.yearly
                  }
                </SelectItem>
                <SelectItem value="monthly">
                  {
                    t.customers.customer.tier.sections.requirements.fields
                      .timeframe.options.monthly
                  }
                </SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              {
                t.customers.customer.tier.sections.requirements.fields.timeframe
                  .description
              }
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function getUnitLabel(type: string): string {
  const t = useTranslation();
  switch (type) {
    case "points":
      return t.customers.customer.tier.sections.requirements.fields.points
        .measure;
    case "spending":
      return "USD";
    case "orders":
      return t.customers.customer.tier.sections.requirements.fields.orderCount
        .measure;
    case "duration":
      return t.customers.customer.tier.sections.requirements.fields
        .membershipDuration.measure;
    default:
      return "";
  }
}
