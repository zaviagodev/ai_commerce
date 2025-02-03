import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Bank {
  bank_code: string;
  bank_name_thai: string;
  bank_name: string;
  swift_code: string;
  image_url: string;
}

export const useBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("banks")
        .select("*")
        .order("bank_name_thai", { ascending: true });

      if (error) {
        throw error;
      }

      return data as Bank[];
    },
  });
};
