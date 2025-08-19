export interface PrivateCustomer {
  type: "private";
  id: number;
  name: string;
  surname: string;
  description: string;
  gender: string;
  cf: string;
  address: string;
  cap: string;
  city: string;
  province: string;
  email: string;
  pec: string;
  phone: string;
  profileImg: string;
  createdAt: string;
  updatedAt: string;
}

export interface JuridicalCustomer {
  type: "juridical";
  id: number;
  name: string;
  description: string;
  ivaCode: string;
  cf: string;
  address: string;
  cap: string;
  city: string;
  province: string;
  legalAddress: string;
  legalCity: string;
  legalCap: string;
  legalProvince: string;
  email: string;
  pec: string;
  phone: string;
  profileImg: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomerType = "private" | "juridical";

export type Customer = PrivateCustomer | JuridicalCustomer;

// Utility types
export type CustomerId = Customer["id"];

export const isPrivateCustomer = (
  customer: Customer,
): customer is PrivateCustomer => {
  return customer.type === "private";
};

export const isJuridicalCustomer = (
  customer: Customer,
): customer is JuridicalCustomer => {
  return customer.type === "juridical";
};
