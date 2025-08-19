import FormSideBar from "./FormSideBar";
import { useCustomerStepForm } from "./hookForm";
import { useProvinceList } from "../../hooks/useData";
import { AnimatePresence, motion } from "motion/react";
import {
  AddressIcon,
  CrossIcon,
  NextArrowNoPathIcon,
  PrevArrowNoPathIcon,
  TextIcon,
} from "../../Icon";
import { FormProvider, useFormContext } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import MyTextFieldForm from "../../components/TextField/MyTextFieldForm";
import MyAutocomplete, {
  Option,
} from "../../components/Autocomplete/Autocomplete";
import { CircularProgress } from "@mui/material";

import { CustomerType } from "../../types/customer";
import React from "react";
import RadioButton from "../../components/RadioButton/RadioButton";

function FormDialog({ closeFn }: { closeFn: () => void }) {
  const [provinceList, setProvinceList] = useState<Option[]>([]);
  const [type, setType] = useState<CustomerType>("private");
  const customerForm = useCustomerStepForm(type);

  const { data, error, isLoading, isError } = useProvinceList();

  useEffect(() => {
    if (data) {
      setProvinceList(data.map((c) => ({ label: c.sigla, value: c.sigla })));
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/95">
        <CircularProgress className="text-primary-text" size={50} />
      </div>
    );

  if (isError) {
    console.log("Error fetching province list:", error);

    return (
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/95">
        <p className="text-primary-text">Errore nel caricamento dei dati</p>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/95">
      <div className="text-primary-text flex h-3/4 w-2/3 rounded-[20px] border-none bg-white outline-none">
        <FormProvider {...customerForm}>
          <Steps
            type={type}
            setType={setType}
            provinceList={provinceList}
            closeFn={closeFn}
          />
        </FormProvider>
      </div>
    </div>
  );
}

function Steps({
  provinceList,
  closeFn,
  type,
  setType,
}: {
  provinceList: Option[];
  closeFn: () => void;
  type: CustomerType;
  setType: React.Dispatch<React.SetStateAction<CustomerType>>;
}) {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState<number>(0);

  const { handleSubmit } = useFormContext();
  const steps = [
    <CustomerStep
      setType={setType}
      setMaxStep={setMaxStep}
      setStep={setStep}
      type={type}
    />,
    <AddressStep
      type={type}
      setMaxStep={setMaxStep}
      setStep={setStep}
      province={provinceList}
    />,
    <ContactStep setStep={setStep} setMaxStep={setMaxStep} />,
    <FinalStep closeFn={closeFn} setStep={setStep} />,
  ];

  const handleNext = useCallback(() => {
    switch (step) {
      case 0:
        setMaxStep(1);
        setStep(1);
        break;
      case 1:
        setMaxStep(2);
        setStep(2);
        break;
      case 2:
        setMaxStep(3);
        setStep(3);
        break;
      default:
        break;
    }
  }, [step]);

  const handlePrev = useCallback(() => {
    switch (step) {
      case 1:
        setStep(0);
        break;
      case 2:
        setStep(1);
        break;
      case 3:
        setStep(2);
        break;
      default:
        break;
    }
  }, [step]);
  return (
    <>
      <FormSideBar maxStep={maxStep} step={step} setStep={setStep} />
     
        <div className="flex h-full max-h-full max-w-full flex-3/4 flex-col px-5 pt-4 pb-10">
          <div className="flex w-full justify-end">
            <button
              onClick={closeFn}
              className="hover:[&_svg]:!fill-primary-text rounded-lg border-none bg-white px-2 py-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-sm hover:shadow-black active:translate-y-0 active:shadow-none"
            >
              <CrossIcon className="fill-secondary-text w-6 transition-all duration-200" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(() => {})}
            className="flex h-full justify-between flex-col"
          >
            {steps[step]}
            {/*  <div className=" overflow-y-auto h-full">
              {Array.from({ length: 50 }).map(() => (
                <p>dadasdasasdasd</p>
              ))}
            </div> */}
            <div
              className={`flex w-full gap-5 ${step === 3 ? "justify-between" : "justify-start"}`}
            >
              {step !== 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePrev();
                  }}
                  className="text-primary-text flex items-center gap-2 rounded-2xl bg-transparent px-4 py-1.5 text-sm inset-shadow-white transition-all duration-200 hover:cursor-pointer hover:shadow-[inset_0_0_6px_#000]"
                >
                  <PrevArrowNoPathIcon className="h-3.5" />

                  <p>Indietro</p>
                </button>
              )}
              {step !== 3 && (
                <button
                  type="button"
                  onClick={async (e) => {
                    e.preventDefault();

                    handleNext();
                  }}
                  className="flex items-center gap-2 rounded-2xl bg-black px-4 py-1.5 text-sm text-white inset-shadow-white transition-all duration-200 hover:cursor-pointer hover:shadow-[inset_0_0_6px_#fff]"
                >
                  <p>Avanti</p>
                  <NextArrowNoPathIcon className="h-3.5" />
                </button>
              )}
              {step === 3 && (
                <button
                  onClick={() => {}}
                  className="hover:text-primary-text text-secondary-text rounded-lg border-none bg-white px-2 py-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-sm hover:shadow-black active:translate-y-0 active:shadow-none"
                >
                  Salva ed Esci
                </button>
              )}
            </div>
          </form>
        </div>
      
    </>
  );
}

function CustomerStep({
  setStep,
  setMaxStep,
  type,
  setType,
}: {
  setStep: (step: number) => void;
  setMaxStep: React.Dispatch<React.SetStateAction<number>>;
  type: CustomerType;
  setType: React.Dispatch<React.SetStateAction<CustomerType>>;
}) {
  const { trigger, clearErrors, setValue } = useFormContext();

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-1 flex-col gap-8 px-2 py-5">
        <RadioButton
          buttons={["Privato", "Giuridico"]}
          onButtonClick={(index) => {
            clearErrors();
            setType(index === 0 ? "private" : "juridical");
            setValue("type", index === 0 ? "private" : "juridical");
          }}
          selectedButtonIndex={type === "private" ? 0 : 1}
        />
        <AnimatePresence mode="wait">
          {type === "private" ? (
            <motion.div
              key={"private-fields"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-5"
            >
              <div className="flex w-full gap-5">
                <MyTextFieldForm
                  name="name"
                  labelText="Nome"
                  className="flex-1"
                />

                <MyTextFieldForm
                  name="surname"
                  labelText="Cognome"
                  className="flex-1"
                />
                <MyAutocomplete
                  options={[
                    { label: "M", value: "M" },
                    { label: "F", value: "F" },
                  ]}
                  name="gender"
                  className="!w-15"
                  labelText="Genere"
                  onChange={() => {}}
                />
              </div>
              <div className="flex gap-5">
                <MyTextFieldForm
                  name="description"
                  labelText="Descrizione"
                  className="flex-1"
                />

                <MyTextFieldForm
                  name="cf"
                  labelText="Codice Fiscale"
                  className="flex-1"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={"juridical-fields"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 gap-5"
            >
              <MyTextFieldForm name="name" labelText="Nome" />

              <MyTextFieldForm name="description" labelText="Descrizione" />
              <MyTextFieldForm name="ivaCode" labelText="Partita IVA" />
              <MyTextFieldForm name="cf" labelText="Codice Fiscale" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function AddressStep({
  setMaxStep,
  setStep,
  province,
  type,
}: {
  setStep: (step: number) => void;
  province: Option[];
  setMaxStep: React.Dispatch<React.SetStateAction<number>>;
  type: CustomerType;
}) {
  const { trigger } = useFormContext();
  return (
    <div className="flex  flex-col justify-between">
      {type === "juridical" ? (
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-primary-text text-md mb-2 font-semibold">
              Sede Legale
            </p>
            <div className="grid grid-cols-1 gap-5 px-2 py-5">
              <MyTextFieldForm name="legalAddress" labelText="Indirizzo" />
              <div className="grid grid-cols-7 gap-5">
                <MyTextFieldForm
                  name="legalCity"
                  className="col-span-3"
                  labelText="Città"
                />
                <MyTextFieldForm
                  datatype="cap"
                  name="legalCap"
                  className="col-span-3"
                  labelText="CAP"
                  onChange={(e) => {
                    const val = e.target.value;
                    e.target.value = val.replace(/[^\d]/g, "");
                    if (e.target.value.length > 5) {
                      e.target.value = e.target.value.slice(0, 5);
                    }
                  }}
                />
                <MyAutocomplete
                  options={province}
                  name="legalProvince"
                  className="col-span-1"
                  labelText="Provincia"
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-primary-text text-md mb-2 font-semibold">
              Sede Fisica
            </p>
            <div className="grid grid-cols-1 gap-5 px-2 py-5">
              <MyTextFieldForm name="address" labelText="Indirizzo" />
              <div className="grid grid-cols-7 gap-5">
                <MyTextFieldForm
                  name="city"
                  className="col-span-3"
                  labelText="Città"
                />
                <MyTextFieldForm
                  datatype="cap"
                  name="cap"
                  className="col-span-3"
                  labelText="CAP"
                  onChange={(e) => {
                    const val = e.target.value;
                    e.target.value = val.replace(/[^\d]/g, "");
                    if (e.target.value.length > 5) {
                      e.target.value = e.target.value.slice(0, 5);
                    }
                  }}
                />
                <MyAutocomplete
                  options={province}
                  name="province"
                  className="col-span-1"
                  labelText="Provincia"
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 px-2 py-5">
          <MyTextFieldForm name="address" labelText="Indirizzo" />
          <div className="grid grid-cols-7 gap-5">
            <MyTextFieldForm
              name="city"
              className="col-span-3"
              labelText="Città"
            />
            <MyTextFieldForm
              datatype="cap"
              name="cap"
              className="col-span-3"
              labelText="CAP"
              onChange={(e) => {
                const val = e.target.value;
                e.target.value = val.replace(/[^\d]/g, "");
                if (e.target.value.length > 5) {
                  e.target.value = e.target.value.slice(0, 5);
                }
              }}
            />
            <MyAutocomplete
              options={province}
              name="province"
              className="col-span-1"
              labelText="Provincia"
              onChange={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ContactStep({
  setMaxStep,
  setStep,
}: {
  setStep: (step: number) => void;
  setMaxStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex  flex-col justify-between">
      <div className="grid grid-cols-1 gap-5 px-2 py-5">
        <MyTextFieldForm name="phone" labelText="Telefono" />
        <div className="grid grid-cols-2 gap-5">
          <MyTextFieldForm name="email" labelText="Email" />
          <MyTextFieldForm name="pec" labelText="Pec" />
        </div>
      </div>{" "}
    </div>
  );
}

function FinalStep({
  closeFn,
  setStep,
}: {
  closeFn: () => void;
  setStep: (step: number) => void;
}) {
  const { watch } = useFormContext();
  const customerData = watch();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-5 px-2 py-5 font-semibold">
        <p>Riepilogo Cliente</p>
      </div>
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-2">
        <div className="flex gap-5">
          <div className="border-fourtiary flex flex-1 flex-col gap-2 rounded-xl border-1 p-3">
            <p className="text-sm text-gray-500">NOME</p>
            <p className="">
              {customerData.name}{" "}
              {customerData.type === "private" && customerData.surname}
            </p>
          </div>
          {customerData.type === "private" ? (
            <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
              <p className="text-sm text-gray-500">SESSO</p>
              <p>{customerData.gender}</p>
            </div>
          ) : (
            <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
              <p className="text-sm text-gray-500">PARTITA IVA</p>
              <p>{customerData.ivaCode}</p>
            </div>
          )}
        </div>
        <div className="gap grid grid-cols-2 gap-5">
          <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
            <p className="text-sm text-gray-500">CODICE FISCALE</p>
            <p>{customerData.cf}</p>
          </div>
          <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
            <p className="text-sm text-gray-500">DESCRIZIONE</p>
            <p>{customerData.description}</p>
          </div>
        </div>
        {customerData.type === "private" && (
          <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
            <p className="text-sm text-gray-500">INDIRIZZO</p>
            <p
              className="hover:cursor-pointer hover:!underline"
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customerData.address + " " + customerData.city + " " + customerData.cap + " " + customerData.province)}`,
                  "_blank",
                );
              }}
            >
              {customerData.address} {customerData.city} {customerData.cap}{" "}
              {customerData.province}
            </p>{" "}
          </div>
        )}

        {customerData.type === "juridical" && (
          <>
            <p className="font-semibold">Sede Legale</p>
            <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
              <p className="text-sm text-gray-500">INDIRIZZO</p>
              <p
                className="hover:cursor-pointer hover:!underline"
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customerData.legalAddress + " " + customerData.legalCity + " " + customerData.legalCap + " " + customerData.legalProvince)}`,
                    "_blank",
                  );
                }}
              >
                {customerData.legalAddress} {customerData.legalCity}{" "}
                {customerData.legalCap} {customerData.legalProvince}
              </p>{" "}
            </div>
            <p className="font-semibold">Sede Fisica</p>
            <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
              <p className="text-sm text-gray-500">INDIRIZZO</p>
              <p
                className="hover:cursor-pointer hover:!underline"
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customerData.address + " " + customerData.city + " " + customerData.cap + " " + customerData.province)}`,
                    "_blank",
                  );
                }}
              >
                {customerData.address} {customerData.city} {customerData.cap}{" "}
                {customerData.province}
              </p>{" "}
            </div>
          </>
        )}

        <p className="font-semibold">Contatti</p>

        <div className="grid grid-cols-3 gap-5">
          <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
            <p className="text-sm text-gray-500">TELEFONO</p>
            <p>{customerData.phone}</p>{" "}
          </div>
          <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
            <p className="text-sm text-gray-500">EMAIL</p>
            <p>{customerData.email}</p>{" "}
          </div>
          <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
            <p className="text-sm text-gray-500">PEC</p>
            <p>{customerData.pec}</p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDialog;
