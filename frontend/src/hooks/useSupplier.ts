import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Supplier } from "../types/supplier";

export const useSuppliers = () => {
  return useQuery<Supplier[]>({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/suppliers", {
        withCredentials: true,
      });
      const { suppliers } = response.data;
      return suppliers;
    },
    // Opzioni specifiche (override quelle globali)
    staleTime: 5 * 60 * 1000, // 5 minuti fresh
    gcTime: 30 * 60 * 1000, // 30 minuti in cache
  });
};

// Hook per singolo cliente
export const useSupplier = (id: number) => {
  return useQuery({
    queryKey: ["supplier", id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/api/suppliers/${id}`,
        { withCredentials: true },
      );
      console.log(response.data);

      return response.data.supplier;
    },
    enabled: !!id, // Run solo se id e type sono validi
  });
};
