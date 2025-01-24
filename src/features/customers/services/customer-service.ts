import { supabase } from "@/lib/supabase";
import { Customer } from "@/types/customer";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth/auth-store";

export class CustomerService {
  private static transformCustomer(data: any): Customer {
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      isVerified: data.is_verified,
      acceptsMarketing: data.accepts_marketing,
      tags: data.tags || [],
      addresses: (data.customer_addresses || []).map((address: any) => ({
        id: address.id,
        type: address.type,
        firstName: address.first_name,
        lastName: address.last_name,
        company: address.company,
        address1: address.address1,
        address2: address.address2,
        city: address.city,
        state: address.state,
        postalCode: address.postal_code,
        country: address.country,
        phone: address.phone,
        isDefault: address.is_default,
        createdAt: new Date(address.created_at),
        updatedAt: new Date(address.updated_at),
      })),
      tierId: data.tier_id,
      tier: data.customer_tiers
        ? {
            id: data.customer_tiers.id,
            name: data.customer_tiers.name,
            description: data.customer_tiers.description,
            color: data.customer_tiers.color,
            requirements: data.customer_tiers.requirements,
            rewardsMultiplier: data.customer_tiers.rewards_multiplier,
            discountPercentage: data.customer_tiers.discount_percentage,
            freeShipping: data.customer_tiers.free_shipping,
            prioritySupport: data.customer_tiers.priority_support,
            earlyAccess: data.customer_tiers.early_access,
            status: data.customer_tiers.status,
          }
        : undefined,
      loyaltyPoints: data.loyalty_points || 0,
      orders: data.orders || [],
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  static async getCustomers(): Promise<Customer[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: customers, error } = await supabase
        .from("customers")
        .select(
          `
          *,
          customer_addresses (*),
          customer_tiers (*)
        `,
        )
        .eq("store_name", user.storeName)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (customers || []).map((customer) =>
        CustomerService.transformCustomer(customer),
      );
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      toast.error("Failed to load customers");
      return [];
    }
  }

  static async createCustomer(
    customer: Omit<Customer, "id" | "createdAt" | "updatedAt">,
  ): Promise<Customer> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      // Create customer
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert({
          store_name: user.storeName,
          first_name: customer.firstName,
          last_name: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          accepts_marketing: customer.acceptsMarketing,
          is_verified: customer.isVerified,
          tags: customer.tags,
        })
        .select()
        .single();

      if (customerError) throw customerError;

      // Create addresses if provided
      if (customer.addresses?.length > 0) {
        const { error: addressError } = await supabase
          .from("customer_addresses")
          .insert(
            customer.addresses.map((address) => ({
              customer_id: newCustomer.id,
              store_name: user.storeName,
              type: address.type,
              first_name: address.firstName,
              last_name: address.lastName,
              company: address.company,
              address1: address.address1,
              address2: address.address2,
              city: address.city,
              state: address.state,
              postal_code: address.postalCode,
              country: address.country,
              phone: address.phone,
              is_default: address.isDefault,
            })),
          );

        if (addressError) throw addressError;
      }

      toast.success("Customer created successfully");
      return CustomerService.transformCustomer(newCustomer);
    } catch (error: any) {
      console.error("Failed to create customer:", error);
      toast.error(error.message || "Failed to create customer");
      throw error;
    }
  }

  static async updateCustomer(
    id: string,
    customer: Partial<Customer>,
  ): Promise<Customer> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      // Update customer data
      const { data: updatedCustomer, error: customerError } = await supabase
        .from("customers")
        .update({
          first_name: customer.firstName,
          last_name: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          accepts_marketing: customer.acceptsMarketing,
          tags: customer.tags,
          is_verified: customer.isVerified,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("store_name", user.storeName)
        .select(
          `
          *,
          customer_addresses (*),
          customer_tiers (*)
        `,
        )
        .single();

      if (customerError) throw customerError;

      // Handle addresses update
      if (customer.addresses) {
        // Delete existing addresses
        const { error: deleteError } = await supabase
          .from("customer_addresses")
          .delete()
          .eq("customer_id", id);

        if (deleteError) throw deleteError;

        // Insert new addresses
        if (customer.addresses.length > 0) {
          const { error: insertError } = await supabase
            .from("customer_addresses")
            .insert(
              customer.addresses.map((address) => ({
                customer_id: id,
                store_name: user.storeName,
                type: address.type,
                first_name: address.firstName,
                last_name: address.lastName,
                company: address.company,
                address1: address.address1,
                address2: address.address2,
                city: address.city,
                state: address.state,
                postal_code: address.postalCode,
                country: address.country,
                phone: address.phone,
                is_default: address.isDefault,
              })),
            );

          if (insertError) throw insertError;
        }
      }

      toast.success("Customer updated successfully");
      return CustomerService.transformCustomer(updatedCustomer);
    } catch (error: any) {
      console.error("Failed to update customer:", error);
      toast.error(error.message || "Failed to update customer");
      throw error;
    }
  }

  static async checkEmailAvailability(email: string): Promise<boolean> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { count, error } = await supabase
        .from("customers")
        .select("id", { count: "exact", head: true })
        .eq("store_name", user.storeName)
        .eq("email", email);

      if (error) throw error;
      return count === 0;
    } catch (error) {
      console.error("Failed to check email availability:", error);
      return false;
    }
  }
}
