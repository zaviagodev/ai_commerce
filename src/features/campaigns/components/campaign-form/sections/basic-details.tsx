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
import { Campaign } from "@/types/campaign";
import { TemplateModal } from "./template-modal";
import { TemplateIndicator } from "./template-indicator";
import { useTranslation } from "@/lib/i18n/hooks";
import { Badge } from "@/components/ui/badge";

interface BasicDetailsProps {
  form: UseFormReturn<Campaign>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
  const t = useTranslation();

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium">
            {
              t.customers.customer.campaignForm.sections.basicDetails.template
                .title
            }
          </h3>
          <p className="text-sm text-muted-foreground">
            {form.watch("type") === "points_multiplier"
              ? t.customers.customer.campaignForm.sections.basicDetails.template
                  .types.points_multiplier
              : t.customers.customer.campaignForm.sections.basicDetails.template
                  .types.bonus_points}
          </p>
        </div>
        <TemplateModal form={form} />
      </div>

      <TemplateIndicator
        type={form.watch("type")}
        qrEnabled={form.watch("qrEnabled")}
        clickLinkEnabled={form.watch("clickLinkEnabled")}
        targetType={form.watch("targetType")}
      />

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {
                t.customers.customer.campaignForm.sections.basicDetails.fields
                  .name.label
              }{" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder={
                  t.customers.customer.campaignForm.sections.basicDetails.fields
                    .name.placeholder
                }
                {...field}
              />
            </FormControl>
            <FormDescription>
              {
                t.customers.customer.campaignForm.sections.basicDetails.fields
                  .name.description
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
                t.customers.customer.campaignForm.sections.basicDetails.fields
                  .description.label
              }
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={
                  t.customers.customer.campaignForm.sections.basicDetails.fields
                    .description.placeholder
                }
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              {
                t.customers.customer.campaignForm.sections.basicDetails.fields
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
                  t.customers.customer.campaignForm.sections.basicDetails.fields
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
                  t.customers.customer.campaignForm.sections.basicDetails.fields
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
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {
                  t.customers.customer.campaignForm.sections.basicDetails.fields
                    .type.label
                }
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        t.customers.customer.campaignForm.sections.basicDetails
                          .fields.type.placeholder
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="points_multiplier">
                    {
                      t.customers.customer.campaignForm.sections.basicDetails
                        .fields.type.options.points_multiplier
                    }
                  </SelectItem>
                  <SelectItem value="bonus_points">
                    {
                      t.customers.customer.campaignForm.sections.basicDetails
                        .fields.type.options.bonus_points
                    }
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
