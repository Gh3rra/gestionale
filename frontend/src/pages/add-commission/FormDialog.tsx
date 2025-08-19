import FormSideBar from "./FormSideBar";
import {
  AddressIcon,
  CrossIcon,
  CustomerIcon,
  NextArrowNoPathIcon,
  PrevArrowNoPathIcon,
  TextIcon,
} from "../../Icon";
import { FormProvider, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import MyTextFieldForm from "../../components/TextField/MyTextFieldForm";
import MyDatePicker from "../../components/Autocomplete copy/DatePicker";
import MyAutocomplete, {
  Option,
} from "../../components/Autocomplete/Autocomplete";
import { CircularProgress } from "@mui/material";
import { useStepForm } from "./hookForm";

import Fuse from "fuse.js";
import CustomerCarousel from "./CustomerCarousel";
import axios from "axios";
import {
  Customer,
  CustomerType,
  isPrivateCustomer,
  JuridicalCustomer,
  PrivateCustomer,
} from "../../types/customer";
import React from "react";
import { useProvinceList } from "../../hooks/useData";
import { useNextCommissionNumber } from "../../hooks/useCommission";

function FormDialog({ closeFn }: { closeFn: () => void }) {
  const [provinceList, setProvinceList] = useState<Option[]>([]);
  const commissionForm = useStepForm();

  const {
    data: proviceData,
    isError: isProvinceError,
    isLoading: isProvinceLoading,
  } = useProvinceList();
  const {
    data: nextCommissionNumber,
    isError: isNextCommissionError,
    isLoading: isNextCommissionLoading,
  } = useNextCommissionNumber();

  useEffect(() => {
    if (proviceData) {
      setProvinceList(
        proviceData.map((c) => ({ label: c.sigla, value: c.sigla })),
      );
    }
  }, [proviceData]);

  useEffect(() => {
    if (nextCommissionNumber) {
      commissionForm.setValue("number", nextCommissionNumber);
    }
  }, [nextCommissionNumber, commissionForm]);

  if (isProvinceLoading || isNextCommissionLoading) {
    return (
      <div className="fixed top-0 left-0 z-99 flex h-full w-full items-center justify-center bg-black/95">
        <CircularProgress className="text-primary-text" size={50} />
      </div>
    );
  }

  if (isProvinceError || isNextCommissionError) {
    return (
      <div className="fixed top-0 left-0 z-99 flex h-full w-full items-center justify-center bg-black/95">
        <p className="text-primary-text">Errore nel caricamento dei dati</p>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 z-99 flex h-full w-full items-center justify-center bg-black/95">
      <div className="text-primary-text flex h-3/4 w-2/3 rounded-[20px] border-none bg-white outline-none">
        <FormProvider {...commissionForm}>
          <Steps provinceList={provinceList} closeFn={closeFn} />
        </FormProvider>
      </div>
    </div>
  );
}

function Steps({
  provinceList,
  closeFn,
}: {
  provinceList: Option[];
  closeFn: () => void;
}) {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState<number>(0);

  const { handleSubmit } = useFormContext();
  const steps = [
    <CommissionStep setMaxStep={setMaxStep} setStep={setStep} />,
    <AddressStep
      setMaxStep={setMaxStep}
      setStep={setStep}
      province={provinceList}
    />,
    <CustomerStep setStep={setStep} setMaxStep={setMaxStep} />,
    <FinalStep setStep={setStep} closeFn={closeFn} />,
  ];

  return (
    <>
      <FormSideBar maxStep={maxStep} step={step} setStep={setStep} />
      <div className="h-full w-3/4 flex-1">
        <div className="flex h-full max-w-full flex-col px-5 pt-4 pb-10">
          <div className="flex w-full justify-end">
            <button
              onClick={closeFn}
              className="hover:[&_svg]:!fill-primary-text rounded-lg border-none bg-white px-2 py-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-sm hover:shadow-black active:translate-y-0 active:shadow-none"
            >
              <CrossIcon className="fill-secondary-text w-6 transition-all duration-200" />
            </button>
          </div>

          <form onSubmit={handleSubmit(() => {})} className="h-full max-w-full">
            {steps[step]}
          </form>
        </div>
      </div>
    </>
  );
}

function CommissionStep({
  setStep,
  setMaxStep,
}: {
  setStep: (step: number) => void;
  setMaxStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { trigger } = useFormContext();

  return (
    <div className="flex min-h-full flex-col justify-between">
      <div className="flex flex-1 flex-col gap-3 px-2 py-5">
        <MyTextFieldForm disabled name="number" labelText="Numero Commessa" />
        <div className="grid grid-cols-2 gap-5">
          <MyTextFieldForm
            name="title"
            icon={<TextIcon className="w-4" />}
            labelText="Titolo"
          />
          <MyDatePicker name="requestDate" labelText="Data richiesta" />
        </div>
      </div>

      <div className="flex w-full justify-start">
        <button
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            if (await trigger(["title", "requestDate"])) {
              setMaxStep(1);
              setStep(1);
            }
          }}
          className="flex items-center gap-2 rounded-2xl bg-black px-4 py-1.5 text-sm text-white transition-all duration-200 hover:cursor-pointer hover:shadow-[inset_0_0_6px_#fff]"
        >
          <p>Avanti</p>
          <NextArrowNoPathIcon className="h-3.5" />
        </button>
      </div>
    </div>
  );
}

function AddressStep({
  setMaxStep,
  setStep,
  province,
}: {
  setStep: (step: number) => void;
  province: Option[];
  setMaxStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { trigger } = useFormContext();
  return (
    <div className="flex min-h-full flex-col justify-between">
      <div className="grid grid-cols-1 gap-5 px-2 py-5">
        <MyTextFieldForm
          name="address"
          icon={<AddressIcon className="w-4" />}
          labelText="Indirizzo"
        />
        <div className="grid grid-cols-7 gap-5">
          <MyTextFieldForm name="city" className="col-span-3" labelText="Città" />
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
      </div>{" "}
      <div className="flex w-full justify-start gap-5">
        <button
          type="button"
          onClick={() => setStep(0)}
          className="text-primary-text flex items-center gap-2 rounded-2xl bg-transparent px-4 py-1.5 text-sm inset-shadow-white transition-all duration-200 hover:cursor-pointer hover:shadow-[inset_0_0_6px_#000]"
        >
          <PrevArrowNoPathIcon className="h-3.5" />

          <p>Indietro</p>
        </button>
        <button
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            if (await trigger(["address", "city", "cap", "province"])) {
              setMaxStep(2);
              setStep(2);
            }
          }}
          className="flex items-center gap-2 rounded-2xl bg-black px-4 py-1.5 text-sm text-white inset-shadow-white transition-all duration-200 hover:cursor-pointer hover:shadow-[inset_0_0_6px_#fff]"
        >
          <p>Avanti</p>
          <NextArrowNoPathIcon className="h-3.5" />
        </button>
      </div>
    </div>
  );
}

function CustomerStep({
  setMaxStep,
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setMaxStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [resultList, setResultList] = useState<[]>([]);
  const [searchText, setSearchText] = useState("");
  const [customers, setCustomers] = useState<[]>([]);
  const { setValue, watch, trigger } = useFormContext();
  const selectedCustomer = watch("customer") as Customer | undefined;

  const fetchCustomers = async () => {
    await axios
      .get("http://localhost:3000/api/customers", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          const { privateCustomers, juridicalCustomers } = res.data;
          setCustomers([...privateCustomers, ...juridicalCustomers]);
        } else {
          console.error("Failed to fetch customers:", res.statusText);
        }
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const search = (newText: string) => {
    const fuse = new Fuse(customers, {
      threshold: 0.2,
      useExtendedSearch: true,
      keys: ["name", "surname", "cf", "ivaCode"],
    });

    setSearchText(newText);
    const newList = fuse
      .search(newText.replace(" ", "|"))
      .map((result) => result.item);
    if (newText !== "") {
      setResultList(newList);
    } else {
      setResultList([]);
    }
  };

  return (
    <div className="flex min-h-full max-w-full flex-col justify-between">
      <div className="flex max-w-full flex-1 flex-col justify-start">
        <div className="flex flex-col gap-2">
          <p>Cerca cliente</p>
          <div className="flex gap-3">
            <MyTextFieldForm
              value={searchText}
              onChange={(e) => search(e.target.value)}
              className="flex-1"
              icon={<CustomerIcon className="w-4" />}
              labelText="Nome cliente"
            />
            <button
              type="button"
              onClick={async (e) => {
                e.preventDefault();
              }}
              className="flex items-center gap-2 rounded-sm bg-black px-4 py-1.5 text-sm text-white inset-shadow-white transition-all duration-200 hover:cursor-pointer hover:shadow-[inset_0_0_6px_#fff]"
            >
              <p>Nuovo</p>
            </button>
          </div>
        </div>

        {resultList && (
          <CustomerCarousel
            selectedCustomer={selectedCustomer}
            customers={resultList}
            handleCustomerSelect={(id: number, type: CustomerType) => {
              console.log(selectedCustomer);

              // Handle customer selection

              if (
                selectedCustomer &&
                selectedCustomer.id === id &&
                selectedCustomer.type === type
              ) {
                setValue("customer", undefined);
                console.log("UNDEFINED");
              } else {
                setValue("customer", { id, type }); // Assuming type 1 is for private customers
                console.log("SET CUSTOMER", { id, type });
                setStep(3);
              }
            }}
          />
        )}
      </div>
      <div className="flex w-full justify-start gap-5">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-primary-text flex items-center gap-2 rounded-2xl bg-transparent px-4 py-1.5 text-sm inset-shadow-white transition-all duration-200 hover:cursor-pointer hover:shadow-[inset_0_0_6px_#000]"
        >
          <PrevArrowNoPathIcon className="h-3.5" />

          <p>Indietro</p>
        </button>
        <button
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            if (await trigger(["customer"])) {
              setMaxStep(3);
              setStep(3);
            }
          }}
          className="flex items-center gap-2 rounded-2xl bg-black px-4 py-1.5 text-sm text-white transition-all duration-200 hover:cursor-pointer hover:shadow-[inset_0_0_6px_#fff]"
        >
          <p>Avanti</p>
          <NextArrowNoPathIcon className="h-3.5" />
        </button>
      </div>
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
  const commissionData = watch();
  const [customer, setCustomer] = useState<Customer | null>(null);

  const fetchCustomerData = async () => {
    if (commissionData.customer) {
      try {
        // Fetch customer data based on the type

        if (commissionData.customer.type === "private") {
          const response = await axios.get(
            `http://localhost:3000/api/customers/private-customer/${commissionData.customer.id}`,
            { withCredentials: true },
          );
          if (response.status === 200 || response.status === 304) {
            console.log(commissionData.customer.id);
            console.log(response.data.customer);

            setCustomer(response.data.customer as PrivateCustomer);
          } else {
            console.error(
              "Failed to fetch customer data:",
              response.statusText,
            );
          }
        } else {
          const response = await axios.get(
            `http://localhost:3000/api/customers/juridical-customer/${commissionData.customer.id}`,
            { withCredentials: true },
          );
          if (response.status === 200 || response.status === 304) {
            console.log(response.data.customer);

            setCustomer(response.data.customer as JuridicalCustomer);
          } else {
            console.error(
              "Failed to fetch customer data:",
              response.statusText,
            );
          }
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/commissions",
      commissionData,
      { withCredentials: true },
    );
    if (response.status === 200 || response.status === 201) {
      console.log("Commission created successfully:", response.data);
      closeFn();
    } else {
      console.error("Failed to create commission:", response.statusText);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-between">
      <div className="flex flex-col gap-5 px-2 py-5 font-semibold">
        <p>Riepilogo Commessa</p>
      </div>
      <div className="flex flex-1 flex-col gap-5 px-2">
        <div className="gap grid grid-cols-2 gap-5">
          <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
            <p className="text-sm text-gray-500">TITOLO</p>
            <p className="">{commissionData.title}</p>
          </div>
          <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
            <p className="text-sm text-gray-500">DATA RICHIESTA</p>
            <p>
              {(commissionData.requestDate as Date).toLocaleDateString("it-IT")}
            </p>
          </div>
        </div>
        <div className="gap grid grid-cols-3 gap-5">
          <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
            <p className="text-sm text-gray-500">INDIRIZZO</p>
            <p className="">{commissionData.address}</p>
          </div>
          <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
            <p className="text-sm text-gray-500">CITTÀ</p>
            <p>
              {commissionData.city} {commissionData.cap}
            </p>
          </div>
          <div className="border-fourtiary flex flex-col gap-2 rounded-xl border-1 p-3">
            <p className="text-sm text-gray-500">PROVINCIA</p>
            <p>{commissionData.province}</p>
          </div>
        </div>
        <p className="font-semibold">Cliente</p>
        {customer && (
          <div className="border-fourtiary grid grid-cols-3 gap-y-3 rounded-xl border-1 p-5">
            <div className="flex flex-col gap-2">
              <img
                src={customer?.profileImg}
                alt=""
                className="h-15 w-15 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">CODICE FISCALE</p>
              <p className="text-sm font-semibold">
                {isPrivateCustomer(customer) ? customer.cf : customer.ivaCode}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">TOTALE LAVORI</p>
              <p className="text-sm font-semibold">15.000 €</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-medium">
                {customer?.name}{" "}
                {isPrivateCustomer(customer) ? customer?.surname : ""}
              </p>
              <div className="w-fit rounded-2xl bg-green-100 px-2 py-1">
                <p className="w-fit text-xs text-green-700">
                  {isPrivateCustomer(customer) ? "Privato" : "Giuridico"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">TOTALE LAVORI</p>
              <p className="text-sm font-semibold">15.000 €</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">TOTALE LAVORI</p>
              <p className="text-sm font-semibold">15.000 €</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full justify-between">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="text-primary-text flex items-center gap-2 rounded-2xl bg-transparent px-4 py-1.5 text-sm inset-shadow-white transition-all duration-200 hover:cursor-pointer hover:shadow-[inset_0_0_6px_#000]"
        >
          <PrevArrowNoPathIcon className="h-3.5" />

          <p>Indietro</p>
        </button>
        <button
          onClick={handleSubmit}
          className="hover:text-primary-text text-secondary-text rounded-lg border-none bg-white px-2 py-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-sm hover:shadow-black active:translate-y-0 active:shadow-none"
        >
          Salva ed Esci
        </button>
      </div>
    </div>
  );
}

export default FormDialog;
