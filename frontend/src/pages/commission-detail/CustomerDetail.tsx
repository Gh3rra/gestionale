import React from "react";
import { InfoIcon, LocationIcon, PhoneIcon } from "../../Icon";
import { Customer, isPrivateCustomer } from "../../types/customer";

function CustomerDetail({ customer }: { customer: Customer | null }) {
  if (isPrivateCustomer(customer!)) {
    return (
      <>
        <div className="flex flex-col gap-8 py-5">
          <div className="flex gap-4">
            <InfoIcon className="w-5 h-5" />
            <h1 className="!text-[20px] font-medium">Anagrafica</h1>
          </div>

          <div className="flex gap-5 pl-4">
            <div className="text-primary-text flex flex-col gap-5 font-semibold">
              <p>Nome</p>
              <p>Cognome</p>
              <p>Sesso</p>
              <p>Codice fiscale</p>
            </div>
            <div className="text-secondary-text flex flex-col gap-5 font-semibold">
              <p>{customer.name}</p>
              <p>{customer.surname}</p>
              <p>{customer.gender}</p>
              <p>{customer.cf}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 py-5">
          <div className="flex gap-4">
            <LocationIcon className="w-5 h-5" />
            <h1 className="!text-[20px] font-medium">Residenza</h1>
          </div>
          <div className="flex gap-5 pl-4">
            <div className="text-primary-text flex flex-col gap-5 font-semibold">
              <p>Indirizzo</p>
              <p>Città</p>
              <p>CAP</p>
              <p>Provincia</p>
            </div>
            <div className="text-secondary-text flex flex-col gap-5 font-semibold">
              <p>{customer.address}</p>
              <p>{customer.city}</p>
              <p>{customer.cap}</p>
              <p>{customer.province}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 py-5">
          <div className="flex gap-4">
            <PhoneIcon className="w-5 h-5" />
            <h1 className="!text-[20px] font-medium">Recapiti</h1>
          </div>
          <div className="flex gap-5 pl-4">
            <div className="text-primary-text flex flex-col gap-5 font-semibold">
              <p>Email</p>
              <p>PEC</p>
              <p>Telefono</p>
            </div>
            <div className="text-secondary-text flex flex-col gap-5 font-semibold">
              <p>{customer.email}</p>
              <p>{customer.pec}</p>
              <p>{customer.phone}</p>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col gap-8 py-5">
          <div className="flex gap-4">
            <InfoIcon className="w-5 h-5" />
            <h1 className="!text-[20px] font-medium">Anagrafica</h1>
          </div>

          <div className="flex gap-5 pl-4">
            <div className="text-primary-text flex flex-col gap-5 font-semibold">
              <p>Denominazione sociale</p>

              <p>Partita Iva</p>
            </div>
            <div className="text-secondary-text flex flex-col gap-5 font-semibold">
              <p>{customer?.name}</p>
              <p>{customer?.ivaCode}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 py-5">
          <div className="flex gap-4">
            <LocationIcon className="w-5 h-5" />
            <h1 className="!text-[20px] font-medium">Residenza</h1>
          </div>
          <div className="flex gap-5 pl-4">
            <div className="text-primary-text flex flex-col gap-5 font-semibold">
              <p>Indirizzo</p>
              <p>Città</p>
              <p>CAP</p>
              <p>Provincia</p>
            </div>
            <div className="text-secondary-text flex flex-col gap-5 font-semibold">
              <p>{customer?.address}</p>
              <p>{customer?.city}</p>
              <p>{customer?.cap}</p>
              <p>{customer?.province}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 py-5">
          <div className="flex gap-4">
            <PhoneIcon className="w-5 h-5" />
            <h1 className="!text-[20px] font-medium">Recapiti</h1>
          </div>
          <div className="flex gap-5 pl-4">
            <div className="text-primary-text flex flex-col gap-5 font-semibold">
              <p>Email</p>
              <p>PEC</p>
              <p>Telefono</p>
            </div>
            <div className="text-secondary-text flex flex-col gap-5 font-semibold">
              <p>{customer?.email}</p>
              <p>{customer?.pec}</p>
              <p>{customer?.phone}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CustomerDetail;
