import { supabase } from "@/lib/supabase";
import { CustomerGroup } from "@/types/customer";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth/auth-store";
import { CustomerGroupSchema } from "../schemas/customer-group-schema";

export class CustomerGroupService {
  static async validateGroup(group: Partial<CustomerGroup>) {
    try {
      await CustomerGroupSchema.parseAsync(group);
    } catch (error: any) {
      throw new Error(error.errors?.[0]?.message || "Invalid group data");
    }
  }

  static async getGroups(): Promise<CustomerGroup[]> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: groups, error } = await supabase
        .from("customer_groups")
        .select("*")
        .eq("store_name", user.storeName)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (groups || []).map((group) => ({
        id: group.id,
        name: group.name,
        description: group.description,
        color: group.color,
        autoAssign: group.auto_assign,
        conditions: group.conditions || [],
        members: group.members || [],
        status: group.status,
      }));
    } catch (error) {
      console.error("Failed to fetch groups:", error);
      toast.error("Failed to load customer groups");
      return [];
    }
  }

  static async createGroup(
    group: Omit<CustomerGroup, "id">,
  ): Promise<CustomerGroup> {
    try {
      // Validate group data
      await this.validateGroup(group);

      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: newGroup, error } = await supabase
        .from("customer_groups")
        .insert({
          store_name: user.storeName,
          name: group.name,
          description: group.description,
          color: group.color,
          auto_assign: group.autoAssign,
          conditions: group.conditions,
          members: group.members,
          status: group.status,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Customer group created successfully");
      return {
        id: newGroup.id,
        name: newGroup.name,
        description: newGroup.description,
        color: newGroup.color,
        autoAssign: newGroup.auto_assign,
        conditions: newGroup.conditions || [],
        members: newGroup.members || [],
        status: newGroup.status,
      };
    } catch (error: any) {
      console.error("Failed to create group:", error);
      toast.error(error.message || "Failed to create group");
      throw error;
    }
  }

  static async updateGroup(
    id: string,
    group: Partial<CustomerGroup>,
  ): Promise<CustomerGroup> {
    try {
      // Validate group data
      await this.validateGroup({ id, ...group });

      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { data: updatedGroup, error } = await supabase
        .from("customer_groups")
        .update({
          name: group.name,
          description: group.description,
          color: group.color,
          auto_assign: group.autoAssign,
          conditions: group.conditions,
          members: group.members,
          status: group.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("store_name", user.storeName)
        .select()
        .single();

      if (error) throw error;

      toast.success("Customer group updated successfully");
      return {
        id: updatedGroup.id,
        name: updatedGroup.name,
        description: updatedGroup.description,
        color: updatedGroup.color,
        autoAssign: updatedGroup.auto_assign,
        conditions: updatedGroup.conditions || [],
        members: updatedGroup.members || [],
        status: updatedGroup.status,
      };
    } catch (error: any) {
      console.error("Failed to update group:", error);
      toast.error(error.message || "Failed to update group");
      throw error;
    }
  }

  static async deleteGroup(id: string): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.storeName) throw new Error("Store not found");

      const { error } = await supabase
        .from("customer_groups")
        .delete()
        .eq("id", id)
        .eq("store_name", user.storeName);

      if (error) throw error;

      toast.success("Customer group deleted successfully");
    } catch (error) {
      console.error("Failed to delete group:", error);
      toast.error("Failed to delete group");
      throw error;
    }
  }
}
