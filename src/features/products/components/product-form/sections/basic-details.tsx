import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { ProductSchema } from "../../../schemas/product-schema";

type ProductFormData = z.infer<typeof ProductSchema>;

interface BasicDetailsProps {
  form: UseFormReturn<ProductFormData>;
  isEventProduct?: boolean;
  isRewardProduct?: boolean;
}

export function BasicDetails({
  form,
  isEventProduct,
  isRewardProduct,
}: BasicDetailsProps) {
  const getPlaceholder = () => {
    if (isEventProduct) return "Enter event name...";
    if (isRewardProduct) return "Enter reward item name...";
    return "Enter product name...";
  };

  const getDescriptionPlaceholder = () => {
    if (isEventProduct) return "Describe your event...";
    if (isRewardProduct) return "Describe your reward item...";
    return "Describe your product...";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex-1">
          <h2 className="text-lg font-medium">Basic Details</h2>
          <p className="text-sm text-muted-foreground">
            Add basic information about your item
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Input placeholder={getPlaceholder()} {...field} />
              )}
            />
            <p className="text-sm text-muted-foreground">
              Give your item a clear and descriptive name
            </p>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <Textarea
                  placeholder={getDescriptionPlaceholder()}
                  className="min-h-[120px]"
                  {...field}
                />
              )}
            />
            <p className="text-sm text-muted-foreground">
              Provide a detailed description to help customers understand your
              item
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
