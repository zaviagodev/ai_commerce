import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RedeemSchema } from '../../schemas/redeem-schema';
import { Overview } from './sections/overview';
import { Redeem } from '@/types/redeem';
import { BasicDetails } from './sections/basic-details';
import { ItemsTable } from './sections/items-table';
import { RedeemDetails } from './sections/redeem-details';
import { StatusSelect } from './sections/status-select';

interface RedeemFormProps {
  initialData: Redeem;
  isEditing?: boolean;
  headerActions?: React.ReactNode;
  onFieldChange?: () => void;
}

export function RedeemForm({ 
  initialData, 
  isEditing,
  headerActions,
  onFieldChange 
}: RedeemFormProps) {
  const form = useForm({
    resolver: zodResolver(RedeemSchema),
    defaultValues: initialData,
  });

  const redeemCode = form.watch('code');
  const customerName = form.watch('customerName');

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <Form {...form}>
        <form className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center pl-0 pr-6 py-3 border-b sticky top-0 z-10 bg-[rgb(245,245,245)]">
            <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center">
              {/* Left Section: Title and Status */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    {redeemCode} - {customerName}
                  </h1>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(initialData.redeemedAt).toLocaleString()}
                </p>
              </div>

              {/* Right Section: Actions */}
              <div className="flex items-center gap-2">
                {headerActions}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="h-full">
              <div className="max-w-3xl mx-auto space-y-8 pl-0 pr-6 py-8 relative">
                <Tabs 
                  defaultValue="overview" 
                  className="w-full"
                  value={!initialData ? "basic" : isEditing ? "basic" : "overview"}
                >
                  <div className="flex items-center justify-between mb-6">
                    <TabsList>
                      <TabsTrigger value="overview" disabled={!initialData || isEditing}>
                        Overview
                      </TabsTrigger>
                      <TabsTrigger 
                        value="basic" 
                        disabled={initialData ? !isEditing : false}
                        className={isEditing ? "ring-2 ring-blue-200" : ""}
                      >
                        Basic Details
                      </TabsTrigger>
                    </TabsList>
                    {(!initialData || isEditing) && (
                      <StatusSelect form={form} />
                    )}
                  </div>
                  <TabsContent value="overview">
                    <Overview redeem={initialData} />
                  </TabsContent>

                  <TabsContent value="basic">
                    <div className="space-y-8">
                      <BasicDetails form={form} />
                      <ItemsTable form={form} />
                      <RedeemDetails form={form} />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}