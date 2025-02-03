import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CustomerAddress } from "@/types/customer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerAddressSchema } from "@/features/customers/schemas/customer-schema";
import { useTranslation } from "@/lib/i18n/hooks";
import { COUNTRY_CHOICE } from "@/data/countries";
import { DeleteAddressModal } from "../../modal/delete-address-modal";
import { SetAsDefaultModal } from "../../modal/set-as-default-modal";

interface AddressFormProps {
  address: CustomerAddress;
  onSave: (address: CustomerAddress) => void;
  onDelete: () => Promise<void>;
  onCancel: () => void;
  isNewAddress?: boolean;
}

export function AddressForm({
  address,
  onSave,
  onDelete,
  onCancel,
  isNewAddress = false
}: AddressFormProps) {
  const t = useTranslation();
  const form = useForm({
    resolver: zodResolver(CustomerAddressSchema),
    defaultValues: address,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSetAsDefault, setShowAsDefault] = useState(false);

  const handleSetDefault = () => {
    form.setValue("isDefault", true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    event.stopPropagation(); 
    form.handleSubmit(onSave)(); 
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-auto pb-16 px-[1px]"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    t.customers.customer.form.sections.addresses.fields.type
                      .label
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
                          t.customers.customer.form.sections.addresses.fields
                            .type.placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="shipping">
                      {
                        t.customers.customer.form.sections.addresses.fields.type
                          .shipping
                      }
                    </SelectItem>
                    <SelectItem value="billing">
                      {
                        t.customers.customer.form.sections.addresses.fields.type
                          .billing
                      }
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      t.customers.customer.form.sections.addresses.fields
                        .firstName.label
                    }
                    <span className="text-destructive"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={
                        t.customers.customer.form.sections.addresses.fields
                          .firstName.placeholder
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      t.customers.customer.form.sections.addresses.fields
                        .lastName.label
                    }
                    <span className="text-destructive"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        t.customers.customer.form.sections.addresses.fields
                          .lastName.placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    t.customers.customer.form.sections.addresses.fields.company
                      .label
                  }
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      t.customers.customer.form.sections.addresses.fields
                        .company.placeholder
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    t.customers.customer.form.sections.addresses.fields.address1
                      .label
                  }
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      t.customers.customer.form.sections.addresses.fields
                        .address1.placeholder
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    t.customers.customer.form.sections.addresses.fields.address2
                      .label
                  }
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      t.customers.customer.form.sections.addresses.fields
                        .address2.placeholder
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      t.customers.customer.form.sections.addresses.fields.city
                        .label
                    }
                    <span className="text-destructive"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        t.customers.customer.form.sections.addresses.fields.city
                          .placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      t.customers.customer.form.sections.addresses.fields.state
                        .label
                    }
                    <span className="text-destructive"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        t.customers.customer.form.sections.addresses.fields
                          .state.placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      t.customers.customer.form.sections.addresses.fields
                        .postalCode.label
                    }
                    <span className="text-destructive"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        t.customers.customer.form.sections.addresses.fields
                          .postalCode.placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    t.customers.customer.form.sections.addresses.fields.country
                      .label
                  }
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          t.customers.customer.form.sections.addresses.fields
                            .country.placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRY_CHOICE.map((choice) => (
                      <SelectItem value={choice}>{choice}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    t.customers.customer.form.sections.addresses.fields.phone
                      .label
                  }
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder={
                      t.customers.customer.form.sections.addresses.fields.phone
                        .placeholder
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>
                    {
                      t.customers.customer.form.sections.addresses.fields
                        .isDefault.label
                    }
                  </FormLabel>
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

          <div className="flex items-center justify-between fixed bottom-6 w-[calc(100%_-_48px)] bg-main pt-6">
            {!isNewAddress && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
              >
                {t.customers.customer.form.sections.addresses.actions.delete}
              </Button>
            )}
            <div className="flex gap-4 ml-auto">
              <Button type="button" variant="outline" onClick={onCancel}>
                {t.customers.customer.form.sections.addresses.actions.cancel}
              </Button>
              <Button type="submit">
                {t.customers.customer.form.sections.addresses.actions.save}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <DeleteAddressModal
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={onDelete}
        address={`${address.firstName} ${address.lastName}`}
      />

      <SetAsDefaultModal
        open={showSetAsDefault}
        onOpenChange={setShowAsDefault}
        onConfirm={handleSetDefault}
        description="Set this address as default"
      />
    </>
  );
}
