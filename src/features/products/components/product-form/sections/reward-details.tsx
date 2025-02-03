import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { ProductSchema } from "../../../schemas/product-schema";

type ProductFormData = z.infer<typeof ProductSchema>;

interface RewardDetailsProps {
  form: UseFormReturn<ProductFormData>;
}

export function RewardDetails({ form }: RewardDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reward Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Gift Card</Label>
              <div className="text-sm text-muted-foreground">
                This product generates a coupon code after purchase
              </div>
            </div>
            <FormField
              control={form.control}
              name="isGiftCard"
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div> */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Reward Item</Label>
            <div className="text-sm text-muted-foreground">
              This product is purchasable by points
            </div>
          </div>
          <FormField
            control={form.control}
            name="isReward"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
        {form.watch("isReward") &&
          !(form.watch("variantOptions")?.length > 0) && (
            <div className="space-y-2">
              <Label>Points Price</Label>
              <FormField
                control={form.control}
                name="variants.0.pointsBasedPrice"
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="0"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
              <p className="text-sm text-muted-foreground">
                Number of points required to purchase this product
              </p>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
