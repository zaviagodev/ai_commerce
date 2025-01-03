import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CustomerTierSchema } from '../../schemas/customer-tier-schema';
import { CustomerTier } from '@/types/customer';
import { BasicDetails } from './sections/basic-details';
import { Requirements } from './sections/requirements';
import { Benefits } from './sections/benefits';
import { Crown } from 'lucide-react';

interface CustomerTierFormProps {
  initialData?: Partial<CustomerTier>;
  onSubmit: (data: CustomerTier) => Promise<void>;
}

export function CustomerTierForm({ initialData, onSubmit }: CustomerTierFormProps) {
  const form = useForm({
    resolver: zodResolver(CustomerTierSchema),
    defaultValues: {
      name: '',
      description: '',
      color: '#4B96FF',
      requirements: [],
      rewardsMultiplier: 1,
      discountPercentage: 0,
      freeShipping: false,
      prioritySupport: false,
      earlyAccess: false,
      status: 'active',
      ...initialData,
    },
  });

  const handleSubmit = async (data: CustomerTier) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Failed to save tier:', error);
    }
  };

  const tierName = form.watch('name');

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col h-full">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                {initialData ? 'Edit tier' : 'Create tier'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {initialData
                  ? 'Update tier details'
                  : 'Create a new customer loyalty tier'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline">
                Discard
              </Button>
              <Button type="submit">Save tier</Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="h-full">
              <div className="max-w-3xl mx-auto space-y-8 pl-0 pr-6 py-8 relative">
            {/* Basic Details Section */}
            <div className="rounded-lg border bg-white">
              <div className="flex items-center gap-4 p-6 border-b">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Crown className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Basic Details</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure the tier's basic information
                  </p>
                </div>
              </div>
              <div className="p-6">
                <BasicDetails form={form} />
              </div>
            </div>

            {/* Requirements Section */}
            <div className="rounded-lg border bg-white">
              <div className="flex items-center gap-4 p-6 border-b">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Crown className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Requirements</h2>
                  <p className="text-sm text-muted-foreground">
                    Set the criteria for customers to reach this tier
                  </p>
                </div>
              </div>
              <div className="p-6">
                <Requirements form={form} />
              </div>
            </div>

            {/* Benefits Section */}
            <div className="rounded-lg border bg-white">
              <div className="flex items-center gap-4 p-6 border-b">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Crown className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Benefits</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure the rewards and perks for this tier
                  </p>
                </div>
              </div>
              <div className="p-6">
                <Benefits form={form} />
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