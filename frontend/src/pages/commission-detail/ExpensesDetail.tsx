import { InfoIcon, LocationIcon } from "../../Icon";

import {
  CommissionModel,
  JuridicalCustomer,
  PrivateCustomer,
} from "./CommissionDetail";

function ExpensesDetail({
  commission,
  privateCustomer,
  juridicalCustomer,
}: {
  commission: CommissionModel | null;
  privateCustomer: PrivateCustomer | null;
  juridicalCustomer: JuridicalCustomer | null;
}) {
  return (
    <>
      <div className="flex flex-col gap-8 py-5">
        <div className="flex gap-4">
          <InfoIcon size={22} />
          <h1>Descrizione</h1>
        </div>
        <div className="flex pl-4 gap-5">
          <div className="flex flex-col gap-5 font-semibold text-primary-text">
            <p>Titolo</p>
            <p>ID</p>
            <p>Cliente</p>
          </div>
          <div className="flex flex-col gap-5 font-semibold text-secondary-text">
            <p>{commission?.title}</p>
            <p>{commission?.id}</p>
            <p>
              {privateCustomer !== null
                ? `${privateCustomer?.name} ${privateCustomer?.surname}`
                : juridicalCustomer !== null
                ? juridicalCustomer?.name
                : "NON PRESENTE"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 py-5">
        <div className="flex gap-4">
          <LocationIcon size={22} />
          <h1>Luogo</h1>
        </div>
        <div className="flex pl-4 gap-5">
          <div className="flex flex-col gap-5 font-semibold text-primary-text">
            <p>Indirizzo</p>
            <p>Città</p>
            <p>CAP</p>
            <p>Provincia</p>
          </div>
          <div className="flex flex-col gap-5 font-semibold text-secondary-text">
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

export default ExpensesDetail;
