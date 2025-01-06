import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusSelect } from './sections/status-select';
import { OrderSchema } from '../../schemas/order-schema';
import { Overview } from './sections/overview';
import { BasicDetails } from './sections/basic-details';
import { Products } from './sections/products';
import { Shipping } from './sections/shipping';
import { Summary } from './sections/summary';
import { Notes } from './sections/notes';
import { Order } from '@/types/order';

interface OrderFormProps {
  initialData?: Order;
  onSubmit: (data: Order) => Promise<void>;
  isEditing?: boolean;
  headerActions?: React.ReactNode;
  onFieldChange?: () => void;
}

export function OrderForm({ 
  initialData, 
  onSubmit, 
  isEditing, 
  headerActions,
  onFieldChange 
}: OrderFormProps) {
  const form = useForm({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      customerId: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      status: 'pending',
      items: [],
      subtotal: 0,
      discount: 0,
      shipping: 0,
      tax: 0,
      total: 0,
      notes: '',
      tags: [],
      ...initialData,
    },
  });

  // Watch for form changes
  useEffect(() => {
    if (isEditing) {
      const subscription = form.watch(() => {
        onFieldChange?.();
      });
      return () => subscription.unsubscribe();
    }
  }, [form, isEditing, onFieldChange]);

  const handleSubmit = async (data: Order) => {
  try {
    await onSubmit({
      ...data,
      items: data.items.map(item => ({
        ...item,
        variantId: item.variantId, // Ensure variantId is included
        total: item.price * item.quantity
      }))
    });
  } catch (error) {
    console.error('Failed to save order:', error);
  }
};


  const formatDate = (date: Date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getDaysAgo = (date: Date) => {
    const diffTime = Math.abs(new Date().getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    return `${diffDays} days ago`;
  };

  const getTitle = () => {
    if (!initialData) return 'Create order';
    
    const orderId = initialData.id.split('-')[0].toUpperCase();
    const customerName = initialData.customerName || 'Unknown Customer';
    return `${customerName} #${orderId}`;
  };

  console.log("form =>", form.formState.errors);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col h-full">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{getTitle()}</h1>
              <p className="text-sm text-muted-foreground">
                {initialData
                  ? `${formatDate(initialData.createdAt)} • ${getDaysAgo(initialData.createdAt)}`
                  : 'Create a new order for your store'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {headerActions || <Button type="submit">Save order</Button>}
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
                      <TabsTrigger 
                        value="notes" 
                        disabled={initialData ? !isEditing : false}
                        className={isEditing ? "ring-2 ring-blue-200" : ""}
                      >
                        Notes
                      </TabsTrigger>
                    </TabsList>
                    {/* Show status dropdown when creating new order or editing */}
                    {(!initialData || isEditing) && (
                      <StatusSelect form={form} />
                    )}
                  </div>
                  <TabsContent value="overview">
                    <div className="space-y-8">
                      <Overview 
                        order={initialData!} 
                        shippingAddress={form.watch('shippingAddress')} 
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="basic">
                    <div className="space-y-8">
                      <BasicDetails form={form} />
                      <Products form={form} />
                      <Shipping form={form} />
                      <Summary form={form} />
                    </div>
                  </TabsContent>
                  <TabsContent value="notes">
                    <Notes form={form} />
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