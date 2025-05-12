import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const GoodSchema = z.object({
  title: z
    .string({ required_error: "Obbligatorio" })
    .min(2, "Obbligatorio (min 2 caratteri)"),
  quantity: z.string({ required_error: "Obbligatorio" }).min(1, "Obbligatorio"),
  unitPrice: z
    .string({ required_error: "Obbligatorio" })
    .min(1, "Obbligatorio"),
  totalPrice: z
    .string({ required_error: "Obbligatorio" })
    .min(1, "Obbligatorio"),
});
const SupplierSchema = z.object({
  id: z.number(),
  goods: z.array(GoodSchema),
});

const CommissionStepSchema = z
  .object({
    title: z.string().min(2, "Obbligatorio (min 2 caratteri)"),
    address: z.string().min(2, "Obbligatorio"),
    city: z.string().min(2, "Obbligatorio"),
    cap: z.coerce.string().min(5, "Obbligatorio").max(5, "Obbligatorio"),
    province: z.string({ required_error: "Obbligatorio" }),
    requestDate: z.date({ required_error: "Obbligatorio" }),
    startWorkDate: z.date({ required_error: "Obbligatorio" }).optional(),
    endWorkDate: z.date({ required_error: "Obbligatorio" }).optional(),
    customer: z.object({ id: z.number(), type: z.number() }),
    suppliers: z.array(SupplierSchema).optional(),
    documents: z.array(z.instanceof(File)).optional(),
    workExpenses: z
      .array(
        z.object({
          worker: z.string().min(2, "Obbligatorio"),
          workHours: z.string().optional(),
          costPerHour: z.string().optional(),
          total: z.string().min(2, "Obbligatorio"),
        })
      )
      .optional(),
    travelExpenses: z
      .array(
        z.object({
          title: z.string().min(2, "Obbligatorio"),
          amount: z.string().min(2, "Obbligatorio"),
        })
      )
      .optional(),
    otherExpenses: z
      .array(
        z.object({
          title: z.string().min(2, "Obbligatorio"),
          amount: z.string().min(2, "Obbligatorio"),
        })
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.startWorkDate) {
        return data.requestDate <= data.startWorkDate;
      } else {
        return true;
      }
    },
    {
      message:
        "La data di inizio lavori deve essere maggiore o uguale alla data richiesta",
      path: ["startWorkDate"],
    }
  )
  .refine(
    (data) => {
      if (data.startWorkDate && data.endWorkDate) {
        return data.startWorkDate <= data.endWorkDate;
      }
      return true;
    },
    {
      message:
        "La data di fine lavori deve essere maggiore o uguale alla data di inizio lavori",
      path: ["endWorkDate"],
    }
  )
  .refine((data) => data.customer !== undefined, {
    message: "Cliente obbligatorio",
    path: ["customer"],
  });

export type SupplierFormModel = z.infer<typeof SupplierSchema>;
export type CommissionStepFields = z.infer<typeof CommissionStepSchema>;

export const useStepForm = () => {
  return useForm<CommissionStepFields>({
    resolver: zodResolver(CommissionStepSchema),
    mode: "onTouched",
  });
};
