import React from "react";
import { InfoIcon, LocationIcon } from "../../Icon";
import { Customer, isJuridicalCustomer, isPrivateCustomer } from "../../types/customer";

function GeneralDetail({ customer }: { customer: Customer }) {
  return (
    <>
      <div className="flex flex-col gap-8 py-5">
        <div className="flex gap-4">
          <InfoIcon className="h-5 w-5" />
          <h1 className="!text-[20px] font-medium">Descrizione</h1>
        </div>
        <div className="flex gap-5 pl-4">
          <div className="text-primary-text flex flex-col gap-5 font-semibold">
            <p>Nome</p>
            {isPrivateCustomer(customer) && <p>Cognome</p>}
            {isJuridicalCustomer(customer) && <p>Partita IVA</p>}
            <p>Codice Fiscale</p>

            {isPrivateCustomer(customer) && <p>Genere</p>}
          </div>
          <div className="text-secondary-text flex flex-col gap-5 font-semibold">
            <p>{customer?.name}</p>
            {isPrivateCustomer(customer) && <p>{customer.surname}</p>}
            {isJuridicalCustomer(customer) && <p>{customer.ivaCode}</p>}
            <p>{customer.cf || "-"}</p>

            {isPrivateCustomer(customer) && <p>{customer?.gender}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 py-5">
        <div className="flex gap-4">
          <LocationIcon className="h-5 w-5" />
          <h1 className="!text-[20px] font-medium">Luogo</h1>
        </div>
        <div className="flex gap-5 pl-4">
          <div className="text-primary-text flex flex-col gap-5 font-semibold">
            <p>Indirizzo</p>
            <p>Città</p>
            <p>CAP</p>
            <p>Provincia</p>
          </div>
          <div className="text-secondary-text flex flex-col gap-5 font-semibold">
            <p>{customer?.address || "-"}</p>
            <p>{customer?.city}</p>
            <p>{customer?.cap}</p>
            <p>{customer?.province}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralDetail;
