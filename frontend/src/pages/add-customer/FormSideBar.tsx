import React from "react";
import {
  CommissionStepIcon,
  CustomerStepIcon,
  LocationIcon,
  PhoneIcon,
  SummaryIcon,
} from "../../Icon";
import Step from "../../components/Stepper/Step/Step";
import Stepper from "../../components/Stepper/Stepper";

const descriptionStep: Record<number, string> = {
  0: "Compila i dettagli anagrafici",
  1: "Compila i dettagli dell'indirizzo",

  2: "Compila i dettagli del cliente",
};

function FormSideBar({
  maxStep,

  step,
  setStep,
}: {
  step: number;
  setStep: (step: number) => void;
  maxStep: number;
}) {
  return (
    <div className="bg-hover flex h-full flex-col flex-1/4 rounded-l-[20px] px-10 py-10">
      <p className="text-xl font-medium">Inserimento Cliente</p>

      <div className="mt-5 flex h-30 flex-col gap-2">
        <p className="text-sm text-gray-500">{descriptionStep[step]}</p>
      </div>
      <div className="mt-5 flex h-full flex-col justify-between gap-5">
        <Stepper>
          <Step
            onClick={() => (maxStep >= 0 ? setStep(0) : null)}
            icon={<CommissionStepIcon />}
            text={"Commessa"}
            //state={currentStep === 0 ? 1 : currentStep > 0 ? 2 : 0}
            state={step === 0 ? 1 : step > 0 ? 2 : 0}
          />
          <Step
            onClick={() => (maxStep >= 1 ? setStep(1) : null)}
            icon={<LocationIcon />}
            text={"Indrizzo"}
            //state={currentStep === 1 ? 1 : currentStep > 1 ? 2 : 0}
            state={step === 1 ? 1 : step > 1 ? 2 : 0}
          />
          <Step
            onClick={() => (maxStep >= 2 ? setStep(2) : null)}
            icon={<PhoneIcon />}
            text={"Contatti"}
            //state={currentStep === 1 ? 1 : currentStep > 1 ? 2 : 0}
            state={step === 2 ? 1 : step > 1 ? 2 : 0}
          />
          {step === 3 && (
            <Step
              onClick={() => (maxStep >= 3 ? setStep(3) : null)}
              icon={<SummaryIcon />}
              text={"Riepilogo"}
              //state={currentStep === 1 ? 1 : currentStep > 1 ? 2 : 0}
              state={step === 3 ? 1 : step > 1 ? 3 : 0}
            />
          )}
        </Stepper>
      </div>
    </div>
  );
}

export default FormSideBar;
