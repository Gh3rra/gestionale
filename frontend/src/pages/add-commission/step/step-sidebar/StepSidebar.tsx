import MiniStep from "../../../../components/Stepper/Step/MiniStep";
import Step from "../../../../components/Stepper/Step/Step";
import Stepper from "../../../../components/Stepper/Stepper";
import {
  CommissionStepIcon,
  CustomerStepIcon,
  DocumentsStepIcon,
  ExpensesStepIcon,
  SuppliersStepIcon,
} from "../../../../Icon";
import styles from "./StepSidebar.module.css";

function StepSidebar({
  currentStep,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Commessa</h1>
        <p>Inserisci i dati inerenti alla commessa da creare</p>
      </div>
      <div className={styles.stepperContainer}>
        <Stepper>
          <Step
            icon={<CommissionStepIcon />}
            text={"Commessa"}
            state={currentStep === 0 ? 1 : currentStep > 0 ? 2 : 0}
          />
          <Step
            icon={<CustomerStepIcon />}
            text={"Cliente"}
            state={currentStep === 1 ? 1 : currentStep > 1 ? 2 : 0}
          />
          <Step
            icon={<SuppliersStepIcon />}
            text={"Fornitori"}
            state={
              currentStep === 2 || currentStep === 3
                ? 1
                : currentStep > 2
                ? 2
                : 0
            }
          >
            <MiniStep
              isActive={currentStep === 3}
              text={"Merci"}
              state={currentStep === 3 ? 1 : currentStep > 3 ? 2 : 0}
            />
          </Step>
          <Step
            icon={<DocumentsStepIcon />}
            text={"Documentazione"}
            state={currentStep === 4 ? 1 : currentStep > 4 ? 2 : 0}
          />
          <Step
            icon={<ExpensesStepIcon />}
            text={"Spese"}
            state={currentStep === 5 ? 1 : currentStep > 5 ? 2 : 0}
          />
        </Stepper>
      </div>
    </div>
  );
}

export default StepSidebar;
