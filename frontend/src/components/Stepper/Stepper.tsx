import React from "react";
import styles from "./Stepper.module.css";

type StepperProps = {
  gap?: string;
  children?: React.ReactNode;
};

type StepProps = {
  gap?: string;

};

function Stepper({ gap = "20px", children }: StepperProps) {
  const validChildren = React.Children.toArray(children).filter(
    React.isValidElement
  ) as React.ReactElement<StepProps>[];
  return (
    <div className={styles.wrapper} style={{ gap }}>
      {validChildren.map((child, i) => {
        return React.cloneElement(child, { key: i, gap });
      })}
    </div>
  );
}

export default Stepper;
