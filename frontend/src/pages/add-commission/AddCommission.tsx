import { useState } from "react";
import CommissionStep from "./step/CommissionStep";
import { BackArrowIcon, NextArrowIcon } from "../../Icon";
import CustomerStep from "./step/CustomerStep";
import SuppliersStep from "./step/SuppliersStep";
import DocumentsStep from "./step/DocumentsStep";
import GoodsStep from "./step/GoodsStep";
import Button from "../../components/Button/Button";
import StepSidebar from "./step/step-sidebar/StepSidebar";
import { useStepForm } from "./step/hookForm";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { SupplierModel } from "../commission-detail/CommissionDetail";
import ExpensesStep from "./step/ExpensesStep";

const AddCommission = () => {
  const commissionForm = useStepForm();

  /*   useEffect(() => {
    creatingDialogRef.current.addEventListener("cancel", (event) => {
      event.preventDefault();
    });
  }, []); */

  /*   const toggleDialog = () => {
    setOpenCreatingModal(true);
    setTimeout(() => {
      setOpenCreatingModal(false);
    }, 2000);
  };

  const checkTextField = () => {
    var error = false;
    if (title === "") {
      setTitleError(true);
      error = true;
    }
    if (requestDate === "") {
      setRequestDateError(true);
      error = true;
    }
    return error;
  }; */

  /*   const handleSubmit = () => {
    toggleDialog();
     if (!checkTextField()) {
    } 
  }; */

  return (
    <FormProvider {...commissionForm}>
      <StepForm />
    </FormProvider>
  );
};

function StepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [openCreatingModal] = useState(false);

  const { control, handleSubmit, trigger } = useFormContext();
  const selectedSuppliers = useWatch({ name: "suppliers", control }) as
    | SupplierModel[]
    | undefined;

  const steps = [
    <CommissionStep />,
    <CustomerStep />,
    <SuppliersStep />,
    <GoodsStep />,
    <DocumentsStep />,
    <ExpensesStep />,
  ];

  const handleNext = async () => {
    switch (currentStep) {
      case 0:
        if (
          await trigger([
            "title",
            "address",
            "city",
            "cap",
            "province",
            "requestDate",
            "startWorkDate",
            "endWorkDate",
          ])
        ) {
          setCurrentStep((prev) => prev + 1);
        }

        break;

      case 1:
        if (await trigger(["customer"])) {
          setCurrentStep((prev) => prev + 1);
        }

        break;
      case 2:
        if (selectedSuppliers === undefined || selectedSuppliers.length === 0) {
          setCurrentStep((prev) => prev + 2);
        } else {
          setCurrentStep((prev) => prev + 1);
        }

        break;

      case 3:
        if (await trigger("suppliers")) {
          setCurrentStep((prev) => prev + 1);
        }

        break;

      case 4:
        if (await trigger("documents")) {
          setCurrentStep((prev) => prev + 1);
        }

        break;

      default:
        setCurrentStep((prev) => prev + 1);

        break;
    }
  };

  const handleBack = () => {
    if (
      currentStep === 4 &&
      (selectedSuppliers === undefined || selectedSuppliers.length === 0)
    ) {
      setCurrentStep((prev) => prev - 2);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex min-h-full min-w-full mt-[84px] flex-1">
      <StepSidebar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="ml-[346px] px-[160px] py-20 w-full min-h-full flex flex-col justify-between">
        <form className="flex-1" onSubmit={handleSubmit(() => {})}>
          {" "}
          {steps[currentStep]}
        </form>
        <div className="flex justify-end gap-2.5 w-full">
          {currentStep !== 0 && (
            <Button
              className="flex outline-none items-center w-[80px] h-[40px] p-0 justify-center bg-white border-1 border-fourtiary !text-primary-text"
              onClick={() => {
                handleBack();
              }}
            >
              <BackArrowIcon size={30} />
            </Button>
          )}
          {currentStep !== steps.length - 1 && (
            <Button
              className="flex outline-none items-center w-[80px] h-[40px] p-0 justify-center bg-white border-1 border-fourtiary !text-primary-text"
              onClick={async () => {
                await handleNext();
              }}
            >
              <NextArrowIcon size={30} />
            </Button>
          )}
          <Button
            className="flex outline-none items-center w-[80px] h-[40px] p-0 justify-center bg-white border-1 border-fourtiary !text-primary-text"
            onClick={() => {}}
          >
            Fatto
          </Button>
          {openCreatingModal && (
            <div className="absolute top-0 left-0 w-full z-99 h-full flex items-center justify-center bg-black">
              <div className="outline-none w-fit text-primary-text bg-white rounded-[20px] px-[80px] py-[50px] border-none text-[25px] font-semibold">
                {" "}
                Creazione commessa in corso...
              </div>
            </div>
          )}
        </div>{" "}
      </div>
    </div>
  );
}

export default AddCommission;
