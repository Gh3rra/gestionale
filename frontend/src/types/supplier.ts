
export interface Supplier {
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

// Utility types
export type SupplierId = Supplier["id"];
