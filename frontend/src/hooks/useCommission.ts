import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Commission, CommissionDTO } from "../types/commission";

const transformCommissionDTO = (dto: CommissionDTO): Commission => {
  const parseDate = (isoString: string | null): Date | null => {
    if (!isoString) return null;
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? null : date;
  };

  return {
    ...dto,
    requestDate: parseDate(dto.requestDate),
    startWorkDate: parseDate(dto.startWorkDate),
    endWorkDate: parseDate(dto.endWorkDate),
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  };
};

export const useCommissions = () => {
  return useQuery<Commission[]>({
    queryKey: ["commissions"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/api/commissions",
        {
          withCredentials: true,
        },
      );
      const { commissions } = response.data;
      return commissions.map(transformCommissionDTO);
    },
    // Opzioni specifiche (override quelle globali)
    staleTime: 5 * 60 * 1000, // 5 minuti fresh
    gcTime: 30 * 60 * 1000, // 30 minuti in cache
  });
};

// Hook per singolo cliente
export const useCommission = (id: number) => {
  return useQuery<Commission>({
    queryKey: ["commission", id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/api/commissions/${id}`,
        { withCredentials: true },
      );
      console.log(response.data);

      return response.data.commission;
    },
    enabled: !!id, // Run solo se id e type sono validi
  });
};

export const useNextCommissionNumber = () => {
  return useQuery<number>({
    queryKey: ["nextCommissionNumber"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/api/commissions/next-number`,
        { withCredentials: true },
      );
      console.log(response.data);

      return response.data.commissionNumber;
    },
  // Run solo se id e type sono validi
  });
};
