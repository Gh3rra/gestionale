import { Customer } from "./customer";

export interface Commission {
  id: number;
  number: number;
  title: string;
  description: string;
  stateId: number;
  initialOfferPrice: number;
  requestDate: Date;
  startWorkDate: Date;
  endWorkDate: Date;
  address: string;
  cap: string;
  city: string;
  province: string;
  createdAt: Date;
  updatedAt: Date;
  customer: Customer | null;
}
export interface CommissionDTO {
  id: number;
  number: number;
  title: string;
  description: string;
  stateId: number;
  initialOfferPrice: number;
  requestDate: string;
  startWorkDate: string;
  endWorkDate: string;
  address: string;
  cap: string;
  city: string;
  province: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer | null;
}

// Utility types
export type CommissionId = Commission["id"];
