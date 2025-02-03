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
import { Link2, Copy } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "@/lib/i18n/hooks";

interface ClickLinkConfigProps {
  form: UseFormReturn<Campaign>;
}

export function ClickLinkConfig({ form }: ClickLinkConfigProps) {
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
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          <Link2 className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {t.customers.customer.campaignForm.sections.clickLinkConfig.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {
              t.customers.customer.campaignForm.sections.clickLinkConfig
                .description
            }
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="clickLinkEnabled"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>
                  {
                    t.customers.customer.campaignForm.sections.clickLinkConfig
                      .fields.enabled.label
                  }
                </FormLabel>
                <FormDescription>
                  {
                    t.customers.customer.campaignForm.sections.clickLinkConfig
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
        />

        {clickLinkEnabled && (
          <>
            <FormField
              control={form.control}
              name="clickPoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      t.customers.customer.campaignForm.sections.clickLinkConfig
                        .fields.points.label
                    }
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        min="1"
                        placeholder={
                          t.customers.customer.campaignForm.sections
                            .clickLinkConfig.fields.points.placeholder
                        }
                        className="pr-8"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        pts
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    {
                      t.customers.customer.campaignForm.sections.clickLinkConfig
                        .fields.points.description
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="clickLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        t.customers.customer.campaignForm.sections
                          .clickLinkConfig.fields.clickLimit.label
                      }
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder={
                          t.customers.customer.campaignForm.sections
                            .clickLinkConfig.fields.clickLimit.placeholder
                        }
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      {
                        t.customers.customer.campaignForm.sections
                          .clickLinkConfig.fields.clickLimit.description
                      }
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalClicks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        t.customers.customer.campaignForm.sections
                          .clickLinkConfig.fields.clickLimit.label
                      }
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder={
                          t.customers.customer.campaignForm.sections
                            .clickLinkConfig.fields.clickLimit.placeholder
                        }
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      {
                        t.customers.customer.campaignForm.sections
                          .clickLinkConfig.fields.clickLimit.description
                      }
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Campaign Link */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium mb-1">
                    {
                      t.customers.customer.campaignForm.sections.clickLinkConfig
                        .title
                    }
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {campaignLink}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={handleCopyLink}
                  disabled={!campaignId}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
