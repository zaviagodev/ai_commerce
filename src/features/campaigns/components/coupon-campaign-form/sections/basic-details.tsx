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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tags } from "lucide-react";
import { Coupon } from "@/types/coupon";
import { useTranslation } from "@/lib/i18n/hooks";
import { Badge } from "@/components/ui/badge";

interface BasicDetailsProps {
  form: UseFormReturn<Coupon>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
  const t = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          <Tags className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">
            {t.campaigns.campaign.coupon.sections.basicDetails.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.campaigns.campaign.coupon.sections.basicDetails.description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {
                  t.campaigns.campaign.coupon.sections.basicDetails.fields.code
                    .label
                }{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    t.campaigns.campaign.coupon.sections.basicDetails.fields
                      .code.placeholder
                  }
                  {...field}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormDescription>
                {
                  t.campaigns.campaign.coupon.sections.basicDetails.fields.code
                    .description
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {
                  t.campaigns.campaign.coupon.sections.basicDetails.fields
                    .description.label
                }
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    t.campaigns.campaign.coupon.sections.basicDetails.fields
                      .description.placeholder
                  }
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {
                  t.campaigns.campaign.coupon.sections.basicDetails.fields
                    .description.description
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    t.campaigns.campaign.coupon.sections.basicDetails.fields
                      .startDate.label
                  }
                </FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  {
                    t.campaigns.campaign.coupon.sections.basicDetails.fields
                      .startDate.description
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    t.campaigns.campaign.coupon.sections.basicDetails.fields
                      .endDate.label
                  }
                </FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  {
                    t.campaigns.campaign.coupon.sections.basicDetails.fields
                      .endDate.description
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {
                  t.campaigns.campaign.coupon.sections.basicDetails.fields
                    .status.label
                }
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="!bg-gray-100 text-gray-700"
                      >
                        {
                          t.campaigns.campaign.coupon.sections.basicDetails
                            .fields.status.options.draft
                        }
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="scheduled">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="!bg-yellow-100 text-yellow-700"
                      >
                        {
                          t.campaigns.campaign.coupon.sections.basicDetails
                            .fields.status.options.scheduled
                        }
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="!bg-green-100 text-green-700"
                      >
                        {
                          t.campaigns.campaign.coupon.sections.basicDetails
                            .fields.status.options.active
                        }
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="expired">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="!bg-red-100 text-red-700"
                      >
                        {
                          t.campaigns.campaign.coupon.sections.basicDetails
                            .fields.status.options.ended
                        }
                      </Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {
                  t.campaigns.campaign.coupon.sections.basicDetails.fields
                    .status.description
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
