import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusSelect } from "./sections/status-select";
import { OrderSchema } from "../../schemas/order-schema";
import { Overview } from "./sections/overview";
import { BasicDetails } from "./sections/basic-details";
import { Products } from "./sections/products";
import { CouponSection } from "./sections/coupon-section";
import { Shipping } from "./sections/shipping";
import { Summary } from "./sections/summary";
import { Notes } from "./sections/notes";
import { Order } from "@/types/order";
import { useTranslation } from "@/lib/i18n/hooks";

interface ExtraTab {
  label: string;
  value: string;
  component: React.ReactNode;
}

interface OrderFormProps {
  initialData?: Order;
  onSubmit: (data: Order) => Promise<void>;
  isEditing?: boolean;
  headerActions?: React.ReactNode;
  onFieldChange?: () => void;
  extraTabs?: ExtraTab[];
}

export function OrderForm({
  initialData,
  onSubmit,
  isEditing,
  headerActions,
  onFieldChange,
  extraTabs = [],
}: OrderFormProps) {
  const t = useTranslation();
  const form = useForm({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      customerId: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      status: "pending",
      items: [],
      subtotal: 0,
      discount: 0,
      shipping: 0,
      tax: 0,
      total: 0,
      notes: "",
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
    data = form.getValues();
    try {
      await onSubmit({
        ...data,
        items: data.items.map((item) => ({
          ...item,
          variantId: item.variantId, // Ensure variantId is included
          total: item.price * item.quantity,
        })),
      });
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const title = initialData
    ? t.orders.orders.form.title.edit.replace("{id}", initialData.id)
    : t.orders.orders.form.title.create;

  const description = initialData
    ? t.orders.orders.form.description.edit
        .replace("{date}", formatDate(initialData.createdAt))
        .replace("{daysAgo}", formatDaysAgo(initialData.createdAt))
    : t.orders.orders.form.description.create;

  function formatDate(date: Date) {
    const day = date.getDate();
    const month = t.orders.orders.form.months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  function formatDaysAgo(date: Date) {
    const days = Math.floor(
      (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days === 0) return t.orders.orders.form.daysAgo.today;
    if (days === 1) return t.orders.orders.form.daysAgo.yesterday;
    return t.orders.orders.form.daysAgo.other.replace(
      "{days}",
      days.toString()
    );
  }

  return (
    <div className="flex h-dvh flex-col">
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex items-center px-6 -mx-6 py-3 border-b sticky top-0 z-10 pt-14"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center !bg-transparent">
              <div>
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-sm text-muted-foreground">
                  {initialData
                    ? `${formatDate(initialData.createdAt)} • ${formatDaysAgo(
                        initialData.createdAt
                      )}`
                    : "Create a new order for your store"}
                </p>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                {headerActions || <Button type="submit">Save order</Button>}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 overflow-y-auto move-top"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="h-full">
              <div className="max-w-4xl mx-auto space-y-8 pl-0 md:pr-6 py-8 relative">
                <Tabs
                  defaultValue={
                    !initialData ? "basic" : isEditing ? "basic" : "overview"
                  }
                  className="w-full"
                  // value={!initialData ? "basic" : isEditing ? "basic" : "overview"}
                >
                  <div className="flex items-center justify-between mb-6">
                    <TabsList>
                      <TabsTrigger
                        value="overview"
                        disabled={!initialData || isEditing}
                      >
                        {t.orders.orders.form.tabs.overview}
                      </TabsTrigger>
                      <TabsTrigger
                        value="basic"
                        disabled={initialData ? !isEditing : false}
                        className={isEditing ? "ring-2 ring-blue-200" : ""}
                      >
                        {t.orders.orders.form.tabs.basicDetails}
                      </TabsTrigger>
                      {/* <TabsTrigger 
                        value="notes" 
                        disabled={initialData ? !isEditing : false}
                        className={isEditing ? "ring-2 ring-blue-200" : ""}
                      >
                        Notes
                      </TabsTrigger> */}
                      {extraTabs?.map((tab, index) => (
                        <TabsTrigger value={tab.value} key={index}>
                          {tab.label}
                        </TabsTrigger>
                      ))}
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
                        shippingAddress={form.watch("shippingAddress")}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="basic">
                    <div className="space-y-8">
                      <BasicDetails form={form} />
                      <Products form={form} />
                      <CouponSection form={form} storeName={"storeName"} />
                      <Shipping form={form} />
                      <Summary form={form} />
                    </div>
                  </TabsContent>
                  {/* <TabsContent value="notes">
                    <Notes form={form} />
                  </TabsContent> */}
                  {extraTabs?.map((tab, index) => (
                    <TabsContent value={tab.value} key={index}>
                      {tab.component}
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </motion.div>
        </motion.form>
      </Form>
    </div>
  );
}
