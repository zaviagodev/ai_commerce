import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CustomerGroupSchema } from '../../schemas/customer-group-schema';
import { CustomerGroup } from '@/types/customer';
import { BasicDetails } from './sections/basic-details';
import { Members } from './sections/members';
import { Automation } from './sections/automation';
import { Users } from 'lucide-react';

interface CustomerGroupFormProps {
  initialData?: Partial<CustomerGroup>;
  onSubmit: (data: CustomerGroup) => Promise<void>;
}

export function CustomerGroupForm({ initialData, onSubmit }: CustomerGroupFormProps) {
  const form = useForm({
    resolver: zodResolver(CustomerGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      color: '#4B96FF',
      autoAssign: false,
      conditions: [],
      members: [],
      status: 'active',
      ...initialData,
    },
  });

  const handleSubmit = async (data: CustomerGroup) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Failed to save group:', error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col h-full">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                {initialData ? 'Edit group' : 'Create group'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {initialData
                  ? 'Update group details'
                  : 'Create a new customer group'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline">
                Discard
              </Button>
              <Button type="submit">Save group</Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="h-full">
              <div className="max-w-3xl mx-auto space-y-8 pl-0 pr-6 py-8 relative">
            {/* Basic Details Section */}
            <div className="rounded-lg border bg-white">
              <div className="flex items-center gap-4 p-6 border-b">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Basic Details</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure the group's basic information
                  </p>
                </div>
              </div>
              <div className="p-6">
                <BasicDetails form={form} />
              </div>
            </div>

            {/* Members Section */}
            <div className="rounded-lg border bg-white">
              <div className="flex items-center gap-4 p-6 border-b">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Members</h2>
                  <p className="text-sm text-muted-foreground">
                    Add or remove customers from this group
                  </p>
                </div>
              </div>
              <div className="p-6">
                <Members form={form} />
              </div>
            </div>

            {/* Automation Section */}
            <div className="rounded-lg border bg-white">
              <div className="flex items-center gap-4 p-6 border-b">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Automation</h2>
                  <p className="text-sm text-muted-foreground">
                    Set up automatic group assignment rules
                  </p>
                </div>
              </div>
              <div className="p-6">
                <Automation form={form} />
              </div>
            </div>
          </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}