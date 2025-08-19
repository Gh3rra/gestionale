import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProvinceList = () => {
  return useQuery<Record<string, string>[]>({
    queryKey: ["provinceList"],
    queryFn: async () => {
      const response = await axios.get(
        `https://axqvoqvbfjpaamphztgd.functions.supabase.co/province`,
        
      );
      console.log      ("Province List Response:", response.data);
      return response.data;
    },
  });
};
