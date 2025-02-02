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
import { CustomerGroup } from "@/types/customer";
import { useTranslation } from "@/lib/i18n/hooks";
import { Badge } from "@/components/ui/badge";

interface BasicDetailsProps {
  form: UseFormReturn<CustomerGroup>;
}

export function BasicDetails({ form }: BasicDetailsProps) {
  const t = useTranslation();
  return (
    <div className="grid gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {
                t.customers.customer.group.sections.basicDetails.fields.name
                  .label
              }
            </FormLabel>
            <FormControl>
              <Input
                placeholder={
                  t.customers.customer.group.sections.basicDetails.fields.name
                    .placeholder
                }
                {...field}
              />
            </FormControl>
            <FormDescription>
              {
                t.customers.customer.group.sections.basicDetails.fields.name
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
                t.customers.customer.group.sections.basicDetails.fields
                  .description.label
              }
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={
                  t.customers.customer.group.sections.basicDetails.fields
                    .description.placeholder
                }
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              {
                t.customers.customer.group.sections.basicDetails.fields
                  .description.description
              }
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
