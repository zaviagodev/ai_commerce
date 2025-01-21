import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { CustomerGroup } from '@/types/customer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from '@/lib/i18n/hooks';

interface AutomationProps {
  form: UseFormReturn<CustomerGroup>;
}

const CONDITION_TYPES = [
  {
    id: 'total_spent',
    name: 'Total Spent',
    description: 'Based on customer lifetime spending',
    valueType: 'currency',
    operators: ['greater_than', 'less_than', 'equal_to'],
  },
  {
    id: 'order_count',
    name: 'Order Count',
    description: 'Based on number of orders placed',
    valueType: 'number',
    operators: ['greater_than', 'less_than', 'equal_to'],
  },
  {
    id: 'last_order',
    name: 'Last Order',
    description: 'Based on days since last order',
    valueType: 'days',
    operators: ['greater_than', 'less_than'],
  },
  {
    id: 'location',
    name: 'Location',
    description: 'Based on customer location',
    valueType: 'text',
    operators: ['equal_to'],
  },
] as const;

const OPERATOR_LABELS = {
  greater_than: 'Greater than',
  less_than: 'Less than',
  equal_to: 'Equal to',
};

export function Automation({ form }: AutomationProps) {
  const t = useTranslation();
  const autoAssign = form.watch('autoAssign');
  const conditions = form.watch('conditions') || [];

  const addCondition = (type: string) => {
    const conditionType = CONDITION_TYPES.find(t => t.id === type);
    if (!conditionType) return;

    const newCondition = {
      id: crypto.randomUUID(),
      type,
      value: '',
      operator: conditionType.operators[0],
      enabled: true,
    };
    form.setValue('conditions', [...conditions, newCondition]);
  };

  const removeCondition = (id: string) => {
    form.setValue(
      'conditions',
      conditions.filter((condition) => condition.id !== id)
    );
  };

  const updateCondition = (id: string, data: Partial<typeof conditions[0]>) => {
    form.setValue(
      'conditions',
      conditions.map((condition) =>
        condition.id === id ? { ...condition, ...data } : condition
      )
    );
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="autoAssign"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>{ t.customers.customer.group.sections.automation.fields.autoAssign.label}</FormLabel>
              <FormDescription>
                { t.customers.customer.group.sections.automation.fields.autoAssign.description}
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {autoAssign && (
        <>
          {/* Active Conditions */}
          <div className="space-y-4">
            {conditions.map((condition) => {
              const conditionType = CONDITION_TYPES.find(t => t.id === condition.type);
              if (!conditionType) return null;

              return (
                <Card key={condition.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {conditionType.name}
                          </Badge>
                          <Switch
                            checked={condition.enabled}
                            onCheckedChange={(enabled) =>
                              updateCondition(condition.id, { enabled })
                            }
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCondition(condition.id)}
                          title={ t.customers.customer.group.sections.automation.fields.conditions.remove}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {condition.enabled && (
                        <div className="grid gap-4">
                          {/* Operator Selection */}
                          {conditionType.operators.length > 1 && (
                            <Select
                              value={condition.operator}
                              onValueChange={(operator) =>
                                updateCondition(condition.id, { operator })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={ t.customers.customer.group.sections.automation.fields.conditions.operator.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {conditionType.operators.map((op) => (
                                  <SelectItem key={op} value={op}>
                                    { t.customers.customer.group.sections.automation.fields.conditions.operators[op]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}

                          {/* Value Input */}
                          <div className="relative">
                            <Input
                              type={conditionType.valueType === 'number' ? 'number' : 'text'}
                              value={condition.value}
                              onChange={(e) =>
                                updateCondition(condition.id, { value: e.target.value })
                              }
                              placeholder={ t.customers.customer.group.sections.automation.fields.conditions.value.placeholder}
                              className={conditionType.valueType === 'currency' ? 'pl-6' : ''}
                            />
                            {conditionType.valueType === 'currency' && (
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                $
                              </span>
                            )}
                            {conditionType.valueType === 'days' && (
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                { t.customers.customer.group.sections.automation.fields.conditions.days}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Add Condition */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-muted-foreground">
                { t.customers.customer.group.sections.automation.fields.conditions.add}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {conditions.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                { t.customers.customer.group.sections.automation.fields.conditions.empty}
              </p>
            )}

            <RadioGroup
              onValueChange={(value) => addCondition(value)}
              className="grid gap-2"
            >
              {CONDITION_TYPES.filter(
                (type) => !conditions.find((condition) => condition.type === type.id)
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
        </>
      )}
    </div>
  );
}