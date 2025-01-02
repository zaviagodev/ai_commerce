import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CustomerTier } from '@/types/customer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GroupSelector } from './group-selector';

interface RequirementsProps {
  form: UseFormReturn<CustomerTier>;
}

const REQUIREMENT_TYPES = [
  {
    id: 'points',
    name: 'Points',
    description: 'Based on loyalty points earned',
  },
  {
    id: 'spending',
    name: 'Total Spending',
    description: 'Based on total amount spent',
  },
  {
    id: 'orders',
    name: 'Order Count',
    description: 'Based on number of orders placed',
  },
  {
    id: 'group',
    name: 'Customer Group',
    description: 'Based on membership in specific groups',
  },
  {
    id: 'duration',
    name: 'Membership Duration',
    description: 'Based on length of membership',
  },
] as const;

const DEMO_GROUPS = [
  { id: '1', name: 'VIP Customers' },
  { id: '2', name: 'New Customers' },
  { id: '3', name: 'Wholesale' },
];

export function Requirements({ form }: RequirementsProps) {
  const requirements = form.watch('requirements') || [];

  const addRequirement = (type: string) => {
    const newRequirement = {
      id: crypto.randomUUID(),
      type,
      value: type === 'group' ? 1 : 0,
      enabled: true,
      groups: type === 'group' ? [] : undefined,
    };
    form.setValue('requirements', [...requirements, newRequirement]);
  };

  const removeRequirement = (id: string) => {
    form.setValue(
      'requirements',
      requirements.filter((req) => req.id !== id)
    );
  };

  const updateRequirement = (id: string, data: Partial<typeof requirements[0]>) => {
    form.setValue(
      'requirements',
      requirements.map((req) => (req.id === id ? { ...req, ...data } : req))
    );
  };

  return (
    <div className="space-y-6">
      {/* Active Requirements */}
      <div className="space-y-4">
        {requirements.map((requirement) => (
          <Card key={requirement.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                {/* Requirement Type */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {REQUIREMENT_TYPES.find((t) => t.id === requirement.type)?.name}
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
                {requirement.type !== 'group' && (
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    value={requirement.value}
                    onChange={(e) =>
                      updateRequirement(requirement.id, {
                        value: e.target.value === '' ? 0 : Number(e.target.value),
                      })
                    }
                    className="pr-12"
                    disabled={!requirement.enabled}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {getUnitLabel(requirement.type)}
                  </div>
                </div>
                )}
                
                {/* Group Selection */}
                {requirement.type === 'group' && requirement.enabled && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <GroupSelector
                        selectedGroups={requirement.groups || []}
                        onSelect={(groups) => updateRequirement(requirement.id, { groups })}
                      >
                        <Button variant="outline" className="w-full justify-start">
                          <span className="flex-1 text-left">
                            {requirement.groups?.length
                              ? `${requirement.groups.length} groups selected`
                              : 'Select groups'}
                          </span>
                        </Button>
                      </GroupSelector>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Customer must be a member of all selected groups
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
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">Add requirement</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <RadioGroup
          onValueChange={(value) => addRequirement(value)}
          className="grid gap-2"
        >
          {REQUIREMENT_TYPES.filter(
            (type) => !requirements.find((req) => req.type === type.id)
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
    </div>
  );
}

function getUnitLabel(type: string): string {
  switch (type) {
    case 'points':
      return 'points';
    case 'spending':
      return 'USD';
    case 'orders':
      return 'orders';
    case 'duration':
      return 'days';
    default:
      return '';
  }
}