import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "@/components/ui/form";
import { CustomerTierSchema } from "../../schemas/customer-tier-schema";
import { CustomerTier } from "@/types/customer";
import { BasicDetails } from "./sections/basic-details";
import { Requirements } from "./sections/requirements";
import { Benefits } from "./sections/benefits";
import { Crown } from "lucide-react";
import { useTranslation } from "@/lib/i18n/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusSelect } from "@/components/status-select";

interface CustomerTierFormProps {
  initialData?: Partial<CustomerTier>;
  onSubmit: (data: CustomerTier) => Promise<void>;
}

export function CustomerTierForm({
  initialData,
  onSubmit,
}: CustomerTierFormProps) {
  const t = useTranslation();
  const form = useForm({
    resolver: zodResolver(CustomerTierSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#4B96FF",
      requirements: [],
      rewardsMultiplier: 1,
      discountPercentage: 0,
      freeShipping: false,
      prioritySupport: false,
      earlyAccess: false,
      status: "active",
      ...initialData,
    },
  });

  const handleSubmit = async (data: CustomerTier) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Failed to save tier:", error);
    }
  };

  const tierName = form.watch("name");

  const customerTierStatuses = [
    {
      label:
        t.customers.customer.tier.sections.basicDetails.fields.status.active,
      badgeClassName: "!bg-green-100 text-green-700",
      value: "active",
    },
    {
      label:
        t.customers.customer.tier.sections.basicDetails.fields.status.inactive,
      badgeClassName: "!bg-red-100 text-red-700",
      value: "inactive",
    },
  ];

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
            className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div>
              <h1 className="text-2xl font-semibold">
                {initialData
                  ? t.customers.customer.tier.title.edit
                  : t.customers.customer.tier.title.create}
              </h1>
              <p className="text-sm text-muted-foreground">
                {initialData
                  ? t.customers.customer.tier.description.edit
                  : t.customers.customer.tier.description.create}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline">
                {t.customers.customer.tier.actions.discard}
              </Button>
              <Button type="submit">
                {t.customers.customer.tier.actions.save}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 overflow-y-auto move-top-edit"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="h-full">
              <div className="max-w-4xl mx-auto space-y-8 pl-0 md:pr-6 py-8 relative">
                <Tabs defaultValue="basic-details" className="w-full">
                  <div className="flex items-center justify-between mb-6">
                    <TabsList>
                      <TabsTrigger value="basic-details">
                        {t.customers.customer.tier.sections.basicDetails.title}
                      </TabsTrigger>
                    </TabsList>
                    <StatusSelect
                      form={form}
                      options={customerTierStatuses}
                      placeholder={
                        t.customers.customer.tier.sections.basicDetails.fields
                          .status.label
                      }
                    />
                  </div>
                  <TabsContent value="basic-details" className="space-y-8">
                    {/* Basic Details Section */}
                    <div className="rounded-lg border bg-main">
                      <div className="flex items-center gap-4 p-6 border-b">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                          <Crown className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h2 className="text-lg font-medium">
                            {
                              t.customers.customer.tier.sections.basicDetails
                                .title
                            }
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {
                              t.customers.customer.tier.sections.basicDetails
                                .description
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-6">
                        <BasicDetails form={form} />
                      </div>
                    </div>

                    {/* Requirements Section */}
                    <div className="rounded-lg border bg-main">
                      <div className="flex items-center gap-4 p-6 border-b">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                          <Crown className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h2 className="text-lg font-medium">
                            {
                              t.customers.customer.tier.sections.requirements
                                .title
                            }
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {
                              t.customers.customer.tier.sections.requirements
                                .description
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-6">
                        <Requirements form={form} />
                      </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="rounded-lg border bg-main">
                      <div className="flex items-center gap-4 p-6 border-b">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                          <Crown className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h2 className="text-lg font-medium">
                            {t.customers.customer.tier.sections.benefits.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {
                              t.customers.customer.tier.sections.benefits
                                .description
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-6">
                        <Benefits form={form} />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </motion.div>
        </motion.form>
      </Form>
    </div>
  );
}
