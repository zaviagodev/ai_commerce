import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "@/components/ui/form";
import { Campaign } from "@/types/campaign";
import { CampaignSchema } from "../../schemas/campaign-schema";
import { TemplateSelector } from "./sections/template-selector";
import { ProductRules } from "./sections/product-rules";
import { BasicDetails } from "./sections/basic-details";
import { Conditions } from "./sections/conditions";
import { EarningRules } from "./sections/earning-rules";
import { PointsConfig } from "./sections/points-config";
import { QrCodeConfig } from "./sections/qr-code-config";
import { ClickLinkConfig } from "./sections/click-link-config";
import { DisplaySettings } from "./sections/display-settings";
import { Limitations } from "./sections/limitations";
import { Gift } from "lucide-react";
import { useTranslation } from "@/lib/i18n/hooks";
import { StatusSelect } from "@/components/status-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CampaignFormProps {
  initialData?: Campaign;
  onSubmit: (data: Campaign) => Promise<void>;
}

export function CampaignForm({ initialData, onSubmit }: CampaignFormProps) {
  const t = useTranslation();
  const form = useForm({
    resolver: zodResolver(CampaignSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "points_multiplier",
      multiplier: 1,
      hasProductRules: false,
      productRules: [],
      conditions: [],
      bonusPoints: null,
      targetType: "all",
      status: "draft",
      hasConditions: false,
      qrEnabled: false,
      qrPointType: "fixed",
      qrPointValue: 1,
      qrScanLimit: 1,
      qrTotalScans: 100,
      clickLinkEnabled: false,
      clickLinkUrl: "",
      clickLinkLimit: 1,
      startDate: new Date(new Date().setMinutes(0, 0, 0)), // Start of current hour
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
      ...initialData,
    },
  });

  const handleSubmit = async (data: Campaign) => {
    try {
      await onSubmit(form.getValues());
    } catch (error) {
      console.error("Failed to save campaign:", error);
    }
  };

  const campaignStatuses = [
    {
      label:
        t.customers.customer.campaignForm.sections.basicDetails.fields.status
          .options.draft,
      badgeClassName: "!bg-gray-100 text-gray-700",
      value: "draft",
    },
    {
      label:
        t.customers.customer.campaignForm.sections.basicDetails.fields.status
          .options.active,
      badgeClassName: "!bg-green-100 text-green-700",
      value: "active",
    },
    {
      label:
        t.customers.customer.campaignForm.sections.basicDetails.fields.status
          .options.scheduled,
      badgeClassName: "!bg-yellow-100 text-yellow-700",
      value: "scheduled",
    },
  ];

  return (
    <div className="space-y-6">
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8"
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
                {initialData ? "Edit campaign" : "Create campaign"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {initialData
                  ? "Update campaign details"
                  : "Create a new points and rewards campaign"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline">
                {
                  t.customers.customer.campaignForm.sections.basicDetails
                    .actions.discard
                }
              </Button>
              <Button type="submit">
                {
                  t.customers.customer.campaignForm.sections.basicDetails
                    .actions.save
                }
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-6 mx-auto max-w-4xl pr-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Tabs defaultValue="basic-details" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="basic-details">
                    {
                      t.customers.customer.campaignForm.sections.basicDetails
                        .title
                    }
                  </TabsTrigger>
                </TabsList>
                <StatusSelect
                  form={form}
                  options={campaignStatuses}
                  placeholder={
                    t.customers.customer.campaignForm.sections.basicDetails
                      .fields.status.placeholder
                  }
                />
              </div>

              {/* Basic Details */}
              <TabsContent value="basic-details" className="space-y-8">
                <div className="rounded-lg border bg-main">
                  <div className="flex items-center gap-4 p-6 border-b">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                      <Gift className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        {
                          t.customers.customer.campaignForm.sections
                            .basicDetails.title
                        }
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {
                          t.customers.customer.campaignForm.sections
                            .basicDetails.description
                        }
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <BasicDetails form={form} />
                  </div>
                </div>

                {/* Show relevant sections based on template type */}
                {form.watch("type") === "points_multiplier" ? (
                  <>
                    <PointsConfig form={form} />
                    <ProductRules form={form} />
                    <Conditions form={form} />
                  </>
                ) : form.watch("qrEnabled") ? (
                  <>
                    <QrCodeConfig form={form} />
                    <ProductRules form={form} />
                    <Conditions form={form} />
                  </>
                ) : form.watch("clickLinkEnabled") ? (
                  <>
                    <ClickLinkConfig form={form} />
                    <ProductRules form={form} />
                    <Conditions form={form} />
                  </>
                ) : (
                  <>
                    <PointsConfig form={form} />
                    <ProductRules form={form} />
                    <Conditions form={form} />
                  </>
                )}

                {/* Display Settings Section */}
                {/* <DisplaySettings form={form} /> */}

                {/* Limitations Section */}
                {/* <Limitations form={form} /> */}
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.form>
      </Form>
    </div>
  );
}
