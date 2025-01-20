import { UseFormReturn } from 'react-hook-form';
import { Plus, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomerGroup } from '@/types/customer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

interface MembersProps {
  form: UseFormReturn<CustomerGroup>;
}

const DEMO_CUSTOMERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

export function Members({ form }: MembersProps) {
  const [search, setSearch] = useState('');
  const members = form.watch('members') || [];

  const filteredCustomers = DEMO_CUSTOMERS.filter(
    (customer) =>
      !members.includes(customer.id) &&
      (customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()))
  );

  const addMember = (customerId: string) => {
    form.setValue('members', [...members, customerId]);
  };

  const removeMember = (customerId: string) => {
    form.setValue(
      'members',
      members.filter((id) => id !== customerId)
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Add Members */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {search && (
          <ScrollArea className="h-full max-h-[240px] rounded-md border overflow-auto">
            <div className="p-4 space-y-2">
              {filteredCustomers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No customers found
                </p>
              ) : (
                filteredCustomers.map((customer) => (
                  <Button
                    key={customer.id}
                    variant="ghost"
                    className="w-full justify-start h-fit"
                    onClick={() => addMember(customer.id)}
                  >
                    <Plus className="mr-4 h-4 w-4" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {customer.email}
                      </div>
                    </div>
                  </Button>
                ))
              )}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Current Members */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Current Members</h3>
          <span className="text-sm text-muted-foreground">
            {members.length} members
          </span>
        </div>

        <ScrollArea className="h-full max-h-[300px] rounded-md border">
          <div className="p-4 space-y-2">
            {members.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No members added yet
              </p>
            ) : (
              members.map((memberId) => {
                const customer = DEMO_CUSTOMERS.find((c) => c.id === memberId);
                if (!customer) return null;

                return (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {customer.email}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMember(customer.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}