import { InfoIcon, LocationIcon } from "../../Icon";
import { Supplier } from "./SupplierDetail";

function GeneralDetail({ supplier }: { supplier: Supplier }) {
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
            
            <p>Partita IVA</p>
            <p>Codice Fiscale</p>

        
          </div>
          <div className="text-secondary-text flex flex-col gap-5 font-semibold">
            <p>{supplier?.name}</p>
           
             <p>{supplier.ivaCode}</p>
            <p>{supplier.cf || "-"}</p>

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
            <p>{supplier?.address || "-"}</p>
            <p>{supplier?.city}</p>
            <p>{supplier?.cap}</p>
            <p>{supplier?.province}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralDetail;
