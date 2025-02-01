import { CustomerAddress } from "@/types/customer";

export function transformCustomerAddress(
  address: any,
): CustomerAddress | undefined {
  if (!address) return undefined;

  return {
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
    createdAt: address.created_at,
    updatedAt: address.updated_at,
  };
}
