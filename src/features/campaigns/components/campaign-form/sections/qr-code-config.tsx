import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/types/campaign";
import { QrCode, Link2, Copy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/lib/i18n/hooks";

interface QrCodeConfigProps {
  form: UseFormReturn<Campaign>;
}

export function QrCodeConfig({ form }: QrCodeConfigProps) {
  const qrEnabled = form.watch("qrEnabled");
  const qrPointType = form.watch("qrPointType");
  const clickLinkEnabled = form.watch("clickLinkEnabled");
  const campaignId = form.watch("id");
  const baseUrl = window.location.origin;
  const t = useTranslation();

  // Auto-generate campaign link
  const campaignLink = campaignId
    ? `${baseUrl}/points/redeem/${campaignId}`
    : "Link will be generated when campaign is saved";

  const handleCopyLink = async () => {
    if (!campaignId) return;
    try {
      await navigator.clipboard.writeText(campaignLink);
      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
          <QrCode className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {t.customers.customer.campaignForm.sections.qrCodeConfig.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {
              t.customers.customer.campaignForm.sections.qrCodeConfig
                .description
            }
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* <FormField
          control={form.control}
          name="qrEnabled"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>
                  {
                    t.customers.customer.campaignForm.sections.qrCodeConfig
                      .fields.enabled.label
                  }
                </FormLabel>
                <FormDescription>
                  {
                    t.customers.customer.campaignForm.sections.qrCodeConfig
                      .fields.enabled.description
                  }
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        /> */}

        {qrEnabled && (
          <>
            <FormField
              control={form.control}
              name="qrPointType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      t.customers.customer.campaignForm.sections.qrCodeConfig
                        .fields.points.label
                    }
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            t.customers.customer.campaignForm.sections
                              .qrCodeConfig.fields.points.placeholder
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fixed">
                        {
                          t.customers.customer.campaignForm.sections
                            .qrCodeConfig.fields.points.label
                        }
                      </SelectItem>
                      <SelectItem value="multiplier">
                        {
                          t.customers.customer.campaignForm.sections
                            .pointsConfig.fields.multiplier.label
                        }
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {
                      t.customers.customer.campaignForm.sections.qrCodeConfig
                        .fields.points.description
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qrPointValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {qrPointType === "fixed"
                      ? t.customers.customer.campaignForm.sections.qrCodeConfig
                          .fields.points.label
                      : t.customers.customer.campaignForm.sections.pointsConfig
                          .fields.multiplier.label}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        min="1"
                        step="0.1"
                        className="pr-8"
                        placeholder={
                          qrPointType === "fixed"
                            ? t.customers.customer.campaignForm.sections
                                .qrCodeConfig.fields.points.placeholder
                            : t.customers.customer.campaignForm.sections
                                .pointsConfig.fields.multiplier.placeholder
                        }
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {qrPointType === "fixed" ? "pts" : "x"}
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    {qrPointType === "fixed"
                      ? t.customers.customer.campaignForm.sections.qrCodeConfig
                          .fields.points.description
                      : t.customers.customer.campaignForm.sections.pointsConfig
                          .fields.multiplier.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="qrScanLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        t.customers.customer.campaignForm.sections.qrCodeConfig
                          .fields.scanLimit.label
                      }
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder={
                          t.customers.customer.campaignForm.sections
                            .qrCodeConfig.fields.scanLimit.placeholder
                        }
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      {
                        t.customers.customer.campaignForm.sections.qrCodeConfig
                          .fields.scanLimit.description
                      }
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="qrTotalScans"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        t.customers.customer.campaignForm.sections.qrCodeConfig
                          .fields.scanLimit.label
                      }
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder={
                          t.customers.customer.campaignForm.sections
                            .qrCodeConfig.fields.scanLimit.placeholder
                        }
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      {
                        t.customers.customer.campaignForm.sections.qrCodeConfig
                          .fields.scanLimit.description
                      }
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* QR Code Preview */}
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">
                {t.customers.customer.campaignForm.sections.qrCodeConfig.title}
              </h3>
              <div className="aspect-square w-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
                <QrCode className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">
                {
                  t.customers.customer.campaignForm.sections.qrCodeConfig.fields
                    .enabled.description
                }
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
