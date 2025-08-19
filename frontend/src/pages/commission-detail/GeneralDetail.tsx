import React from "react";
import { InfoIcon, LocationIcon } from "../../Icon";
import { Commission } from "../../types/commission";
import { Customer, isPrivateCustomer } from "../../types/customer";

function GeneralDetail({
  commission,
  customer,
}: {
  commission: Commission | null;
  customer: Customer | null;
}) {
  return (
    <>
      <div className="flex flex-col gap-8 py-5">
        <div className="flex gap-4">
          <InfoIcon className="w-5 h-5" />
          <h1 className="!text-[20px] font-medium">Descrizione</h1>
        </div>
        <div className="flex gap-5 pl-4">
          <div className="text-primary-text flex flex-col gap-5 font-semibold">
            <p>Titolo</p>
            <p>ID</p>
            <p>Cliente</p>
          </div>
          <div className="text-secondary-text flex flex-col gap-5 font-semibold">
            <p>{commission?.title}</p>
            <p>{commission?.id}</p>
            <p>
              {`${customer?.name} ${
                isPrivateCustomer(customer!) ? customer?.surname : ""
              }`}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 py-5">
        <div className="flex gap-4">
          <LocationIcon className="w-5 h-5" />
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
            <p>{commission?.address}</p>
            <p>{commission?.city}</p>
            <p>{commission?.cap}</p>
            <p>{commission?.province}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralDetail;
