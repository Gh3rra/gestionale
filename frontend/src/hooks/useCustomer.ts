import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Customer, CustomerType } from "../types/customer";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/customers", {
        withCredentials: true,
      });
      const { privateCustomers, juridicalCustomers } = response.data;
      return [...privateCustomers, ...juridicalCustomers];
    },
    // Opzioni specifiche (override quelle globali)
    staleTime: 5 * 60 * 1000, // 5 minuti fresh
    gcTime: 30 * 60 * 1000, // 30 minuti in cache
  });
};

// Hook per singolo cliente
export const useCustomer = (id: number, type: CustomerType) => {
  return useQuery<Customer>({
    queryKey: ["customer", id, type],
    queryFn: async () => {
      const endpoint =
        type === "private" ? "private-customer" : "juridical-customer";
      const response = await axios.get(
        `http://localhost:3000/api/customers/${endpoint}/${id}`,
        { withCredentials: true },
      );
      console.log(response.data);

      return response.data.customer;
    },
    enabled: !!id && (type === "private" || type === "juridical"), // Run solo se id e type sono validi
  });
};
