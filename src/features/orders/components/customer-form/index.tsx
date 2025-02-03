import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomerSchema } from "@/features/customers/schemas/customer-schema";
import { BasicDetails } from "./sections/basic-details";
import { Addresses } from "./sections/addresses";
import { Customer } from "@/types/customer";
import { toast } from "sonner";

interface CustomerFormProps {
  onSubmit: (data: Customer) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function CustomerForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: CustomerFormProps) {
  const form = useForm({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      isVerified: false,
      acceptsMarketing: false,
      tags: [],
      addresses: [
        {
          id: crypto.randomUUID(),
          type: "shipping",
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          isDefault: true,
        },
      ],
    },
  });

  const handleSubmit = async (data: Customer) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Failed to save customer:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 max-h-[75vh] overflow-auto pb-20"
      >
        <BasicDetails form={form} />
        <Addresses form={form} />

        <div className="flex justify-end gap-2 bottom-0 fixed w-full bg-main p-6 !m-0 left-0">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Customer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
