import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "@/components/ui/form";
import { CustomerGroupSchema } from "../../schemas/customer-group-schema";
import { CustomerGroup } from "@/types/customer";
import { BasicDetails } from "./sections/basic-details";
import { Members } from "./sections/members";
import { Automation } from "./sections/automation";
import { Users } from "lucide-react";
import { useTranslation } from "@/lib/i18n/hooks";
import { StatusSelect } from "@/components/status-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CustomerGroupFormProps {
  initialData?: Partial<CustomerGroup>;
  onSubmit: (data: CustomerGroup) => Promise<void>;
}

export function CustomerGroupForm({
  initialData,
  onSubmit,
}: CustomerGroupFormProps) {
  const t = useTranslation();
  const form = useForm({
    resolver: zodResolver(CustomerGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#4B96FF",
      autoAssign: false,
      conditions: [],
      members: [],
      status: "active",
      ...initialData,
    },
  });

  const handleSubmit = async (data: CustomerGroup) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Failed to save group:", error);
    }
  };

  const customerGroupStatuses = [
    {
      label:
        t.customers.customer.group.sections.basicDetails.fields.status.active,
      badgeClassName: "!bg-green-100 text-green-700",
      value: "active",
    },
    {
      label:
        t.customers.customer.group.sections.basicDetails.fields.status.inactive,
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
                  ? t.customers.customer.group.title.edit
                  : t.customers.customer.group.title.create}
              </h1>
              <p className="text-sm text-muted-foreground">
                {initialData
                  ? t.customers.customer.group.description.edit
                  : t.customers.customer.group.description.create}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline">
                {t.customers.customer.group.actions.discard}
              </Button>
              <Button type="submit">
                {t.customers.customer.group.actions.save}
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
                        {t.customers.customer.group.sections.basicDetails.title}
                      </TabsTrigger>
                    </TabsList>
                    <StatusSelect
                      form={form}
                      options={customerGroupStatuses}
                      placeholder={
                        t.customers.customer.group.sections.basicDetails.fields
                          .status.label
                      }
                    />
                  </div>
                  <TabsContent value="basic-details" className="space-y-8">
                    {/* Basic Details Section */}
                    <div className="rounded-lg border bg-main">
                      <div className="flex items-center gap-4 p-6 border-b">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">
                            {
                              t.customers.customer.group.sections.basicDetails
                                .title
                            }
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {
                              t.customers.customer.group.sections.basicDetails
                                .description
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-6">
                        <BasicDetails form={form} />
                      </div>
                    </div>

                    {/* Members Section */}
                    <div className="rounded-lg border bg-main">
                      <div className="flex items-center gap-4 p-6 border-b">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">
                            {t.customers.customer.group.sections.members.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {
                              t.customers.customer.group.sections.members
                                .description
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-6">
                        <Members form={form} />
                      </div>
                    </div>

                    {/* Automation Section */}
                    {/* <div className="rounded-lg border bg-main">
                        <div className="flex items-center gap-4 p-6 border-b">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                            <Users className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold">Automation</h2>
                            <p className="text-sm text-muted-foreground">
                              Set up automatic group assignment rules
                            </p>
                          </div>
                        </div>
                        <div className="p-6">
                          <Automation form={form} />
                        </div>
                      </div> */}
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
