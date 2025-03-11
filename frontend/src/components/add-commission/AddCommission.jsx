import React, { useState } from "react";
import "./AddCommission.css";
import CommissionStep from "./step/CommissionStep";
import { BackArrowIcon, NextArrowIcon } from "../../Icon";
import CustomerStep from "./step/CustomerStep";

const AddCommission = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = [<CommissionStep />, <CustomerStep />];
  return (
    <div className="add-commission-body">
      {step[currentStep]}
      <StepControl setCurrentStep={setCurrentStep} currentStep={currentStep} />
    </div>
  );
};

const StepControl = ({ setCurrentStep, currentStep }) => {
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="step-navigation-button-container">
      {currentStep !== 0 && (
        <button
          onClick={() => {
            handleBack();
          }}
        >
          <BackArrowIcon size={30} />
        </button>
      )}
      <button
        onClick={() => {
          handleNext();
        }}
      >
        <NextArrowIcon size={30} />
      </button>
    </div>
  );
};

export default AddCommission;
