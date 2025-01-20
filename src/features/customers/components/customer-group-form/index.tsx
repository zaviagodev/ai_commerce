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
import { useTranslation } from '@/lib/i18n/hooks';

interface CustomerGroupFormProps {
  initialData?: Partial<CustomerGroup>;
  onSubmit: (data: CustomerGroup) => Promise<void>;
}

export function CustomerGroupForm({ initialData, onSubmit }: CustomerGroupFormProps) {
  const t = useTranslation();
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
    <div className="flex h-screen flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col h-full">
          <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
            <div>
              <h1 className="text-2xl font-semibold">
                {initialData ?  t.customers.customer.group.title.edit :  t.customers.customer.group.title.create}
              </h1>
              <p className="text-sm text-muted-foreground">
                {initialData
                  ?  t.customers.customer.group.description.edit
                  :  t.customers.customer.group.description.create}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline">
                { t.customers.customer.group.actions.discard}
              </Button>
              <Button type="submit">{ t.customers.customer.group.actions.save}</Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto move-top-edit">
            <div className="h-full">
              <div className="max-w-4xl mx-auto space-y-8 pl-0 pr-6 py-8 relative">
                {/* Basic Details Section */}
                <div className="rounded-lg border bg-white">
                  <div className="flex items-center gap-4 p-6 border-b">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-medium">{ t.customers.customer.group.sections.basicDetails.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        { t.customers.customer.group.sections.basicDetails.description}
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
                      <h2 className="text-lg font-medium">{ t.customers.customer.group.sections.members.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        { t.customers.customer.group.sections.members.description}
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
                      <h2 className="text-lg font-medium">{ t.customers.customer.group.sections.automation.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        { t.customers.customer.group.sections.automation.description}
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