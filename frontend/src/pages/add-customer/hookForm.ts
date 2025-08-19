import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomerType } from "../../types/customer";

const createCustomerSchema = (type: "private" | "juridical") => {
  const baseSchema = z.object({
    type: z.enum(["private", "juridical"], {
      required_error: "Obbligatorio",
      invalid_type_error: "Obbligatorio",
    }),
    name: z
      .string({ required_error: "Obbligatorio" })
      .min(2, "Obbligatorio (min 2 caratteri)"),

    description: z
      .string({ required_error: "Obbligatorio" })
      .min(2, "Obbligatorio (min 2 caratteri)"),
    cf: z
      .string({ required_error: "Obbligatorio" })
      .min(2, "Obbligatorio (min 2 caratteri)"),

    address: z
      .string({ required_error: "Obbligatorio" })
      .min(2, "Obbligatorio"),
    city: z.string({ required_error: "Obbligatorio" }).min(2, "Obbligatorio"),
    cap: z
      .string({ required_error: "Obbligatorio" })
      .min(5, "Obbligatorio")
      .max(5, "Obbligatorio"),
    province: z.string({ required_error: "Obbligatorio" }),
    phone: z
      .string({ required_error: "Obbligatorio" })
      .min(2, "Obbligatorio (min 2 caratteri)"),
    email: z
      .string({ required_error: "Obbligatorio" })
      .min(2, "Obbligatorio (min 2 caratteri)"),
    pec: z
      .string({ required_error: "Obbligatorio" })
      .min(2, "Obbligatorio (min 2 caratteri)"),
    profileImg: z
      .string({ required_error: "Obbligatorio" })
      .min(2, "Obbligatorio (min 2 caratteri)"),
  });

  if (type === "juridical") {
    return baseSchema.extend({
      ivaCode: z
        .string({ required_error: "Obbligatorio" })
        .min(2, "Obbligatorio (min 2 caratteri)"),
      legalAddress: z
        .string({ required_error: "Obbligatorio" })
        .min(2, "Obbligatorio"),
      legalCity: z
        .string({ required_error: "Obbligatorio" })
        .min(2, "Obbligatorio"),
      legalCap: z
        .string({ required_error: "Obbligatorio" })
        .min(5, "Obbligatorio")
        .max(5, "Obbligatorio"),
      legalProvince: z.string({ required_error: "Obbligatorio" }),
    });
  } else {
    return baseSchema.extend({
      surname: z
        .string({ required_error: "Obbligatorio" })
        .min(2, "Obbligatorio (min 2 caratteri)"),
      gender: z
        .string({ required_error: "Obbligatorio" })
        .min(2, "Obbligatorio (min 2 caratteri)"),
    });
  }
};

export const useCustomerStepForm = (type: CustomerType) => {
  const schema = createCustomerSchema(type);
  return useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      type,
    },
  });
};
