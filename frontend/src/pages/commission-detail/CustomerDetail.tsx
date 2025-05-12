import { InfoIcon, LocationIcon, PhoneIcon } from "../../Icon";
import { JuridicalCustomer, PrivateCustomer } from "./CommissionDetail";

function CustomerDetail({
  privateCustomer,
  juridicalCustomer,
}: {
  privateCustomer: PrivateCustomer | null;
  juridicalCustomer: JuridicalCustomer | null;
}) {
  if (privateCustomer !== null) {
    return (
      <>
        <div className="flex flex-col gap-8 py-5">
          <div className="flex gap-4">
            <InfoIcon size={22} />
            <h1 className="!text-[20px] font-medium">Anagrafica</h1>
          </div>

          <div className="flex pl-4 gap-5">
            <div className="flex flex-col gap-5 font-semibold text-primary-text">
              <p>Nome</p>
              <p>Cognome</p>
              <p>Sesso</p>
              <p>Codice fiscale</p>
            </div>
            <div className="flex flex-col gap-5 font-semibold text-secondary-text">
              <p>{privateCustomer.name}</p>
              <p>{privateCustomer.surname}</p>
              <p>{privateCustomer.gender}</p>
              <p>{privateCustomer.cf}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 py-5">
          <div className="flex gap-4">
            <LocationIcon size={22} />
            <h1 className="!text-[20px]  font-medium">Residenza</h1>
          </div>
          <div className="flex pl-4 gap-5">
            <div className="flex flex-col gap-5 font-semibold text-primary-text">
              <p>Indirizzo</p>
              <p>Città</p>
              <p>CAP</p>
              <p>Provincia</p>
            </div>
            <div className="flex flex-col gap-5 font-semibold text-secondary-text">
              <p>{privateCustomer.address}</p>
              <p>{privateCustomer.city}</p>
              <p>{privateCustomer.cap}</p>
              <p>{privateCustomer.province}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 py-5">
          <div className="flex gap-4">
            <PhoneIcon size={22} />
            <h1 className="!text-[20px]  font-medium">Recapiti</h1>
          </div>
          <div className="flex pl-4 gap-5">
            <div className="flex flex-col gap-5 font-semibold text-primary-text">
              <p>Email</p>
              <p>PEC</p>
              <p>Telefono</p>
            </div>
            <div className="flex flex-col gap-5 font-semibold text-secondary-text">
              <p>{privateCustomer.email}</p>
              <p>{privateCustomer.pec}</p>
              <p>{privateCustomer.phone}</p>
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
            <InfoIcon size={22} />
            <h1
              className="!text-[20px] font-medium"
              className="!text-[20px] font-medium"
            >
              Anagrafica
            </h1>
          </div>

          <div className="flex pl-4 gap-5">
            <div className="flex flex-col gap-5 font-semibold text-primary-text">
              <p>Denominazione sociale</p>

              <p>Partita Iva</p>
            </div>
            <div className="flex flex-col gap-5 font-semibold text-secondary-text">
              <p>{juridicalCustomer?.name}</p>
              <p>{juridicalCustomer?.iva_code}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 py-5">
          <div className="flex gap-4">
            <LocationIcon size={22} />
            <h1 className="!text-[20px] font-medium">Residenza</h1>
          </div>
          <div className="flex pl-4 gap-5">
            <div className="flex flex-col gap-5 font-semibold text-primary-text">
              <p>Indirizzo</p>
              <p>Città</p>
              <p>CAP</p>
              <p>Provincia</p>
            </div>
            <div className="flex flex-col gap-5 font-semibold text-secondary-text">
              <p>{juridicalCustomer?.address}</p>
              <p>{juridicalCustomer?.city}</p>
              <p>{juridicalCustomer?.cap}</p>
              <p>{juridicalCustomer?.province}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 py-5">
          <div className="flex gap-4">
            <PhoneIcon size={22} />
            <h1 className="!text-[20px] font-medium">Recapiti</h1>
          </div>
          <div className="flex pl-4 gap-5">
            <div className="flex flex-col gap-5 font-semibold text-primary-text">
              <p>Email</p>
              <p>PEC</p>
              <p>Telefono</p>
            </div>
            <div className="flex flex-col gap-5 font-semibold text-secondary-text">
              <p>{juridicalCustomer?.email}</p>
              <p>{juridicalCustomer?.pec}</p>
              <p>{juridicalCustomer?.phone}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CustomerDetail;
